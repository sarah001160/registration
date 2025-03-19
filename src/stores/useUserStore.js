// 共享狀態 user 名稱、email、照片、登入時間
import { defineStore } from 'pinia';
import { onAuthStateChanged, getAuth, updateProfile } from 'firebase/auth';
import Swal from 'sweetalert2';
export const useUserStore = defineStore('user', () => {
  const auth = getAuth(); // 取 firebase Auth 物件
  const userEmail = ref('');
  const userName = ref('');
  const userPhoto = ref('');
  const lastSignInTime = ref('');

  onAuthStateChanged(auth, (user) => {
    if (user) {
      userEmail.value = user.email; // 電子郵件
      userName.value = user.displayName; // 名稱
      userPhoto.value = user.photoURL; // 照片
      lastSignInTime.value = formateStringtoDate(user.metadata.lastSignInTime); // 登入時間
    } else {
      // 登出清空
      userEmail.value = ''; // 電子郵件
      userName.value = ''; // 名稱
      userPhoto.value = ''; // 照片
    }
  });

  // 更新名稱
  function updateUserName(newName) {
    if (auth.currentUser) {
      updateProfile(auth.currentUser, {
        displayName: newName,
      }).then(() => {
        console.log('Profile updated!')
        // 刷新
        auth.currentUser.reload().then(() => {
          userName.value = auth.currentUser.displayName;
          Swal.fire({
            icon: 'success',
            title: '名稱更新成功!',
            confirmButtonText: '確認',
            confirmButtonColor: '#3B82F6'
          });
        });
      })
        .catch((error) => {
          console.log(' An error occurred', error);
          Swal.fire({
            icon: 'warning',
            title: '名稱更新失敗',
            confirmButtonText: '確認',
            confirmButtonColor: '#3B82F6'
          });
        })
    } else {
      Swal.fire({
        icon: 'warning',
        title: '名稱更新失敗',
        confirmButtonText: '確認',
        confirmButtonColor: '#3B82F6'
      });
    }
  }

  // 字串轉日期 Date
  function formateStringtoDate(dateStr) {
    // dateStr 是原始日期字串
    // 將字串轉換為 Date 物件
    const date = new Date(dateStr);

    // 轉換為中文格式
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      // timeZoneName: 'short', // 不顯示時區
    };

    const formattedDate = date.toLocaleDateString('zh-TW', options);
    return formattedDate; // 例如：2025年3月18日 星期二 07:20:42 GMT
  }


  // 返回 State 或 Actions (匯出使用)
  return {
    userEmail, userName, userPhoto, lastSignInTime,
    updateUserName,
  }
})
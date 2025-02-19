<script setup>
import {
  getCoLtdRequiredFiles, editCoLtdRequiredItem,
} from '@/stores/useFireStore';
import Swal from 'sweetalert2';

const companyType = ref([
  {
    name: '股份有限公司',
    value: 'coLtd',
  },
  {
    name: '有限公司',
    value: 'ltd',
  }
]);
const currentCompanyType = ref('coLtd'); // 選擇的公司型態，值決定取回的文件doc 

const addNewTitle = ref(''); // 新增-標題
const addNewContent = ref(''); // 新增-應備文件內容
const currentItem = ref(null); // 當前被選擇的項目
const content = ref(null); // 閱讀-應備文件內容
const currentName = ref(''); // 閱讀-當前項目
const modalTitle = ref(''); // 編輯-標題
let modalContent = ref([]); // 編輯-內容
const mode = ref('read'); // read 閱讀模式、edit 編輯模式
let coLtdList = reactive([]); // coLtd 應備文件取回資料

// 取得股份有限公司應備文件 coLtd
const getCoLtdList = async () => {
  // 給參數:文件名稱，取回特定資料
  coLtdList.length = 0; // clear
  const result = await getCoLtdRequiredFiles('coLtd'); // 指定文件 coLtd
  const array = Object.values(result);
  coLtdList.push(...array);
}

// 打開燈箱-新增
const openAddNewModal = () => {
  addNew_modal.showModal();
}
// 送出新增
const addNewItem = async () => {
  // 防呆
  if (addNewTitle.value.trim() == '') {
    Swal.fire({
      icon: 'warning',
      title: '標題不可空白!',
      confirmButtonText: '確認',
      confirmButtonColor: '#3B82F6'
    });
    return;
  };
  const timeStamp = Math.floor(new Date() / 1000);
  const tempArr = addNewContent.value?.split('\n').filter(item => item.trim() !== '');
  // 組參數
  const config = {
    doc: 'coLtd',
    para: {
      id: timeStamp,
      title: addNewTitle.value,
      items: tempArr,
    }
  }
  const result = await editCoLtdRequiredItem({ config });// 新增、編輯用同一個方法
  if (result) {
    await getCoLtdList();
    Swal.fire({
      icon: 'success',
      title: '新增成功!',
      confirmButtonText: '確認',
      confirmButtonColor: '#3B82F6'
    });
  } else {
    Swal.fire({
      icon: 'warning',
      title: '新增失敗!',
      confirmButtonText: '確認',
      confirmButtonColor: '#3B82F6'
    });
  }
  selectItem(config.para);
  // clear
  addNewTitle.value = '';
  addNewContent.value = '';
}
// 關閉燈箱-新增
const closeAddNewModal = () => {
  // clear
  addNewTitle.value = '';
  addNewContent.value = '';
}

// click 左側選項，給右側預覽
const selectItem = (item) => {
  currentItem.value = item;
  currentName.value = item.title;
  content.value = item.items;
}
// 開啟編輯區塊
const handleEdit = () => {
  modalTitle.value = currentItem.value.title;
  modalContent.value = [...currentItem.value.items];
  mode.value = 'edit'
}
// 更新編輯
const updateEdit = async () => {
  // 防呆
  if (modalTitle.value.trim() == '') {
    Swal.fire({
      icon: 'warning',
      title: '標題不可空白!',
      confirmButtonText: '確認',
      confirmButtonColor: '#3B82F6'
    });
    return;
  }
  const id = currentItem.value?.id;
  // 組參數
  const config = {
    doc: 'coLtd', // 文件名稱
    para: {
      id: id,
      title: modalTitle.value, // 編輯的標題
      items: modalContent.value, // 編輯的內容
    }
  }
  const result = await editCoLtdRequiredItem({ config });
  if (result) {
    await getCoLtdList();
    Swal.fire({
      icon: 'success',
      title: '編輯成功!',
      confirmButtonText: '確認',
      confirmButtonColor: '#3B82F6'
    }).then((result) => {
      // 點確認後，要做的事情
      if (result.isConfirmed) {
      } else if (result.isDenied) {
        // do nothing
      }
    });
    mode.value = 'read';
    selectItem(config.para);

  } else {
    Swal.fire({
      icon: 'warning',
      title: '編輯失敗!',
      confirmButtonText: '確認',
      confirmButtonColor: '#3B82F6'
    });
    mode.value = 'read';
  }
}
// 取消更新
const cancelEdit = () => {
  mode.value = 'read';
}
// 顯示在 textarea
const formattedTest = computed({
  // getter
  get() {
    return modalContent.value?.join('\n') || '';
  },
  // setter
  set(newValue) {
    modalContent.value = newValue.split('\n').map((item) => item.trim());
  }
});

watch(currentItem, (newValue, oldValue) => {
  // 防呆:編輯中切換其他項目，強制變成閱讀模式
  if (newValue !== oldValue) {
    mode.value = 'read';
  }
})

// 在組件掛載後讀取資料
onMounted(async () => {
  await getCoLtdList(); // 取得應備文件-股份有限公司
  selectItem(coLtdList[0]);
});
</script>
<template>
  <div>
    <div class="p-4">
      <div class="max-w-7xl mx-auto p-4 bg-gray-100 flex justify-start items-center rounded-md mb-2">
        <div class="flex-1 flex justify-start items-center">
          <h1 class="text-lg font-bold mr-2">公司登記應備文件</h1>
          <select class="select select-bordered w-fit mr-2" v-model="currentCompanyType">
            <option v-for="c in companyType" :value="c.value">{{ c.name }}</option>
          </select>
        </div>
        <div class="flex-0">
          <a href="https://gcis.nat.gov.tw/mainNew/subclassNAction.do?method=getFile&pk=54&sub=3" target="_blank"
            class="flex items-center mb-2 text-blue-500 hover:font-bold">
            <i class="ri-links-fill"></i>
            <small>全國商工行政服務入口網</small>
          </a>
        </div>
      </div>
      <div class="max-w-7xl mx-auto grid grid-cols-12 gap-4 h-auto">
        <!--左區-->
        <div class="col-span-3 bg-gray-100 border rounded-md px-2 max-h-screen">
          <div class="flex items-end w-full p-3 pl-4 justify-between border-b-2">
            <small class="block text-grey-100">項目({{ coLtdList.length }})</small>
            <a href="#" @click.prevent="openAddNewModal"
              class="block w-6 h-6  text-center rounded-full transition-all hover:bg-blue-200">
              <i class="ri-add-fill"></i>
            </a>
          </div>
          <div class="h-[90vh] overflow-y-auto p-2">
            <div v-for="(n, index) in coLtdList" :key="index">
              <div class=" hover:text-blue-500 text-sm">
                <a class="cursor-pointer block rounded-md w-full p-2 mb-1" @click="selectItem(n)"
                  :class="[currentItem.id == n.id ? 'text-blue-500 font-bold bg-blue-100' : '']">{{
                    (index + 1) }}.{{ n.title }}</a>
              </div>
            </div>
          </div>
        </div>
        <!-- 右側區塊 -->
        <!-- 閱讀模式 -->
        <div v-if="mode == 'read'" class="col-span-9 p-4 border rounded-md">
          <div class="flex items-center gap-2 p-2">
            <h3 class="font-bold flex-1">{{ currentName }}</h3>
            <div class="flex-0">
              <div class="tooltip tooltip-primary" data-tip="複製">
                <button class="btn p-1.5 w-10 h-10">
                  <i class="ri-file-copy-2-line"></i>
                </button>
              </div>
              <div class="tooltip" data-tip="編輯">
                <button class="btn p-1.5 w-10 h-10" @click="handleEdit">
                  <i class="ri-edit-2-line"></i>
                </button>
              </div>

            </div>
          </div>
          <div class="p-2" v-if="currentItem && currentItem.items">
            <div>
              <ol class="list-disc pl-6">
                <li class="py-1" v-for="item in content">{{ item }}</li>
              </ol>
            </div>
          </div>
        </div>
        <!-- 編輯模式-->
        <div v-else-if="mode == 'edit'" class="col-span-9 p-4 border rounded-md">
          <h3 class="text-lg font-bold">編輯</h3>
          <div>
            <label class="form-control w-full">
              <div class="label">
                <span class="label-text font-bold">標題<small class="pl-2 text-red-500">*必填</small></span>
              </div>
              <input type="text" v-model="modalTitle" class="input input-bordered w-full mb-1" />
            </label>
            <label class="form-control w-full">
              <div class="label">
                <span class="label-text font-bold">應備文件<small class="pl-2 text-red-500">*一行一列。按 Enter
                    可換列。</small></span>

              </div>
              <textarea rows="16" class="overflow-y-scroll my-1 textarea textarea-bordered  w-full"
                v-model="formattedTest"></textarea>
            </label>
          </div>
          <div class="flex justify-end pt-2">
            <button class="btn" @click="cancelEdit">取消</button>
            <button class="btn btn-primary" @click="updateEdit">更新</button>
          </div>

        </div>
      </div>
    </div>

    <!-- 燈箱:新增 -->
    <dialog id="addNew_modal" class="modal">
      <div class="modal-box max-w-5xl p-10">
        <form method="dialog">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <h3 class="text-lg font-bold">新增</h3>
        <div>
          <label class="form-control w-full">
            <div class="label">
              <span class="label-text font-bold">標題</span>
            </div>
            <input type="text" v-model="addNewTitle" class="input input-bordered w-full mb-1" />
          </label>
          <label class="form-control w-full">
            <div class="label">
              <span class="label-text font-bold">應備文件
                <small class="pl-2 text-red-500">*一行一列。按 Enter 可換列。</small>
              </span>
            </div>
            <textarea rows="10" class="overflow-y-scroll my-1 textarea textarea-bordered textarea-lg w-full"
              v-model="addNewContent"></textarea>
          </label>
        </div>
        <div class="modal-action">
          <form method="dialog">
            <button class="btn" @click="closeAddNewModal">取消</button>
            <button class="btn btn-primary" @click="addNewItem">新增</button>
          </form>
        </div>
      </div>
    </dialog>
  </div>
</template>
<style lang="sass" scoped>
button
  @apply rounded-md mx-1 p-2
input
  @apply border rounded-md border-gray-200 mx-1 p-2
</style>

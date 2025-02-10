<script setup>
import {
  getAllDocFrUsers,
  addToContentList,
  getDocNote,
} from '@/stores/useFireStore';
import Swal from 'sweetalert2';

const title = ref('');
const text = ref('');
const allUsers = reactive([]);// users集合內的所有文件
const noteList = reactive([]); // notes文件內所有資料

// 取users內所有文件
const getAllDocsUsers = async () => {
  const result = await getAllDocFrUsers();
  allUsers.push(...result);
  console.log(allUsers)
}

// 取指定文件
const getNote = async () => {
  // clear 上一次狀態
  noteList.length = 0;
  const result = await getDocNote();
  noteList.push(...result);
}

//寫入notes文件
const addToNotes = async () => {
  const timeStamp = Math.floor(new Date() / 1000);
  const para = {
    id: timeStamp,
    title: title.value,
    text: text.value
  }
  await addToContentList({ para });
}

const submit = () => {
  if (title.value == "" || text.value == "") {
    Swal.fire("不能空白!");
  } else {
    addToNotes();
    getNote();
    title.value = "";
    text.value = "";
  }
}


// 在組件掛載後讀取資料
onMounted(async () => {
  await getAllDocsUsers();//test
  await getNote();
});

</script>
<template>
  <div>
    <div class="p-4">
      <p> 垂直輸入input 比較順手，
        左右排列的input，有點麻煩，還要移動滑鼠...</p>

      需求:把你所有應備文件的筆記都貼上來吧
      用卡片整理，每個都可以快速複製。
      複製卡片、開啟編輯。
      可以快速編輯。
      我想使用sweetalert耶 看看Npm能不能裝
      案件編號
      概述
      會計期間
      決算日期
      銷毀案件日(決算日期加上 7 年)

      <ol class="list-decimal pl-4">
        <li>發行新股 </li>
        <li>財產作價增資</li>
        <li> 現金增資(平價、折價、溢價)</li>
        <li> 盈餘轉增資</li>
        <li> 減資</li>
        <li>設立公司或變更組織</li>
        <li>解散有限公司</li>
        <li>解散股份有限公司</li>
        <li>董監事變更</li>
      </ol>
      發行新股
      財產作價增資
      現金增資(平價、折價、溢價)
      盈餘轉增資
      減資

      設立公司或變更組織
      解散有限公司
      解散股份有限公司

      董監事變更

    </div>
    <div class="p-4 w-full">
      <input type="text" placeholder="標題" v-model="title" class="border rounded-md">
      <input type="text" placeholder="內容" v-model="text">
      <button @click="submit" class="bg-gray-400 text-white p-1">送出</button>
    </div>

    <div class="p-4">
      <div v-for=" item in noteList" class="flex flex-col">
        <p>{{ item }}</p>
      </div>
    </div>

  </div>
</template>
<style lang="sass" scoped>
button
  @apply rounded-md mx-1 p-2
input
  @apply border rounded-md border-gray-200 mx-1 p-2

</style>

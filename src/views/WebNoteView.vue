<!--前台應備文件-->
<script setup>
import {
  getRequiredFiles, editRequiredItem, removeRequiredItem,
} from '@/stores/useFireStore';
import Notecard from '@/components/Notecard.vue';

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
const docType = ref('coLtd'); // coLtd 股份有限公司、ltd 有限公司
let coLtdList = reactive([]); // coLtd 應備文件取回資料
let ltdList = reactive([]); // ltd 應備文件取回資料
let currentNum = reactive([0]);
// 取得股份有限公司應備文件 coLtd
const getList = async (docType) => {
  // 給參數:文件名稱
  if (docType == 'coLtd') {
    coLtdList.length = 0; // clear
    const result = await getRequiredFiles(docType); // 指定文件 coLtd
    coLtdList.push(...Object.values(result)); // vue 可偵測到變化
  } else if (docType == 'ltd') {
    ltdList.length = 0;
    const result = await getRequiredFiles(docType); // 指定文件 ltd
    ltdList.push(...Object.values(result))
  }
}
// 收元件參數
// 新增
async function handleAdd(config) {
  const result = await editRequiredItem({ config });// 新增、編輯用同一個方法
  if (result) {
    await getList(docType.value);
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
  // 紀錄編輯當下該項目的序號
  if (docType.value == 'coLtd') {
    const index = coLtdList.findIndex(item => item.id == config.para.id);
    currentNum[0] = index;
  } else if (docType.value == 'ltd') {
    const index = ltdList.findIndex(item => item.id == config.para.id);
    currentNum[0] = index;
  }
}
// 編輯
async function handleUpdate(config) {
  const result = await editRequiredItem({ config });
  if (result) {
    await getList(docType.value);
    Swal.fire({
      icon: 'success',
      title: '更新成功!',
      confirmButtonText: '確認',
      confirmButtonColor: '#3B82F6'
    })
  } else {
    Swal.fire({
      icon: 'warning',
      title: '編輯失敗!',
      confirmButtonText: '確認',
      confirmButtonColor: '#3B82F6'
    });
  }
  // 紀錄編輯當下該項目的序號
  if (docType.value == 'coLtd') {
    const index = coLtdList.findIndex(item => item.id == config.para.id);
    currentNum[0] = index;
  } else if (docType.value == 'ltd') {
    const index = ltdList.findIndex(item => item.id == config.para.id);
    currentNum[0] = index;
  }
}
// 刪除
async function handleDelete(config) {
  // swal你確定要刪除嗎?
  let delResult;
  Swal.fire({
    icon: 'warning',
    title: `刪除「${config.para.title}」?`,
    showCancelButton: true,
    confirmButtonText: '刪除',
    cancelButtonText: '取消',
    confirmButtonColor: 'red'
  }).then(async (result) => {
    if (result.isConfirmed) {
      delResult = await removeRequiredItem({ config });
      if (delResult) {
        await getList(docType.value);
        Swal.fire({
          icon: 'success',
          title: '刪除成功!',
          confirmButtonText: '確認',
          confirmButtonColor: '#3B82F6'
        });
        currentNum[0] = 0;
      } else {
        Swal.fire({
          icon: 'warning',
          title: '刪除失敗!',
          confirmButtonText: '確認',
          confirmButtonColor: '#3B82F6'
        });
      }
    }
  });
}

watch(docType, async (newVal, oldVal) => {
  await getList(newVal)
  currentNum[0] = 0;
});

// 在組件掛載後讀取資料
onMounted(async () => {
  await getList(docType.value); // 預設:取得應備文件-股份有限公司
  currentNum[0] = 0;
});
</script>
<template>
  <div class="p-4">
    <div class="w-full lg:max-w-7xl mx-auto p-4 bg-primary flex justify-start items-center rounded-md mb-2">
      <div class="flex-1 flex justify-start items-center">
        <h1 class="text-lg font-bold mr-2 text-white">公司登記應備文件</h1>
        <select class="select select-bordered w-fit mr-2" v-model="docType">
          <option v-for="c in companyType" :value="c.value">{{ c.name }}</option>
        </select>
      </div>
    </div>
    <Notecard v-if="docType == 'coLtd'" :num="currentNum" :edit="false" :list="coLtdList" :doc="'coLtd'"
      @addNewItem="handleAdd" @updateItem="handleUpdate" @deleteItem="handleDelete" />
    <Notecard v-else-if="docType == 'ltd'" :num="currentNum" :edit="false" :list="ltdList" :doc="'ltd'"
      @addNewItem="handleAdd" @updateItem="handleUpdate" @deleteItem="handleDelete" />
  </div>
</template>
<style lang="sass" scoped>
button
  @apply rounded-md mx-1 p-2
input
  @apply border rounded-md border-gray-200 mx-1 p-2
</style>

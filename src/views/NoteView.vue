<script setup>
import {
  getCoLtdRequiredFiles, editCoLtdRequiredItem,
} from '@/stores/useFireStore';
import Swal from 'sweetalert2';
import noteFile from '../components/noteFile.vue';

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
const docType = ref('coLtd'); // coLtd 股份有限公司資料、ltd 有限公司資料
let coLtdList = reactive([]); // coLtd 應備文件取回資料
let ltdList = reactive([]); // ltd 應備文件取回資料
// 取得股份有限公司應備文件 coLtd
const getCoLtdList = async (docType) => {
  // 給參數:文件名稱，取回特定資料
  if (docType == 'coLtd') {
    coLtdList.length = 0; // clear
    const result = await getCoLtdRequiredFiles(docType); // 指定文件 coLtd
    coLtdList.push(...Object.values(result)); // vue 可偵測到變化
  } else if (docType == 'ltd') {
    ltdList.length = 0;
    const result = await getCoLtdRequiredFiles(docType); // 指定文件 coLtd
    ltdList.push(...Object.values(result))
    console.log(ltdList)
  }
}
// 收元件參數
// 新增
async function handleAdd(config) {
  const result = await editCoLtdRequiredItem({ config });// 新增、編輯用同一個方法
  if (result) {
    await getCoLtdList(docType.value);
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
}
// 編輯
async function handleUpdate(config) {
  const result = await editCoLtdRequiredItem({ config });
  if (result) {
    await getCoLtdList(docType.value);
    Swal.fire({
      icon: 'success',
      title: '編輯成功!',
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
}

watch(docType, async (newVal, oldVal) => {
  console.log(newVal)
  await getCoLtdList(newVal)
})

// 在組件掛載後讀取資料
onMounted(async () => {
  await getCoLtdList(docType.value); // 預設:取得應備文件-股份有限公司
});
</script>
<template>
  <div>
    <div class="p-4">
      <div class="max-w-7xl mx-auto p-4 bg-gray-100 flex justify-start items-center rounded-md mb-2">
        <div class="flex-1 flex justify-start items-center">
          <h1 class="text-lg font-bold mr-2">公司登記應備文件</h1>
          <select class="select select-bordered w-fit mr-2" v-model="docType">
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

      <template v-if="coLtdList.length">
        <noteFile v-if="docType == 'coLtd'" :list="coLtdList" :doc="'coLtd'" @addNewItem="handleAdd"
          @updateItem="handleUpdate" />
      </template>
      <template v-if="ltdList.length !== 0 || docType == 'ltd'">
        <noteFile v-if="docType == 'ltd'" :list="ltdList" :doc="'ltd'" @addNewItem="handleAdd"
          @updateItem="handleUpdate" />
      </template>




    </div>
  </div>
</template>
<style lang="sass" scoped>
button
  @apply rounded-md mx-1 p-2
input
  @apply border rounded-md border-gray-200 mx-1 p-2
</style>

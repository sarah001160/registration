<!--前台應備文件-->
<script setup>
import {
  getRequiredFiles,
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
        <h1 class="text-lg font-bold mr-2 text-white">應備文件</h1>
        <select class="select select-bordered w-fit mr-2" v-model="docType">
          <option v-for="c in companyType" :value="c.value">{{ c.name }}</option>
        </select>
      </div>
    </div>
    <Notecard v-if="docType == 'coLtd'" :num="currentNum" :edit="false" :list="coLtdList" :doc="'coLtd'" />
    <Notecard v-else-if="docType == 'ltd'" :num="currentNum" :edit="false" :list="ltdList" :doc="'ltd'" />
  </div>
</template>
<style lang="sass" scoped>
button
  @apply rounded-md mx-1 p-2
input
  @apply border rounded-md border-gray-200 mx-1 p-2
</style>

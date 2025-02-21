<script setup>
import {
  getAllDocFrTest02,
  getDocFood, addToArray,
  removeFromArray
} from '@/stores/useFireStore';
import Swal from 'sweetalert2'; // 提示訊息 alert

const allDocsList = reactive([]);
const foodList = reactive([]);
const name = ref('');
const seats = ref('');
const isLoading = ref(false);

const getAllDocsTest02 = async () => {
  isLoading.value = true;
  const result = await getAllDocFrTest02();
  allDocsList.push(...result);
  isLoading.value = false;
}

const getFood = async () => {
  isLoading.value = true;
  // clear 上一次狀態
  foodList.length = 0;
  const result = await getDocFood();
  foodList.push(...result);
  console.log('food', foodList)
  isLoading.value = false;
}

// 寫入food 文件
const addToFood = async () => {
  const timeStamp = Math.floor(new Date() / 1000);
  const para = {
    id: timeStamp,
    name: name.value,
    seats: seats.value
  }
  await addToArray({ para });
}


const submit = () => {
  if (name.value == "" || seats.value == "") {
    Swal.fire({
      title: '不能空白!',
      confirmButtonText: '確認',
      confirmButtonColor: '#3B82F6'
    });
  } else {
    addToFood();
    getFood();
    // clear input
    name.value = "";
    seats.value = "";
  }
}

const removeItem = async (item) => {
  await removeFromArray(item);
  await getFood();
}

// 在組件掛載後讀取資料
onMounted(async () => {
  await getAllDocsTest02();
  await getFood();
});
</script>
<template>
  <div class="max-w-xl mx-auto p-6">
    <h1 class="mb-4">口袋餐廳 (集合的名稱:test02)</h1>
    <div v-if="isLoaing" class="absolute inset-0 flex items-center justify-center">
      <span class="loading loading-ring loading-lg"></span>
    </div>
    <div class="grid grid-cols-12 gap-2 items-end">
      <div class="col-span-5">
        <label for="name"><small class="text-gray-400">餐廳名稱</small></label>
        <input id="name" type="text" placeholder="輸入餐廳名稱" v-model="name">
      </div>
      <div class="col-span-5">
        <label for="seat"><small class="text-gray-400">座位數量</small></label>
        <input id="seat" type="text" placeholder="輸入總共座位" v-model="seats">
      </div>
      <div class="col-span-2">
        <button @click="submit" class="p-2 bg-blue-500 rounded-md text-white hover:bg-blue-400">加入口袋</button>
      </div>
    </div>

    <div class="py-4">
      <h2 class="p-2 font-bold text-center">口袋餐廳 & 座位數量</h2>
      <div v-for="item in foodList" :key="item.id"
        class="grid grid-cols-4 gap-2 mb-2 border hover:bg-amber-200 rounded-md items-center group">
        <div class="col-span-2 p-2">
          <small>餐廳</small>
          <br />
          <strong class="text-blue-500">{{ item.name }}</strong>
        </div>
        <div class="col-span-1 p-2">
          <small>座位數量</small>
          <br />
          <strong class="text-blue-500">{{ item.seats }}</strong>
        </div>
        <div class="col-span-1 p-2 text-right">
          <button type="button" @click="removeItem(item)"
            class="text-red-200 group-hover:text-red-500 hover:bg-white rounded-full px-2 pt-1 pb-0">
            <i class="ri-delete-bin-line text-lg"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="sass" scoped>
  input
    @apply border border-gray-300 mr-2 p-1 rounded-md
  
</style>

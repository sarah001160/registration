<script setup>
import Swal from 'sweetalert2';

const props = defineProps({
  list: {
    type: Array, // 資料
    default: () => ([]),
  },
  doc: { // 要寫入的文件是哪一支
    type: String,
    required: true,
  }
})
const emit = defineEmits(['addNewItem', 'updateItem']);

const { list, doc } = props;
const mode = ref('read'); // read 閱讀、edit 編輯
const currentItem = ref({}); // 當前被選擇的項目
const content = ref(null); // 閱讀-應備文件內容
const currentName = ref(''); // 閱讀-當前項目
// 新增
const addNewTitle = ref(''); // 標題
const addNewContent = ref(''); // 內容

// 編輯
const modalTitle = ref(''); // 標題
let modalContent = ref([]); // 內容

const selectItem = (n) => {
  if (n) {
    currentItem.value = n;
    currentName.value = n?.title;
    content.value = n?.items
  }

}
// 打開燈箱-新增
const openAddNewModal = () => {
  add_modal.showModal();
}
// 送出新增-emit傳出去
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
    doc: doc,
    para: {
      id: timeStamp,
      title: addNewTitle.value,
      items: tempArr,
    }
  }
  // 將參數傳出去
  emit('addNewItem', config);
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
    doc: doc, // 文件名稱
    para: {
      id: id,
      title: modalTitle.value, // 編輯的標題
      items: modalContent.value, // 編輯的內容
    }
  }
  // 參數傳出去
  emit('updateItem', config)
  mode.value = 'read'
  selectItem(config.para)

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

watch(list, (newList) => {
  if (newList.length > 0) {
    currentItem.value = newList[0];
    selectItem(list[0]);
  }
}, { deep: true, immediate: true });

onMounted(() => {
  selectItem(list[0]);
  currentItem.value = list[0]
})
</script>
<template>
  <div class="p-4">
    <div class="max-w-7xl mx-auto grid grid-cols-12 gap-4 h-auto">
      <!--左區-->
      <div class="col-span-3 bg-gray-100 border rounded-md px-2 max-h-screen">
        <div class="flex items-end w-full p-3 pl-4 justify-between border-b-2">
          <small class="block text-grey-100">項目({{ list.length }})</small>
          <a href="#" @click.prevent="openAddNewModal"
            class="block w-6 h-6  text-center rounded-full transition-all hover:bg-blue-200">
            <i class="ri-add-fill"></i>
          </a>
        </div>
        <div class="h-[90vh] overflow-y-auto p-2">
          <div v-for="(n, index) in list" :key="index">
            <div class=" hover:text-blue-500 text-sm">
              <a class="cursor-pointer block rounded-md w-full p-2 mb-1"
                :class="{ 'bg-blue-100': currentItem == list[index] }" @click="selectItem(n)">{{
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
          <div class="flex-0" v-if="currentItem">
            <div class="tooltip tooltip-primary mr-2" data-tip="複製">
              <button class="btn p-1.5 w-10 h-10">
                <i class="ri-file-copy-2-line"></i>
              </button>
            </div>
            <div class="tooltip" data-tip="編輯" @click="handleEdit">
              <button class="btn p-1.5 w-10 h-10">
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

    <!-- 燈箱:新增 -->
    <dialog id="add_modal" class="modal">
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
            <button class="btn">取消</button>
            <button class="btn btn-primary" @click="addNewItem">新增</button>
          </form>
        </div>
      </div>
    </dialog>
  </div>
</template>
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

//test
const companyActions = reactive([
  {
    id: 1,
    name: "發起設立",
    requiredItems: [
      "1. 申請書(委託會計師或律師代理者，應另檢附委託書一份委託)",
      "2. 其他機關核准函影本(外人投資應附投資審議委員投資核准函、資金審定函；大陸地區人民、法人、團體、其他機構或其於第三地區投資之公司【備註】",
      "3. 公司章程影本",
      "4. 發起人會議事錄影本",
      "5. 董事會議事錄(或董事同意書)影本影本",
      "6. 發起人名冊影本",
      "7. 董監事身分證明文件影本",
      "8. 董監事願任同意書影本（董事長應加填一份董事長願任同意書）",
      "9. 發起人身分證明文件影本",
      "10. 建物所有權人同意書影本及所有權證明文件影本(公司登記所在地之建物所有權人出具之同意書，應載明同意提供使用之公司名稱；建物為公司所自有者或檢附租賃契約影本，免附同意書。)",
      "11. 會計師資本額查核報告書",
      "12. 設立登記表二份",
      "13. 登記費：按其實收資本額每新臺幣四千元一元計算，而未達一千元者，以一千元計收 備註"
    ]
  },
  { id: 2, name: "募集設立" },
  { id: 3, name: "公司名稱變更" },
  { id: 4, name: "修正章程" },
  { id: 5, name: "公司所營事業變更" },
  { id: 6, name: "改選董監事" },
  { id: 7, name: "改選董事長、副董事長、常務董事" },
  { id: 8, name: "補選董監事" },
  { id: 9, name: "董監事解任" },
  { id: 10, name: "法人股東改派代表人為董監事" },
  { id: 11, name: "重整人、重整監督人登記" },
  { id: 12, name: "董監事、臨時管理人、重整人、重整監督人姓名、地址變更" },
  { id: 13, name: "公司所在地變更：a.相同縣市 b.不同縣市" },
  { id: 14, name: "經理人委任" },
  { id: 15, name: "經理人解任" },
  { id: 16, name: "經理人、分公司經理人姓名、地址變更" },
  { id: 17, name: "分公司設立" },
  { id: 18, name: "分公司經理人變更" },
  { id: 19, name: "分公司名稱變更" },
  { id: 20, name: "分公司所在地變更" },
  { id: 21, name: "分公司廢止" },
  { id: 22, name: "停業" },
  { id: 23, name: "復業" },
  { id: 24, name: "延展開業" },
  { id: 25, name: "增資、發行新股" },
  { id: 26, name: "可轉換公司債換發新股" },
  { id: 27, name: "減資" },
  { id: 28, name: "分割新設" },
  { id: 29, name: "吸收分割發行新股" },
  { id: 30, name: "分割減資" },
  { id: 31, name: "分割消滅" },
  { id: 32, name: "合併新設" },
  { id: 33, name: "合併存續" },
  { id: 34, name: "合併解散" },
  { id: 35, name: "解散" },
  { id: 36, name: "裁定解散" },
  { id: 37, name: "股份交換發行新股" },
  { id: 38, name: "股份轉換發行新股" },
  { id: 39, name: "收購發行新股" },
  { id: 40, name: "股份轉換新設" }
]);
const listStyle = ref('card'); // card、list列表

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
  // 組參數
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

const openModal = () => {
  details_modal.showModal(); // open the modal using ID.showModal() method
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
      <section class="hidden">
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
      </section>

      <div class="max-w-6xl mx-auto p-4 bg-gray-100 flex justify-start items-center rounded-md mb-2">
        <p class="text-xl font-bold ">公司登記應備文件 ( 股份有限公司 )</p>
        <select name="" id="">
          <option value="1">股份有限公司</option>
          <option value="2">有限公司</option>
        </select>
      </div>
      <div class="max-w-6xl mx-auto grid grid-cols-12 gap-4">
        <div class="col-span-2 bg-gray-100 border rounded-md p-4">
          資料來源
          <div>
            <a href="https://gcis.nat.gov.tw/mainNew/subclassNAction.do?method=getFile&pk=54&sub=3" target="_blank"
              class="flex items-center mb-2 text-blue-500 hover:font-bold">
              <i class="ri-links-fill"></i>
              <small>全國商工行政服務入口網</small></a>
          </div>
          感覺，右邊的所有列表放這邊比較好。右邊直接看應備文件內容+備註訊息!
          這樣就不用開燈箱了?
        </div>
        <div class="col-span-10">
          <section class="max-w-6xl mx-auto rounded-md">
            <!-- 切換卡片/列表 -->
            <div class="w-full flex justify-end mb-2">
              <div class="border rounded-md w-fit flex p-0 h-10 bg-white">
                <a href="#" @click.prevent="listStyle = 'card'" class="flex items-center px-3"
                  :class="{ 'bg-blue-100': listStyle == 'card' }">
                  <i class="ri-square-line"></i>
                </a>
                <a href="#" @click.prevent="listStyle = 'list'" class="flex items-center px-3"
                  :class="{ 'bg-blue-100': listStyle == 'list' }">
                  <i class="ri-list-check"></i>
                </a>
              </div>
            </div>

            <div v-if="listStyle == 'card'" class="grid grid-cols-3 gap-4">
              <div v-for="n in companyActions"
                class="bg-white shadow-md m-1 rounded-md hover:shadow-lg hover:text-blue-500">
                <div class="grid grid-cols-5 w-full h-full">
                  <div class="col-span-4 mb-2 font-bold p-4">
                    <h2>{{ n.id }}.{{ n.name }}</h2>
                  </div>
                  <div class="col-span-1 p-0">
                    <a href="#"
                      class="flex bg-gray-100 justify-center items-center w-full h-full rounded-md hover:bg-gray-200"
                      @click.prevent="openModal">
                      <i class="ri-book-open-line"></i>
                    </a>
                  </div>
                </div>

              </div>
            </div>
            <div v-else-if="listStyle == 'list'" class="flex flex-col p-4 leading-relaxed">
              <div v-for="n in companyActions">
                <p>{{ n.id }}.{{ n.name }}</p>
                <p v-for="f in n.requiredItems">{{ f }}</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>

    <!-- 燈箱 modal -->
    <dialog id="details_modal" class="modal">
      <div class="modal-box max-w-5xl">
        <form method="dialog">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <h3 class="text-lg font-bold">Hello!</h3>
        <div>
          <!--內容太多 用scroll?-->
          <p class="py-4">Press ESC key or click on ✕ button to close</p>
          <p>這裡會放詳細的應備文件Lorem ipsum dolor sit amet consectetur adipisicing elit. Id doloremque veritatis, consectetur
            voluptas voluptatum facilis illo aspernatur sunt cum porro? Voluptatibus, illum provident est architecto
            ipsa soluta asperiores ut quas?
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, dolores ea unde nesciunt suscipit ratione vero
            aperiit nihil?
          </p>
        </div>
        <div class="modal-action flex justify-center">
          <form method="dialog">
            <button class="btn">關閉</button>
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

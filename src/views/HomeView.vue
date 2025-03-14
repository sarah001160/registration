<script setup>
const linkQuery = ref('');// 關鍵字搜尋

//test
const links = reactive([
  {
    name: '全國商工行政服務入口網',
    url: 'https://gcis.nat.gov.tw/mainNew/index.jsp',
  },
  {
    name: '公司與商業及有限合夥一站式線上申請',
    url: 'https://onestop.nat.gov.tw/oss/web/Show/download_T.do',
  },
  {
    name: '公司依公司法規定公告資訊站',
    url: 'https://serv.gcis.nat.gov.tw/pap/',
  },
  {
    name: '公司負責人及主要股東資訊申報平臺',
    url: 'https://ctp.tdcc.com.tw/decl/auth/login',
  },
  {
    name: '營業項目代碼查詢',
    url: 'https://gcis.nat.gov.tw/cod/browseAction.do?method=browse',
  },
  {
    name: '工商憑證管理中心',
    url: 'https://moeaca.nat.gov.tw/other/index.html',
  },
  {
    name: '金管會-防制洗錢及打擊資恐',
    url: 'https://www.sfb.gov.tw/ch/home.jsp?id=941&parentpath=0%2C8%2C935',
  },
  {
    name: '公開觀測資訊站',
    url: 'https://mopsov.twse.com.tw/mops/web/stapap1',
  },
  {
    name: '經濟部投資審議司',
    url: 'https://www.moea.gov.tw/Mns/dir/home/Home.aspx',
  },
  {
    name: '臺北市商業處',
    url: 'https://www.tcooc.gov.taipei/',
  },
  {
    name: '新北市政府經濟發展局',
    url: 'https://www.economic.ntpc.gov.tw/',
  },
  {
    name: '桃園市政府經濟發展局',
    url: 'https://edb.tycg.gov.tw/',
  },
  {
    name: '臺中市政府經濟發展局',
    url: 'https://www.economic.taichung.gov.tw/16467/Nodelist',
  },
  {
    name: '經濟部中部辦公室',
    url: 'https://www.cto.moea.gov.tw/',
  },
  {
    name: '臺南市政府經濟發展局 ( [民治市政中心]、[永華市政中心: 東區、南區、北區、中西區、仁德區、關廟區、龍崎區、安平區、安南區、永康區、歸仁區])',
    url: 'https://economic.tainan.gov.tw/'
  },
  {
    name: '高雄市政府經濟發展局',
    url: 'https://edbkcg.kcg.gov.tw/',
  },
  {
    name: '中華郵政全球資訊網',
    url: 'https://www.post.gov.tw/post/internet/Group/default.jsp',
  },
  {
    name: '營業據點一覽-平常日延時營業郵局',
    url: 'https://www.post.gov.tw/post/internet/I_location/index.jsp?ID=190102',
  },
  {
    name: '中華郵政-中文地址英譯',
    url: 'https://www.post.gov.tw/post/internet/Postal/index.jsp?ID=207',
  },
  {
    name: '全國法規資料庫',
    url: 'https://law.moj.gov.tw/Index.aspx',
  },
  {
    name: '公司法函釋內容、判決內容查詢',
    url: 'https://gcis.nat.gov.tw/elaw/lawDtlAction.do?method=viewLaw&pk=19',
  }
])
//test
const authortyList = reactive([
  {
    unitName: '經濟部商業發展署',
    service: [
      '1. 外商：分公司登記、辦事處登記',
      '2. 大陸商：許可、分公司登記、辦事處報備 ',
      '3. 實收資本額新臺幣 10 億元以上之本國公司',
      '4. 實收資本額新臺幣 5 億元以上未達 10 億元之公開發行股票之本國公司',
    ],
    address: '臺北市中正區福州街15號',
    phone: '(02)2343-3300',
  },
  {
    unitName: '經濟部商業發展署(南投辦公室)',
    service: [
      '5. 實收資本額未達新臺幣 5 億元其所在地在直轄市轄區或特區外之本國公司 (例如: 基隆、新竹、苗栗、彰化、南投、雲林、嘉義、屏東、宜蘭、花蓮、臺東等轄區) ',
      '6. 實收資本額新臺幣 5 億元以上未達 10 億元之「非公開發行」股票之本國公司 ',
    ],
    address: '南投市省府路4號(南投辦公區)',
    phone: '(049)235-9171',
  },
  {
    unitName: '臺北市政府（商業處） ',
    service: [
      '實收資本額未達新臺幣 5 億元其所在地在「臺北市」轄區內之本國公司',
    ],
    address: '臺北市市府路1號 ',
    phone: '(02)27596019',
  },
  {
    unitName: '新北市政府（經濟發展局）',
    service: [
      '實收資本額未達新臺幣 5 億元其所在地在「新北市」轄區內之本國公司',
    ],
    address: '新北市板橋區中山路1段161號',
    phone: '(02)29603456 轉 5401~5403',
  },
  {
    unitName: '桃園市政府（經濟發展局）',
    service: [
      '實收資本額未達新臺幣 5 億元其所在地在「桃園市」轄區內之本國公司',
    ],
    address: '桃園市桃園區縣府路1號',
    phone: '(03)3322101 轉 5165~5168 ',
  },
  {
    unitName: '臺中市政府（經濟發展局）',
    service: [
      '實收資本額未達新臺幣 5 億元其所在地在「臺中市」轄區內之本國公司',
    ],
    address: '臺中市西屯區臺灣大道三段99號 ',
    phone: '(04)22289111 轉 31368~31380',
  },
  {
    unitName: '臺南市政府（經濟發展局）- 永華市政中心',
    service: [
      '實收資本額未達新臺幣 5 億元其所在地在「臺南市」轄區內之本國公司',
      '建議請撥打電話確認，永華市政中心轄區範圍: 東區、南區、北區、中西區、仁德區、關廟區、龍崎區、安平區、安南區、永康區、歸仁區'
    ],
    address: '臺南市安平區永華路2段6號 （永華市政中心）',
    phone: '(06)2991111',
  },
  {
    unitName: '臺南市政府（經濟發展局）- 民治市政中心',
    service: [
      '實收資本額未達新臺幣 5 億元其所在地在「臺南市」轄區內之本國公司',
      '建議請撥打電話確認轄區範圍'
    ],
    address: '臺南市新營區民治路36號（民治市政中心）',
    phone: '(06)6322231',
  },

])

// 關鍵字搜尋常用連結
const filteredLinks = computed(() => {
  // 關鍵字
  const text = linkQuery.value?.trim().toLowerCase();
  // 篩選
  if (text !== '') {
    return links.filter(item => item.name.toLowerCase().includes(text));
  } else {
    return links;
  }
})

const openMap = (address) => {
  const googleMapUrl = "https://www.google.com/maps?q=" + encodeURIComponent(address);
  window.open(googleMapUrl, "_blank");
}

</script>
<template>
  <div class="p-2">
    <div class="w-full lg:max-w-7xl mx-auto relative">
      <div class="titleArea h-40 bg-primary rounded-md mb-4 flex justify-center items-center">
        <h1 class="text-2xl font-bold text-white">辦理公司登記常用之連結</h1>
      </div>
      <!-- 常用連結區塊 -->
      <section class="p-8 mb-10 rounded-md overflow-y-auto bg-accent">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <h2 class="text-xl text-primary font-bold mb-4">👉 常用連結</h2>
          <label class="input input-bordered flex items-center mb-1">
            <input type="text" placeholder="搜尋常用連結" v-model="linkQuery" />
          </label>
        </div>
        <div class="grid grid-cols-4 gap-2 p-4 lg:p-0 max-h-[50vh] overflow-y-auto">
          <div v-if="filteredLinks.length !== 0" v-for="(i, index) in filteredLinks" :key="index"
            class="col-span-4 md:col-span-2 lg:col-span-1">
            <a :href="i.url" target="_blank"
              class="block bg-white w-full h-full px-4 py-2 border rounded-md hover:shadow-md hover:font-bold hover:text-warning overflow-hidden">
              <i class="ri-links-fill inline pr-1"></i>
              <p class="text-sm inline">{{ i.name }}</p>
            </a>
          </div>
          <div class="text-gray-500 col-span-12 text-2xl font-bold text-center p-8" v-else>查無資訊 ^_^ /</div>
        </div>
      </section>
      <!-- 主管機關區塊 -->
      <section class="p-8 mb-10 rounded-md overflow-y-auto bg-accent shadow-sm">
        <div class="flex flex-col md:flex-row mb-4">
          <h2 class="md:flex-1 text-xl text-primary font-bold">👉 受理公司登記之服務機關 </h2>
          <p class="md:text-right">資料來源:
            <a href="https://serv.gcis.nat.gov.tw/crm/faqAction.do?method=faqDetlDetl&id=560"
              class="text-blue-500 hover:text-blue-500 hover:underline" target="_blank">
              全國商工服務行政入口網
            </a>
          </p>
        </div>

        <div>
          <div class="grid grid-cols-12 gap-8">
            <div v-for="item in authortyList"
              class="group col-span-12 md:col-span-6 border rounded-md p-6 bg-white hover:shadow-lg hover:border-blue-600">
              <h3 class="text-xl font-bold p-2 mb-2 group-hover:text-blue-600">{{ item.unitName }}</h3>
              <div class="p-2 border rounded-md">
                <div class="flex flex-col md:flex-row w-full">
                  <div class="font-bold card rounded-box grid md:w-1/2 md:min-h-20 p-4 flex-grow place-items-center">
                    <a href="#" class="hover:text-warning" @click.prevent="openMap(item.address)">
                      <p>{{ item.address }}<i class="ri-map-pin-fill"></i>
                      </p>
                    </a>
                  </div>
                  <div class="divider md:divider-horizontal my-0"></div>
                  <div class="font-bold card rounded-box grid md:w-1/2 md:min-h-20 p-4 flex-grow place-items-center">
                    <p>{{ item.phone }}</p>
                  </div>
                </div>
              </div>
              <div class="p-2">
                <p class="badge badge-ghost p-2 mb-1">受理範圍</p>
                <ul class="pl-6 list-disc">
                  <li v-for="s in item.service">{{ s }}</li>
                </ul>
              </div>
            </div>
          </div>

        </div>

      </section>
    </div>
  </div>
</template>
<style lang="sass" scoped>

</style>

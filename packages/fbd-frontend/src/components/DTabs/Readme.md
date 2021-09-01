# DTabs 使用方法

## 如何使用?

在該頁將元件引入

import DTabs from '@/components/DTabs'

components: {
  DTabs
}

本元件使用slot來顯示內容

v-model:activeKey 與 @change 擇一即可, 兩者同時使用也行

在結構部分使用:

slotContentBool = false, 使用方式

<d-tabs v-if="yourArray.length > 0" v-model:activeKey="yourTabIndex" :tab-list="yourArray" @change="yourFunctionName">
  <template #content>
    /** 顯示內容 */
  </template>
</d-tabs>

參考頁面 => components/LoginRegister/Login

slotContentBool = true, 使用方式

<d-tabs v-if="yourArray.length > 0" v-model:activeKey="yourTabIndex" :tab-list="yourArray" :slotContentBool="true" @change="yourFunctionName">
  <template #[`content${yourTabIndex}`]>
    /** 顯示內容 */
  </template>
</d-tabs>

參考頁面 => components/_pages/index/Leaderborad/LeaderboardData

## 資料

tabList 類型為 Array

基本範例

yourArr: [
  {
    label: '我是tab',
  }
]

想禁用某個tab, 範例如下

yourArr: [
  {
    label: '我是tab',
    disabled: true
  },
  {
    label: '我是tab',
  },
]

## 回調

@change="yourFunctionName"

const yourFunctionName = (val) => {
  // event
}

OR

v-model:activeKey="yourTabIndex"

## 後續

目前為 version 2, 重構之前結構

困境為塞入過多頁簽會導致行為不正常

動態效果及諸多細節無法與市面上套件相比

需要花時間調整和迭代.
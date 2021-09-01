# DCountdown 使用方法

## 如何使用?

在該頁將元件引入

import DCountdown from '@/components/DCountdown'

components: {
  DCountdown
}

在結構部分使用

<div>
  <div v-text="倒数时间">
  <d-countdown :sec="300"/>
</div>

參考頁面 => components/LoginRegister/ValidateRegister

## 資料

sec 類型為 Number

## 後續

純粹顯示秒數, 配合各種場合使用

如果想 refresh 讓秒數重新計算, 可以使用 :isSecRefresh="true"
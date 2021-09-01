# DHeaderRow 使用方法

## 如何使用?

在該頁將元件引入

import DHeaderRow from '@/components/DHeaderRow'

components: {
  DHeaderRow
}

## 簡易介紹

DHeaderRow主要分成三個區塊，左邊、中間、右邊。
┌───────────────┬───────────────┬───────────────┐
│      Left     │     Middle    │     Right     │
└───────────────┴───────────────┴───────────────┘
如果是比較多頁會共用到的按鈕，如最常見的回上一頁，如有需要可自行新增一個小組件放在DHeaderRow的資料夾裡，然後在DHeaderRow的components要加入動態引入組件的語法，可直接參考index.vue裡的寫法，此外，一定也會遇到Header上要自己額外寫的樣式，這種情況可以使用slot插入，在DHeaderRow內有做判斷，若其中一個位置有插入slot，那個位置的components就不會出現。

## 資料

# leftComponents 類型為 String

預設為GoBack。

# middleComponents 類型為 String

預設為Title。

# rightComponents 類型為 String

預設為None。

# title 類型為 String

預設為空字串，如果有使用Title的components的話，會以此字串當標題。

# leftPos 類型為 String

預設為flex-start，為Header左方區塊的內容要排列的位置配置設定。
語法與justify-content相同。

# middlePos 類型為 String

預設為center，為Header中間區塊的內容要排列的位置配置設定。
語法與justify-content相同。

# rightPos 類型為 String

預設為flex-end，為Header右方區塊的內容要排列的位置配置設定。
語法與justify-content相同。
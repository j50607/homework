# DSearchList 使用方法

## 如何使用?

在該頁將元件引入

import DSearchList from '@/components/DSearchList'

components: {
  DSearchList
}

## 資料

# list 類型為 Array

基本範例

list: [
  { title: 'Title', desc: 'Description', img: 'icon/quick-FB.svg' },
  { title: 'Title', desc: 'Description', img: 'icon/quick-FB.svg' },
  { title: 'Title', desc: 'Description', img: 'icon/quick-FB.svg' },
],

img是使用$requireSafe，所以路徑不要多寫'@/assets/img'

# listMaxHeight 類型為 Number

預設為550，會影響overflow。

# placeholder 類型為 String

預設為'搜尋'，搜尋列的placeholder。

# searchEnabled 類型為 Boolean

預設為True，若給False的話，上面搜尋列不出現。

# showTitle 類型為 Boolean

預設為True，若給False的話，Title不出現。

# titleFontSize 類型為 Number

預設為14。

# titleColor 類型為 String

預設為#080D20。

# showDesc 類型為 Boolean

預設為True，若給False的話，Desc不出現。

# descFontSize 類型為 Number

預設為12。

# descColor 類型為 String

預設為#080D20。

# showScript 類型為 Boolean

預設為false。

# scriptFontSize 類型為 Number

預設為12。

# scriptColor 類型為 String

預設為#AFAFAF。

# descColor 類型為 String

預設為#080D20。

# tickHeight 類型為 Number

預設為15，會影響被選中欄位勾勾的高度。

# localImg 類型為 Boolean

是否使用$requireSafe。

## 回調

@change="yourMethods"

const yourMethods = (val) => {
  // event
}
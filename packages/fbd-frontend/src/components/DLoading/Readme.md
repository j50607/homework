# DLoading 使用方法

## 如何使用?

在該頁將元件引入並加在該頁最上方或最外層，在API還沒有回Response或是頁面正在Loading的時候做使用。

import DLoading from '@/components/DLoading';

components: {
  DLoading
}

## 資料

# loading 類型為 Boolean

預設為False，若給True的話，Loading動畫顯示。

# size 類型為 Number

預設為36、會影響動畫的大小。

# text 類型為 String

預設為空字串，若有賦值，則會在動畫下方出現。

Example: <d-loading :loading="true" :text="'Loading...'"/>

# color 類型為 String

預設為#080D20，可改變動畫顏色。

# delay 類型為 Number

預設為200(毫秒)，怕api很快回Response造成動畫閃爍問題，所以可以由此值控制setTimeout的秒數。
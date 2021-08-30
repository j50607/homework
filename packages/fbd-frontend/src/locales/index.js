// 多國語系
import { createI18n } from 'vue-i18n'; // 引入vue-i18n组件
import Cookie from 'js-cookie';
import zhCN from './lang/zh_cn';
import zhTW from './lang/zh_tw';
import viVN from './lang/vi_vn';
import thTH from './lang/th_th';
import jaJP from './lang/ja_jp';
import enUS from './lang/en_us';

// import { 引入的组件 export 出来的 变量} from 'vue-i18n'
// 注册i8n实例并引入语言文件
const i18n = createI18n({
  locale: Cookie.get('language') || 'zh_cn', // 默认显示的语言
  messages: {
    zh_cn: zhCN, // 引入语言文件
    zh_tw: zhTW,
    vi_vn: viVN,
    th_th: thTH,
    ja_jp: jaJP,
    en_us: enUS,
  },
});
export default i18n; // 将i18n暴露出去，在main.js中引入挂载

// 參考原文連結：https://blog.csdn.net/j123450/article/details/111996152

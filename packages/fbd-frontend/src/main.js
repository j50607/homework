import { createApp } from 'vue';
import { pipe } from '@/assets/js/utils/utils';
import useAntUI from '@/plugins/ant-ui';
import directive from '@/plugins/directive';
import useDyUI from '@/plugins/dy-ui';
import useI18n from '@/plugins/i18n';
import useMitt from '@/plugins/mitt';
import useCookie from '@/plugins/cookie';
import useRequireSafe from '@/plugins/requireSafe';
import App from './App.vue';
import router from './router';
import store from './store';
import 'ant-design-vue/dist/antd.less';
import './assets/tailwind.css';
import '@/assets/scss/all.scss';

const app = pipe(
  useAntUI,
  useDyUI,
  useI18n,
  useMitt,
  useCookie,
  useRequireSafe,
  directive,
)(createApp(App));

window.$vue = app.use(store).use(router).mount('#app');

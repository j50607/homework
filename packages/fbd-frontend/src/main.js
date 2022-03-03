import { createApp } from 'vue';
import { pipe } from '@/assets/js/utils/utils';
import useAntUI from '@/plugins/ant-ui';
import directive from '@/plugins/directive';
import useI18n from '@/plugins/i18n';
import useMitt from '@/plugins/mitt';
import useRamda from '@/plugins/ramda';
import useCookie from '@/plugins/cookie';
import useRequireSafe from '@/plugins/requireSafe';
import App from './App.vue';
import router from './router';
import store from './store';
import 'ant-design-vue/dist/antd.less';
import './assets/tailwind.css';

const app = pipe(
  useAntUI,
  useI18n,
  useMitt,
  useRamda,
  useCookie,
  useRequireSafe,
  directive,
)(createApp(App));

window.$vue = app.use(store).use(router).mount('#app');

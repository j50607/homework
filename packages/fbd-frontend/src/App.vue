<template>
  <component
    :is="$route.meta.layout || 'div'"
    style="height: 100%;"
  >
    <router-view />
  </component>
</template>

<script>
import {
  ref, reactive, getCurrentInstance, provide, onMounted, onUnmounted, computed, onBeforeMount, nextTick,
} from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { pipe, andThen } from '@/assets/js/utils/utils';
import SystemApi from '@/assets/js/api/systemApi';
import MemberApi from '@/assets/js/api/memberApi';
import Stylesheet from '@/assets/js/stylesheet';
import clientModeEnum from '@/assets/enum/clientModeEnum';

export default {
  setup() {
    // use
    const store = useStore();
    const router = useRouter();
    store.commit('SET_SITE_INFO', window._jsvar?.siteId);

    const internalInstance = getCurrentInstance();
    const { emitter } = internalInstance.appContext.config.globalProperties;

    // ref
    const $validator = ref(undefined);

    // reactive
    const state = reactive({
      clientMode: {},
      clientModeEnum,
    });

    // computed
    const defaultLocale = computed(() => store.state.info.language);
    const site = computed(() => store.state.info.siteInfo);
    const siteName = computed(() => store.state.info.siteInfo.name);
    const userToken = computed(() => store.state.user.token);
    const siteStyle = computed(() => store.state.info.siteStyle);

    document.title = `Welcome to ${siteName.value}`;
    // methods
    /**
     * 將 camelCase 轉成 `--${kebab-case}`，再把 css variables 寫入 rootStyle
     */
    const setCssVars = (styleSheet = {}) => {
      if (!Object.keys(styleSheet)?.length) return;
      const rootStyle = document.documentElement.style;
      Object.entries(styleSheet).forEach((item) => {
        const key = item[0];
        const value = item[1];
        const keyName = key.split('').map((char) => (/[A-Z]/.test(char) ? `-${char.toLowerCase()}` : char));
        rootStyle.setProperty(`--${keyName.join('')}`, value[siteStyle.value]);
      });
    };
    const createCssVars = () => {
      const styleSheet = Stylesheet.getMainTheme();
      setCssVars(styleSheet);
    };
    /**
     * 取得验证器
     */
    const getValidator = async () => {
      let validator;
      switch (defaultLocale.value) {
        default:
          validator = await import('@/assets/js/validator/zh-CN');
      }
      const V = validator.default;
      $validator.value = new V();
    };

    const getInitUserInfo = async (token) => {
      let userInfo = {};
      if (token) {
        const { code, data, message } = await MemberApi.getUserInfoInit();

        if (code === 200) {
          userInfo = data;
        } else {
          window.$vue.$message.info(message);
        }
      }
      return userInfo;
    };

    const setInitUserInfo = (userInfo) => {
      if (userInfo) {
        store.commit('SET_LOGIN_INFO', userInfo);
      }
    };

    const initUserInfo = pipe(
      getInitUserInfo,
      andThen(setInitUserInfo),
    );

    const getSystemConfig = async () => {
      const { code, data } = await SystemApi.getSystemConfig();

      if (code === 200 && data) {
        store.commit('SET_SYSTEM_CONFIG', data);
        getValidator();
      }
    };

    const checkSite = () => {
      const { head } = document;

      const removeMeta1 = document.getElementsByTagName('meta')['apple-mobile-web-app-title'];
      const removeMeta2 = document.getElementsByTagName('meta')['og:title'];
      const removeMeta3 = document.getElementsByTagName('meta')['og:site_name'];
      const removeManifest = document.querySelector('link[rel="manifest"]');

      if (removeMeta1) removeMeta1.remove();
      if (removeMeta2) removeMeta2.remove();
      if (removeMeta3) removeMeta3.remove();
      if (removeManifest) removeManifest.remove();

      let metaArr = [];
      let linkArr = [];

      const stationName = site.value.prefix;
      const description = `Welcome to ${site.value.name}`;

      let manifest = {};
      const manifestName = `${site.value.prefix}-Web`;

      metaArr = [
        { name: 'apple-mobile-web-app-title', content: manifestName },
        { name: 'og:title', content: manifestName },
        { name: 'og:site_name', content: manifestName },
        { name: 'description', content: description },
        { name: 'og:description', content: description },
      ];

      linkArr = [
        { rel: 'icon', type: 'image/x-icon' },
        { rel: 'shortcut icon' },
        { rel: 'apple-touch-icon' },
        { rel: 'manifest' },
        /** iPhone 12 Pro Max(1284px x 2778px)* */
        {
          rel: 'apple-touch-startup-image',
          media: '(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3)',
          type: 'image/x-icon',
          href: `/launch/${stationName}/apple-launch-1284x2778.png`,
        },
        /** iPhone 12 Pro (1170px x 2532px)* */
        {
          rel: 'apple-touch-startup-image',
          media: '(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3)',
          type: 'image/x-icon',
          href: `/launch/${stationName}/apple-launch-1170x2532.png`,
        },
        /** iPhone Xs Max (1242px x 2688px)* */
        {
          rel: 'apple-touch-startup-image',
          media: '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)',
          type: 'image/x-icon',
          href: `/launch/${stationName}/apple-launch-1242x2688.png`,
        },
        /** iPhone Xr (828px x 1792px)* */
        {
          rel: 'apple-touch-startup-image',
          media: '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)',
          type: 'image/x-icon',
          href: `/launch/${stationName}/apple-launch-828x1792.png`,
        },
        /** iPhone X, Xs (1125px x 2436px)* */
        {
          rel: 'apple-touch-startup-image',
          media: '(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)',
          type: 'image/x-icon',
          href: `/launch/${stationName}/apple-launch-1125x2436.png`,
        },
        /** iPhone 8 Plus, 7 Plus, 6s Plus, 6 Plus (1242px x 2208px)* */
        {
          rel: 'apple-touch-startup-image',
          media: '(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3)',
          type: 'image/x-icon',
          href: `/launch/${stationName}/apple-launch-1242x2208.png`,
        },
        /** iPhone 8, 7, 6s, 6 (750px x 1334px)* */
        {
          rel: 'apple-touch-startup-image',
          media: '(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)',
          type: 'image/x-icon',
          href: `/launch/${stationName}/apple-launch-750x1334.png`,
        },
        /** iPhone 5, SE (640px x 1136px)* */
        {
          rel: 'apple-touch-startup-image',
          media: '(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)',
          type: 'image/x-icon',
          href: `/launch/${stationName}/apple-launch-640x1136.png`,
        },
        /** iPad Pro 12.9" (2048px x 2732px)* */
        {
          rel: 'apple-touch-startup-image',
          media: '(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)',
          type: 'image/x-icon',
          href: `/launch/${stationName}/apple-launch-2048x2732.png`,
        },
        /** iPad Pro 11” (1668px x 2388px)* */
        {
          rel: 'apple-touch-startup-image',
          media: '(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)',
          type: 'image/x-icon',
          href: `/launch/${stationName}/apple-launch-1668x2388.png`,
        },
        /** iPad Pro 10.5" (1668px x 2224px)* */
        {
          rel: 'apple-touch-startup-image',
          media: '(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)',
          type: 'image/x-icon',
          href: `/launch/${stationName}/apple-launch-1668x2224.png`,
        },
        /** iPad Mini, Air (1536px x 2048px)* */
        {
          rel: 'apple-touch-startup-image',
          media: '(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)',
          type: 'image/x-icon',
          href: `/launch/${stationName}/apple-launch-1536x2048.png`,
        },
      ];

      metaArr.forEach((e) => {
        const meta = document.createElement('meta');
        if (e.name && e.content) {
          meta.name = e.name;
          meta.content = e.content;
        }
        head.appendChild(meta);
      });

      const pwaIcons = [48, 72, 96, 120, 144, 152, 168, 192].map((size) => ({
        src: `/site/${stationName}/${stationName}-${size}.png`,
        sizes: `${size}x${size}`,
        type: 'image/png',
      }));

      manifest = {
        name: manifestName,
        short_name: manifestName,
        display: 'fullscreen',
        // start_url: '/',
        theme_color: '#11b086',
        background_color: '#fff',
        lang: 'th',
        // icons: pwaIcons,
      };

      const manifestJSON = JSON.stringify(manifest);
      const blob = new Blob([manifestJSON], { type: 'application/json' });
      const manifestURL = URL.createObjectURL(blob);

      linkArr.forEach((e) => {
        const link = document.createElement('link');
        if (e.rel) {
          if (e.rel === 'shortcut icon') {
            link.rel = 'shortcut icon';
            link.href = pwaIcons[0].src;
          } else if (e.rel === 'icon') {
            link.rel = 'icon';
            link.href = `/site/${stationName}/favicon.ico`;
          } else if (e.rel === 'apple-touch-icon') {
            link.rel = 'apple-touch-icon';
            link.href = pwaIcons[7].src;
            link.sizes = pwaIcons[7].sizes;
          } else if (e.rel === 'manifest') {
            link.rel = 'manifest';
            link.href = `${manifestURL}`;
          }
        }
        head.appendChild(link);
      });
    };

    const setLocale = () => {
      store.commit('SET_LOCALE', { lang: window._jsvar?.siteLocale });
    };

    const setSiteStyle = () => {
      store.commit('SET_SITE_STYLE', window._jsvar?.siteStyle || 1);
    };

    // provide
    provide('$validator', $validator);
    provide('$clientMode', () => state.clientMode);

    // hooks
    onBeforeMount(async () => {
      checkSite();
      setLocale();
      setSiteStyle();
      createCssVars();

      // 不加 nextTick 的話，在此時 vue instance 尚未掛到 window.$vue 上
      await nextTick();
      getSystemConfig();
      initUserInfo(userToken.value);
    });

    onMounted(() => {
      if (window.innerWidth <= 992) {
        state.clientMode = clientModeEnum.MOBILE;
      } else {
        state.clientMode = clientModeEnum.PC;
      }

      window.onresize = () => {
        if (window.innerWidth <= 992) {
          state.clientMode = clientModeEnum.MOBILE;
        } else {
          state.clientMode = clientModeEnum.PC;
        }
      };
    });

    onUnmounted(() => {
      emitter.all.clear();
    });

    router.beforeEach((to, from) => {
      if (from) {
        store.commit('SET_PREV_PAGE', from.name);
      } else {
        store.commit('SET_PREV_PAGE', 'index');
      }
    });

    return {
    };
  },
};
</script>

<style lang="scss">
#app {
  height: 100%;
  background-attachment: fixed;
}
</style>

<template>
  <div
    v-if="hasQuickLogin()"
    class="quick-login"
  >
    <div
      class="quick-text"
      :class="`style${siteStyle}`"
    >
      <span>{{ $t('components_quick_login_text') }}</span>
    </div>

    <div class="quick-login-area">
      <div
        v-if="registerSetting.loginViaZalo"
        class="quick-login-item is-btn"
        @click="openThirdParty('zalo')"
      >
        <div class="item-image">
          <img
            :src="require('@/assets/img/icon/quick-zalo.svg')"
            alt="zalo"
          >
        </div>
      </div>

      <div
        v-if="registerSetting.loginViaFB"
        class="quick-login-item is-btn"
        @click="openThirdParty('facebook')"
      >
        <div class="item-image">
          <img
            :src="require('@/assets/img/icon/quick-FB.svg')"
            alt="FB"
          >
        </div>
      </div>

      <div
        v-if="registerSetting.loginViaQQ"
        class="quick-login-item is-btn"
        @click="openThirdParty('qq')"
      >
        <div class="item-image">
          <img
            :src="require('@/assets/img/icon/quick-QQ.svg')"
            alt="qq"
          >
        </div>
      </div>

      <div
        v-if="registerSetting.loginViaGoogle"
        class="quick-login-item is-btn"
        @click="openThirdParty('google')"
      >
        <div class="item-image">
          <img
            :src="require('@/assets/img/icon/quick-Google.svg')"
            alt="Google"
          >
        </div>
      </div>

      <div
        v-if="registerSetting.loginViaLine"
        class="quick-login-item is-btn"
        @click="openThirdParty('line')"
      >
        <div class="item-image">
          <img
            :src="require('@/assets/img/icon/quick-LINE.svg')"
            alt="LINE"
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  ref, computed, onMounted, onUnmounted,
} from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import memberApi from '@/assets/js/api/memberApi';

export default {
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  emits: ['thirdPartyLogin'],
  setup(props, { emit }) {
    // ref
    const thirdPartyWindow = ref(undefined);

    // use
    const store = useStore();
    const route = useRoute();
    const { t } = useI18n();

    // computed
    const registerSetting = computed(() => store.state.info.registerSetting);
    const thirdPartySetting = computed(() => store.state.info.thirdPartySetting);
    const language = computed(() => store.state.info.language);
    const agentCode = computed(() => store.state.user.agentCode);
    const siteStyle = computed(() => store.getters.siteStyle);

    // methods
    const openThirdParty = (tag) => {
      let id = '';

      const {
        fbLoginInfo, googleLoginInfo, lineLoginInfo, zaloLoginInfo, qqLoginInfo,
      } = thirdPartySetting.value || {};

      switch (tag) {
        case 'zalo':
          id = zaloLoginInfo?.id;
          break;
        case 'google':
          id = googleLoginInfo?.webLoginId;
          break;
        case 'facebook':
          id = fbLoginInfo?.id;
          break;
        case 'line':
          id = lineLoginInfo?.id;
          break;
        case 'qq':
          id = qqLoginInfo?.id;
          break;
        default:
          break;
      }

      if (!id) return;

      const top = (window.screen.availHeight - 30 - 600) / 2;
      const left = (window.screen.availWidth - 10 - 450) / 2;

      const url = `${process.env.VUE_APP_THIRD_PARTY_LOGIN_URL}?platform=${tag}&id=${id}&top=${top}&left=${left}&lang=${language.value}`;

      thirdPartyWindow.value = window.open(url);
    };

    /**
     * 第三方登陆
     */
    const thirdPartyLogin = async (token, type, lineRedirectUri) => {
      const { c } = route.query;

      window.$vue.$message.info(t('components_quick_login_success'));

      const { code, data, message } = await memberApi.thirdPartyLogin({
        token,
        type,
        lineRedirectUri,
        agentCode: agentCode.value || c,
      });
      if (code === 200) {
        store.commit('SET_TOKEN', data);
        emit('thirdPartyLogin');
      } else {
        window.$vue.$message.info(message);
      }
      // toast.clear();
    };

    /**
     * Line/Zalo 弹窗传递code
     */
    const getSocialCode = async (item) => {
      if (!item.data.code) return;

      let lineRedirectUri;
      if (item.data.type === 'LINE') {
        lineRedirectUri = process.env.VUE_APP_THIRD_PARTY_LOGIN_URL;
        const endIdx = lineRedirectUri.length - 1;
        const endStr = lineRedirectUri[endIdx];
        if (endStr === '/') {
          lineRedirectUri = lineRedirectUri.split('').filter((str, idx) => idx !== endIdx).join('');
        }
      }
      await thirdPartyLogin(item.data.code, item.data.type, lineRedirectUri);
      if (thirdPartyWindow.value) thirdPartyWindow.value.close();
    };

    const hasQuickLogin = () => {
      let arr = [];

      arr = [registerSetting.value.loginViaZalo, registerSetting.value.loginViaGoogle, registerSetting.value.loginViaFB, registerSetting.value.loginViaLine, registerSetting.value.loginViaQQ];

      return arr.some((item) => item);
    };

    onMounted(() => {
      window.addEventListener('message', getSocialCode);
    });

    onUnmounted(() => {
      window.addEventListener('message', getSocialCode);
    });

    return {
      thirdPartyWindow,
      openThirdParty,
      registerSetting,
      hasQuickLogin,
      thirdPartySetting,
      getSocialCode,
      thirdPartyLogin,
      siteStyle,
    };
  },
};
</script>

<style lang="scss" scoped>
.quick-login {
  width: 100%;
  color: #4d5772;
  font-size: 12px;
  text-align: center;

  .quick-text {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 30px;

    &.style2 {
      color: #fff;
    }
  }

  .quick-login-area {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 1rem 0;

    .quick-login-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 62px;

      .item-image {
        width: 40px;
        height: 40px;

        img {
          width: 100%;
        }
      }
    }
  }
}
</style>

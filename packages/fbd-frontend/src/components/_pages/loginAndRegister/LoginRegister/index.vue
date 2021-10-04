<template>
  <locale
    v-slot="{ locale }"
    class="login-register"
    :class="`style${siteStyle}`"
  >
    <div
      class="login-box-title"
      :class="locale"
    >
      <div
        class="title-image is-btn"
        :class="locale"
      >
        <img
          :src="$requireSafe(`site/${sitePrefix}/logo-white.svg`)"
          class="logo"
          :alt="sitePrefix"
        >
      </div>
    </div>

    <component
      v-model:value="componentBool"
      :is="componentType"
      :data="state.rowData"
      :validate-code-flag="validateCodeFlag"
      @validateCodeFlag="validateFlag"
      @login="login"
      @register="register"
    />

    <div class="welcome">
      <div class="go-where">
        <d-button
          type="primary"
          block
          class="go-where-text"
          @click="inLoginOrRegister('login')"
        >
          {{ $t('components_pages_loginAndRegister_loginRegister_login') }}
        </d-button>
        <d-button
          type="primary"
          block
          class="go-where-text border-style"
          :class="`style${siteStyle}-color`"
          @click="inLoginOrRegister('register')"
        >
          {{ $t('components_pages_loginAndRegister_loginRegister_register_new_user') }}
        </d-button>
      </div>

      <quick-login />
    </div>

    <!-- <service-modal v-model:value="serviceVisible" /> -->
  </locale>
</template>

<script>
import {
  ref, onMounted, reactive, computed, onBeforeMount,
} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';
import { pipe, andThen } from '@/assets/js/utils/utils';
import Login from '@/components/_pages/loginAndRegister/LoginRegister/Login';
import Register from '@/components/_pages/loginAndRegister/LoginRegister/Register';
// import ValidateRegister from '@/components/_pages/loginAndRegister/ValidateRegister';
// import ServiceModal from '@/components/_pages/loginAndRegister/ServiceModal';
import MemberApi from '@/assets/js/api/memberApi';
import Locale from '@/components/Locale';
import QuickLogin from '@/components/_pages/loginAndRegister/QuickLogin';

export default {
  components: {
    Login,
    Register,
    // ValidateRegister,
    // ServiceModal,
    Locale,
    QuickLogin,
  },
  setup() {
    // i18n
    const { t } = useI18n();

    // ref
    const loginOrRegister = ref(undefined);
    const serviceVisible = ref(false);
    const protocolVisible = ref(false);
    const regType = ref('');
    const validateText = ref('');
    const agentCode = ref(undefined);

    const validateCodeFlag = ref(false);

    const componentBool = ref(false);
    const componentType = ref(undefined);

    // reactive
    const state = reactive({
      rowData: {},
    });

    // use
    const route = useRoute();
    const router = useRouter();
    const store = useStore();

    // computed
    const siteStyle = computed(() => store.getters.siteStyle);
    const isLogin = computed(() => store.state.user.isLogin);
    const sitePrefix = computed(() => store.state.info.siteInfo.prefix);
    const exchangeInfoList = computed(() => store.state.exchange.exchangeInfoList.filter((e) => e.showNavigation));
    const s3Base = computed(() => process.env.VUE_APP_BASE_CDN_URL);

    // methods
    const setLocalStorage = (key) => window.localStorage.setItem('loginOrRegister', key);

    const getLocalStorage = () => window.localStorage.getItem('loginOrRegister');

    const openServiceModal = () => {
      serviceVisible.value = true;
    };

    const openProtocol = () => {
      protocolVisible.value = true;
    };

    const validateFlag = () => {
      validateCodeFlag.value = false;
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

    const inLoginOrRegister = (type) => {
      componentType.value = type;
      componentBool.value = true;
    };

    const refreshLoginOrRegister = () => {
      const { params } = route;

      if (agentCode.value) {
        loginOrRegister.value = 'register';
        return;
      }

      if (params.type) {
        loginOrRegister.value = route.params.type;
        setLocalStorage(route.params.type);
      } else if (getLocalStorage()) {
        loginOrRegister.value = getLocalStorage();
      } else {
        loginOrRegister.value = 'login';
      }
    };

    /**
     * 用戶初始化資料
     * @param { String } token - 令牌
     */
    const userInfoInit = async (token) => {
      const { code, data, message } = await MemberApi.getUserInfoInit();

      if (code === 200) {
        const info = data;

        if (info) {
          store.commit('SET_LOGIN_INFO', {
            id: info.id,
            token,
            agentId: info.agentId,
            agentType: info.agentType,
            superiorAccount: info.superiorAccount,
            superior: info.superior,
            account: info.account,
            vipLevel: info.vipLevel,
            nickName: info.nickName,
            phone: info.phone,
            balance: info.balance,
            avatar: info.avatar,
            name: info.name,
            birthday: info.birthday,
            gender: info.gender,
            agentCode: info.agentCode,
            lotteryBetAgentRate: info.lotteryBetAgentRate,
            traceCount: info.traceCount,
            accountGroup: info.accountGroup,
            withdrawalCode: info.withdrawalCode,
          });
        }
      } else {
        window.$vue.$message.info(message);
      }
    };

    /**
     * 登录
     * @param { Object } formState - 登录资料
     */
    const login = async (formState, randomKey, rememberAccountBool) => {
      const { code, data, message } = await MemberApi.login({
        account: formState.mainInputValue,
        password: formState.passwordInputValue,
        authCode: formState.validateInputValue,
        authCodeKey: randomKey,
      });
      if (code === 200) {
        let lastAccount = '';
        lastAccount = rememberAccountBool ? formState.mainInputValue : '';
        window.localStorage.setItem('lastAccount', lastAccount);

        window.$vue.$message.success(t('components_pages_loginAndRegister_loginRegister_index_loginSuccess'));
        await userInfoInit(data);
        router.push('/');
      } else if (code === 403) {
        window.$vue.$message.info(message);
      } else if (code === 400) {
        validateCodeFlag.value = true;
      }
    };

    /**
     * 注册 || 验证注册
     * @param { Obejct } fromState - 注册资料
     * @param { String } registerType - 注册型别
     * @param { Number } zoneNum - 国码
     */
    const register = async ({
      formState, registerType, validateNumber, validateBool,
    }) => {
      const info = {
        password: formState.passwordInputValue,
        checkPassword: formState.checkPasswordInputValue,
        name: formState.realNameInputValue,
        nickName: formState.nicknameInputValue,
        phone: formState.phoneInputValue,
        email: formState.emailInputValue,
        qqAccount: formState.qqInputValue,
        weChat: formState.weixinInputValue,
        birthday: formState.birthdayInputValue,
        gender: formState.genderInputValue,
        line: formState.lineInputValue,
        whatsApp: formState.whatsappInputValue,
        zalo: formState.zaloInputValue,
        registerType: registerType.value,
        authCodeKey: validateNumber,
        agentCode: formState.recommendedPersonInputValue,
      };

      switch (registerType.value) {
        case 'ACCOUNT':
          info.account = formState.mainInputValue;
          break;
        default:
          break;
      }

      state.rowData = formState;
      regType.value = registerType;

      if (validateBool) {
        const { code } = await MemberApi.registerValidate(info);

        if (code === 200) {
          loginOrRegister.value = 'validateRegister';
          setLocalStorage('validateRegister');
        }
      } else {
        const { code, data } = await MemberApi.register(info);

        if (code === 200) {
          window.$vue.$message.info(t('components_pages_loginAndRegister_loginRegister_index_registerSuccess'));
          store.commit('SET_TOKEN', data.access_token);
          store.commit('SET_IS_LOGIN', true);
          router.push('/');
          initUserInfo(data);
          window.localStorage.removeItem('coundownEndTime');
        }
      }
    };

    /**
     * 取得第三方登入资讯
     */
    const getThirdPartyInfo = async () => {
      const { code, data } = await MemberApi.getThirdPartyInfo();
      if (code === 200) {
        store.commit('SET_THIRD_PARTY_SETTING', data);
      }
    };

    const getAgentCode = () => {
      const queryC = route.query?.c;
      agentCode.value = queryC;
    };

    onBeforeMount(() => {
      getAgentCode();
    });

    // hooks
    onMounted(async () => {
      getThirdPartyInfo();
      refreshLoginOrRegister();
    });

    return {
      state,
      serviceVisible,
      protocolVisible,
      openServiceModal,
      openProtocol,
      loginOrRegister,
      inLoginOrRegister,
      refreshLoginOrRegister,
      setLocalStorage,
      getLocalStorage,
      getThirdPartyInfo,
      login,
      register,
      userInfoInit,
      regType,
      validateText,
      isLogin,
      agentCode,
      exchangeInfoList,
      s3Base,
      validateCodeFlag,
      validateFlag,
      sitePrefix,
      componentType,
      componentBool,
      siteStyle,
    };
  },
};
</script>

<style lang="scss" scoped>
.login-register {
  display: flex;
  flex: 1 0 0%;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 30px;
  color: #333;
  font-size: 0.875rem;

  &.style2 {
    background: transparent linear-gradient(180deg, #fff0 0%, #374e7b4f 80%, #ffb83d 140%);
  }
}

.login-box-title {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 40px;
  padding-top: 32px;

  .title-image {
    width: 168px;
    height: 92px;
    // background-repeat: no-repeat;
    // background-position: center;
    // background-size: 100%;

    .logo {
      width: 100%;
      height: 100%;
    }
  }
}

.version {
  // margin: auto 0 30px;
  color: #fff;
}

.friend-site {
  width: 100%;
  margin-top: 20px;
  padding: 0 16px;
  color: #fff;
  text-align: center;

  .title {
    margin-bottom: 20px;
    font-size: 14px;
  }

  .site {
    display: flex;
    flex-wrap: wrap;

    &-link {
      display: flex;
      flex: 0 0 25%;
      flex-direction: column;
      align-items: center;
      margin-bottom: 20px;
      overflow: hidden;
      color: #333;
      font-size: 12px;

      .site-logo {
        width: 42px;
        height: 42px;
        margin-bottom: 13px;
        opacity: 0.8;
        transform: translateZ(0);
      }

      &:hover {
        cursor: pointer;

        .site-logo {
          opacity: 1;
        }
      }

      &:active {
        .site-logo {
          opacity: 0.9;
        }
      }
    }
  }
}

.welcome {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 20rem;
  border-radius: 18px;

  .go-where {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;

    .go-where-text {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 245px;
      height: 40px;
      margin-bottom: 1rem;
      border-radius: 50px;
      font-size: 1rem;

      &:hover {
        filter: brightness(1.05);
      }

      &:active {
        filter: brightness(1.15);
      }

      &.style2-color {
        border: 1px solid #ffb83d !important;
        color: #fff !important;
        background: #ffb83d4d !important;
      }
    }
  }
}

.border-style {
  border: 1px solid #7a5605 !important;
  color: #7a5605 !important;
  background: #f9fcffcc !important;
}

.vi_vn {
  .welcome {
    width: 90%;
  }
}
</style>

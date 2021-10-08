import Cookie from 'js-cookie';
import SiteEnum from '@/assets/enum/siteEnum';
import SystemApi from '@/assets/js/api/systemApi';

// system config上次更新时间, 若是离上次不久才更新, 就会自动ignore
let lastUpdatedTime;
let cacheDataLocked = false;

const langMap = {
  zh_cn: 'zh_cn',
  zh_tw: 'zh_tw',
  vi_vn: 'vi_vn',
  th_th: 'th_th',
  ja_jp: 'ja_jp',
  en_us: 'en_us',
};

const initialState = () => ({
  selectedCoinObj: {},
  selectedCoinIdx: undefined,
  selectedPayment: {},
  siteInfo: {},
  rechargeAmount: 0,
  depositChannelArr: [],
  depositInfo: {},
  frontendTitle: {},
  commissionSetting: {},
  timeSetting: {},
  switchSetting: {},
  registerSetting: {},
  depositAccountExtends: {},
  socialMediaSetting: {},
  appSetting: {},
  withdrawSettings: {},
  frontDeskInfoSetting: {},
  bankCardSetting: {},

  androidUrl: '',
  iosUrl: '',
  serviceUrl: '',
  sharedUrl: '',

  language: '',
  languageChanged: false,

  siteId: 0,
  apiBool: false,

  // call systemConfig前先拿版本资料
  systemVersion: undefined,

  // 第三方
  thirdPartySetting: {},

  // 验证开关
  swipeVerification: false,

  // 會員轉帳資訊
  transferInfo: {},
});

const state = () => (initialState());

const mutations = {

  SET_DEPOSIT_CHANNEL_ARR(state, value) {
    state.depositChannelArr = value;
  },
  SET_SELECTED_COIN(state, value) {
    state.selectedCoinObj = value;
  },
  SET_SELECTED_COIN_IDX(state, value) {
    state.selectedCoinIdx = value;
  },
  SET_SELECTED_PAYMENT(state, value) {
    state.selectedPayment = value;
  },
  SET_RECHARGE_AMOUNT(state, value) {
    state.rechargeAmount = value;
  },

  SET_DEPOSIT_INFO(state, value) {
    state.depositInfo = value;
  },
  SET_THIRD_PARTY_SETTING(state, value) {
    state.thirdPartySetting = value;
  },
  SET_IS_JUMPOVER_FIRST_PAGE(state, value) {
    state.jumpOverFirstPage = value;
  },
  SET_SITE_INFO(state, value) {
    if (value) {
      state.siteId = value;
      const allSite = Object.values(SiteEnum);
      allSite.some((site) => {
        const ids = site.getIds();
        if (ids && Array.isArray(ids) && ids.includes(state.siteId)) {
          state.siteInfo = site;
          return true;
        }

        if (site.name === 'default') {
          state.siteInfo = site;
          return true;
        }
        return false;
      });
    }
  },
  SET_LOCALE(state, { lang }) {
    // 使用者是否手動變更過語言(開啟過網站)
    const langChanged = window.localStorage.getItem('hasLangChanged');
    // cookie 裡存的語言
    const langToken = Cookie.get('language');

    state.language = langToken || langMap[lang];
    if (!langChanged || !langToken) {
      Cookie.set('language', state.language);
      window.localStorage.setItem('hasLangChanged', true);
    }
  },
  SET_SYSTEM_CONFIG(state, {
    frontendTitle,
    commissionSetting,
    timeSetting,
    switchSetting,
    registerSetting,
    depositAccountExtends,
    socialMediaSetting,
    appSetting,
    withdrawSettings,
    frontDeskInfoSetting,
    bankCardSetting,
    serviceUrl,
    androidUrl,
    iosUrl,
    sharedUrl,
    swipeVerification,
  }) {
    // frontendTitle data
    state.frontendTitle = frontendTitle;
    // commissionSetting data
    state.commissionSetting = commissionSetting;
    // timeSetting data
    state.timeSetting = timeSetting;
    // switchSetting data
    state.switchSetting = switchSetting;
    // swipeVerification
    state.swipeVerification = swipeVerification;

    // registerSetting data
    if (registerSetting) {
      let registerObj = {};
      const {
        fixedLotteryCommissionRatio,
        imAppRegisterSwitch,
        immediatelyGenerateAgentCode,
        loginViaFB,
        loginViaGoogle,
        loginViaLine,
        loginViaZalo,
        registerAgentCode,
        registerBirthday,
        registerEmail,
        registerGender,
        registerLine,
        registerNickname,
        registerQQ,
        registerRealName,
        registerTel,
        registerWechat,
        registerZalo,
        registerWhatsApp,
        showAgentCode,
        showBirthday,
        showEmail,
        showGender,
        showLine,
        showNickname,
        showQQ,
        showRealName,
        showTel,
        showWechat,
        showZalo,
        showWhatsApp,
      } = registerSetting;

      registerObj = {
        fixedLotteryCommissionRatio,
        imAppRegisterSwitch,
        immediatelyGenerateAgentCode,
        loginViaFB,
        loginViaGoogle,
        loginViaLine,
        loginViaZalo,
        registerAgentCode,
        registerBirthday,
        registerEmail,
        registerGender,
        registerLine,
        registerNickname,
        registerQQ,
        registerRealName,
        registerTel,
        registerWechat,
        registerZalo,
        registerWhatsApp,
        showAgentCode,
        showBirthday,
        showEmail,
        showGender,
        showLine,
        showNickname,
        showQQ,
        showRealName,
        showTel,
        showWechat,
        showZalo,
        showWhatsApp,
      };
      state.registerSetting = registerObj;
    }
    if (depositAccountExtends) {
      let depositAccountObj = {};
      const {
        showRemark, showBankExtendName, bankExtendName, showExtendName, requireExtendName, extendName,
        showUploadCertificate, requireUploadCertificate, showApplicantBank, requireApplicantBank, showUsdtExtendName, usdtExtendName, requireUsdtExtendName, depositTeachingLink,
      } = depositAccountExtends;

      depositAccountObj = {
        showRemark,
        showBankExtendName,
        bankExtendName,
        showExtendName,
        requireExtendName,
        extendName,
        showUploadCertificate,
        requireUploadCertificate,
        showApplicantBank,
        requireApplicantBank,
        showUsdtExtendName,
        usdtExtendName,
        requireUsdtExtendName,
        depositTeachingLink,
      };
      state.depositAccountExtends = depositAccountObj;
    }
    // socialMediaSetting data
    if (socialMediaSetting) {
      let socialMediaSettingObj = {};
      const {
        telegram, facebook, whatsApp, line, serviceQQ, zalo,
      } = socialMediaSetting;

      socialMediaSettingObj = {
        telegram,
        facebook,
        whatsApp,
        line,
        serviceQQ,
        zalo,
      };
      state.socialMediaSetting = socialMediaSettingObj;
    }
    // appSetting data
    if (appSetting) {
      let appSettingObj = {};
      const {
        gameAppUrl, webAppUrl, gameAppTFUrl, gameAppAndroidUrl, webAppTFUrl, webAppAndroidUrl, pageStyle,
      } = appSetting;

      appSettingObj = {
        gameAppUrl,
        webAppUrl,
        gameAppTFUrl,
        gameAppAndroidUrl,
        webAppTFUrl,
        webAppAndroidUrl,
        pageStyle,
      };
      state.appSetting = appSettingObj;
    }
    // withdrawSettings data
    if (withdrawSettings) {
      state.withdrawSettings = withdrawSettings;
    }
    // frontDeskInfoSetting data
    if (frontDeskInfoSetting) {
      let frontDeskInfoObj = {};
      const {
        locale, frontDeskFilmMobile, saveTime,
      } = frontDeskInfoSetting;

      frontDeskInfoObj = {
        locale,
        frontDeskFilmMobile,
        saveTime,
      };
      state.frontDeskInfoSetting = frontDeskInfoObj;
    }
    // bankCardSetting data
    if (bankCardSetting) {
      let bankCardSettingObj = {};
      const { bankCardMax } = bankCardSetting;

      bankCardSettingObj = { bankCardMax };
      state.bankCardSetting = bankCardSettingObj;
    }
    state.androidUrl = androidUrl;
    state.iosUrl = iosUrl;
    state.serviceUrl = serviceUrl;
    state.sharedUrl = sharedUrl;
  },
  SET_API_BOOL(state, value) {
    state.apiBool = value;
  },
  SET_VERSION(state, value) {
    state.systemVersion = value;
  },
  SET_TRANSFER_INFO(state, value) {
    state.transferInfo = value;
  },
};

const actions = {
  async renewSystemConfig({ commit }) {
    if (cacheDataLocked) {
      return new Promise((resolve) => {
        const checkData = () => {
          setTimeout(() => {
            if (window.$nuxt.$store.state.info.frontDeskInfoSetting.locale) {
              resolve(true);
            } else {
              checkData();
            }
          }, 200);
        };
        checkData();
      });
    }
    cacheDataLocked = true;
    if (!lastUpdatedTime || (+new Date() - lastUpdatedTime > 60 * 1000)) {
      const res = await SystemApi.getSystemConfig();
      if (res.code === 200) {
        commit('SET_SYSTEM_CONFIG', res.data);
        lastUpdatedTime = +new Date();
      }
    }
    cacheDataLocked = false;
    return false;
  },
};

const getters = {
  siteStyle: () => window?._jsvar?.siteStyle || 1,
};

export default {
  state,
  mutations,
  actions,
  getters,
};

import {
  ref, onMounted, computed, reactive, watch,
} from 'vue';
import NP from 'number-precision';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';
import QRCode from 'qrcode';
import systemApi from '@/assets/js/api/systemApi';
import memberApi from '@/assets/js/api/memberApi';

export default function () {
  const myselfPersecnt = ref(0);
  const agentDomain = ref('');
  const sharelink = ref('www.google.com');
  const hierarchy = ref('');
  const common = ref('');
  const qrCode = ref(undefined);
  const editMode = ref(false);
  const showShareInfo = ref(false);
  const loadingBool = ref(false);

  const state = reactive({
    info: {
      show: true,
      sliderShow: false,
      status: undefined,
      agentCode: undefined,
    },

    amountCommission: {
      lotteryAmount: 0,
      platformAmount: 0,
      sportAmount: 0,
      totalAmount: 0,
    },

    lottery: {
      myPercent: 0,
      friendPercent: 0,
    },

    origin: {
      lotteryPercent: 0,
      gamePercent: 0,
    },
  });

  const store = useStore();
  const { t } = useI18n();

  // computed
  const checkMyselfNP = computed(() => NP.round(Number(state.lottery.myPercent), 1));
  const checkFriendsNP = computed(() => NP.round(Number(state.lottery.friendPercent), 1));
  const sharedUrl = computed(() => store.state.info.sharedUrl);
  const showEditBtn = computed(() => state.info.status === 'SET');
  const canEdit = computed(() => (!editMode.value && state.info.status === 'UNSET') || (editMode.value && state.info.status === 'SET'));
  const checkEditBtn = computed(() => editMode.value && state.info.status === 'SET');
  const account = computed(() => store.state.user.account);
  const storeLanguage = computed(() => store.state.info.language);
  const siteStyle = computed(() => store.getters.siteStyle);

  // watch
  watch(() => myselfPersecnt.value, (value) => {
    if (String(value).includes('.') && value.length < 3) return;

    if (Number(value) > state.origin.lotteryPercent) {
      myselfPersecnt.value = state.origin.lotteryPercent;
      state.lottery.myPercent = state.origin.lotteryPercent;
      state.lottery.friendPercent = (state.origin.lotteryPercent - Number(value));
    } else {
      myselfPersecnt.value = Number(value);
      state.lottery.myPercent = Number(value);
      state.lottery.friendPercent = (state.origin.lotteryPercent - Number(value));
    }
  });

  // methods
  const handleReSetting = () => {
    editMode.value = true;
  };

  const openInfo = () => {
    showShareInfo.value = true;
  };

  /**
   * url显示限制
   */
  const limitUrl = (url) => {
    // const vm = this;
    if (url !== undefined && url.length > 45) {
      const urlLimit = url.substr(0, 45);
      return `${urlLimit}...`;
    }
    return url;
  };

  const reducePersenct = () => {
    if (state.lottery.myPercent > 0.1) {
      Math.floor(state.lottery.myPercent -= 0.1);
      Math.floor(state.lottery.friendPercent += 0.1);
      myselfPersecnt.value = checkMyselfNP.value;
    }
  };

  const increasePersecnt = () => {
    if (state.lottery.myPercent < state.origin.lotteryPercent) {
      state.lottery.myPercent = NP.plus(state.lottery.myPercent, 0.1);
      Math.floor(state.lottery.friendPercent -= 0.1);
      myselfPersecnt.value = checkMyselfNP.value;
    }
  };

  const getSystemConfig = async () => {
    const { code, data } = await systemApi.getSystemConfig();
    if (code === 200 && data) {
      const {
        hierarchyCommissionRatio,
        platformCommissionMode,
      } = data.commissionSetting;

      hierarchy.value = hierarchyCommissionRatio;
      common.value = platformCommissionMode;

      store.commit('SET_SYSTEM_CONFIG', data);
    }
  };

  /**
   * 取得返点金额
   */
  const getAgentCommission = async () => {
    const { code, data } = await memberApi.getAgentCommission(true);
    if (code === 200) {
      const amountData = data || {};

      const { lottery, platform, sport } = amountData;

      if (lottery.length > 0) {
        state.amountCommission.lotteryAmount = lottery.reduce((acc, item) => NP.plus(acc, NP.times(NP.divide(NP.minus(item.agentRate, item.childAgentRate), 2000), item.amount)), 0);
      } else {
        state.amountCommission.lotteryAmount = 0;
      }
      if (platform.length > 0) {
        state.amountCommission.platformAmount = platform.reduce((acc, item) => NP.plus(acc, NP.times(NP.minus(item.agentRate, item.childAgentRate), item.amount)), 0);
      } else {
        state.amountCommission.platformAmount = 0;
      }

      if (sport.length > 0) {
        state.amountCommission.sportAmount = sport.reduce((acc, item) => NP.plus(acc, NP.times(NP.divide(NP.minus(item.agentRate, item.childAgentRate), 2000), item.amount)), 0);
      } else {
        state.amountCommission.sportAmount = 0;
      }

      state.amountCommission.totalAmount = NP.plus(state.amountCommission.lotteryAmount, state.amountCommission.platformAmount, state.amountCommission.sportAmount);
    }
  };

  /**
   * 取得返点设定状态
   */
  const getAgentSetting = async () => {
    const { code, data } = await memberApi.getAgentSetting();
    if (code === 200) {
      const agentData = data;

      state.info.status = agentData.status;
      state.info.agentCode = agentData.agentCode;

      const options = {
        margin: 1,
        errorCorrectionLevel: 'L',
      };

      const imgUrl = await QRCode.toDataURL(`${sharedUrl.value}?a=x&c=${state.info.agentCode}`, options);
      qrCode.value = imgUrl;

      state.origin.lotteryPercent = NP.times(agentData.info.lotteryAgentCommissionRate, 100);

      state.lottery.myPercent = state.origin.lotteryPercent;

      state.lottery.friendPercent = NP.times(agentData.info.lotteryChildAgentCommissionRate || 0, 100);

      if (state.info.status === 'SET' || state.info.status === 'SET_REACH_LIMIT') {
        state.lottery.myPercent = NP.minus(state.origin.lotteryPercent, state.lottery.friendPercent);
      }
    }
  };

  /**
   * 设定返点代理比例
   */
  const setAgentSetting = async () => {
    const { code, message } = await memberApi.setAgentSetting({
      lotteryChildAgentCommissionrate: NP.divide(checkFriendsNP.value, 100),
      platformGameChildAgentCommissionrate: 0,
    });
    if (code === 200) {
      getAgentSetting();
      window.$vue.$message.success(t('error47'));
    } else {
      window.$vue.$message.error(message);
    }
  };

  const handleAgent = async () => {
    await setAgentSetting();
  };

  /**
   * 领取金额
   */
  const receiveAmount = async () => {
    if (state.info.sliderShow) {
      window.$vue.$message.error(t('error48'));
      return;
    }

    if (state.amountCommission.totalAmount > 0) {
      const res = await memberApi.getAgentDraw();
      if (res.code === 200) {
        window.$vue.$message.success(t('error49'));
        await getAgentCommission();
      } else {
        window.$vue.$message.error(t('error50'));
      }
    } else {
      window.$vue.$message.error(t('error51'));
    }
  };

  /**
   * 取得自身代理域名
   */
  const getAccountSiteAgentDomain = async () => {
    const { code, data } = await systemApi.getAccountSiteAgentDomain(account.value);
    if (code === 200 && data) {
      agentDomain.value = data.dnsName;
    }
  };

  const checkSiteStyle = () => `style${siteStyle.value}`;

  const checkHeaderTextColor = () => {
    switch (siteStyle.value) {
      case 1:
        return '#1F2022';
      case 2:
        return '#FFFFFF';
      default:
        return '#1F2022';
    }
  };

  const checkStyleColor = () => {
    switch (siteStyle.value) {
      case 1:
        return 'black';
      case 2:
        return 'white';
      default:
        return 'black';
    }
  };

  onMounted(async () => {
    loadingBool.value = true;
    await getAccountSiteAgentDomain();
    await getSystemConfig();
    await getAgentCommission();
    await getAgentSetting();
    loadingBool.value = false;

    myselfPersecnt.value = checkMyselfNP.value;
  });

  return {
    handleAgent,
    handleReSetting,
    reducePersenct,
    increasePersecnt,
    myselfPersecnt,
    checkMyselfNP,
    checkFriendsNP,
    sharelink,
    openInfo,
    hierarchy,
    common,
    state,
    receiveAmount,
    qrCode,
    showEditBtn,
    canEdit,
    editMode,
    checkEditBtn,
    limitUrl,
    showShareInfo,
    sharedUrl,
    agentDomain,
    storeLanguage,
    loadingBool,
    checkSiteStyle,
    checkHeaderTextColor,
    checkStyleColor,
  };
}

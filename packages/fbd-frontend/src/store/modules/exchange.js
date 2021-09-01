import ExchangeApi from '@/assets/js/api/exchangeApi';

const initialState = () => ({
  exchangeList: [],
  // 最后接收到的值(从 api 或 socket)
  exchangeListTemp: [],
  ravageConfig: {},
  exchangeInfoApiBool: false,
  // call getExchangeInfoList前先拿版本资料
  exchangeInfoVersion: undefined,
  exchangeInfoList: [],
  isExchangeInfoLoading: false,
});

const state = () => (initialState());

// 亂數random幣值
let timer;

const randomNum = (list, listTemp) => {
  clearInterval(timer);
  timer = setInterval(() => {
    list.forEach((e) => {
      const realPrice = listTemp?.find((item) => item.source === e.source) || 0;
      if (Math.random() > 0.5) {
        const maxPrice = realPrice * 1.01;
        const result = Number((e.price * 1.00099).toFixed(4));
        e.price = result > maxPrice ? maxPrice : result;
      } else {
        const minPrice = realPrice * 0.99;
        const result = Number((e.price / 1.00099).toFixed(4));
        e.price = result < minPrice ? minPrice : result;
      }
    });
  }, 1000);
};

const mutations = {
  SET_EXCHANGE_LIST(state, value) {
    state.exchangeList = value;
    state.exchangeListTemp = JSON.parse(JSON.stringify(state.exchangeList));
    // 亂數random幣值的interval
    randomNum(state.exchangeList, state.exchangeListTemp);
  },
  SET_EXCHANGE_SINGLE_PRICE(state, value) {
    state.exchangeList.forEach((e) => {
      if (e.source === value.updateSource) {
        e.price = value.updatePrice;
      }
    });
    state.exchangeListTemp = JSON.parse(JSON.stringify(state.exchangeList));
    // 亂數random幣值的interval
    randomNum(state.exchangeList, state.exchangeListTemp);
  },
  SET_RAVAGE_CONFIG(state, obj) {
    Object.keys(obj).forEach((key) => {
      if (obj[key] !== null || obj[key] !== undefined) {
        state.ravageConfig[key] = obj[key];
      }
    });
  },
  SET_EXCHANGE_INFO_API_BOOL(state, value) {
    state.exchangeInfoApiBool = value;
  },
  SET_EXCHANGE_INFO_VERSION(state, value) {
    state.exchangeInfoVersion = value;
  },
  SET_EXCHANGE_INFO_LIST(state, value) {
    state.exchangeInfoList = value;
  },
  SET_IS_EXCHANGE_INFO_LOADING(state, value) {
    state.isExchangeInfoLoading = value;
  },
};

const actions = {
  async getRavageExchangeList({ commit }) {
    const { code, data } = await ExchangeApi.getRavageExchangeList();
    if (!code && !data) {
      clearInterval(timer);
      commit('SET_IS_EXCHANGE_INFO_LOADING', true);
      window.$vue.$message.info(window.$vue.$t('common_errorDisconnectedAndRefresh'));
      return;
    }
    if (code !== 200) return;
    commit('SET_EXCHANGE_LIST', data);
    commit('SET_IS_EXCHANGE_INFO_LOADING', false);
  },
};

export default {
  state,
  mutations,
  actions,
};

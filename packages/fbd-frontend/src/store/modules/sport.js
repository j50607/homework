const initialState = () => ({
  betFailMsg: {
    uuid: '',
    balance: 0,
    betNo: '',
    createdAt: 0,
    updatedAt: 0,
    gameCode: '',
    issueNo: 0,
    siteId: 0,
    userId: 0,
    account: '',
    agentType: '',
    superiorAccount: '',
    payRate: 0,
    playTypeM: 0,
    playTypeS: 0,
    option: 0,
    quantity: 0,
    realAmount: 0,
    unitPrice: 0,
    fee: 0,
    estimateProfit: 0,
    remark: '',
    gameInfo: {},
    gameResult: '',
  },
});

const state = () => (initialState());

const mutations = {
  SET_BET_FAIL_MESSAGE(state, params) {
    Object.keys(params).forEach((key) => {
      state.betFailMsg[key] = params[key];
    });
    const failText = window.$vue.$t('common_betFailMsg');
    window.$vue.$message.error(failText);
  },
};

export default {
  state,
  mutations,
};

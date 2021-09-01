import Cookies from 'js-cookie';

const initialState = () => ({
  isLogin: false,
  id: 0,
  token: Cookies.get('_tianyin_token'),
  // 帳號
  account: undefined,
  agentId: undefined,
  agentType: undefined,
  agentCode: undefined,
  avatar: undefined,
  balance: undefined,
  birthday: undefined,
  gender: undefined,
  lotteryBetAgentRate: undefined,
  phone: undefined,
  traceCount: undefined,
  vipLevel: undefined,
  withdrawalCode: undefined,
  nickName: undefined,
  name: undefined,
  // 是否有提現密碼
  withdrawalCodeSetting: false,
  // 餘額
  amount: undefined,
  // 磚池狀態 NONE | PENDING | ACTIVE | SETTLE | FINISH, - 無計畫 | 未開始 | 執行中 | 結算 | 已結束
  poolStatus: undefined,
  // ??:??:?? - PENDING 時距離開始的時間
  poolTime: undefined,
  // 磚池人數
  poolPeople: undefined,
  // 磚池金額
  poolAmount: undefined,
  // 磚池手續費
  poolCharge: undefined,
  // 磚池執行狀態 NONE | DENY | ENOUGH | INSUFFICIENT | KICKOUT, - 尚無狀態 | 沒有檔次授權 |  本金足夠 | 本金不夠 | 已被剔除
  personStatus: undefined,
  // 用戶本金
  personAmount: undefined,
  // 用戶毛利
  personProfit: undefined,
  // 用戶手續費
  personCharge: undefined,
  // user擁有的檔次id
  levelId: 0,
});

const state = () => (initialState());

const mutations = {
  SET_USER_INFO(state, value) {
    Object.keys(value).forEach((key) => {
      state[key] = value[key];
    });
    state.isLogin = true;
  },
  SET_TOKEN(state, value) {
    state.token = value;
    Cookies.set('_tianyin_token', value, { expires: 365 });
  },
  SET_LOGIN_INFO(state, memberData) {
    Object.keys(memberData).forEach((key) => {
      state[key] = memberData[key];
    });

    state.isLogin = true;
  },
  SET_IS_LOGIN(state, value) {
    state.isLogin = value;
  },
  SET_WITHDRAW_CODE(state, value) {
    state.withdrawalCodeSetting = value;
  },
  CLEAR(state) {
    Cookies.remove('_tianyin_token');

    const initS = initialState();

    Object.keys(initS).forEach((key) => {
      if (key === 'forumConfiguration') return;
      state[key] = initS[key];
    });
  },
};

export default {
  state,
  mutations,
};

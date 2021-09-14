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
  usersLockBalance: undefined,
  birthday: undefined,
  gender: undefined,
  lotteryBetAgentRate: 1800,
  phone: undefined,
  traceCount: undefined,
  vipLevel: undefined,
  withdrawalCode: undefined,
  nickName: undefined,
  name: undefined,
  email: undefined,
  line: undefined,
  qqAccount: undefined,
  wechat: undefined,
  // 是否有提現密碼
  withdrawalCodeSetting: false,
  // 餘額
  amount: undefined,
  transToSub: undefined,
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
  SET_NAME(state, name) {
    state.name = name;
  },
  SET_NICK_NAME(state, nickName) {
    state.nickName = nickName;
  },
  SET_TRACE_COUNT(state, traceCount) {
    state.traceCount = traceCount;
  },
  SET_PHONE(state, phone) {
    state.phone = phone;
  },
  SET_GENDER(state, gender) {
    state.gender = gender;
  },
  SET_BIRTH(state, birth) {
    state.birthday = birth;
  },
  SET_AGENT_CODE(state, value) {
    state.agentCode = value;
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

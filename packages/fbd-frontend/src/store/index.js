import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import info from './modules/info';
import user from './modules/user';
import sport from './modules/sport';
import exchange from './modules/exchange';
import sessionStorgaeInfo from './modules/sessionStorageInfo';

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    info,
    user,
    sessionStorgaeInfo,
    sport,
    exchange,
  },
  plugins: [createPersistedState()],
});

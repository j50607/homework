import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import info from './modules/info';
import user from './modules/user';
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
  },
  plugins: [createPersistedState()],
});

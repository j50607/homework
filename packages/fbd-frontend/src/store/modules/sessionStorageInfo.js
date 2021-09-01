const initialState = () => ({
  prevPage: '',
});

const state = () => (initialState());

const mutations = {
  SET_PREV_PAGE(state, value) {
    state.prevPage = value;
  },
};

export default {
  state,
  mutations,
};

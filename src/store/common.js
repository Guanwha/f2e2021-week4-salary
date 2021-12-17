import { ui } from './types';

/** *** Store UI status */
export default {
  strict: true,
  // namespaced: true,  // option
  state: {
    /** ui */
    isLoading: false,
    loadingMsg: '',
  },
  actions: {
    /** ui */
    startLoading(context, msg) {
      context.commit(ui.SET_LOADING, { status: true, msg });
    },
    endLoading(context) {
      context.commit(ui.SET_LOADING, { status: false });
    },
  },
  mutations: {
    /** ui */
    [ui.SET_LOADING](state, { status, msg }) {
      state.isLoading = status;
      state.loadingMsg = (msg && msg.length > 0) ? msg : '';
    },
  },
  getters: {
    isLoading(state) {
      return state.isLoading;
    },
    loadingMsg(state) {
      return state.loadingMsg;
    },
  },
};

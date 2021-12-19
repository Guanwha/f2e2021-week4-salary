import Vue from 'vue';
import Vuex from 'vuex';
import common from './common';
import salary from './salary';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    common,
    salary,
  },
});

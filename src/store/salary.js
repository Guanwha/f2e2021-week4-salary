// import Axios from 'axios';
// import store from '@/js/store';
// import { logCatch } from '@/utils/message';
// import { axiosThen } from '@/js/utils/net';
// import { checkToken, hasToken } from '@/js/utils/auth';
// import { check } from '@/js/utils/file';
import * as types from './types';
import { genJobTenureVSSalaryChartData } from '@/utils/gen-chart-data';

const jsonFE = require('@/utils/data-frontend.json');
// const jsonUI = require('@/utils/data-ui.json');

/** salary  */
export default {
  strict: true,         // option 嚴格模式
  namespaced: true,     // option
  state: {
    frontend_salaries: {},
    selected_info: {},
  },
  actions: {
    getData(context) {
      return new Promise((resolve, reject) => {
        // console.log(jsonFE);
        try {
          const data = genJobTenureVSSalaryChartData(jsonFE);
          context.commit(types.salary.SET_FE_SALARY, data);
          resolve();
        }
        catch (error) {
          // logCatch('發生錯誤: ', error.getMessage());
          console.log(error);
          reject();
        }
        finally {
          context.dispatch('endLoading', null, { root: true });
        }
      });
    },
    setSelectedInfo(context, payload) {
      context.commit(types.salary.SET_SELECTED_INFO, payload);
    },
  },
  mutations: {
    [types.salary.SET_FE_SALARY](state, data) {
      state.frontend_salaries = { ...data };
    },
    [types.salary.SET_SELECTED_INFO](state, payload) {
      state.selected_info = { ...payload };
    },
  },
  getters: {
    frontendSalaries(state) { return state.frontend_salaries; },
    selectedInfo(state) { return state.selected_info; },
  },
};

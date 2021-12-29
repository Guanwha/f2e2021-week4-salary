import Axios from 'axios';
import { log, logCatch } from '@/utils/message';
import { axiosThen } from '@/utils/net';
// import { checkToken, hasToken } from '@/js/utils/auth';
// import { check } from '@/js/utils/file';
import * as types from './types';
import { genJobTenureSalaryChartData } from '@/utils/gen-chart-data';

// const jsonFE = require('@/utils/data-frontend.json');
// const jsonUI = require('@/utils/data-ui.json');

/** salary  */
export default {
  strict: true,         // option 嚴格模式
  namespaced: true,     // option
  state: {
    frontend_jobtenure_salary_age: {},
    frontend_jobtenure_salary_gender: {},
    frontend_jobtenure_salary_education: {},
    frontend_jobtenure_salary_industry: {},
    ui_jobtenure_salary_age: {},
    ui_jobtenure_salary_gender: {},
    ui_jobtenure_salary_education: {},
    ui_jobtenure_salary_industry: {},
    selected_info: {},
  },
  actions: {
    getData(context, job) {
      return new Promise((resolve, reject) => {
        const config = {
          method: 'get',
          url: (job === 'frontend')
            ? 'https://raw.githubusercontent.com/hexschool/2021-ui-frontend-job/master/frontend_data.json'
            : 'https://raw.githubusercontent.com/hexschool/2021-ui-frontend-job/master/ui_data.json',
        };

        context.dispatch('startLoading', '取得前端工程師薪水統計中...', { root: true });
        Axios(config).then((response) => {
          // console.log('frontend api', response);
          axiosThen(response, () => {
            // success
            let payload = null;
            if (job === 'frontend') {
              payload = genJobTenureSalaryChartData(response.data);
              context.commit(types.salary.SET_FE_SALARY, payload);
            }
            else {
              payload = genJobTenureSalaryChartData(response.data);
              context.commit(types.salary.SET_UI_SALARY, payload);
            }
            log('取得前端工程師薪水統計成功');
            resolve();
          }, () => {
            // failure
            log(`取得前端工程師薪水統計失敗: ${response.data.message}`, true, false, false, true);
            reject();
          }, () => {
            // no response
            log('取得前端工程師薪水統計失敗: 未收到伺服器回應。', true, false, false, true);
            reject();
          });
        }).catch((error) => {
          logCatch('取得前端工程師薪水統計失敗: ', error);
          reject();
        }).finally(() => {
          context.dispatch('endLoading', null, { root: true });
        });
      });
    },
    setSelectedInfo(context, payload) {
      context.commit(types.salary.SET_SELECTED_INFO, payload);
    },
  },
  mutations: {
    [types.salary.SET_FE_SALARY](state, payload) {
      state.frontend_jobtenure_salary_age = { ...payload.age };
      state.frontend_jobtenure_salary_gender = { ...payload.gender };
      state.frontend_jobtenure_salary_education = { ...payload.education };
      state.frontend_jobtenure_salary_industry = { ...payload.industry };
    },
    [types.salary.SET_UI_SALARY](state, payload) {
      state.ui_jobtenure_salary_age = { ...payload.age };
      state.ui_jobtenure_salary_gender = { ...payload.gender };
      state.ui_jobtenure_salary_education = { ...payload.education };
      state.ui_jobtenure_salary_industry = { ...payload.industry };
    },
    [types.salary.SET_SELECTED_INFO](state, payload) {
      state.selected_info = { ...payload };
    },
  },
  getters: {
    frontendSalariesForAge(state) { return state.frontend_jobtenure_salary_age; },
    frontendSalariesForGender(state) { return state.frontend_jobtenure_salary_gender; },
    frontendSalariesForEducation(state) { return state.frontend_jobtenure_salary_education; },
    frontendSalariesForIndustry(state) { return state.frontend_jobtenure_salary_industry; },
    uiSalariesForAge(state) { return state.ui_jobtenure_salary_age; },
    uiSalariesForGender(state) { return state.ui_jobtenure_salary_gender; },
    uiSalariesForEducation(state) { return state.ui_jobtenure_salary_education; },
    uiSalariesForIndustry(state) { return state.ui_jobtenure_salary_industry; },
    selectedInfo(state) { return state.selected_info; },
  },
};

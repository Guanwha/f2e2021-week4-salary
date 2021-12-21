<template>
  <div class="w-full container mx-auto p-2 flex-ctc">
    <!-- title -->
    <h1 class="w-full mt-8 py-4 font-bold text-2xl text-left">年資 vs 年薪</h1>
    <!-- description -->
    <p class="w-full text-left">檢視在不同的年齡、性別、學歷、產業下，前端工程師年資與年薪的關係。</p>
    <!-- control -->
    <div class="w-full flex-rrc">
      <button type="button" class="btn btn-main-outline border-main flex-ccc" @click="resetZoom()">重置縮放</button>
      <Dropdown class="ml-2"
                classPadding="px-4 py-3"
                classBorder="border-main"
                classBgTextColor="btn-main-outline"
                direction="down"
                v-model.number='selectedDataTypeID' :types='types'/>
    </div>
    <!-- chart -->
    <div class="mt-2 w-full h-3/5 bg-white shadow rounded p-4">
      <div class="w-full h-full">
        <canvas id="myChart" class="w-full h-full"></canvas>
      </div>
    </div>
    <!-- message -->
    <div class="mt-8" v-for="(infosets, key) in selectedInfo" :key="key">
      <div>{{ key }}</div>
      <table class="border border-gray-300 gap-1">
        <thead>
          <tr>
            <th>年資</th>
            <th>年薪</th>
            <th>年齡</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(infoset, key) in infosets.data" :key="key">
            <td>{{ infoset.company.job_tenure }}</td>
            <td>{{ infoset.company.salary }}</td>
            <td>{{ infoset.age }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import { mapActions, mapGetters } from 'vuex';
import { chartJobTenureVSSalary, updateDatasets } from '@/utils/chart';
import Dropdown from '@/components/Dropdown.vue';
import { JobTenureSalaryDataTypesDD, JobTenureSalaryDataTypes } from '@/utils/enums';

export default {
  name: 'ChartFrontEnd',
  components: {
    Dropdown,
  },
  data() {
    return {
      canvasDom: null,
      chart: null,

      // dropdown
      types: JobTenureSalaryDataTypesDD,
      selectedDataTypeID: 1,
    };
  },
  watch: {
    selectedDataTypeID() {
      this.debouncedRedrawChart();
    },
  },
  created() {
    this.getData('frontend').then(() => {
      this.canvasDom = document.getElementById('myChart');
      this.chart = chartJobTenureVSSalary(this.canvasDom, this.curDatasets);

      this.debouncedRedrawChart = _.debounce(this.redrawChart, 300);
    }).catch(() => {});
  },
  methods: {
    /**
     * control
     */
    resetZoom() {
      /* eslint no-unused-expressions: ["off"] */
      this.chart?.resetZoom();
    },
    redrawChart() {
      this.chart.data.datasets = updateDatasets(this.curDatasets);
      this.chart.update();
    },

    ...mapActions('salary', ['getData']),
  },
  computed: {
    curDatasets() {
      switch (this.selectedDataTypeID) {
        case JobTenureSalaryDataTypes.AGE: return this.frontendSalariesForAge;
        case JobTenureSalaryDataTypes.GENDER: return this.frontendSalariesForGender;
        case JobTenureSalaryDataTypes.EDUCATION: return this.frontendSalariesForEducation;
        case JobTenureSalaryDataTypes.INDUSTRY: return this.frontendSalariesForIndustry;
        default: return {};
      }
    },

    ...mapGetters('salary', ['frontendSalariesForAge', 'frontendSalariesForGender', 'frontendSalariesForEducation', 'frontendSalariesForIndustry', 'selectedInfo']),
  },
};
</script>

<style>

</style>

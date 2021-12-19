<template>
  <div class="w-full h-full flex-ccc">
    <!-- chart -->
    <div class="w-4/5 h-96 bg-gray-50 shadow rounded p-4">
      <div class="w-full h-full">
        <canvas id="myChart" class="w-full h-full"></canvas>
      </div>
    </div>
    <!-- message -->
    <div v-for="(infosets, key) in selectedInfo" :key="key">
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
import { mapActions, mapGetters } from 'vuex';
import { chartJobTenureVSSalary } from '@/utils/chart';

export default {
  name: 'FrontEnd',
  data() {
    return {
      canvasDom: null,
      chart: null,
    };
  },
  created() {
    this.getData().then(() => {
      this.canvasDom = document.getElementById('myChart');
      // // Make it visually fill the positioned parent
      // this.canvasDom.style.width = '100%';
      // this.canvasDom.style.height = '100%';
      // // ...then set the internal size to match
      // this.canvasDom.width = this.canvasDom.offsetWidth;
      // this.canvasDom.height = this.canvasDom.offsetHeight;
      this.chart = chartJobTenureVSSalary(this.canvasDom, this.frontendSalaries);
    }).catch(() => {});
  },
  methods: {
    ...mapActions('salary', ['getData']),
  },
  computed: {
    ...mapGetters('salary', ['frontendSalaries', 'selectedInfo']),
  },
};
</script>

<style>

</style>

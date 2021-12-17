<template>
  <div class="flex-ccc">
    F2E2021 前端＆UI設計之薪資統計分析
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions } from 'vuex';

export default {
  name: 'Home',
  components: {
  },
  created() {
    this.doAjax();
  },
  methods: {
    doAjax() {
      this.startLoading('loading message');

      // simulate AJAX
      setTimeout(() => {
        this.endLoading();
      }, 5000);
    },
    ...mapActions(['startLoading', 'endLoading']),
  },
};
</script>

<template>
  <div class="h-full flex-css">
    <header>
      <div>2021 薪資統計分析</div>
      <ul>
        <li @click="changeTab('frontend')" :class="(isFrontEndTab) ? 'active' : ''">前端工程師</li>
        <li @click="changeTab('ui')" :class="(isUITab) ? 'active' : ''">UI 設計師</li>
      </ul>
    </header>
    <section>
      <keep-alive>
        <ChartFrontEnd v-if="isFrontEndTab"/>
        <ChartUI v-if="isUITab"/>
      </keep-alive>
      <footer>Copyright © 2021 Crane。資料來源：<a href="https://github.com/hexschool/2021-ui-frontend-job" class="hover:underline">六角統計</a></footer>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions } from 'vuex';
import ChartFrontEnd from '@/components/ChartFrontEnd.vue';
import ChartUI from '@/components/ChartUI.vue';

export default {
  name: 'Home',
  components: {
    ChartFrontEnd,
    ChartUI,
  },
  data() {
    return {
      curTab: 'frontend',   // frontend, ui
    };
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
    changeTab(tab) {
      if (this.curTab !== tab) {
        this.curTab = tab;
      }
    },
    ...mapActions(['startLoading', 'endLoading']),
  },
  computed: {
    isFrontEndTab() { return (this.curTab === 'frontend'); },
    isUITab() { return (this.curTab === 'ui'); },
  },
};
</script>

<style lang="scss">

header {
  @apply p-4;
  @apply bg-main-500;
  @apply text-word-800;
  @apply text-xl font-bold;
  @apply shadow;
  @apply flex-rlc;
  ul {
    @apply ml-8;
    @apply flex-rlc;
    @apply gap-1;
  }
  li {
    @apply px-4 py-3;
    @apply rounded;
    @apply hover:bg-main-400;
    @apply text-base;
    @apply font-normal;
    @apply leading-none;
    @apply duration-500;
    @apply cursor-pointer;
  }
  .active {
    @apply bg-main-400;
  }
}
section {
  @apply overflow-auto;
  @apply flex-grow;
}
footer {
  @apply p-4;
  @apply bg-main-500;
  @apply text-word-800;
}
</style>

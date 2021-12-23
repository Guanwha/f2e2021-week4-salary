<template>
  <div class="h-full flex-css">
    <header>
      <div>2021 薪資統計分析</div>
      <ul class="sm:hidden">
        <li @click="changeTab('frontend')" :class="(isFrontEndTab) ? 'active' : ''">前端</li>
        <li @click="changeTab('ui')" :class="(isUITab) ? 'active' : ''">UI</li>
      </ul>
      <ul class="hidden sm:flex">
        <li @click="changeTab('frontend')" :class="(isFrontEndTab) ? 'active' : ''">前端工程師</li>
        <li @click="changeTab('ui')" :class="(isUITab) ? 'active' : ''">UI 設計師</li>
      </ul>
    </header>
    <section>
      <div class="bg"></div>
      <keep-alive>
        <ChartFrontEnd v-if="isFrontEndTab"/>
        <ChartUI v-if="isUITab"/>
      </keep-alive>
      <footer>
        <span>Copyright © 2021 Crane</span>
        <span class="hidden sm:inline">。</span>
        <span>資料來源：<a href="https://github.com/hexschool/2021-ui-frontend-job" class="hover:underline">六角統計</a></span>
      </footer>
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
  @apply flex-rsbc sm:flex-rlc;
  ul {
    @apply ml-0 sm:ml-8;
    @apply flex-rcc sm:flex-rlc;
    @apply gap-1;
  }
  li {
    @apply px-2 py-2 sm:px-4 sm:py-3;
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
  .bg {
    content: '';
    z-index: -1;
    @apply absolute inset-0;
    background-image: url('../assets/bg-home.jpeg');
    background-size: cover;
    @apply opacity-10;
  }
}
footer {
  @apply mt-16;
  @apply p-4;
  @apply bg-main-500;
  @apply text-word-800;
  @apply flex-ccc sm:flex-rcc;
}
</style>

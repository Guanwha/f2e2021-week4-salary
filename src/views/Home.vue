<template>
  <div class="h-full flex-css">
    <header>
      <div>2021 薪資統計分析</div>
      <ul>
        <li>前端工程師</li>
        <li>UI 設計師</li>
      </ul>
    </header>
    <section>
      <FrontEnd/>
      <footer>Copyright © 2021 Crane。資料來源：<a href="https://github.com/hexschool/2021-ui-frontend-job" class="hover:underline">六角統計</a></footer>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions } from 'vuex';
import FrontEnd from '@/components/FrontEnd.vue';

export default {
  name: 'Home',
  components: {
    FrontEnd,
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

<style lang="scss">

header {
  @apply p-4;
  @apply bg-main-500;
  @apply text-word-800;
  @apply text-xl font-bold;
  @apply flex-rlc;
  ul {
    @apply ml-8;
    @apply flex-rlc;
  }
  li {
    @apply p-2;
    @apply text-base;
    @apply font-normal;
    @apply cursor-pointer;
    @apply hover:bg-second-500;
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

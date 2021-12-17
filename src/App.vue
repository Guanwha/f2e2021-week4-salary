<template>
  <div id="app">
    <loading :active.sync="isLoading"
         :can-cancel="false"
         :is-full-page="true"
         loader='dots'
         :width='60'
         :height='60'
         color='#fff'
         background-color='#000'
         :opacity='0.7'>
      <template slot="after">
        <div class='text-white'>{{ loadingMsg }}</div>
      </template>
    </loading>
    <router-view/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  name: 'App',
  data() {
    return {
    };
  },
  components: {
    Loading,
  },
  computed: {
    ...mapGetters(['isLoading', 'loadingMsg']),
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

// overwrite vue-loading-overlay class
.vld-icon {
  @apply flex-ccc;
}
</style>

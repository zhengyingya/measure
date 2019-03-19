<template>
  <div id="app">
    <!-- <button @click="onclick">aaa</button> -->
    <Header/>
    <div class="wrap">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import Header from './components/header'
  import { mapActions } from 'vuex'
  import { setInterval } from 'timers';
  export default {
    name: 'measure',
    components: {
      Header
    },
    methods: {
      ...mapActions(['intervalValue']),
      onclick () {
        this.intervalValue()
      }
    },
    created () {
      setInterval(this.intervalValue, 500)
    }
  }
</script>

<style>
  /* CSS */
  #app {
    min-width: 1000px;
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
  .wrap {
    display: flex;
    flex: 1;
    overflow: auto;
  }
</style>

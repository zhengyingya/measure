<template>
  <div id="app">
    <Header/>
    <div class="wrap">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import Header from './components/header'
  export default {
    name: 'measure',
    components: {
      Header
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
    overflow: scroll;
  }
</style>

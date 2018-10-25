<template>
  <div id="app">
    <Header/>
    <router-view></router-view>
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
  }
</style>

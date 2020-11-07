<template>
  <div id="app">
    <Navigation class="navigation-bar"></Navigation>
    <router-view class="contents"></router-view>
  </div>
</template>

<script>
import Navigation from './components/Navigation'
import router from './router/router'

export default {
  name: 'App',
  components: {
    Navigation
  },
  router
}
</script>

<style>
html, body {
  margin : 0;
  padding : 0;
}

.navigation-bar {
    position: fixed;
    width: 100%;
    top: 0;
}

.contents {
    height: calc(100vh - 80px);
    margin-top: 80px;
}
</style>

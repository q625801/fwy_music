<template>
  <div id="app">
    <nav-header></nav-header>
    <router-view/>
    <audio-wy></audio-wy>
  </div>
</template>

<script>
import NavHeader from '@/components/header'
import audioWy from '@/components/audio'
export default {
  name: 'App',
  components:{
    NavHeader,
    audioWy
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding-bottom:72px;
}
</style>

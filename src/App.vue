<template>
  <div id="app" :class="{'audioShow':$store.state.audioInfo.audioFlag}">
    <nav-header></nav-header>
    <router-view/>
    <audio-wy></audio-wy>
    <loading></loading>
  </div>
</template>

<script>
import NavHeader from '@/components/header'
import audioWy from '@/components/audio/audio'
import loading from '@/components/loading'
export default {
  name: 'App',
  components:{
    NavHeader,
    audioWy,
    loading
  },
}
</script>

<style>
body{
  height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding-bottom:10px;
  min-height: 100%;
  background: rgb(245, 245, 245);
}
#app.audioShow{
  padding-bottom:50px;
}
@media screen and (max-width:1280px){
    #app{
      background: #ffffff;
    }
}
</style>

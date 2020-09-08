<template>
  <div class="wrap">
    <div class="container">
      <banner></banner>
      <songsheet></songsheet>
      <newsong></newsong>
    </div>
  </div>
</template>

<script>
import banner from '@/components/Index/banner'
import songsheet from '@/components/Index/songsheet'
import newsong from '@/components/Index/renewsongs'
export default {
  name: 'index',
  data () {
    return {
      msg: ''
    }
  },
  components:{
    banner,
    songsheet,
    newsong
  },
  created(){
    
  },
  methods:{
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container{
  max-width:1280px;
  width:100%;
  margin:0 auto;
}
</style>

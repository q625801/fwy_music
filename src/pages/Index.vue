<template>
  <div class="wrap">
    <div class="container">
      <banner></banner>
    </div>
  </div>
</template>

<script>
import banner from '@/components/Index/banner'
export default {
  name: 'index',
  data () {
    return {
      msg: ''
    }
  },
  components:{
    banner,
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
  max-width:1080px;
  width:100%;
  margin:0 auto;
}
</style>

<template>
    <div class="ui-loading" v-if="this.$store.state.loadding">
        <img src="@/assets/img/loading2.gif"/>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'loading',
  data(){
    return {
      
    }
  },
  components:{
    
  },
  mounted(){
    
  },
  computed:{
    
  },
  methods:{
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .ui-loading{
      background: rgba(0, 0, 0, 0.5);
      position: fixed;
      left: 0;right: 0;top: 0;bottom: 0px;
      z-index: 9999;
      display:flex;
      align-items: center;
      justify-content: center;
  }
  .ui-loading img{
    width:50px;
    display:block;
  }
</style>

<template>
  <div class="wrap">
    <div class="container">
      <section class="">

      </section>
    </div>
  </div>
</template>

<script>
import {getPlaylistCatlist} from "@/api/api"
export default {
  name: 'songsheet',
  data () {
    return {
      
    }
  },
  components:{
    
  },
  mounted(){
    this.getCatList()
  },
  methods:{
    getCatList(){
      this.postJson(getPlaylistCatlist,{},(res) => {
        if(res.data.code == 200){

        }
      },(err) => {

      })
    }
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

<template>
  <div class="wrap wrap-index-qt pd20">
    <h2 class="title">推荐歌单</h2>
    <div class="songsheet-wrap clear">
      <div class="songsheet-list fl" v-for="(item,index) in songsheetdata" :key="index" v-if="index < 28" @click="gosheetdetail(item.id)">
        <div class="list-img">
          <div class="list-playCount">{{(item.playCount/10000).toString().split(".")[0] + "万"}}</div>
          <img v-lazy="item.picUrl + '?param=200y200'" :key="item.picUrl">
          <div class="list-player amn4"></div>
        </div>
        <div class="list-title">
          <span>{{item.name}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {personalized} from "@/api/api"
export default {
  name: 'songsheet',
  data(){
    return {
      songsheetdata:[],
    }
  },
  components:{
    
  },
  created(){
    this.getsheet();
    console.log()
  },
  methods:{
    getsheet(){
      var that = this;
      this.postJson(personalized,{},(res) => {
        this.songsheetdata = res.data.result;
      },(err)=>{

      })
    },
    gosheetdetail(id){
      this.$router.push({name:'sheetdetail',query: {id:id,sheetType:'songSheet'}}) //sheetType songSheet为歌单
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title{
  font-size: 16px;
  text-align:left;
  font-weight:bold;
  padding:30px 0 30px 0;
}
.songsheet-wrap{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.songsheet-list{
  width:13%;
  margin-bottom:20px;
  overflow:hidden;
  cursor:pointer;
}
.list-img{
  width:100%;
  display:flex;
  align-items: center;
  justify-content: center;
  position:relative;
}
.list-title span{
  display: block;
  text-align: left;
  font-weight: 700;
  font-size: 14px;
  line-height: 18px;
  padding-top: 5px;
}
.list-player{
  width:30px;
  height:30px;
  position:absolute;
  right: 10px;
  bottom: 10px;
  background:url("../../assets/img/player-btn.png") center no-repeat;
  background-size:cover;
  opacity:0;
}
.songsheet-list:hover .list-img .list-player{
  opacity:1;
}
.list-playCount{
  position:absolute;
  right:0;
  top:0;
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  line-height: 24px;
  background:url(../../assets/img/player-btn2.png) left center no-repeat;
  background-size: 20px;
  padding-left: 20px;
  padding-right:10px;
  background-color:rgba(0,0,0,.2)
}
@media screen and (max-width:1280px){
  .title{
      padding: 0.4rem 0;
  }
  .songsheet-list{
    width:23%;
  }
  .list-img{
    min-height:auto;
  }
  .list-title span{
    font-size:0.186667rem;
  }
}
</style>

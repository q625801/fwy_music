<template>
    <div class="sd-box slrecommend-box">
        <div class="title">相关歌单推荐</div>
        <div class="slrecommend clear">
            <div v-for="(item,index) in relateddata" :key="index" class="slrecommend-list clear" @click="gosheetdetail(item.id)">
                <div class="slrecommend-img fl">
                    <img v-lazy="item.coverImgUrl + '?param=100y100'" :key="item.coverImgUrl + '?param=150y150'" :alt="item.name" :title="item.name"/>
                </div>
                <div class="slrecommend-content fl">
                    <div class="title">{{item.name}}</div>
                    <div class="creator">By.{{item.creator.nickname}}</div>
                </div>
            </div>
            <div v-if="relateddata.length == 0">暂无数据</div>
        </div>
    </div>
</template>

<script>
import {related} from "@/api/api"
export default {
  name: 'sheettrelated',
  data(){
    return {
      commentId:'',
      relateddata:'',
    }
  },
  props:[
    'sheetcommentId',
  ],
  components:{
    
  },
  mounted(){
    
  },
  computed:{
    
  },
  methods:{
    getrelated(id){
      this.postJson(related,{id:id},(res) => {
        if(res.data.code == 200){
          this.relateddata = res.data.playlists
          
        }
      },(err) => {

      })
    },
    gosheetdetail(id){
      this.$router.push({name:'sheetdetail',query: {id:id,sheetType:'songSheet'}})
    },
  },
  watch:{
    sheetcommentId(Id){
      this.commentId = Id
      this.getrelated(Id);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sd-box{
  padding: 20px;
  box-sizing: border-box;
  margin-bottom: 20px;
  background-color: #ffffff;
  border-radius: 5px;
}
.sd-box .title{
  height: 20px;
  margin-bottom: 15px;
  font-weight: bold;
  font-size: 14px;
}
.sd-box .likeuser .user-headimg{
  width: 20%;
  box-sizing: border-box;
  margin-bottom: 10px;
  padding: 0 5px;
}
.sd-box .likeuser .user-headimg img{
  width: 100%;
  display: block;
  cursor: pointer;
}
.slrecommend-box{
  padding-bottom: 0;
}
.slrecommend-list{
  margin-bottom: 20px;
  cursor: pointer;
}
.slrecommend-list .slrecommend-img{
  width: 50px;
  height: 50px;
}
.slrecommend-list .slrecommend-img img{
  width: 100%;
}
.slrecommend-list .slrecommend-content{
  width: calc(100% - 50px);
  padding-left: 20px;
  box-sizing: border-box;
}
.slrecommend-list .slrecommend-content .title{
  margin-bottom: 10px;
  margin-top: 5px;
  height: auto;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.slrecommend-list .slrecommend-content .creator{
  font-size: 12px;
  color: #a5a5c1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.slrecommend-list:hover .slrecommend-content .title{
  color: #C62F2F;
}
@media screen and (max-width:1280px){
    .sd-box{
        display: none;
    }
}
</style>

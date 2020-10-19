<template>
    <div class="sd-box">
        <div class="title">喜欢这个歌单的人</div>
        <div class="likeuser clear">
            <div class="user-headimg fl" v-for="(item,index) in subscribersdata" :key="index">
                <img v-lazy="item.avatarUrl + '?param=100y100'" :key="item.avatarUrl + '?param=150y150'" :alt="item.nickname" :title="item.nickname"/>
            </div>
            <div v-if="subscribersdata.length == 0">暂无数据</div>
        </div>
    </div>
</template>

<script>
import {subscribers} from "@/api/api"
export default {
  name: 'sheetcomment',
  data(){
    return {
      commentId:'',
      subscribersdata:'',
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
    getsubscribers(){
      var that = this;
      that.postJson(subscribers,{id:that.$route.query.id},(res) => {
        if(res.data.code == 200){
          that.subscribersdata = res.data.subscribers
          
        }
      },(err) => {

      })
    },
  },
  watch:{
    sheetcommentId(Id){
        this.commentId = Id
        this.getsubscribers();
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
</style>

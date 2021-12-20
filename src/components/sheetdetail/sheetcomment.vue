<template>
    <div class="sd-box slrecommend-box sdcomment-all">
        <div class="title-bt">热门评论</div>
        <div class="slrecommend clear">
            <div v-for="(item,index) in commentdata" :key="index" class="slrecommend-list clear">
                <div class="slrecommend-img fl">
                    <img v-lazy="item.user.avatarUrl + '?param=100y100'" :key="item.user.avatarUrl + '?param=150y150'" :alt="item.user.nickname" :title="item.user.nickname"/>
                </div>
                <div class="slrecommend-content fl">
                    <div class="title-date clear">
                        <div class="title fl" @click="$router.push('/userhome?uid='+ item.user.userId)">{{item.user.nickname}}</div>
                        <div class="date fl">{{getdatacn(item.time).split(" ")[0]}}</div>
                    </div>
                    <div class="comment-content">
                        {{item.content}}
                        <div class="comment-beReplied clear" v-for="(item2,index2) in item.beReplied" :key="index2">
                            <div class="fl username">{{item2.user.nickname}}：</div>
                            <div class="fl content">{{item2.content}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="commentdata.length == 0">暂无数据</div>
        </div>
    </div>
</template>

<script>
import {songdetaiilcomment} from "@/api/api"
import {getLocalTime} from "@/api/common"
export default {
  name: 'sheetcomment',
  data(){
    return {
      commentId:'',
      limit:20,
      commentdata:'',
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
    getcomment(){
        this.postJson(songdetaiilcomment,{id:this.commentId,limit:this.limit},(res) => {
            if(res.data.code == 200){
                this.commentdata = res.data.hotComments
            }
        },(err)=>{

        })
    },
    getdatacn(data){
        return getLocalTime(data)
    }
  },
  watch:{
    sheetcommentId(Id){
        this.commentId = Id
        this.getcomment();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sd-box{
  padding: 20px 5px;
  box-sizing: border-box;
  background-color: #ffffff;
  border-radius: 5px;
}
.sd-box .title-bt{
  height: 20px;
  margin-bottom: 15px;
  font-weight: bold;
  font-size: 14px;
  padding: 0 15px;
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
.slrecommend-list{
  margin-bottom: 20px;
}
.slrecommend-list:last-child{
    margin-bottom: 0;
}
.slrecommend-list .slrecommend-img{
  width: 45px;
  height: 45px;
  border-radius: 50%;
  overflow: hidden;
}
.slrecommend-list .slrecommend-img img{
  width: 100%;
}
.slrecommend-list .slrecommend-content{
  width: calc(100% - 50px);
  padding-left: 20px;
  box-sizing: border-box;
}
.slrecommend-list .slrecommend-content .title-date{
  margin-bottom: 5px;
  margin-top: 5px;
}
.slrecommend-list .slrecommend-content .title{
  height: auto;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
}
.slrecommend-list .slrecommend-content .date{
  font-size: 12px;
  color: #a5a5c1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-left: 15px;
}
.slrecommend-list .slrecommend-content .title:hover{
  color: #C62F2F;
}
.comment-content{
    font-size: 12px;
    line-height: 15px;
}
.comment-beReplied{
    background-color: #f5f5f5;
    padding: 5px 10px;
    margin-top: 5px;
}
.comment-beReplied .username{
    font-weight: bold;
    color: #2c3e50;
}
.comment-beReplied .username:hover{
    color: #C62F2F;
}
.sdcomment-all .slrecommend{
    max-height: 520px;
    overflow-y: auto;
    padding: 0 15px;
}
@media screen and (max-width:1280px){
    .sd-box{
        display: none;
    }
}
</style>

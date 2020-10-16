<template>
  <div class="wrap">
    <div class="container">
      <div class="sd-wrap clear">
        <div class="sd-left fl">
          <div class="left-top clear">
            <div class="left-img fl">
              <img v-lazy="detailinfo.coverImgUrl" :key="detailinfo.coverImgUrl" :alt="detailinfo.name" :title="detailinfo.name"/>
            </div>
            <div class="left-content fl">
              <div class="title">
                {{detailinfo.name}}
              </div>
              <div class="createinfo clear">
                <div class="createinfo-avatar fl">
                  <img :alt="creator.nickname" :title="creator.nickname" :src="creator.avatarUrl"/>
                </div>
                <div class="createinfo-name wz fl">{{creator.nickname}}</div>
                <div class="wz fl">{{detailinfo.createTime}}创建</div>
              </div>
              <div class="sd-tag clear">
                <div class="fl ttl" v-if="detailinfo.tags">标签：</div>
                <span class="fl" v-for="(item,index) in detailinfo.tags" :key="index">{{item}}</span>
              </div>
              <div class="sd-description">
                {{detailinfo.description}}
              </div>
            </div>
          </div>
          <songlist :songarr="detailinfo.trackIds"></songlist>
          <sheetcomment :sheetcommentId="sheetId"></sheetcomment>
        </div>
        <div class="sd-right fr">
          <div class="sd-box">
            <div class="title">喜欢这个歌单的人</div>
            <div class="likeuser clear">
              <div class="user-headimg fl" v-for="(item,index) in subscribersdata" :key="index">
                <img v-lazy="item.avatarUrl + '?param=100y100'" :key="item.avatarUrl + '?param=150y150'" :alt="item.nickname" :title="item.nickname"/>
              </div>
            </div>
          </div>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {sddetail,subscribers,related} from "@/api/api"
import {getLocalTime} from "@/api/common"
import songlist from "@/components/sheetdetail/songlist"
import sheetcomment from "@/components/sheetdetail/sheetcomment"
export default {
  name: 'sheetdetail',
  data () {
    return {
      detailinfo: '',
      creator:'',
      subscribersdata:'',
      relateddata:'',
      sheetId:'',
    }
  },
  components:{
    songlist, //歌曲列表
    sheetcomment,//评论列表
  },
  created(){
    this.getsddetail();
    this.getsubscribers();
    this.getrelated();
    this.sheetId = this.$route.query.id;
  },
  mounted(){
    
  },
  methods:{
    getsddetail(){
      var that = this;
      this.postJson(sddetail,{id:that.$route.query.id},(res) => {
        if(res.data.code == 200){
          that.detailinfo = res.data.playlist;
          that.detailinfo.createTime = getLocalTime(res.data.playlist.createTime).split(" ")[0];
          that.creator = res.data.playlist.creator;
        }
      },(err)=>{

      })
    },
    getsubscribers(){
      var that = this;
      that.postJson(subscribers,{id:that.$route.query.id},(res) => {
        if(res.data.code == 200){
          that.subscribersdata = res.data.subscribers
          
        }
      },(err) => {

      })
    },
    getrelated(){
      var that = this;
      that.postJson(related,{id:that.$route.query.id},(res) => {
        if(res.data.code == 200){
          that.relateddata = res.data.playlists
          
        }
      },(err) => {

      })
    },
    gosheetdetail(id){
      this.$router.push({name:'sheetdetail',query: {id:id}})
    },
  },
  watch:{
    $route (to, from){
      this.$router.go(0)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container{
  max-width:1280px;
  width:100%;
  margin:30px auto 30px;
}
.sd-wrap .sd-left{
    width: 75%;
    box-sizing: border-box;
    background-color: #ffffff;
    padding: 20px;
    border-radius: 5px;
}
.sd-wrap .sd-right{
    width: 23%;
}
.sd-left .left-top .left-img{
    width: 200px;
    height: 200px;
    border-radius: 5px;
    overflow: hidden;
    display: flex;
    flex-flow: wrap;
    align-content: center;
    justify-content: center;
}
.sd-left .left-top .left-img img{
    display: block;
    max-width: 100%;
    max-height: 100%;
}
.sd-left .left-top .left-content{
    padding-left: 40px;
    box-sizing: border-box;
    width: calc(100% - 200px);
}
.sd-left .left-top .left-content .title{
    font-size: 24px;
    font-weight: bold;
    line-height: 24px;
    padding-top: 10px;
}
.createinfo{
    padding-top: 10px;
}
.createinfo .createinfo-avatar{
    width: 35px;
    height: 35px;
    border-radius: 50%;
    overflow: hidden;
}
.createinfo .createinfo-avatar img{
    width: 100%;
    height: 100%;
}
.createinfo .wz{
    height: 35px;
    line-height: 35px;
    margin-left: 15px;
    font-size: 14px;
}
.createinfo .createinfo-name:hover{
    color: #C62F2F;
}
.createinfo .createinfo-name{
    cursor: pointer;
}
.sd-tag{
  padding: 15px 0;
}
.sd-tag .ttl{
  font-size: 14px;
  line-height: 24px;
}
.sd-tag span{
  color: #fff;
  background: #fa2800;
  margin-right: 15px;
  font-size: 12px;
  cursor: pointer;
  padding: 6px 12px;
  border-radius: 15px;
}
.sd-description{
  width: 95%;
  line-height: 20px;
  overflow:hidden;
  text-overflow:ellipsis;
  display:-webkit-box;
  -webkit-box-orient:vertical;
  -webkit-line-clamp:3;
}
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
</style>

<template>
  <div class="wrap">
    <div class="container">
      <div class="sd-wrap clear">
        <div class="sd-left fl">
          <div class="left-top clear">
            <div class="left-img fl">
              <img v-lazy="detailinfo.coverImgUrl" :key="detailinfo.coverImgUrl" :alt="detailinfo.name" :title="detailinfo.name"/>
              <!-- <img src="../assets/img/loading1.gif"/> -->
            </div>
            <div class="left-content fl">
              <div class="clear">
                <div class="type fl">{{sheetType == 'songSheet' ? '歌单':'专辑'}}</div>
                <div class="title fl">
                  {{detailinfo.name}}
                </div>
              </div>
              <div class="createinfo clear">
                <div v-if="sheetType == 'songSheet'">
                  <div class="createinfo-avatar fl">
                    <img :alt="creator.nickname" :title="creator.nickname" :src="creator.avatarUrl"/>
                  </div>
                  <div class="createinfo-name wz fl" @click="$router.push('/userhome?uid='+ creator.userId)">{{creator.nickname}}</div>
                  <div class="wz fl createinfo-data">{{detailinfo.createTime}}创建</div>
                  <div class="wz fl createinfo-data"><span class="cla">{{detailinfo.playCount}}</span>次播放</div>
                </div>
                <div v-else>
                  <div class="album-createinfo clear" v-if="creator.length > 0">
                      <div class="wz fl">歌手：</div>
                      <div class="wz fl album-createinfo-span" v-for="(item,index) in creator" :key="index">
                        <em v-if="index != 0">/</em>
                        <span>
                          {{item.name}}
                        </span>
                      </div>
                  </div>
                  <div class="wz fl createinfo-data">时间：{{detailinfo.createTime}}</div>
                </div>
              </div>
              <div class="sd-tag clear" v-if="sheetType == 'songSheet'">
                <div class="fl ttl" v-if="detailinfo.tags">标签：</div>
                <span class="fl" v-for="(item,index) in detailinfo.tags" :key="index">{{item}}</span>
              </div>
              <div class="sd-description" v-if="sheetType == 'songSheet'">
                <span class="ttl">介绍：</span>{{detailinfo.description}}
              </div>
            </div>
          </div>
          <songlist :songarr="detailinfo.trackIds" :stdetaildata="detailinfo" :getsheetType="sheetType"></songlist>
        </div>
        <div class="sd-right fr">
          <sheetlike :sheetcommentId="sheetId"></sheetlike>
          <sheetrelated :sheetcommentId="sheetId" @changesheetcommentId="changesddetail"></sheetrelated>
          <sheetcomment :sheetcommentId="sheetId"></sheetcomment>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {sddetail,getAlbum} from "@/api/api"
import {getLocalTime} from "@/api/common"
import songlist from "@/components/sheetdetail/songlist"
import sheetcomment from "@/components/sheetdetail/sheetcomment"
import sheetlike from "@/components/sheetdetail/sheetlike"
import sheetrelated from "@/components/sheetdetail/sheetrelated"
export default {
  name: 'sheetdetail',
  data () {
    return {
      detailinfo: '',
      creator:'',
      sheetId:'',
      sheetType:'',
    }
  },
  components:{
    songlist, //歌曲列表
    sheetcomment,//评论列表
    sheetlike,//喜欢这个歌单的人
    sheetrelated,//相关歌单推荐
  },
  created(){
  },
  mounted(){
    this.sheetType = this.$route.query.sheetType
    this.choosDetail(this.$route.query.id)
  },
  methods:{
    choosDetail(id){
      if(this.sheetType == 'songSheet'){
        this.getsddetail(id);
      }else if(this.sheetType == 'albumSheet'){
        this.getsAblbum(id)
      }
    },
    getsddetail(id){
      this.sheetId = id;
      this.postJson(sddetail,{id:id},(res) => {
        if(res.data.code == 200){
          this.detailinfo = res.data.playlist;
          this.detailinfo.createTime = getLocalTime(res.data.playlist.createTime).split(" ")[0];
          this.creator = res.data.playlist.creator;
        }
      },(err)=>{

      })
    },
    getsAblbum(id){
      this.sheetId = id;
      this.postJson(getAlbum,{id:id},(res) => {
        //因歌单和专辑接口JSON数据格式不同重写JSON格式
        this.detailinfo = {
          coverImgUrl:res.data.album.picUrl,
          name:res.data.album.name,
          trackIds:res.data.songs,
          createTime:getLocalTime(res.data.album.publishTime).split(" ")[0]
        };
        this.creator = res.data.album.artists;
      },(err)=>{

      })
    },
    changesddetail(id){
      this.choosDetail(id)
    }
  },
  watch:{
    $route (to, from){
      this.sheetType = this.$route.query.sheetType
      this.choosDetail(this.$route.query.id)
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
  width: 70%;
  box-sizing: border-box;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 5px;
  min-height: 1370px;
}
.sd-wrap .sd-right{
    width: 28%;
}
.sd-left .left-top .left-img{
    width: 200px;
    height: 200px;
    border-radius: 5px;
    overflow: hidden;
    position: relative;
}
.sd-left .left-top .left-img img{
    display: block;
    max-width: 100%;
    max-height: 100%;
    position:absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
}
.sd-left .left-top .left-content{
    padding-left: 40px;
    box-sizing: border-box;
    width: calc(100% - 200px);
}
.sd-left .left-top .left-content .title{
    font-size: 28px;
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
.sd-description .ttl{
  font-size: 14px;
  line-height: 24px;
}
.createinfo-data .cla{
  color:#fa2800;
}
.sd-left .left-top .left-content .type{
    font-size: 15px;
    font-weight: bold;
    /* line-height: 0px; */
    margin: 10px 10px 0 0 ;
    padding: 3px 5px;
    border: 1px solid #C62F2F;
    color: #C62F2F;
}
.album-createinfo .album-createinfo-span{
  margin:0;
}
.album-createinfo .album-createinfo-span span{
 cursor: pointer;
}
.album-createinfo .album-createinfo-span em{
  padding-left: 5px;
}
.album-createinfo .album-createinfo-span span:hover{
  color: #C62F2F;
}
@media screen and (max-width:1280px){
  .container{
    margin: 0 auto 0;
  }
  .sd-wrap .sd-left{
    width: 100%;
    float: unset;
    padding:0;
    min-height: auto;
  }
  .sd-left .left-top{
    padding: 0.4rem 0.4rem 0.4rem 0.4rem;
  }
  .sd-left .left-top .left-img{
    width: 4rem;
    height: 4rem;
  }
  .sd-left .left-top .left-content .title{
    font-size: 12px;
    line-height: 0.48rem;
    padding-top: 0.133333rem;
  }
  .sd-left .left-top .left-content{
    width: calc(100% - 4rem);
    padding-left: 0.4rem;
  }
  .createinfo .createinfo-avatar{
    width: 0.666667rem;
    height: 0.666667rem;
  }
  .createinfo .wz{
    font-size: 12px;
    height: 0.666667rem;
    line-height: 0.666667rem;
    margin-left: 0.266667rem;
  }
  .createinfo .createinfo-data{
    display: none;
  }
  .sd-tag{
    display: none;
  }
  .sd-description{
    width: 100%;
    line-height: 0.466667rem;
    padding-top: 0.266667rem;
  }
  .sd-wrap .sd-right{
    width: 100%;
  }
}

</style>

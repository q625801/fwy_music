<template>
  <div class="wrap">
    <div class="container">
      <div class="sd-wrap clear">
        <div class="sd-left fl">
            <div class="left-top clear">
                <div class="left-img fl">
                    <img :alt="detailinfo.name" :src="detailinfo.coverImgUrl" :title="detailinfo.name"/>
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
                </div>
            </div>
            
        </div>
        <div class="sf-right fl">
            222
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {sddetail} from "@/api/api"
import {getLocalTime} from "@/api/common"
export default {
  name: 'sheetdetail',
  data () {
    return {
      detailinfo: '',
      creator:'',
    }
  },
  components:{
    
  },
  created(){
    this.getsddetail();
  },
  mounted(){
    
  },
  methods:{
    getsddetail(){
      var that = this;
      this.postJson(sddetail,{id:that.$route.query.id},(res) => {
        if(res.data.code == 200){
            console.log()
            that.detailinfo = res.data.playlist
            that.detailinfo.createTime = getLocalTime(res.data.playlist.createTime).split(" ")[0]
            that.creator = res.data.playlist.creator
        }
      },(err)=>{

      })
    },
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
.sd-wrap .sd-left{
    width: 80%;
    box-sizing: border-box;
    border-right: 1px solid #eeeeee;
}
.sd-wrap .sd-right{
    width: 20%;
}
.sd-left .left-top .left-img{
    width: 200px;
    height: 200px;
    border-radius: 5px;
    overflow: hidden;
}
.sd-left .left-top .left-img img{
    width: 100%;
    height: 100%;
}
.sd-left .left-top .left-content{
    padding-left: 20px;
}
.sd-left .left-top .left-content .title{
    font-size: 24px;
    font-weight: bold;
    line-height: 24px;
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
</style>

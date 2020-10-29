<template>
  <div class="wrap">
    <div class="container">
      <div class="sd-wrap clear">
        <div class="sd-left fl">
          <div class="left-top clear">
            <div class="left-img fl">
              <img v-lazy="userprofile.avatarUrl" :key="userprofile.avatarUrl" :alt="userprofile.nickname" :title="userprofile.nickname"/>
              <!-- <img src="../assets/img/loading.gif"/> -->
            </div>
            <div class="left-content fl">
                <div class="clear">
                    <div class="title fl">
                        {{userprofile.nickname}}
                    </div>
                    <div class="fl u-lev">
                        Lv.{{userlevel}}
                    </div>
                </div>
                <div class="createinfo clear">
                    <div class="wz fl createinfo-data">{{userprofile.createTime}} 创建</div>
                </div>
                <div class="u-data clear">
                    <div class="fl">
                        <span class="num">{{userprofile.eventCount}}</span>
                        <span class="wz">动态</span>
                    </div>
                    <div class="fl">
                        <span class="num">{{userprofile.follows}}</span>
                        <span class="wz">关注</span>
                    </div>
                    <div class="fl">
                        <span class="num">{{userprofile.followeds}}</span>
                        <span class="wz">粉丝</span>
                    </div>
                </div>
               <div class="u-info">
                   个人介绍：{{userprofile.signature}}
               </div>
            </div>
          </div>
        </div>
        <div class="user-homestd">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {userdetail} from "@/api/api"
import {getLocalTime} from "@/api/common"

export default {
  name: 'sheetdetail',
  data () {
    return {
      userprofile: '',
      userlevel:'',
    }
  },
  components:{
    
  },
  created(){
    this.getsddetail();
  },
  mounted(){
    this.sheetId = this.$route.query.id;
  },
  methods:{
    getsddetail(){
      var that = this;
      this.postJson(userdetail,{uid:that.$route.query.uid},(res) => {
        if(res.data.code == 200){
          that.userprofile = res.data.profile;
          that.userlevel = res.data.level
          that.userprofile.createTime = getLocalTime(res.data.profile.createTime).split(" ")[0];
        }
      },(err)=>{

      })
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
  width: 100%;
  box-sizing: border-box;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 5px;
  min-height: 1370px;
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
    font-size: 24px;
    font-weight: bold;
    line-height: 24px;
    padding-top: 10px;
}
.createinfo{
    padding: 10px 0 0 0;
    margin-bottom: 10px;
    border-bottom: 1px solid #ddd;
}
.createinfo .wz{
    height: 35px;
    line-height: 35px;
    font-size: 14px;
}
.u-lev{
    display: block;
    height: 19px;
    overflow: hidden;
    line-height: 21px;
    color: #e03a24;
    font-size: 14px;
    font-weight: bold;
    font-style: italic;
    border: 1px solid #e03a24;
    padding: 0px 10px;
    border-radius: 20px;
    margin: 10px 0 0 20px;
}
.u-data .fl{
    margin-right: 30px;
}
.u-data .num{
    display: block;
    font-size: 24px;
    font-weight: normal;
    cursor: pointer;
    text-align: center;
    padding-bottom: 5px;
}
.u-data .wz{
    display: block;
    cursor: pointer;
    text-align: center;
}
.u-info{
    padding: 15px 0;
}
@media screen and (max-width:1280px){
  
}

</style>

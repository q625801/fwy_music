<template>
  <div class="wrap wrap-header sdw">
    <nav class="nav-all" :class="{'search-show':checksearch,'showhistory':showhistory}">
      <div class="logo fl">
        <div class="pc">Music</div>
        <div class="wap" :class="{'on':wapmenushow}" @click="showwapmenu">
          <span class="ac-gn-menuicon-bread ac-gn-menuicon-bread-top"><span class="ac-gn-menuicon-bread-crust ac-gn-menuicon-bread-crust-top"></span></span>
          <span class="ac-gn-menuicon-bread ac-gn-menuicon-bread-bottom"><span class="ac-gn-menuicon-bread-crust ac-gn-menuicon-bread-crust-bottom"></span></span>
        </div>
      </div>
      <div class="fl nav-btn amn3">
        <ul class="clear">
          <li class="fl">
            <span>发现音乐<em></em></span>
          </li>
          <li class="fl">
            <span>排行榜<em></em></span>
          </li>
          <li class="fl pchide">
            <span>歌单<em></em></span>
          </li>
          <li class="fl">
            <span>歌手<em></em></span>
          </li>
          <li class="fl pchide">
            <span>MV<em></em></span>
          </li>
        </ul>
      </div>
      <div class="search-wrap amn3" :class="{'showhistory':showhistory}">
        <div class="search-input">
          <input type="text" name="search" class="fl" @focus="showht" @blur="hideht" v-model="searchval"/>
          <div class="closesearch-btn" @click="closesearch"></div>
          <div class="search-history amn3 sdw">
            <div class="search-hot" v-if="historylist.length > 0">
              <div class="title flex-row">
                <span>历史搜索</span>
              </div>
              <ul class="tags clear">
                <li class="fl" v-for="(item,index) in historylist" :key="index">
                  <a class="btn amn3" @click="clickhis(item)">{{item}}</a>
                </li>
              </ul>
            </div>

            <div class="search-hot">
              <div class="title flex-row">
                <span>热门搜索</span>
              </div>
              <ul class="tags clear">
                <li class="fl" v-for="(item,index) in hotlist" :key="index">
                  <a class="btn amn3" @click="clickhot(item.first)">{{item.first}}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="nav-search amn3 fr">
        <div class="search-btn" @click="showsearch"></div>
        <div class="login-btn pchide">登录</div>
      </div>
    </nav>
  </div>
</template>

<script>
import {hotsearch} from "@/api/api"
import {IsPC} from "@/api/common"
export default {
  name: 'header-nav',
  data(){
    return {
      checksearch:false,
      showhistory:false,
      hotlist:[],
      historylist:[],
      searchval:'',
      wapmenushow:false,
    }
  },
  components:{
    
  },
  created(){
    this.getseach();
    if(window.localStorage.getItem("historylist")){
      var arr = window.localStorage.getItem("historylist").split(',')
      JSON.parse(arr).forEach((item,index) => {
        this.historylist.push(item)
      })
    }
  },
  methods:{
    getseach(){
      this.postJson(hotsearch,{},(res) => {
        this.hotlist = res.data.result.hots;
      },(err)=>{

      })
    },
    clickhot(data){
      this.searchval = data;
      var history;
      var that =this;
      this.historylist.find(function(value, index, arr) {
        if(value == data){
          that.historylist.splice(index,1);
        }
      })
      this.historylist.unshift(data);
      if(this.historylist.length == 11){
        this.historylist.pop();
      }

      if(window.localStorage.getItem("historylist")){
        history = JSON.parse(window.localStorage.getItem("historylist"));
        history.find(function(value, index, arr) {
          if(value == data){
            history.splice(index,1);
          }
        })
        history.unshift(data)
        if(history.length == 11){
          history.pop()
        }
        window.localStorage.setItem('historylist',JSON.stringify(history));
      }else{
        window.localStorage.setItem('historylist',JSON.stringify([data]));
      }
    },
    clickhis(data){
      this.searchval = data;
    },
    showsearch(){
      if(IsPC()){
        //pc
        this.checksearch = true;
      }else{
        //wap
        
      }
      
    },
    closesearch(){
      this.checksearch = false;
    },
    showht(){
      this.showhistory = true;
    },
    hideht(){
      this.showhistory = false;
    },
    showwapmenu(){
      this.wapmenushow = true;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .wrap-header{
    height: 70px;
    margin-bottom: 20px;
  }

  .nav-all{
    max-width:1280px;
    margin:0 auto;
    height:70px;
    position: fixed;
    width: 100%;
    left: 0;
    top: 0;
    right: 0;
    margin: auto;
    background-color: #ffffff;
    z-index: 999;
  }
  .nav-all .logo .pc{
    background:url(../assets/img/logo.png) left center no-repeat;
    background-size:50px;
    height:70px;
    font-size:24px;
    color:#C62F2F;
    line-height:70px;
    padding-left:60px;
    margin-right:20px;
  }
  .nav-all .nav-btn{
    position: relative;
    z-index: 100;
  }
  .nav-all .nav-btn ul li{
    height:70px;
    line-height:70px;
    cursor:pointer;
    margin-right:10px;
  }
  .nav-all .nav-btn ul li span{
    padding:10px 10px;
    font-size: 14px;
    position: relative;
  }
  .nav-all .nav-btn ul li span em{
    width: 0px;
    position: absolute;
    bottom: 0;
    left: 0;
    height: 1px;
    background: #C62F2F;
    transition: width 0.5s;
    -moz-transition: width 0.5s;
    -webkit-transition: width 0.5s;
    -o-transition: width 0.5s;
  }
  .nav-all .nav-btn ul li:hover span{
    color:#C62F2F;
  }
  .nav-all .nav-btn ul li:hover span em{
    width:100%;
  }
  .nav-search{
    display:flex;
    height:70px;
    align-items: center;
  }
  .nav-search .search-btn{
    height:30px;
    width:30px;
    background:url(../assets/img/search.png) center no-repeat;
    background-size:30px;
    cursor:pointer;
    border-right:1px solid #C62F2F;
    padding:0 10px;
  }
  .nav-search .login-btn{
    font-size: 14px;
    color:#C62F2F;
    padding:0 20px;
    cursor:pointer;
  }
  .search-wrap{
    position:absolute;
    width:1280px;
    height:50px;
    left:0;
    top:0;
    right:0;
    bottom:0;
    margin:auto;
    transform: translateY(-70px);
    z-index: 99;
  }
  .search-wrap .search-input{
    width:800px;
    height:50px;
    display:flex;
    align-items:center;
    justify-content: space-between;
    position:relative;
    margin:0 auto;
    background:url(../assets/img/search.png) left center no-repeat;
    background-size:30px;
    border-bottom:1px solid #C62F2F;
  }
  .search-wrap .search-input input{
    margin-left:40px;
    font-size:16px;
    float:left;
    width:80%;
    color:#333333;
    position: relative;
    z-index: 99;
  }
  .search-wrap .search-input .closesearch-btn{
    width:30px;
    height:30px;
    float:right;
    background:url(../assets/img/close.png) center no-repeat;
    background-size:30px;
    margin-right:20px;
    cursor:pointer;
  }
  .search-wrap .search-input .search-history{
    position:absolute;
    top:60px;
    left:0;
    width:100%;
    box-sizing: border-box;
    padding:.5rem;
    transform:translateY(-30px);
    opacity:0;
    background:#ffffff;
    display: none;
  }
  .nav-all.search-show{
    overflow: hidden;
  }
  .nav-all.search-show .nav-btn{
    opacity:0;
    z-index:1;
  }
  .nav-all.search-show .nav-search{
    opacity:0;
  }
  .nav-all.search-show .search-wrap{
    transform: translateY(-0px);
  }
  .nav-all.search-show .search-wrap.showhistory{
    z-index:101;
  }
  .nav-all.search-show.showhistory{
    overflow: unset;
  }
  .search-history .search-hot .title span{
    display:block;
    text-align:left;
    font-size: 15px;
    background:url(../assets/img/hot.png) left center no-repeat;
    padding-left:40px;
    background-size:30px;
    height:30px;
    line-height:30px;
  }
  .search-history .search-hot .tags{
    padding-top:10px;
  }
  .search-history .search-hot .tags li a{
    color: #6d7685;
    background-color: #f4f4f5;
    padding:5px 10px;
    display:block;
    cursor:pointer;
    margin-right:10px;
    margin-bottom:15px;
  }
  .search-history .search-hot .tags li a:hover{
    color:#C62F2F;
  }
  .search-wrap.showhistory .search-input .search-history{
    transform: translateY(-0px);
    opacity:1;
  }
  .nav-all .logo .wap{
    display:none;
  }
  .nav-all.search-show .search-wrap .search-input .search-history{
    display: block;
  }
  @media screen and (max-width:1280px){
    .wrap-header{
      height: 48px;
      margin-bottom: 0;
    }
    .pchide{display:none}
    .nav-all{
      display:flex;
      justify-content:space-between;
    }
    .search-wrap{
      width:100%;
      display:none;
    }
    .search-wrap .search-input{
      width:100%;
    }
    .nav-all .logo .pc{
      display:none;
    }
    .nav-all .logo .wap{
      display:block;
      width:48px;
      height:48px;
    }
    .ac-gn-menuicon-bread {
      position: absolute;
      z-index: 3;
      top: 9px;
      left: 9px;
      width: 30px;
      height: 30px;
      -webkit-transition: opacity 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
      transition: opacity 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
    }
    .ac-gn-menuicon-bread .ac-gn-menuicon-bread-top{
      -webkit-transition: -webkit-transform .1806s cubic-bezier(0.04, 0.04, 0.12, 0.96);
      transition: -webkit-transform .1806s cubic-bezier(0.04, 0.04, 0.12, 0.96);
      transition: transform .1806s cubic-bezier(0.04, 0.04, 0.12, 0.96);
      transition: transform .1806s cubic-bezier(0.04, 0.04, 0.12, 0.96), -webkit-transform .1806s cubic-bezier(0.04, 0.04, 0.12, 0.96);
      -webkit-transform: none;
      transform: none;
      z-index: 4;
    }
    .ac-gn-menuicon-bread .ac-gn-menuicon-bread-bottom{
          -webkit-transition: -webkit-transform .1806s cubic-bezier(0.04, 0.04, 0.12, 0.96);
    transition: -webkit-transform .1806s cubic-bezier(0.04, 0.04, 0.12, 0.96);
    transition: transform .1806s cubic-bezier(0.04, 0.04, 0.12, 0.96);
    transition: transform .1806s cubic-bezier(0.04, 0.04, 0.12, 0.96), -webkit-transform .1806s cubic-bezier(0.04, 0.04, 0.12, 0.96);
    -webkit-transform: none;
    transform: none;
    }
    .ac-gn-menuicon-bread-crust {
      display: block;
      width: 17px;
      height: 1px;
      background: #C62F2F;
      border-radius: 0.5px;
      position: absolute;
      left: 7px;
      z-index: 1;
    }
    .ac-gn-menuicon-bread-crust.ac-gn-menuicon-bread-crust-top{
      top: 14px;
      transform: translateY(-3px);
      transition: transform .1596s cubic-bezier(0.52, 0.16, 0.52, 0.84) .1008s;
    }
    .ac-gn-menuicon-bread-crust.ac-gn-menuicon-bread-crust-bottom{
      bottom:14px;
      transform: translateY(3px);
      transition: transform .1596s cubic-bezier(0.52, 0.16, 0.52, 0.84) .1008s;
    }
    .wap.on .ac-gn-menuicon-bread-top{
      transition: transform .3192s cubic-bezier(0.04, 0.04, 0.12, 0.96) .1008s;
      transform: rotate(45deg);
    }
    .wap.on .ac-gn-menuicon-bread-bottom{
      transition: transform .3192s cubic-bezier(0.04, 0.04, 0.12, 0.96) .1008s;
      transform: rotate(-45deg);
    }
    .wap.on .ac-gn-menuicon-bread-crust.ac-gn-menuicon-bread-crust-top{
      transition: transform .3192s cubic-bezier(0.04, 0.04, 0.12, 0.96) .1008s;
      transform: rotate(0deg);
    }
    .wap.on .ac-gn-menuicon-bread-crust.ac-gn-menuicon-bread-crust-bottom{
      transition: transform .1806s cubic-bezier(0.04, 0.04, 0.12, 0.96);
      transform: none;
    }
    .nav-all .nav-btn ul li{
      height:48px;
      line-height:48px;
    }
    .nav-all{
      height:48px;
      max-width:100%;
    }
    .nav-search{
      height:48px;
    }
    .nav-search .search-btn{
      border-right:none;
      background-size:20px;
    }
  }
</style>

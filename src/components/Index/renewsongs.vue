<template>
  <div class="wrap wrap-index-qt pd20">
    <h2 class="title">推荐新歌曲</h2>
    <div class="newsongs-all clear">
        <div class="newsongs-list amn3 sdw clear" v-for="(item,index) in newsongdata" :key="index" :class="[index%2 == 0 ? 'fl' : 'fr']" @click="audioPlay(item)">
            <div class="fl newsongs-index" :class="{'on':item.id == $store.state.audioInfo.SongInfo.SongId,'btnon':$store.state.audioInfo.audioPlayBtn && item.id == $store.state.audioInfo.SongInfo.SongId}">
              <span>{{index+1 >= 10 ? index+1:"0" + (index+1)}}</span>
              <div class="newsong-player"></div>
            </div>
            <div class="fl newsongs-img">
              <img v-lazy="item.picUrl + '?param=100y100'" :key="item.picUrl"/>
            </div>
            <div class="fl newsongs-info">
              <span>{{item.name}}</span>
              <span>{{SongArtists(item.song.artists)}}</span>
            </div>
            <div class="fr newsongs-duration" :class="{'on':item.id == $store.state.audioInfo.SongInfo.SongId}">
              <span class="time">{{playtime(item.song.bMusic.playTime)}}</span>
              <div class="effect" :class="{'paused':!$store.state.audioInfo.audioPlayBtn && item.id == $store.state.audioInfo.SongInfo.SongId}">
                <span class="line1"></span>
                <span class="line2"></span>
                <span class="line3"></span>
                <span class="line4"></span>
              </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import {newsong} from "@/api/api"
export default {
  name: 'renewsongs',
  data(){
    return {
      newsongdata:[],
    }
  },
  components:{
    
  },
  created(){
    this.getnewsong();
  },
  methods:{
    getnewsong(){
      var that = this;
      this.postJson(newsong,{},(res) => {
        this.newsongdata = res.data.result;
      },(err)=>{

      })
    },
    audioPlay(SongInfo){
      let data = {
        SongId:SongInfo.id,
        SongName:SongInfo.name,
        SongPic:SongInfo.picUrl,
        SongArtists:this.SongArtists(SongInfo.song.artists)
      }
      let arr = [];
      this.newsongdata.forEach((item,index) => {
        let obj = {}
        obj.SongId = item.id
        obj.SongName = item.name
        obj.SongPic = item.picUrl
        obj.SongArtists = this.SongArtists(item.song.artists)
        obj.SongTime = this.playtime(item.song.bMusic.playTime)
        arr.push(obj)
      })
      this.$store.commit('setSongInfo',data)
      this.$store.commit('setSongList',arr)
    }
  },
  computed:{
    SongArtists(){
      return (data) => {
        if(data.length == 1){
          return data[0].name
        }else{
          let name = data.map(obj => {
            return obj.name
          }).join(' / ')
          return name
        }
      }
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
  padding:30px 0 15px 0;
}
.newsongs-all{
    padding:10px;
}
.newsongs-all .newsongs-list{
    width:47%;
    padding:10px 0;
    margin-bottom:20px;
    cursor:pointer;
}
.newsongs-all .newsongs-list:hover{
    background-color:rgba(198,47,47,.1);
}
.newsongs-img{
    width:80px;
    height:80px;
    display:flex;
    align-items:center;
    justify-content:center;
}
.newsongs-all .newsongs-list .newsongs-index{
    font-size: 15px;
    color: #4a4a4a;
    font-weight: 700;
    line-height:80px;
    width:70px;
    height:80px;
    text-align: center;
}
.newsongs-all .newsongs-list:hover .newsongs-index span{
    display:none;
}
.newsongs-all .newsongs-list .newsongs-index .newsong-player{
    background:url(../../assets/img/player-btn3.png) center no-repeat;
    background-size:30px;
    height:80px;
    display:none;
}
.newsongs-all .newsongs-list:hover .newsongs-index .newsong-player{
    display:block;
}
.newsongs-all .newsongs-list .newsongs-index.on span{
    display:none;
}
.newsongs-all .newsongs-list .newsongs-index.on .newsong-player{
    display:block;
}
.newsongs-all .newsongs-list .newsongs-index.btnon .newsong-player{
    background:url(../../assets/img/player-stop.png) center no-repeat;
    background-size:30px;
}
.newsongs-all .newsongs-list .newsongs-info{
    display: flex;
    flex-direction: column;
    height: 80px;
    justify-content: space-evenly;
    padding-left:20px;
    width: calc(100% - 240px);
}
.newsongs-all .newsongs-list .newsongs-info span{
    display:block;
    font-size: 15px;
    color: #4a4a4a;
    font-weight: 700;
    text-align:left;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.newsongs-all .newsongs-list .newsongs-duration{
    position:relative;
    width: 70px;
}
.newsongs-all .newsongs-list .newsongs-duration .time{
    font-size: 15px;
    color: #4a4a4a;
    font-weight: 700;
    line-height: 80px;
    width: 70px;
    height: 80px;
}
.newsongs-all .newsongs-list .newsongs-duration.on .time{
  display: none;
}
.newsongs-all .newsongs-list .newsongs-duration.on .effect{
    display: inline-block;
    height: 30px;
    line-height: 40px;
    text-align: center;
    position: absolute;
    vertical-align: bottom;
    width: 100%;
    top: 20px;
    right: 20px;
}
.newsongs-all .newsongs-list .newsongs-duration.on .effect span{
    display: inline-block;
    width: 3px;
    margin-bottom: 0;
    background-color: #C62F2F;
    margin-right: -12px;
}
.newsongs-all .newsongs-list .newsongs-duration.on .effect span.line1 {
    animation: line 0.6s infinite ease-in-out alternate;
}
.newsongs-all .newsongs-list .newsongs-duration.on .effect span.line2 {
    animation: line 0.6s 0.2s infinite ease-in-out alternate;
}
.newsongs-all .newsongs-list .newsongs-duration.on .effect span.line3 {
    animation: line 0.6s 0.4s infinite ease-in-out alternate;
}
.newsongs-all .newsongs-list .newsongs-duration.on .effect span.line4 {
    animation: line 0.6s 0.6s infinite ease-in-out alternate;
}
.newsongs-all .newsongs-list .newsongs-duration.on .effect.paused span{
  animation-play-state:paused;
  -webkit-animation-play-state:paused;
}
@keyframs line {
    from {
      height: 0;
    }
    to {
      height: 20px;
    }
}
@-webkit-keyframes line {
    from {
      height: 0;
    }
    to {
      height: 20px;
    }
}
@media screen and (max-width:1280px){
  .title{
    padding: 0.4rem 0;
  }
  .newsongs-all{
    padding:0.133333rem;
  }
  .newsongs-all .newsongs-list{
    padding:0.133333rem 0;
    width:100%;
  }
  .newsongs-all .newsongs-list .newsongs-index{
    font-size: 0.213333rem;
    width: 0.933333rem;
    height:1.4rem;
    line-height:1.4rem;
  }
  .newsongs-img{
    width:1.4rem;
    height:1.4rem;
  }
  .newsongs-all .newsongs-list .newsongs-info{
    height:1.4rem;
    width: calc(100% - 4.5rem);
  }
  .newsongs-all .newsongs-list .newsongs-info span{
    font-size:0.186667rem;
  }
  .newsongs-all .newsongs-list .newsongs-duration{
    height:1.4rem;
    line-height:1.4rem;
    font-size: 0.186667rem;
    width: 1.2rem;
  }
  .newsongs-all .newsongs-list .newsongs-index .newsong-player{
    height: 1.4rem;
    background-size: 0.666667rem;
  }
}
</style>

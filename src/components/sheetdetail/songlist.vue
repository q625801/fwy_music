<template>
    <div class="wrap songlist-wrap">
        <div class="songlist-playall">
            <div class="playall-por">
                <span>+ 收藏({{subscribnum}})</span>
            </div>
            <div class="playall-por plauall-btn" @click="goAudioPlay(songlistdata[0])">
                <span>播放全部</span>
            </div>
        </div>
        <div class="songlist-all">
            <table class="songlist-table">
                <thead>
                    <tr>
                        <th class="th-index">序号</th>
                        <th class="th-name">歌曲</th>
                        <th class="th-artist">歌手</th>
                        <th class="th-album">专辑</th>
                        <th class="th-duration">时长</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in songlistdata" :key="index" @click="goAudioPlay(item)">
                        <td class="td-index">
                            <div class="index-container flex-center" v-if="item.id != $store.state.audioInfo.SongInfo.SongId">
                                <span class="num">{{index &lt; 9 ? '0' + (index+1) : (index+1)}}</span>
                                <div class="ply"></div>
                            </div>
                            <div class="effect" v-else :class="{'paused':!$store.state.audioInfo.audioPlayBtn && item.id == $store.state.audioInfo.SongInfo.SongId}">
                                <span class="line1"></span>
                                <span class="line2"></span>
                                <span class="line3"></span>
                                <span class="line4"></span>
                            </div>
                        </td>
                        <td class="td-name">
                            <div class="name-container">
                                <div class="avatar">
                                    <div class="el-image">
                                        <img :src="item.al.picUrl + '?param=100y100'" class="el-image__inner">
                                    </div>
                                </div>
                                <p :title="item.name" class="name ellipsis">{{item.name}}</p>
                            </div>
                        </td>
                        <td class="td-artist">
                            <div class="artist-container">
                                <p class="author ellipsis">
                                    <span v-for="(item1,index1) in item.ar" :key="index1">{{index1 > 0 ? (' / ' + item1.name) : item1.name}}</span>
                                </p>
                            </div>
                        </td>
                        <td class="td-album">
                            <div class="album-container">
                                <p :title="item.al.name" class="ellipsis album-p" @click.stop="gosheetdetail(item.al.id)">{{item.al.name}}</p>
                            </div>
                        </td>
                        <td class="td-duration">
                            <div class="duration-container">
                                <p class="ellipsis">{{playtime(item.dt)}}</p>
                            </div>
                        </td>
                        <td class="td-wap">
                            <div class="wap-songlist">
                                <div class="name">{{item.name}}</div>
                                <div class="author-album">
                                    <span v-for="(item1,index1) in item.ar" :key="index1">{{index1 > 0 ? (' / ' + item1.name) : item1.name}}</span>
                                    <span> - {{item.al.name}}</span>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="songmore" v-if="showsongmore">
                <span v-if="!songmoreloading" @click="getmoresong()">加载更多</span>
                <img v-if="songmoreloading" src="@/assets/img/loading.gif"/>
            </div>
        </div>
    </div>
</template>

<script>
import {songsdetail,sdsongAll} from "@/api/api"
import {numchangecn} from "@/api/common"
export default {
  name: 'songlist',
  data(){
    return {
      songlistarr:[],
      pagelength:'',
      pageArr:{
        ArrNo:0,
        ArrSize:20,
      },
      songlistdata:[],
      songmoreloading:false,
      showsongmore:false,
      subscribnum:'',
      songlistAll:[],
      sheetType:''
    }
  },
  props:[
    'songarr',
    'stdetaildata',
    'getsheetType'
  ],
  components:{
    
  },
  mounted(){
    this.sheetType = this.$route.query.sheetType
    switch (this.sheetType) {
        case 'songSheet':
            this.getAllSong(this.$route.query.id)
            break;
        default:
            break;
    }
  },
  computed:{
    
  },
  methods:{
    getsongdata(data){
        this.showsongmore = true;
        this.songmoreloading = true;
        this.postJson(songsdetail,{ids:data.toString()},(res) => {
            if(res.data.code == 200){
                this.songlistdata = this.songlistdata.concat(res.data.songs);
                if(this.songlistdata.length < this.songlistarr.length){
                    this.showsongmore = true;
                    this.songmoreloading = false;
                }else{
                    this.showsongmore = false;
                }
            }
        },(err)=>{

        },false)
    },
    getmoresong(){
        let prevNo = this.pageArr.ArrNo
        if(this.pageArr.ArrNo == this.pagelength){
            return
        }else{
            this.pageArr.ArrNo += this.pageArr.ArrSize;
            if(this.pageArr.ArrNo > this.pagelength){
                this.pageArr.ArrNo = this.pagelength
            }
        }

        let newArr = [];
        this.songlistarr.forEach((item,index) => {
            if(index >= prevNo && index < this.pageArr.ArrNo){
                newArr.push(item.id);
            }
        })
        this.getsongdata(newArr);
        // console.log(prevNo,this.pageArr.ArrNo,this.pageArr.ArrSize,this.pagelength)
    },
    subscrib(num){
        var reg = new RegExp('[\u4e00-\u9fa5]+$','g');
        var card = ''
        var numValue = numchangecn(num)
        if(numValue.match(/[\u4e00-\u9fa5]/g)){
            card = numValue.match(/[\u4e00-\u9fa5]/g).join("");
        }
        if(numValue.split(".").length > 1){
            this.subscribnum = numValue.split(".")[0] + card
        }else{
            this.subscribnum = numValue
        }
    },
    getAllSong(id){
        this.postJson(sdsongAll,{id:id},(res) => {
            if(res.data.code == 200){
                this.songlistAll = res.data.songs
            }
        },(err)=>{

        },false)
    },
    goAudioPlay(data){
        let SongInfo = {
            id: data.id,
            name: data.name,
            picUrl: data.al.picUrl,
            song:{
                artists: data.ar
            }
        }
        let arr = []
        let forArr = ''
        if(this.sheetType == 'songSheet'){
            forArr = JSON.parse(JSON.stringify(this.songlistAll))
        }else if(this.sheetType == 'albumSheet'){
            forArr = JSON.parse(JSON.stringify(this.songlistarr))
        }
        forArr.forEach(item => {
            let obj = {
                id: item.id,
                name: item.name,
                picUrl: item.al.picUrl,
                song:{
                    artists: item.ar,
                    bMusic:{
                        playTime: item.dt,
                    }
                }
            }
            arr.push(obj)
        })
        this.audioPlay(SongInfo,arr)
    },
    gosheetdetail(id){
        if(this.$route.query.id != id){
            this.$router.push({name:'sheetdetail',query: {id:id,sheetType:'albumSheet'}}) //sheetType songSheet为歌单
        }
    },
    init(){
        this.songlistarr = []
        this.pagelength = ''
        this.pageArr={
            ArrNo:0,
            ArrSize:20,
        }
        this.songlistdata = []
        this.songmoreloading = false
        this.showsongmore = false
        this.subscribnum = ''
    }
  },
  watch:{
    songarr(arr){ //监听父组件传过来的 歌曲数组
        this.init() //组件传值后重置数据
        this.songlistarr = arr;
        this.pagelength = this.songlistarr.length;
        this.getmoresong();
    },
    stdetaildata(data){
        this.subscrib(data.subscribedCount)
    },
    getsheetType(data){
        this.sheetType = data
    },
    $route (to, from){
        this.sheetType = this.$route.query.sheetType
        switch (this.sheetType) {
            case 'songSheet':
                this.getAllSong(this.$route.query.id)
                break;
            default:
                break;
        }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrap{
    width: 100%;
}
.songlist-wrap{
    padding: 20px 0 0 0;
}
table {
    border-collapse: collapse;
    border-spacing: 0;
    table-layout: fixed;
}
.songlist-table{
    width: 100%;
}
.songlist-table thead{
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: #fafafa;
    color: #999;
}
.songlist-table thead th{
    padding: 0 9px;
    text-align: left;
    font-weight: 300;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 14px;
}
.songlist-table thead th.th-index{
    width: 10%;
    text-align: center;
}
.songlist-table thead th.th-name{
    width: 40%;
}
.songlist-table thead th.th-artist{
    width: 25%;
}
.songlist-table thead th.th-album{
    width: 15%;
}
.songlist-table thead th.th-duration{
    width: 15%;
    text-align: center;
}
.songlist-table tbody tr:nth-child(2n) {
    background: #f7f7f7;
}
.songlist-table tbody tr:hover {
    background: #e8e9ed;
}
.songlist-table tbody{
    width: 100%;
}
.songlist-table tbody tr{
    height: 50px;
    line-height: 50px;
    transition: background-color .2s linear;
    cursor: pointer;
}
.songlist-table tbody tr:hover .td-name .name-container p{
    color:#C62F2F;
}
.songlist-table tbody tr:hover .td-index .index-container .num{
    display: none;
}
.songlist-table tbody tr:hover .td-index .index-container .ply{
    display: block;
}
.songlist-table tbody tr td{
    padding: 0 9px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    position: relative;
}
.index-container{
    display: flex;
    align-items: center;
    justify-content: center;
}
.index-container .num{
    color: #4a4a4a;
    font-weight: 500;
    font-size: 14px;
    width: 100%;
    text-align: center;
    display:block;
}
.index-container .ply{
    background: url(../../assets/img/player-btn3.png) center no-repeat;
    background-size: 30px;
    width: 100%;
    height: 50px;
    display: none;
}
.name-container{
    display: flex;
    align-items: center;
}
.name-container .avatar{
    width: 35px;
    height: 35px;
    border-radius: 5px;
    flex-shrink: 0;
    margin-right: 10px;
}
.name-container .avatar .el-image{
    position: relative;
    display: inline-block;
    overflow: hidden;
    width: 100%;
    height: 100%;
}
.name-container .avatar .el-image img{
    border-radius: 3px;
    width: 100%;
    height: 100%;
}
.name-container p{
    cursor: pointer;
}
.ellipsis{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 14px;
}
.duration-container p{
    text-align: center;
    font-size: 14px;
}
.songmore{
    text-align: center;
    font-size: 14px;
    color: #C62F2F;
    padding:20px 0;
}
.songmore span{
    cursor: pointer;
}
.songlist-table tbody tr .td-wap{
    display: none;
}
.songlist-playall{
    margin-bottom: 10px;
    overflow: hidden;
}
.album-p:hover{
    color: #C62F2F;
}
.playall-por{
    color: #fff;
    background: #C62F2F;
    margin-right: 15px;
    font-size: 12px;
    cursor: pointer;
    padding: 9px 15px;
    border-radius: 20px;
    display: inline-block;
    float: right;
    font-size: 16px;
}
.playall-por.plauall-btn span{
    background: url("../../assets/img/player-btn2.png") left center no-repeat;
    background-size: 25px;
    padding-left: 28px;
}
.effect{
    display: inline-block;
    height: 30px;
    line-height: 40px;
    text-align: center;
    position: absolute;
    vertical-align: bottom;
    width: 50px;
    top: 11px;
    left: 13px;
}
.effect span{
    display: inline-block;
    width: 3px;
    margin-bottom: 0;
    background-color: #C62F2F;
    margin-right: -12px;
}
.effect span.line1 {
    animation: line 0.6s infinite ease-in-out alternate;
}
.effect span.line2 {
    animation: line 0.6s 0.2s infinite ease-in-out alternate;
}
.effect span.line3 {
    animation: line 0.6s 0.4s infinite ease-in-out alternate;
}
.effect span.line4 {
    animation: line 0.6s 0.6s infinite ease-in-out alternate;
}
.effect.paused span{
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
    .songlist-wrap{
        padding: 0 0 0 0;
    }
    .songlist-table thead{
        display: none;
    }
    .songlist-table tbody tr .td-name{
        display: none;
    }
    .songlist-table tbody tr .td-artist{
        display: none;
    }
    .songlist-table tbody tr .td-album{
        display: none;
    }
    .songlist-table tbody tr .td-duration{
        display: none;
    }
    .songlist-table tbody tr .td-index{
        width: 15%;
        padding: 0;
    }
    .songlist-table tbody tr .td-wap{
        display: block;
        width: 95%;
        padding: 0;
    }
    .songlist-table tbody tr:nth-child(2n) {
        background: #ffffff;
    }
    .songlist-table tbody tr{
        height: auto;
        line-height: initial;
    }
    .songlist-table tbody tr:hover{
        background:#e8e9ed;
    }
    .wap-songlist{
        padding: 0.2rem 0;
    }
    .wap-songlist div{
        line-height: initial;
    }
    .wap-songlist .name{
        font-size: 0.346667rem;
    }
    .wap-songlist .author-album span{
        font-size: 0.24rem;
    }
    .playall-por{
        font-size: 12px;
        padding: 8px 10px;
    }
    .playall-por.plauall-btn span{
        background-size: 0.4rem;
        padding-left: 0.4rem;
    }
}
</style>

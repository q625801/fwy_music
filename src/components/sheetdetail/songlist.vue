<template>
    <div class="wrap songlist-wrap">
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
                    <tr v-for="(item,index) in songlistdata" :key="index">
                        <td class="td-index">
                            <div class="index-container flex-center">
                                <span class="num">{{index &lt; 9 ? '0' + (index+1) : (index+1)}}</span>
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
                                <p :title="item.al.name" class="ellipsis">{{item.al.name}}</p>
                            </div>
                        </td>
                        <td class="td-duration">
                            <div class="duration-container">
                                <p class="ellipsis">{{playtime(item.dt)}}</p>
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
import {songsdetail} from "@/api/api"
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
    }
  },
  props:[
    'songarr',
  ],
  components:{
    
  },
  mounted(){
    
  },
  computed:{
    
  },
  methods:{
    getsongdata(data){
        var that = this;
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
    }
  },
  watch:{
    songarr(arr){ //监听父组件传过来的 歌曲数组
        this.songlistarr = arr;
        this.pagelength = this.songlistarr.length;
        this.getmoresong();
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
}
.songlist-table tbody tr td{
    padding: 0 9px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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
    cursor: pointer;
}
</style>

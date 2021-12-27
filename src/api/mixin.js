import {post_json} from "@/api/apiConfig";
import store from "@/store/index.js"
import { minutes, seconds } from "@/api/common"
let mixin = {
    data:()=>{
        return {

        }
    },
    methods:{
        postJson(url, params, successCallback, errorCallback,isloading = true){
            if (isloading){
                store.state.loadding = true;
            }
            
            post_json(url, params)
                .then(res => this.successDataFun(res, successCallback, isloading))
                .catch(err => this.failDataFun(err, errorCallback, isloading));
        },

        successDataFun(res, successCallback, isloading){
            if (isloading) {
                store.state.loadding = false;
            }
            let ret = res.data

            if(successCallback){
                successCallback(res)
            }

            // let state = parseInt(ret.state);
            // switch (state) {
            //     case 6001: //账号密码错误
                
            //     break
            // default:
            //     if(successCallback){
            //         successCallback(res)
            //     }
            //     break
            // }
        },
        failDataFun(err, errorCallback, isloading){
            if (isloading) {
                store.state.loadding = false;
            }
            let ret = err.data
            if(errorCallback){
                errorCallback(err)
            }
            // let state = parseInt(ret.state);
            // switch (state) {
            // case 6001: //账号密码错误
                
            //     break
            // default:
            //     if(errorCallback){
            //         errorCallback(err)
            //     }
            //     break
            // }
        },
        playtime(time) {
            return minutes(time) + ":" + seconds(time)
        },
        audioPlay(SongInfo,SongList){
            let data = {
                SongId:SongInfo.id,
                SongName:SongInfo.name,
                SongPic:SongInfo.picUrl,
                SongArtists:this.SongArtistsComputed(SongInfo.song.artists)
            }
            let arr = [];
            if(SongList && SongList.length > 0){
                SongList.forEach((item,index) => {
                    let obj = {}
                    obj.SongId = item.id
                    obj.SongName = item.name
                    obj.SongPic = item.picUrl
                    obj.SongArtists = this.SongArtistsComputed(item.song.artists)
                    obj.SongTime = this.playtime(item.song.bMusic.playTime)
                    arr.push(obj)
                })
                this.$store.commit('setSongList',arr)
            }
            this.$store.commit('setSongInfo',data)
        }
    },
    computed:{
        SongArtistsComputed(){
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
export default mixin;
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        loadding: false,//加载

        //播放器
        audioInfo:{
            audioFlag:false,//是否显示音频播放器
            audioPlayBtn:false,//播放器开始按钮状态
            SongInfo:{//当前正在播放的音乐数据
                SongId:'',
                SongName:'',
                SongPic:'',
                SongArtists:''
            },
            SongList:[]//播放列表数据
        },
        //播放器end
    },
    getters:{
        //播放器
        getSongInfo:state => {
            return state.audioInfo.SongInfo
        },
        getSongList:state => {
            return state.audioInfo.SongList
        }
        //播放器end
    },
    mutations:{ //this.$store.commit('setSongId','')
        //播放器
        setAudioFlag(state,data){
            state.audioInfo.audioFlag = data
        },
        setAudioPlayBtn(state,data){
            state.audioInfo.audioPlayBtn = data
        },
        setSongInfo(state,data){
            if(state.audioInfo.SongInfo.SongId == data.SongId){
                return
            }
            state.audioInfo.SongInfo = data
        },
        setSongList(state,data){
            state.audioInfo.SongList = data
        }
        //播放器end
    }
})

export default store
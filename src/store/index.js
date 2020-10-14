import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.store({
    state:{
        audioondata:'',//当前正在播放的音乐数据
    },
    mutations:{
        changeplay(state,data){
            console.log(state,data)
            state.audioondata = data; 
        }
    }
})

export default store
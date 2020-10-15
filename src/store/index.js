import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        loadding: false,//加载

        audioondata:'',//当前正在播放的音乐数据
    },
    getters:{
        
    },
    mutations:{
        
    }
})

export default store
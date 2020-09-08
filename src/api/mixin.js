import {post_json} from "@/api/apiConfig";

let mixin = {
    data:()=>{
        return {

        }
    },
    methods:{
        postJson(url, params, successCallback, errorCallback){
            post_json(url, params)
            .then(res => this.successDataFun(res, successCallback, errorCallback,url))
            .catch(err => this.failDataFun(err, errorCallback));
        },

        successDataFun(res, successCallback,url){
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
        failDataFun(err, errorCallback){
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
        }
    }
}
export default mixin;
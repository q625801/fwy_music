import axios from 'axios'
import * as common from './common'
axios.defaults.withCredentials = true
var instance = axios.create({
  timeout: 300000
})

instance.interceptors.request.use(config => {
    let token = common.getCookie("token");
    if (token) {
      config.headers['Content-Type'] = 'application/json;charset=utf-8'
      config.headers.Authorization = `Bearer ${token}`
    } 
    return config
})


export const post_json = (url, params) => {
    var p = {};
    if (params instanceof Object) {
      p = params;
    }
    return instance({
      headers: {
        'Content-Type': "application/json;charset=utf-8"
      },
      params: p,
      method: 'post',
      url: url
    })
}

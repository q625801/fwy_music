/*
 * @Author: 王誉
 * @Date: 2020-09-03 18:45:24 
 * @Last Modified by: 王誉
 * @Last Modified time: 2020-09-04 16:35:55
 */
const api = process.env.NODE_ENV === 'development' ? '/api' : '';


// ===================首页
export const banner = api + '/banner' // 测试

// ===================导航
export const hotsearch = api + '/search/hot'





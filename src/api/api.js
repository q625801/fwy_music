/*
 * @Author: 王誉
 * @Date: 2020-09-03 18:45:24 
 * @Last Modified by: 王誉
 * @Last Modified time: 2020-09-07 17:42:41
 */
const api = process.env.NODE_ENV === 'development' ? '/api' : '';


// ===================首页
export const banner = api + '/banner' // 测试

// ===================导航
export const hotsearch = api + '/search/hot'
// ===================推荐歌单
export const personalized = api + '/personalized'
// ===================推荐新歌曲
export const newsong = api + '/personalized/newsong'
// ===================音乐url
export const mp3url = api + '/song/url'
// ===================歌单详情
export const sddetail = api + '/playlist/detail'
// ===================歌单收藏者
export const subscribers = api + '/playlist/subscribers'
// ===================相关歌单推荐
export const related = api + '/related/playlist'





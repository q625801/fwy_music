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

// ===================歌单详情
export const sddetail = api + '/playlist/detail'
// ===================歌单收藏者
export const subscribers = api + '/playlist/subscribers'
// ===================获取歌单全部歌曲
export const sdsongAll = api + '/playlist/track/all'

// ===================相关歌单推荐
export const related = api + '/related/playlist'

// ===================音乐url
export const mp3url = api + '/song/url'
// ===================获取歌曲详情
export const songsdetail = api + '/song/detail'
// ===================获取歌曲歌词
export const songlyric = api + '/lyric'

// ===================歌单评论
export const songdetaiilcomment = api + '/comment/playlist'

// ===================用户详情
export const userdetail = api + '/user/detail'

// ===================专辑
export const getAlbum = api + '/album'
// ===================专辑动态信息 
export const getAlbumDetailDynamic = api + '/album/detail/dynamic'
// ===================歌手专辑
export const getArtistAlbum = api + '/artist/album'
// ===================专辑评论
export const getCommentAlbum = api + '/comment/album'

// ===================歌单分类信息
export const getPlaylistCatlist = api + '/top/playlist/highquality'

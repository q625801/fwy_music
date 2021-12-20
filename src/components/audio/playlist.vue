<template>
    <div class="wrap-playlist sdwa">
        <div class="playlist-bt">
            播放列表(1000)
        </div>
        <div class="playlist-listbdc">
            <div class="listbdc clear">
                <span class="fl name">
                    孤勇者
                </span>
                <span class="fl artists">
                    陈奕迅
                </span>
                <span class="fl time">
                    04:16
                </span>
            </div>
        </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.wrap-playlist{
    width: 500px;
    height: 300px;
    box-sizing: border-box;
    padding: 20px;
    position: fixed;
    bottom: 69px;
    right: 0;
    background: #ffffff;
    z-index: 99;
}
.playlist-bt{
    font-size: 16px;
    color: #4a4a4a;
    font-weight: 700;
    text-align: left;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    border-bottom: 1px solid #DCDCDC;
    padding-bottom: 18px;
}
.playlist-listbdc .listbdc{
    padding: 0 10px;
    line-height: 40px;
}
.playlist-listbdc .listbdc span{
    font-size: 14px;
    display: inline-block;
    text-align: center;
}
.playlist-listbdc .listbdc span.name{
    width: 60%;
    text-align: left;
}
.playlist-listbdc .listbdc span.artists{
    width: 20%;
}
.playlist-listbdc .listbdc span.time{
    width: 20%;
}
</style>
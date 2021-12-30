<template>
    <div class="sd-box">
        <div class="title">喜欢这个歌单的人</div>
        <div class="likeuser clear">
            <div class="user-headimg fl" v-for="(item,index) in subscribersdata" :key="index">
                <img v-lazy="item.avatarUrl + '?param=100y100'" :key="item.avatarUrl + '?param=150y150'" @click="$router.push('/userhome?uid='+ item.userId)" :alt="item.nickname" :title="item.nickname"/>
            </div>
            <div v-if="subscribersdata.length == 0">暂无数据</div>
        </div>
        <!-- <div class="subscribnum">1042.7万人收藏</div> -->
    </div>
</template>

<script>
import {subscribers} from "@/api/api"
export default {
  name: 'sheetlike',
  data(){
    return {
      commentId:'',
      subscribersdata:'',
    }
  },
  props:[
    'sheetcommentId',
  ],
  components:{
    
  },
  mounted(){
    
  },
  computed:{
    
  },
  methods:{
    getsubscribers(id){
      this.postJson(subscribers,{id:id},(res) => {
        console.log(res,'收藏歌单')
        if(res.data.code == 200){
          this.subscribersdata = res.data.subscribers
        }
      },(err) => {

      })
    },
  },
  watch:{
    sheetcommentId(id){
      console.log(id,'getsubscribers')
        this.getsubscribers(id);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sd-box{
  padding: 20px;
  box-sizing: border-box;
  margin-bottom: 20px;
  background-color: #ffffff;
  border-radius: 5px;
}
.sd-box .title{
  height: 20px;
  margin-bottom: 15px;
  font-weight: bold;
  font-size: 14px;
}
.sd-box .likeuser .user-headimg{
  width: 20%;
  box-sizing: border-box;
  margin-bottom: 10px;
  padding: 0 5px;
}
.sd-box .likeuser .user-headimg img{
  width: 100%;
  display: block;
  cursor: pointer;
}
.sd-box .subscribnum{
  display: none;
}
@media screen and (max-width:1280px){
  .sd-box{
    padding: 0.4rem 0.4rem 0 0.4rem;
    margin-bottom: 0;
    position: relative;
  }
  .sd-box .title{
    display: none;
  }
  .sd-box .likeuser{
    width: 60%;
    height: 1.066667rem;
  }
  .sd-box .likeuser .user-headimg{
    width: 1.066667rem;
    height: 1.066667rem;
    margin-bottom: 0;
    padding: 0 0.066667rem;
  }
  .sd-box .likeuser .user-headimg img{
    border-radius: 50%;
  }
  .sd-box .subscribnum{
    position: absolute;
    right: 0.4rem;
    top: 0.706667rem;
    font-size: 0.346667rem;
    padding-right: 0.6rem ;
    background: url("../../assets/img/arror.png") right center no-repeat;
    background-size: 0.6rem;
    display: block;
  }
}
</style>

<template>
  <div class="wrap banner">
    <swiper :options="swiperOption" v-if="carouselArr.length > 1">
        <swiper-slide class="swiper-slide" v-for="(item,index) in carouselArr" :key="index">
          <img :src="item.imageUrl"/>
        </swiper-slide>
        <!-- 分页器 -->
        <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import {banner} from "@/api/api"
import { swiper,swiperSlide } from "vue-awesome-swiper";
import '@/assets/css/swiper.min.css'
export default {
  name: 'banner',
  data(){
    return {
      swiperOption:{
        observer:true,//修改swiper自己或子元素时，自动初始化swiper 
        observeParents:true,//修改swiper的父元素时，自动初始化swiper 
        autoplay: 2000,
        loop: true,
        autoplayDisableOnInteraction : false,
        pagination : '.swiper-pagination',
        paginationClickable :true,
      },
      carouselArr:[]
    }
  },
  components:{
    swiper,
    swiperSlide
  },
  created(){
    this.getbanner();
  },
  methods:{
    getbanner(){
        var that = this;
        this.postJson(banner,{type:0},(res) => {
            this.carouselArr = res.data.banners
        },(err)=>{

        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.banner .swiper-container{
  position:relative;
  z-index:100;
}
.banner .swiper-pagination-bullet{
  width:0.466667rem;
  height:0.066667rem;
  border-radius:initial;
  background-color:rgb(200,200,200);
  opacity:1;
}
.banner .swiper-pagination-bullet-active{
  background-color:rgb(198,47,47);
}
@media screen and (min-width:1024px){

}
</style>

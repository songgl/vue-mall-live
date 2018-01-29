<template>
	<swiper class="swiperBox" :options="swiperOption">
    <swiper-slide v-for="slide in bannerInfo" :key="slide.b_id">
      <img v-if="type==1" :src="slide.b_img" alt="" />
      <img v-if="type==2" :src="slide" alt="">
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
  import 'swiper/dist/css/swiper.css'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'

  export default {
    props: ['bannerInfo','type'],
    data() {
      return {
        swiperOption: {
          autoplay : 3500,
          setWrapperSize : true,
          pagination : '.swiper-pagination',
          paginationClickable: true,
          mousewheelControl: true,
          observeParents: true
        }
      }
    },
    components: {
      swiper,
      swiperSlide
    }
  }
</script>

<style scoped>
  .swiperBox { height:100%; }
</style>

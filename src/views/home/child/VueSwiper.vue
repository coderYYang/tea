<template>
  <div class="swiper">
    <swiper ref="mySwiper" :options="swiperOptions">
      <swiper-slide v-for="item in swiperList" :key="item.id">
        <img :src="item.imgUrl" :alt="item.id" style="width: 100%;">
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
export default {
  name: "VueSwiper",
  props: {
    swiperList: Array
  },
  data() {
    return {
      swiperOptions: {
        pagination: {
          el: '.swiper-pagination'
        },
        loop: true,
        autoplay: {
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: false
        }
      }
    }
  },
  components: {
    Swiper,
    SwiperSlide
  },
}
</script>

<style scoped>

</style>

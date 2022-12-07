<template>
  <div class="detail">
    <div class="content" @scroll="isShowHeader">
      <DetailHeader :isShow="isShow" :option="styleOption"></DetailHeader>
      <DetailHeader :isShow="isShow" :option="styleOption"></DetailHeader>
      <swiper ref="mySwiper" :options="swiperOptions">
        <swiper-slide v-for="(item, index) in imgUrl" :key="index">
          <img :src="item" :alt="item" style="width: 100%" />
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
      <GoodsTitle :goodsDetail="detailInfo"></GoodsTitle>
      <img :src="detailInfo.imgUrl" style="width: 100%" alt="" />
      <img :src="detailInfo.imgUrl" style="width: 100%" alt="" />
      <img :src="detailInfo.imgUrl" style="width: 100%" alt="" />
      <img :src="detailInfo.imgUrl" style="width: 100%" alt="" />
    </div>
    <Footer :detail="detailInfo"></Footer>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";

import Footer from "./child/Footer";
import GoodsTitle from "./child/GoodsTitle";
import DetailHeader from "./child/DetailHeader";

import { GoodsDetail } from "@/api/api";

export default {
  name: "Detail",
  components: { DetailHeader, GoodsTitle, Footer, Swiper, SwiperSlide },
  data() {
    return {
      isShow: true,
      styleOption: {},
      id: "",
      detailInfo: {},
      imgUrl: [],
      swiperOptions: {
        pagination: {
          el: ".swiper-pagination",
        },
        loop: true,
        autoplay: {
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: false,
        },
      },
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.getLikeList();
  },
  activated() {
    if (this.$route.params.id != this.id) {
      this.getLikeList();
      this.id = this.$route.params.id;
    }
  },
  methods: {
    // 根据 id 获取商品详细数据
    getLikeList() {
      GoodsDetail(this.$route.params.id).then((res) => {
        if (res.data.code === 0) {
          this.detailInfo = res.data.data;
          this.imgUrl = Array(res.data.data.imgUrl);
        }
      });
    },
    // 展示不同头部
    isShowHeader() {
      let y = Math.ceil(document.querySelector(".content").scrollTop);
      // css 样式通过滚动条动态改变 opacity
      let opacity = y / 200;
      opacity = opacity > 1 ? 1 : opacity;
      this.styleOption = {
        opacity: opacity,
      };
      if (y > 20) {
        this.isShow = false;
      } else {
        this.isShow = true;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.detail {
  width: 100%;
  height: 100%;

  .content {
    height: calc(100% - 50px);
    overflow: auto;
  }
}
</style>

<template>
  <div class="home">
    <div class="headers">
      <Header></Header>
      <ly-tab ref="lyTab" v-model="selectedId" :items="items" :options="options" @change="changeTab"></ly-tab>
    </div>
    <div class="content">
      <div v-for="item in newData" :key="item.id">
        <VueSwiper v-if="item.type == 'swiperList'" :swiperList="item.data"></VueSwiper>
        <Icons v-if="item.type == 'iconsList'" :iconsList="item.data"></Icons>
        <Recommend v-if="item.type == 'recommendList'" :recommendList="item.data"></Recommend>
        <Ad v-if="item.type == 'adList'" :adList="item.data"></Ad>
        <Like v-if="item.type == 'likeList'" :likeList="item.data"></Like>
      </div>
    </div>
    <TabBar></TabBar>
  </div>
</template>

<script>
import TabBar from "@/components/common/TabBar";
import Header from "../../components/common/Header";
import VueSwiper from "./child/VueSwiper";
import Icons from "./child/Icons";
import Recommend from "./child/Recommend";
import Like from "./child/Like";

// 接口
import { HomeRecommend, HomeAll } from "@/api/api";
import Ad from "./child/Ad";

export default {
  name: "Home",
  data() {
    return {
      selectedId: 0,
      items: [],
      options: {
        activeColor: "#1d98bd",
        // 可在这里指定labelKey为你数据里文字对应的字段
      },
      newData: [],
    };
  },
  components: {
    Ad,
    TabBar,
    Header,
    VueSwiper,
    Icons,
    Recommend,
    Like,
  },
  created() {
    this.getHomeRecommend();
  },
  mounted() { },
  methods: {
    // 获取首页推荐数据
    getHomeRecommend() {
      HomeRecommend().then((res) => {
        if (res.data.code === 0) {
          // ly-tab 数据
          this.items = Object.freeze(res.data.data.lyTab);
          this.newData = Object.freeze(res.data.data.data);
        }
      });
    },
    // 获取首页详情数据
    clickData(index) {
      HomeAll(index).then((res) => {
        if (res.data.data.constructor !== Array) {
          this.newData = res.data.data.data;
        } else {
          this.newData = res.data.data;
        }
      });
    },
    // ly-tab 改变事件
    changeTab(item, index) {
      this.clickData(index);
      document.querySelector(".content").scrollTo(0, 0);
    },
  },
};
</script>

<style lang="less" scoped>
.home {
  width: 100%;
  height: 100%;

  .headers {
    z-index: 9;
    background: #fff;
    height: 97px;

    .ly-tab {
      /deep/ .ly-tabbar {
        box-shadow: none;
        border-bottom: none;
      }
    }
  }

  .content {
    height: calc(100% - 97px - 60px);
    overflow: auto;
  }
}
</style>

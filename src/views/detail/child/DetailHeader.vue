<template>
  <div class="detail-header">
    <div v-show="isShow" class="show">
      <div class="left" @click="$router.back()">
        <i class="iconfont icon-fanhui"></i>
      </div>
      <div class="right" @click="$router.push('/home')">
        <i class="iconfont icon-home-line"></i>
      </div>
    </div>
    <div v-show="!isShow" class="show-to" :style="option">
      <div class="left" @click="$router.back()">
        <i class="iconfont icon-fanhui"></i>
      </div>
      <div class="center">
        <div class="info">商品详情</div>
        <div class="evaluation">商品评价</div>
      </div>
      <div class="right" @click="$router.push('/home')">
        <i class="iconfont icon-home-line"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailHeader",
  props: {
    isShow: Boolean,
    option: Object
  }
}
</script>

<style lang="less" scoped>
.detail-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;
  .show,.show-to {
    background: transparent;
    display: flex;
    justify-content: space-between;
    line-height: 40px;
    padding: 5px;
    .left, .right {
      text-align: center;
      width: 40px;
      border-radius: 50%;
      background: rgba(255, 255, 255, .4);
      .iconfont {
        font-size: 22px;
      }
    }
  }
  .show-to {
    background: #fff;
    .center {
      width: calc(100% - 40px - 40px);
      display: flex;
      .info, .evaluation {
        width: 50%;
        text-align: center;
        color: #000;
      }
    }
  }
}
</style>

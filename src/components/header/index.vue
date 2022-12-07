<template>
  <div class="header">
    <slot name="left">
      <div class="left" @click="$router.back()">
        <i class="iconfont icon-fanhui"></i>
      </div>
    </slot>
    <slot name="center">
      <div class="center">
        <span>提交订单</span>
      </div>
    </slot>
    <slot name="right">
      <div class="right">
        <i class="iconfont icon-kefu"></i>
      </div>
    </slot>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.header {
  display: flex;
  align-items: center;
  height: 40px;
  background: #b0352f;
  color: #fff;
  text-align: center;

  .left,
  .right {
    width: 40px;
  }

  .center {
    font-size: 18px;
    flex: 1;
  }

  .iconfont {
    font-size: 20px;
  }
}
</style>
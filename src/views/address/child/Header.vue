<template>
  <div class="show-to">
    <div class="left" @click="$router.back()">
      <i class="iconfont icon-fanhui"></i>
    </div>
    <div class="center">
      <slot>地址管理</slot>
    </div>
    <div class="right" @click="$router.push('/home')">
      <i class="iconfont icon-home-line"></i>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.show-to {
  display: flex;
  justify-content: space-between;
  line-height: 40px;
  background: #b0352f;
  color: #fff;
  .left,
  .right {
    width: 40px;
    text-align: center;
  }
  .center {
    width: calc(100% - 40px - 40px);
    text-align: center;
  }
  .iconfont {
    font-size: 22px;
  }
}
</style>
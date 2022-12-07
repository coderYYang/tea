<template>
  <div class="login-header">
    <div class="left" @click="$router.push('/my')">
      <i class="iconfont icon-fanhui"></i>
    </div>
    <div class="center">
      <slot>登录</slot>
    </div>
    <div class="right">
      <i class="iconfont icon-home-line" @click="$router.push('/home')"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginHeader',
};
</script>

<style lang="less" scoped>
.login-header {
  background: #b0352f;
  width: 100%;
  height: 44px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #fff;

  .left,
  .right {
    width: 60px;

    .iconfont {
      font-size: 24px;
    }
  }

  .center {
    text-align: center;
    width: calc(100% - 60px - 60px);
    font-size: 20px;
  }
}
</style>

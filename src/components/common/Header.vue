<template>
  <header class="header">
    <div class="logo">
      <span>Shop</span>
    </div>
    <div class="search" @click="$router.push('/search')">
      <i class="iconfont icon-fangdajing"></i>
      <span>搜您喜欢的...</span>
    </div>
    <div class="kefu">
      <i class="iconfont icon-kefu"></i>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style lang="less" scoped>
.header {
  display: flex;
  width: 100%;
  height: 50px;
  align-items: center;
  text-align: center;
  background: #b0352f;
  color: #fff;

  .logo {
    width: 60px;
    font-size: 24px;
  }

  .search {
    display: flex;
    align-items: center;
    flex: 1;
    border-radius: 20px;
    background: #fff;
    height: 30px;
    text-align: left;
    color: #ccc;

    i {
      padding: 0 10px;
    }

    span {
      font-size: 14px;
    }
  }

  .kefu {
    width: 40px;
  }

  .iconfont {
    font-size: 20px;
  }
}
</style>

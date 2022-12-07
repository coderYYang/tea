<template>
  <div class="goods-title">
    <div class="title">{{goodsDetail.name}}</div>
    <div class="min-title">性价首选，茶感十足、鲜醇耐泡的大众口粮茶</div>
    <div class="price">
      <span>￥{{ goodsDetail.price }}</span>
    </div>
    <div class="del-price">
      <span>价格：</span>
      <del>￥138</del>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsTitle",
  props: {
    goodsDetail: Object
  }
}
</script>

<style lang="less" scoped>
.goods-title {
  padding: 20px 10px;

  .title {
    font-size: 20px;
    font-weight: 500;
  }

  .min-title {
    font-size: 14px;
    color: #999;
    border-bottom: 1px solid #ccc;
    padding-bottom: 5px;
  }

  .price {
    color: #f00;
    font-size: 22px;
    padding: 8px 0;
  }

  .del-price {
    color: #999;
  }
}
</style>

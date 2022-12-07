<!--
 * @Author: yy
 * @Date: 2022-03-18 11:02:04
 * @LastEditors: yy 691335336@qq.com
 * @LastEditTime: 2022-07-30 19:27:40
 * @Description: 
-->
<template>
  <div class="footer">
    <div class="left">
      <i class="iconfont icon-kefu"></i>
      <i class="iconfont icon-gouwuche"></i>
      <i class="iconfont icon-shoucang"></i>
    </div>
    <div class="right">
      <div class="add-cat" @click="isAddCate">加入购物车</div>
      <div class="buy" @click="immediatelyBuy">立即购买</div>
    </div>
  </div>
</template>

<script>
import { AddCate, GenerateOrder } from "@/api/api";

export default {
  name: "Footer",
  props: {
    detail: {
      type: Object,
    },
  },
  methods: {
    // 加入到购物车
    isAddCate() {
      let data = {
        goodsId: this.$route.params.id,
      };
      AddCate(data).then((res) => {
        if (res.data.code === 0) {
          this.$success(res.data.message);
        } else {
          this.$error(res.data.message);
        }
      });
    },
    // 立即购买
    immediatelyBuy() {
      const goodsArr = [
        {
          id: this.detail.id,
          goodsName: this.detail.name,
          goodsNum: this.detail.num,
          goodsPrice: this.detail.price,
        },
      ];
      // 生成订单 id
      GenerateOrder({ goodsId: goodsArr }).then((res) => {
        if (res.data.code === 0) {
          this.$router.push({
            path: "/order",
            query: {
              goodsId: goodsArr[0].id,
              orderId: res.data.data,
              type: "detail",
            },
          });
        } else {
          this.$error(res.data.message);
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.footer {
  width: 100%;
  height: 49px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  border-top: 1px solid #ccc;
  display: flex;
  line-height: 49px;
  .left,
  .right {
    display: flex;
  }
  .left {
    width: 40%;
    justify-content: space-around;
    i {
      font-size: 26px;
    }
  }
  .right {
    height: 100%;
    width: 60%;
    justify-content: space-around;
    text-align: center;
    color: #fff;
    .add-cat {
      height: 100%;
      width: 50%;
      background: #ff9500;
    }
    .buy {
      height: 100%;
      width: 50%;
      background: #f00;
    }
  }
}
</style>

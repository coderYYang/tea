<!--
 * @Author: yy
 * @Date: 2022-07-24 16:32:20
 * @LastEditors: yy 691335336@qq.com
 * @LastEditTime: 2022-07-30 11:22:14
 * @Description: 
-->
<template>
  <div class="pages">
    <div>{{ status ? "支付成功" : "支付失败" }}</div>
    <img v-if="status" src="../assets/images/pay-status.png" alt="支付成功" />
    <van-button type="info" block @click="$router.replace('/')">
      返回首页
    </van-button>
  </div>
</template>

<script>
import { OrderStatus } from "../api/api";
import qs from "qs";
export default {
  name: "",
  data() {
    return {
      out_trade_no: "",
      trade_no: "",
      status: false,
    };
  },
  created() {
    this.out_trade_no = this.$route.query.out_trade_no;
    this.trade_no = this.$route.query.trade_no;
    this.getOrderStatus();
    console.log(123, this.out_trade_no, this.trade_no);
  },
  methods: {
    // 拿到订单状态
    async getOrderStatus() {
      const data = {
        out_trade_no: this.out_trade_no,
        trade_no: this.trade_no,
      };
      const res = await OrderStatus(qs.stringify(data));
      if (res.data.code === 2 || res.data.code === 3) this.status = true;
    },
  },
};
</script>

<style lang="less" scoped>
.pages {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
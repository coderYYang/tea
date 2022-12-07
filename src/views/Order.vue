<template>
  <div class="order">
    <Header>
      <div name="left" @click="$router.back()"></div>
    </Header>
    <div class="content">
      <h3 class="title">收货地址</h3>
      <div class="address" @click="chooseAddress">
        <div class="name-phone">
          <span class="name">{{ address.name }}</span>
          <span class="phone">{{ address.tel }}</span>
        </div>
        <div class="address-in">
          <span>{{ address.province }}</span>
          <span>{{ address.city }}</span>
          <span>{{ address.county }}</span>
          <span>{{ address.addressDetail }}</span>
        </div>
      </div>
      <div class="pay-type">
        <div class="pay-title">
          支付方式：<span style="color: #f00">{{
            payIndex === 0
              ? "微信支付"
              : payIndex === 1
              ? "支付宝支付"
              : payIndex === 2
              ? "银联支付"
              : payIndex === 3
              ? "银行卡支付"
              : "请选择你的支付方式！"
          }}</span>
        </div>
        <div class="type">
          <div
            class="item"
            :class="{ 'pay-action': payIndex === index }"
            v-for="(item, index) in payType"
            :key="index"
            @click="payClick(index)"
          >
            {{ item }}
          </div>
        </div>
      </div>
      <div class="goods" v-for="(item, index) in goodsList" :key="index">
        <img class="goods-image" :src="item.goodsImg" :alt="item.goodsName" />
        <div class="parameter">
          <div class="name">{{ item.goodsName }}</div>
          <div class="bom">
            <div class="gg">规格：无</div>
            <div class="price-num">
              <span class="price">¥{{ item.goodsPrice }}</span>
              <span class="num">x{{ item.goodsNum }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer class="order-footer">
      <div class="total">
        <span>共</span>
        <b class="number">{{ number }}</b>
        <span>件</span>
        <span>总金额：</span>
        <em class="price">¥{{ total }}</em>
      </div>
      <div class="topay" @click="isPayOrder">提价订单</div>
    </footer>
  </div>
</template>

<script>
import Header from "@/components/header";
import {
  SearchAddress,
  CateGoodsDetail,
  SearchOrder,
  ChangeOrderStatus,
  PayOrder,
  GoodsDetail,
} from "@/api/api";
import qs from "qs";

export default {
  name: "Order",
  data() {
    return {
      payIndex: null,
      payType: ["微信支付", "支付宝支付", "银联支付", "银行卡支付"],
      address: {},
      goodsId: [],
      goodsList: [],
      orderId: "",
    };
  },
  components: { Header },
  computed: {
    total() {
      let price = 0;
      this.goodsList.forEach((item) => {
        price += item.goodsPrice * item.goodsNum;
      });
      return price;
    },
    number() {
      let number = 0;
      this.goodsList.forEach((item) => {
        number += Number(item.goodsNum);
      });
      return number;
    },
  },
  created() {
    this.goodsId = this.$route.query.goodsId;
    this.orderId = this.$route.query.orderId;
    this.getSearchAddress();
    this.getCateGoodsDetail();
    this.getSearchOrder();
  },
  methods: {
    // 获取收货地址
    async getSearchAddress() {
      const res = await SearchAddress();
      let { code, data } = res.data;
      if (code === 0) {
        data.forEach((item) => {
          if (item.isDefault === 1) {
            this.address = item;
          } else {
            this.address = data[0];
          }
        });
      } else {
        this.$error(res.data.message);
      }
    },
    // 选择收货地址
    chooseAddress() {
      this.$router.push({
        path: "/address",
        query: {
          type: true,
        },
      });
    },
    //  获取商品详情
    getCateGoodsDetail() {
      if (this.$route.query.type !== "detail") {
        CateGoodsDetail({ id: this.goodsId }).then((res) => {
          if (res.data.code === 0) {
            this.goodsList = res.data.data;
          } else {
            this.$error(res.data.message);
          }
        });
      } else {
        GoodsDetail(this.goodsId).then((res) => {
          if (res.data.code === 0) {
            const data = res.data.data;
            this.goodsList = [
              {
                goodsName: data.name,
                goodsNum: 1,
                goodsPrice: data.price,
                goodsImg: data.imgUrl,
              },
            ];
          } else {
            this.$error(res.data.message);
          }
        });
      }
    },
    // 获取订单信息
    async getSearchOrder() {
      const res = await SearchOrder(this.orderId);
      if (res.data.code === 0) {
        // console.log(res);
      } else {
        this.$error(res.data.message);
      }
    },
    // 支付方式
    payClick(index) {
      if (this.payIndex === index) return;
      this.payIndex = index;
    },
    // 提交订单
    async isPayOrder() {
      if (!Object.keys(this.address).length) return this.$warn("请选择地址！");
      if (!this.payIndex && this.payIndex !== 0)
        return this.$warn("请选择支付方式！");
      const res = await ChangeOrderStatus({
        orderId: this.orderId,
        goodsId: this.goodsId,
      });
      if (res.data.code === 0) {
        // 支付参数
        const goodsName = [];
        this.goodsList.forEach((item) => {
          goodsName.push(item.goodsName);
        });
        const payData = {
          orderId: this.orderId,
          name: goodsName.join(),
          price: this.total,
        };
        // qs.stringify 增加安全性的序列化
        // 去支付
        const ret = await PayOrder(qs.stringify(payData));
        if (ret.data.code === 0) {
          // 打开支付宝支付页面
          window.location.href = ret.data.data;
        }
      } else {
        this.$error(res.data.message);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.order {
  height: 100%;

  .content {
    height: calc(100% - 40px - 49px);
    background-color: #f7f7f7;

    .title {
      padding: 10px 10px;
    }

    .address {
      background-color: #fff;
      padding: 5px 10px;
      position: relative;

      .name-phone {
        font-weight: bold;
        padding-bottom: 6px;
      }

      span {
        padding-right: 6px;
      }
      &:before {
        content: "";
        display: block;
        width: 12px;
        height: 12px;
        border-top: 1px solid #999;
        border-right: 1px solid #999;
        transform: rotate(45deg) translateY(-50%);
        position: absolute;
        right: 20px;
        top: 50%;
      }
    }

    .pay-type {
      padding: 10px;
      background-color: #fff;
      margin-top: 10px;

      .pay-title {
        padding-bottom: 10px;
        border-bottom: 1px solid#eee;
      }

      .type {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-gap: 10px;
        padding-top: 10px;

        .item {
          padding: 5px;
          border: 1px solid #000;
          text-align: center;
          color: #000;
          font-size: 14px;
        }

        .pay-action {
          border: 1px solid #1890ff;
          color: #1890ff;
        }
      }
    }

    .goods {
      padding: 10px;
      display: flex;
      background-color: #fff;
      margin-top: 10px;

      .goods-image {
        height: 74px;
        width: 74px;
        margin-right: 10px;
        border: 1px solid #eee;
      }

      .parameter {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .name {
          font-size: 18px;
        }

        .bom {
          .gg {
            color: #999;
            font-size: 14px;
          }

          .price-num {
            display: flex;
            justify-content: space-between;

            .price {
              color: #f00;
              font-size: 18px;
            }
          }
        }
      }
    }
  }

  .order-footer {
    border-top: 1px solid #eee;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 48px;

    .total {
      span {
        padding: 0 6px;
      }

      .number,
      .price {
        color: #b0352f;
      }

      .price {
        font-size: 18px;
      }
    }

    .topay {
      text-align: center;
      line-height: 48px;
      width: 120px;
      height: 100%;
      background: #b0352f;
      color: #fff;
    }
  }
}
</style>
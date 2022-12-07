<template>
  <div class="category">
    <header class="cate-header">
      <div class="left" @click="$router.push('/home')">
        <i class="iconfont icon-fanhui"></i>
      </div>
      <div class="center">
        <span>购物车</span>
      </div>
      <div class="right">
        <span @click="isEdit" v-text="showEdit ? '完成' : '编辑'"></span>
      </div>
    </header>
    <main class="main" v-if="cateList.length">
      <div class="main-header">
        <van-checkbox
          :value="isChecked"
          checked-color="#ee0a24"
          @click="checkAllFn"
          >商品</van-checkbox
        >
      </div>
      <ul>
        <li v-for="(item, index) in cateList" :key="index">
          <div class="left">
            <van-checkbox
              v-model="item.checked"
              checked-color="#ee0a24"
              @click="CATE_ITEM(index)"
            ></van-checkbox>
          </div>
          <div class="center">
            <img :src="item.goodsImg" alt="goodsImg" />
          </div>
          <div class="right">
            <div class="right-name">
              <div>{{ item.goodsName }}</div>
              <i class="iconfont icon-lajitong" @click="delCates(item.id)"></i>
            </div>
            <div class="price">￥{{ item.goodsPrice }}</div>
            <van-stepper
              v-model="item.goodsNum"
              integer
              @change="numberChange($event, item)"
            />
          </div>
        </li>
      </ul>
    </main>
    <main class="no-main" v-else>
      没有购物车数据 . . . . . .
      <div
        @click="$router.push('/home')"
        style="color: #1890ff; text-decoration: underline"
      >
        去首页逛逛吧!
      </div>
    </main>
    <footer class="cate-footer">
      <div class="checked">
        <van-checkbox
          :value="isChecked"
          checked-color="#ee0a24"
          @click="checkAllFn"
          >商品</van-checkbox
        >
      </div>
      <div class="total" v-show="!showEdit">
        <div>
          共有 <span class="num">{{ total.num }}</span> 件商品
        </div>
        <div>
          总计：<span class="num">￥{{ total.price.toFixed(2) }}</span>
        </div>
      </div>
      <div class="payment" v-if="!showEdit" @click="goOrder">去结算</div>
      <div class="payment" v-else @click="delCates">删除</div>
    </footer>
  </div>
</template>

<script>
// import Header from '@/components/header'
import { SearchCate, NumbreChange, GenerateOrder } from "@/api/api";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "Category",
  data() {
    return {
      checked: true,
      showEdit: false,
    };
  },
  // components: { Header },
  computed: {
    ...mapState({
      cateList: (state) => state.cate.cateList,
      selectList: (state) => state.cate.selectList,
    }),
    ...mapGetters(["isChecked", "total"]),
  },
  created() {
    this.getCateData();
  },
  methods: {
    ...mapMutations(["ADD_CATE", "CATE_ITEM"]),
    ...mapActions(["checkAllFn", "delCates"]),
    // 获取购物车数据
    getCateData() {
      SearchCate().then((res) => {
        if (res.data.code === 0) {
          // 选中状态
          res.data.data.forEach((val) => {
            val.checked = true;
          });
          this.ADD_CATE(res.data.data);
        } else {
          // this.$router.push('/login');
        }
      });
    },
    // 编辑
    isEdit() {
      this.showEdit = !this.showEdit;
    },
    // 商品数量改变
    numberChange(val, item) {
      let data = {
        id: item.id,
        number: val,
      };
      NumbreChange(data).then((res) => {
        if (res.data.code === 0) {
          this.getCateData();
        } else {
          this.$error(res.data.message);
        }
      });
    },
    // 商品结算
    goOrder() {
      if (!this.selectList.length) return this.$warn("请选择商品");
      const goodsArr = [];
      this.cateList.forEach((item) => {
        this.selectList.filter((i) => {
          if (i === item.id) goodsArr.push(item);
        });
      });
      // 生成订单 id
      GenerateOrder({ goodsId: goodsArr }).then((res) => {
        if (res.data.code === 0) {
          this.$router.push({
            path: "/order",
            query: {
              goodsId: this.selectList.join(),
              orderId: res.data.data,
            },
          });
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.category {
  width: 100%;
  height: 100%;

  .cate-header {
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
      font-size: 18px;
    }
  }

  .main {
    width: 100%;
    height: calc(100% - 44px - 50px);
    background: #f5f5f5;
    overflow: auto;

    .main-header {
      padding: 20px;
    }

    ul {
      display: flex;
      flex-direction: column;

      li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #fff;
        padding: 6px 20px;
        margin: 8px 0;

        .left {
          padding-right: 14px;
        }

        .center {
          img {
            width: 74px;
            height: 74px;
          }
        }

        .right {
          flex: 1;
          padding-left: 10px;

          .right-name {
            display: flex;
            justify-content: flex-end;
            font-size: 14px;

            div {
              padding-right: 8px;
            }
          }

          .price {
            color: #b0352f;
            padding: 3px;
            text-align: right;
          }

          .van-stepper {
            text-align: right;
          }
        }
      }
    }
  }

  .no-main {
    width: 100%;
    height: calc(100% - 44px - 50px);
    background: #f5f5f5;
    padding: 20px;
    box-sizing: border-box;

    div {
      margin-top: 20px;
      font-size: 20px;
    }
  }

  .cate-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 48px;
    border-top: 2px solid #ccc;

    .checked {
      padding: 0 15px;
    }

    .total {
      flex: 1;
      font-size: 14px;

      .num {
        color: #b0352f;
      }
    }

    .payment {
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

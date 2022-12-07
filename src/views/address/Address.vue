<template>
  <div class="address">
    <Header></Header>
    <div class="content">
      <ul class="item" v-if="addressList.length">
        <li
          class="address"
          v-for="item in addressList"
          :key="item.id"
          @click="goAddress(item)"
        >
          <div class="info">
            <span class="name">{{ item.name }}</span>
            <span class="phone">{{ item.tel }}</span>
          </div>
          <div class="address-item">
            <span class="default" v-if="item.isDefault === 1">{{
              item.isDefault === 1 ? "[默认]" : ""
            }}</span>
            <span class="info-address"
              >{{ item.province }} {{ item.city }} {{ item.county }}
              {{ item.addressDetail }}</span
            >
          </div>
        </li>
      </ul>
      <h1 v-else style="padding: 15px">暂无地址，请添加地址！</h1>
      <div class="add-address" @click="goAddress('add')">添加地址</div>
    </div>
  </div>
</template>

<script>
import Header from "./child/Header.vue";
import { SearchAddress } from "@/api/api";
import { mapState, mapMutations } from "vuex";
export default {
  name: "Address",
  data() {
    return {
      type: false,
    };
  },
  components: { Header },
  computed: {
    ...mapState({
      addressList(state) {
        return state.address.addressList;
      },
    }),
  },
  created() {
    // 从订单页过来选择地址
    if (this.$route.query.type) this.type = true;
    this.getAddressList();
  },
  methods: {
    ...mapMutations(["GET_ADDRESS"]),
    // 获取用户地址
    getAddressList() {
      SearchAddress().then((res) => {
        if (res.data.code === 0) {
          this.GET_ADDRESS(res.data.data);
        } else {
          this.$error(res.data.message);
        }
      });
    },
    // 添加或修改地址
    goAddress(type) {
      if (!this.type) {
        this.$router.push({
          name: "EditAddress",
          params: {
            key: JSON.stringify(type),
          },
        });
      } else {
        this.$router.go(-1);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.address {
  width: 100%;
  height: 100%;

  .content {
    height: calc(100% - 43px);
    background: #f7f7f7;
    overflow: auto;

    .item {
      .address {
        background: #fff;
        padding: 8px;
        margin: 5px 0;
        box-sizing: border-box;
        width: 100%;
        line-height: 25px;

        span {
          font-size: 14px;
          padding-right: 15px;
        }

        .default {
          color: #b0352f;
        }
      }
    }

    .add-address {
      background: #b0352f;
      color: #fff;
      width: 100px;
      text-align: center;
      border-radius: 3px;
      margin: 40px auto 0;
      padding: 8px;
    }
  }
}
</style>

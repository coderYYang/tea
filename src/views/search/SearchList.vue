<template>
  <div class="search-list">
    <ul>
      <li v-for="(item, index) in titleList.data" :key="index" @click="changeTab(index)">
        <div :class="{'active': titleList.currentIndex === index}">{{item.name}}</div>
        <div class="paixu" v-if="index !== 0">
          <i class="iconfont icon-shangjiantou" :class="{'active': item.status === 1}"></i>
          <i class="iconfont icon-xiajiantou" :class="{'active': item.status === 2}"></i>
        </div>
      </li>
    </ul>
    <div class="goods">
      <ul v-if="searchList.length">
        <li class="goods-item" v-for="(item, index) in searchList" :key="index">
          <img v-lazy="item.imgUrl" alt="" style="width: 100%">
          <span class="title">{{item.name}}</span>
          <div class="bottom">
            <span class="price">￥{{ item.price }}</span>
            <span class="buy" @click="buyFan">立即购买</span>
          </div>
        </li>
      </ul>
      <div v-else style="padding: 20px;">暂无数据...</div>
    </div>
  </div>
</template>

<script>
import {SearchData} from '@/api/api'
export default {
  name: "SearchList",
  data() {
    return {
      searchList: [],
      titleList: {
        currentIndex: 0,
        data: [
          {name: '综合', key: 'zh'},
          {name: '价格', status: 0, key: 'price'},
          {name: '销量', status: 0, key: 'num'}
        ]
      }
    }
  },
  computed: {
    // 获取当前点击的对象
    orderBy() {
      let now = this.titleList.data[this.titleList.currentIndex];
      // 状态判断是升序还是降序
      let price = now.status == 1 ? 'asc' : 'desc';
      return {
        [now.key]: price
      }
    }
  },
  created() {
    this.getSearchData();
  },
  methods: {
    // 获取数据
    getSearchData() {
      let params = {
        searchName: this.$route.query.key,
        ...this.orderBy
      }
      SearchData(params).then(res => {
        if (res.data.code === 0) {
          this.searchList = res.data.data;
        }
      })
    },
    // 切换效果
    changeTab(index) {
      this.titleList.currentIndex = index;
      // 点击下标对应那个数据
      let item = this.titleList.data[index];
      // 取消所有状态值 status = 0
      this.titleList.data.forEach((val, i) => {
        if (i !== index) val.status = 0;
      })
      // 改变当前状态
      if (index === this.titleList.currentIndex) item.status = item.status == 1 ? 2 : 1;
      // 发送请求排序商品
      this.getSearchData();
    },
    // 点击购买
    buyFan() {
      confirm('购买成功!');
    }
  },
  watch: {
    $route() {
      this.getSearchData();
    }
  }
}
</script>

<style lang="less" scoped>
.search-list {
  width: 100%;

  ul {
    display: flex;
    justify-content: space-around;
    padding: 15px 0;

    li {
      display: flex;
      align-items: center;
      font-size: 18px;
      .paixu {
        padding-left: 5px;
        display: flex;
        flex-direction: column;
      }
      .iconfont {
        font-size: 12px;
      }
    }
  }

  .goods {
    width: 100%;

    ul {
      display: flex;
      flex-wrap: wrap;
      padding: 10px 2px;
      justify-content: space-between;

      .goods-item {
        display: flex;
        flex-direction: column;
        width: 48%;
        margin: 5px 2px;
        img [lazy=loading] {
          background: #f7f7f7;
        }

        .title {
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: #333;
          padding: 0 0 10px;
        }
        .bottom {
          width: 100%;
          display: flex;
          justify-content: space-between;
          .price {
            color: #b0352f;
          }
          .buy {
            padding: 3px 6px;
            color: #fff;
            background: #b0352f;
            border-radius: 6px;
          }
        }
      }
    }
  }
}
.active {
  color: #f00;
}
</style>

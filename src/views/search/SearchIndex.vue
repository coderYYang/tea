<template>
  <div class="search-index">
    <div class="search-history" v-if="searchArr.length > 0">
      <div class="icon">
        <div>
          <i class="iconfont icon-shijian"></i>
          <span>搜索历史</span>
        </div>
        <span @click="clearLocalStorage">清空历史记录</span>
      </div>
      <ul>
        <li v-for="(item, index) in searchArr" :key="index" @click="goSearchList(item)">{{ item }}</li>
      </ul>
    </div>
    <div class="no-search" v-else>暂无搜索记录...</div>
  </div>
</template>

<script>
import { Dialog } from "vant";

export default {
  name: "SearchIndex",
  data() {
    return {
      searchArr: []
    }
  },
  created() {
    this.searchArr = JSON.parse(localStorage.getItem('searchList')) || [];
  },
  methods: {
    // 是否清空历史记录
    clearLocalStorage() {
      Dialog.confirm({
        title: '标题',
        message: '弹窗内容',
      }).then((res) => {
        if (res == 'confirm') {
          // 删除本地存储
          localStorage.removeItem('searchList');
          this.searchArr = [];
        }
      }).catch(() => {

      });
    },
    // 点击历史记录，进入搜索结果页
    goSearchList(item) {
      this.$router.push({
        path: '/searchList',
        query: {
          key: item
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.search-index {
  .search-history {
    .icon {
      padding: 20px;
      font-weight: 400;
      font-size: 14px;
      display: flex;
      justify-content: space-between;

      i {
        color: #f00;
        padding-right: 3px;
        font-size: 18px;
      }
    }

    ul {
      display: flex;
      flex-wrap: wrap;
      padding: 0 10px;

      li {
        padding: 3px 6px;
        margin: 10px;
        font-size: 14px;
        border: 1px solid #ccc;
      }
    }
  }

  .no-search {
    padding: 20px;
    font-weight: 400;
    font-size: 14px;
  }
}
</style>

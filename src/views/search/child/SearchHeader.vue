<template>
  <header class="search-header">
    <div class="back" @click="backClick">
      <i class="iconfont icon-fanhui"></i>
    </div>
    <div class="search">
      <i class="iconfont icon-fangdajing"></i>
      <form action="" onsubmit="return false" @keyup.enter="goSearchList">
        <input class="search-input" v-model="searchVal" type="text" placeholder="搜索您喜欢的产品...">
      </form>
    </div>
    <div class="search-text" @click="goSearchList">
      <slot>
        <span>搜索</span>
      </slot>
    </div>
  </header>
</template>

<script>
export default {
  name: 'SearchHeader',
  data() {
    return {
      searchVal: this.$route.query.key || '',
      searchArr: [],
    };
  },
  created() {
    if (this.$route.query.key) {
      this.searchVal = this.$route.query.key;
    }
  },
  methods: {
    // 搜索页面的返回按键
    backClick() {
      if (this.$route.path.includes('/search')) {
        this.searchVal = '';
        this.$router.back();
      }
    },
    // 搜索页面的搜索按键
    goSearchList() {
      // 如果没输入字段，直接 return
      if (!this.searchVal) return;
      // 判断之前有没有搜索
      if (!localStorage.getItem('searchList')) {
        localStorage.setItem('searchList', '[]');
      } else {
        this.searchArr = JSON.parse(localStorage.getItem('searchList'));
      }
      // 不管有没有，都要增加数据
      this.searchArr.unshift(this.searchVal);
      // 数组去重
      let objArr = new Set(this.searchArr);
      // 给本地存储赋值
      // objArr 为一个对象 通过 Array.from() 将它变为数组
      localStorage.setItem('searchList', JSON.stringify(Array.from(objArr)));
      // 值不变 return
      if (this.searchVal == this.$route.query.key) return;
      this.$router.push({
        path: '/searchList',
        query: {
          key: this.searchVal,
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.search-header {
  display: flex;
  width: 100%;
  height: 50px;
  align-items: center;
  text-align: center;
  background: #b0352f;
  color: #fff;

  .back {
    width: 40px;
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

    form {
      width: 100%;
      display: flex;
      align-items: center;

      .search-input {
        width: 100%;
        margin: 0 10px 0 0;
        border: none;
        background: none;
        outline: none;
        color: #333;
      }

      .search-input:focus {
        border: none;
      }
    }
  }

  .search-text {
    width: 40px;
  }

  .iconfont {
    font-size: 20px;
  }
}
</style>

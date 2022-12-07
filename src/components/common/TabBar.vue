<template>
  <div class="tab-bar">
    <ul>
      <li v-for="(item, index) in routerList" :key="index" @click="switchTab(item.path)">
        <img :src="$route.path.includes(item.path) ? item.active : item.image" :alt="item.title">
        <span :class="{'active': $route.path.includes(item.path)}">{{item.title}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "TabBar",
  data() {
    return {
      routerList: [
        {
          title: '首页',
          path: '/home',
          image: './images/home.png',
          active: './images/home-select.png'
        },
        {
          title: '分类',
          path: '/list',
          image: './images/list.png',
          active: './images/list-select.png'
        },
        {
          title: '购物车',
          path: '/cate',
          image: './images/cate.png',
          active: './images/cate-select.png'
        },
        {
          title: '我的',
          path: '/my',
          image: './images/my.png',
          active: './images/my-select.png'
        }
      ]
    }
  },
  methods: {
    // 跳转页面
    switchTab(path) {
      if (this.$route.path == path) return;
      this.$router.replace(path);
    }
  }
}
</script>

<style lang="less" scoped>
.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 60px;
  background: #fff;
  z-index: 999;

  ul {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-around;

    li {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      img {
        width: 30px;
        height: 30px;
      }

      span {
        text-align: center;
        font-size: 14px;
      }
      .active {
        color: red;
      }
    }
  }
}
</style>

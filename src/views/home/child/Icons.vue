<template>
  <ul class="icons">
    <li v-for="item in iconsList" :key="item.id">
      <img :src="item.imgUrl" :alt="item.title">
      <span>{{item.title}}</span>
    </li>
  </ul>
</template>

<script>
export default {
  name: "Icons",
  props: {
    iconsList: Array
  },
  data() {
    return {
    }
  }
}
</script>

<style lang="less" scoped>
.icons {
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
  li {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    img {
      width: 35px;
      height: auto;
    }
    span {
      padding: 6px 0;
    }
  }
}
</style>

<template>
  <div class="like">
    <Card>
      <span>猜你喜欢</span>
    </Card>
    <ul class="like-ul">
      <li v-for="item in likeList" :key="item.id" @click="goDetail(item.id)">
        <img v-lazy="item.imgUrl" :alt="item.name">
        <p class="name">{{ item.name }}</p>
        <span class="price">￥{{ item.price }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import Card from "./Card"

export default {
  name: "Like",
  props: {
    likeList: Array
  },
  data() {
    return {}
  },
  components: {Card},
  methods: {
    // 前往详情商品页面
    goDetail(id) {
      this.$router.push({
        name: 'Detail',
        params: {
          id: id
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.like {
  .like-ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 5px;

    li {
      width: 48%;
      padding: 3px;

      img {
        width: 100%;
      }

      img[lazy=loading] {
        background: #f7f7f7;
      }

      .name {
        color: #222;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 14px;
      }

      .price {
        color: #f00;
      }
    }
  }
}
</style>

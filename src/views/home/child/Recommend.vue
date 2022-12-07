<template>
  <div class="recommend">
    <Card>
      <span>爆款推荐</span>
    </Card>
    <ul class="message">
      <li class="info" v-for="item in recommendList" :key="item.id">
        <img :src="item.imgUrl" :alt="item.name" style="width: 100%; border-radius: 10px">
        <div class="item">
          <div class="name">{{ item.name }}</div>
          <span class="content">{{ item.content }}</span>
          <div class="price">
            <span>￥</span>
            <b>{{ item.price }}</b>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import Card from './Card';
export default {
  name: 'Recommend',
  props: {
    recommendList: Array,
  },
  data() {
    return {};
  },
  components: { Card },
};
</script>

<style lang="less" scoped>
.recommend {
  .message {
    position: relative;

    li {
      padding: 5px 10px;
      position: relative;
      .item {
        position: absolute;
        right: 20px;
        top: 0;
        display: flex;
        flex-direction: column;
        padding: 20px 0;

        .name {
          font-size: 12px;
        }

        .content {
          font-size: 16px;
        }

        .price {
          margin-top: 20px;
          color: #f00;
          text-align: right;
          span {
            font-size: 14px;
          }
        }
      }
    }
  }
}
</style>

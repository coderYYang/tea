<template>
  <div class="list">
    <SearchHeader>
      <i class="iconfont icon-home-line"></i>
    </SearchHeader>
    <div class="content">
      <div class="left">
        <ul>
          <li
            v-for="(item, index) in leftList"
            :key="item.id"
            :class="{ active: titleIndex === index }"
            @click="tabTitle(index)"
          >
            {{ item.title }}
          </li>
        </ul>
      </div>
      <div class="right" @scroll="isScroll">
        <ul class="all">
          <li v-for="item in rightList" :key="item.id" class="lis">
            <Card
              ><span>{{ item.title }}</span></Card
            >
            <ul class="all-in">
              <li v-for="data in item.list" :key="data.id">
                <img :src="data.imgUrl" alt="" />
                <div>{{ data.title }}</div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <TabBar class="list-tab-bar"></TabBar>
  </div>
</template>

<script>
import TabBar from "@/components/common/TabBar";
import SearchHeader from "./search/child/SearchHeader";
import Card from "./home/child/Card";

import { List } from "@/api/api";

export default {
  name: "List",
  data() {
    return {
      currentIndex: 0,
      leftList: [],
      rightList: [],
      allHeight: [],
      scrollY: 0,
    };
  },
  computed: {
    // 滚动改变 index
    titleIndex() {
      return this.allHeight.findIndex((item, index) => {
        this.currentIndex = index;
        return (
          this.scrollY >= item &&
          this.scrollY < this.allHeight[this.currentIndex + 1]
        );
      });
    },
  },
  components: { Card, SearchHeader, TabBar },
  created() {
    this.getList();
  },
  mounted() {
    // 统计所偶板块高度
    let height = 0;
    this.allHeight.push(height);
    // 获取所有 li 以及他们高度
    setTimeout(() => {
      let lis = document.getElementsByClassName("lis");
      Array.from(lis).forEach((val) => {
        height += val.clientHeight;
        this.allHeight.push(height);
      });
    }, 100);
  },
  methods: {
    // 获取分类数据
    getList() {
      List().then((res) => {
        if (res.data.code === 0) {
          let leftArr = [];
          let rightArr = [];
          res.data.data.forEach((val) => {
            // 处理 title 数据
            leftArr.push({
              id: val.id,
              title: val.title,
            });
            // 处理右侧展示数据
            rightArr.push(val.data);
          });
          this.leftList = leftArr;
          this.rightList = rightArr;
        }
      });
    },
    // 切换 title
    tabTitle(index) {
      if (this.currentIndex === index) return;
      this.currentIndex = index;
      // 控制滚动条位置
      let right = document.querySelector(".right");
      right.scrollTo(0, this.allHeight[index]);
    },
    // 监听滚动条事件
    isScroll() {
      this.scrollY = Math.ceil(document.querySelector(".right").scrollTop);
    },
  },
};
</script>

<style lang="less" scoped>
.list {
  width: 100%;
  height: 100%;

  .content {
    height: calc(100% - 50px - 60px);
    overflow: hidden;
    display: flex;

    .left {
      width: 93px;
      background: #fff;
      height: 100%;
      overflow: auto;
      border-right: 1px solid #ccc;

      ul {
        li {
          text-align: center;
          font-size: 14px;
          padding: 10px 0;
          margin: 5px 0;
        }

        .active {
          color: #b54f4a;
          border-left: 4px solid #b54f4a;
        }
      }
    }

    .right {
      width: calc(100% - 93px);
      height: 100%;
      overflow: auto;

      .all {
        .all-in {
          display: flex;
          flex-wrap: wrap;

          li {
            width: 33.3%;
            text-align: center;
            padding: 6px 0;

            img {
              width: 53px;
              height: auto;
            }
          }
        }
      }
    }
  }

  .list-tab-bar {
    border-top: 1px solid #ccc;
  }
}
</style>

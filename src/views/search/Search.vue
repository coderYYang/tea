<template>
  <div class="search">
    <SearchHeader></SearchHeader>
    <div class="content">
      <router-view></router-view>
    </div>
    <TabBar></TabBar>
  </div>
</template>

<script>
import SearchHeader from './child/SearchHeader'
import TabBar from "@/components/common/TabBar"

export default {
  name: "Search",
  components: {
    SearchHeader,
    TabBar
  }
}
</script>

<style lang="less" scoped>
.search {
  width: 100%;
  height: 100%;
  .content {
    width: 100%;
    height: calc(100% - 50px - 60px);
  }
}
</style>

<template>
  <div id="app">
    <!-- 需要缓存页面 -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {
    this.$store.commit('INIT_USER');
  },
};
</script>

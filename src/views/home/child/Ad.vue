<template>
  <div class="ad">
    <ul>
      <li v-for="item in adList" :key="item.id">
        <img :src="item.imgUrl" :alt="item.id" style="width: 100%;">
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Ad",
  props: {
    adList: Array
  }
}
</script>

<style scoped>

</style>

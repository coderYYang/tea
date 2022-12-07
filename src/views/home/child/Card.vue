<template>
  <div class="title">
    <slot>
      <span>火爆推荐</span>
    </slot>
  </div>
</template>

<script>
export default {
  name: "Card"
}
</script>

<style lang="less" scoped>
.title {
  padding: 10px 0;
  text-align: center;
  font-size: 18px;
  span {
    position: relative;
    &:before {
      content: "";
      position: absolute;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      display: block;
      background: #d4c0a7;
      top: 50%;
      margin-top: -4px;
      right: -20px;
    }
    &:after {
      content: "";
      position: absolute;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      display: block;
      background: #d4c0a7;
      top: 50%;
      margin-top: -4px;
      left: -20px;
    }
  }
}
</style>

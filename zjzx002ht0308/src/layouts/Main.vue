<template>
  <div>
    <div class="bg-img">
      <img class="full-img" src="@/assets/bg_n.png" alt="" />
    </div>
    <div class="main">
      <router-view></router-view>
      <comp-guard />
      <comp-claim />
    </div>
  </div>
</template>
<script>
import Claim from '@/components/Claim';
import Guard from '@/components/Guard';

export default {
  components: {
    [Guard.name]: Guard,
    [Claim.name]: Claim,
  },
  
};
</script>
<style lang="less" scoped>
.main {
  position: relative;
  z-index: 2;
  padding: 0 12px;
  margin-top: -150px;
}
.bg-img {
  position: relative;
  overflow: hidden;
  .rule {
    position: absolute;
    right: 0;
    top: 0;
    width: 100px;
    height: 60px;
    font-size: 12px;
    font-weight: bold;
    color: #e9653d;
    background-color: #fbeaa3;
    box-sizing: border-box;
    padding-top: 1rem;
    cursor: pointer;
    text-align: center;
    transform: rotate(45deg) translate3d(14px, -40px, 0);
  }
}
</style>

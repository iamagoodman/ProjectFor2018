<template>
  <div class="wrapper">
    <router-view></router-view>
    <div class="footer">
      <p>本产品由泰康在线财险股份有限公司承保</p>
      <p>京ICP备09074081号-19</p>
      <p>华泰保险经纪有限公司</p>
      <p>京ICP备14020548号</p>
    </div>
  </div>
</template>
<style lang="less" scoped>
.wrapper {
  font-size: 14px;
  width: 100%;
  max-width: 10rem;
  margin: 0 auto;
  background-color: #ed3833;
  // transform: translate3d(0, 0, 0);
}
.footer {
  text-align: center;
  font-size: 12px;
  color: #fff;
  padding: 15px;
  line-height: 20px;
}
</style>

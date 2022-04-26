<template>
  <div class="part guard">
    <div class="title">
      <i></i>
      <span>保障详情</span>
      <i></i>
    </div>
    <div class="guard-content">
      <div class="guard-item">
        <div class="guard-icon">
          <img src="@/assets/icon_2.png" alt="" />
        </div>

        <p>
          <strong>保障范围广</strong>
          <br />
          70种重大疾病
        </p>
      </div>
      <div class="guard-item">
        <div class="guard-icon">
          <img src="@/assets/icon_3.png" alt="" />
        </div>

        <p>
          <strong>保障时间长</strong>
          <br />
          365天
        </p>
      </div>
      <div class="guard-item">
        <div class="guard-icon">
          <img src="@/assets/icon_1.png" alt="" />
        </div>
        <p>
          <strong>确诊即赔</strong>
          <br />
          理赔便捷
        </p>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'comp-guard'
  };
</script>
<style lang="less" scoped>
  .guard {
    padding: 22px 10px;
  }
  .guard-content {
    overflow: hidden;
  }
  .guard-item {
    float: left;
    width: 33.33%;
    p {
      font-size: 13px;
      word-break: break-all;
      text-align: center;
      color: #747474;
      strong {
        color: #282828;
      }
    }
  }
  .guard-icon {
    width: 78px;
    height: 78px;
    border-radius: 78px;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 0 0;
    margin: 0 auto;
    img {
      width: 60px;
    }
  }
</style>

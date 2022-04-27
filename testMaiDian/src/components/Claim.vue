<template>
  <div class="claim-wrapper part">
    <div class="claim-title title">
      <i></i>
      <span>理赔说明</span>
      <i></i>
    </div>
    <div class="claim-detail">
      <div class="item" v-for="(item, index) in steps" :key="index">
        <div class="dian" v-if="index < 2"></div>
        <!--          <span class="number">{{index+1}}</span>-->
        <span class="number"></span>
        <p class="item-title">{{item.title}}</p>
        <p class="item-desc" v-html="item.desc"></p>
      </div>
    </div>
  </div>

</template>
<script>
  import { steps } from '@/utils/claim';
  export default {
    name: 'comp-claim',
    setup() {
      return {
        steps
      };
    }

  }
</script>
<style lang="less" scoped>
  .claim-detail {
    .item {
      position: relative;
      padding-left: 25px;
      padding-bottom: 15px;
      &:last-of-type {
        padding-bottom: 0;
        &:after {
          display: none;
        }
      }
      &:after {
        content: '';
        position: absolute;
        width: 0px;
        height: 100%;
        left: 9px;
        top: 0;
        // background-color: #fccc66;
        // border-left: 1px dotted #f48a50;
        margin-top: 9px;
        z-index: 2;
      }
      .dian {
        position: absolute;
        width: 0;
        left: 7px;
        top: 24px;
        bottom: 8px;
        border-left: 1px dashed #eb5744;
      }
    }
    .item-title {
      font-size: 13px;
      color: #414141;
      // padding-bottom: 5px;
      // background-color: #f48a50;
      display: inline-block;
      // border-radius: 20px;
      font-weight: 500;
      margin-bottom: 5px;
    }
    .item-desc {
      font-size: 12px;
      color: #6c6c6c;
      line-height: 1.6;
    }
    .number {
      background-color: #eb5744;
      font-size: 10px;
      width: 16px;
      height: 16px;
      line-height: 16px;
      border-radius: 20px;
      text-align: center;
      position: absolute;
      left: 0;
      top: 2px;
      z-index: 3;
      color: #fff;

    }
  }
</style>
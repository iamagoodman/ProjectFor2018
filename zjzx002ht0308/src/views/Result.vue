<template>
<div class="main">
    <div class="result">
      <img class="icon-img" :src="status.img" alt="" />
      <div class="message-content">
        <span style="color: #fff">{{ status.text }}</span>
      </div>
    </div>
    <div class="double">
      <!-- <div class="title">福利再加倍，好礼第二重</div>
      <div>
        <p class="welfare">
          <i></i>
          <span>恭喜你获得升级福利</span>
          <i></i>
        </p>
        <p class="safeguard">6,000,000 专属医疗保障</p>
      </div> -->
      <img src="@/assets/gift.png" class="full-img"/>
    </div>
    <button class="goonBtn" v-if="countDown.seconds > 0" @click="getForwardUrl">立即投保({{countDown.seconds}})秒</button>
    <button class="goonBtn" v-else @submit="getForwardUrl">立即投保</button>
  </div>
</template>
<script>
import { useRoute } from 'vue-router';
import { useCountDown } from '@vant/use';
import { useService, useLocationQuery } from '@/hooks';
import { api } from '@/service';
import { getJumpUrl, parseJson } from 'utils';
// import { customSessionStorage } from '@/utils/utils';
import { STORAGE_KEY } from '@/constants';


const STATUS = {
  N: {
    img: require('../assets/success.png'),
    text: '恭喜领取成功',
    already: 'N'
  },
  Y: {
    img: require('../assets/warning.png'),
    text: '您已经领取过该保障',
    already: 'Y'
  },
  F: {
    img: require('../assets/warning.png'),
    text: '很遗憾，您与福利擦肩而过！',
    already: 'F'
  }
};

export default {
  
    setup() {
        const { params } = useRoute();
        const locationParams = useLocationQuery();
        const { request } = useService({api: api.forward, data: { link: locationParams.link }});
        const countDown = useCountDown({
            time: 4 * 1000,
            onFinish: () => {
                getForwardUrl()
            }
        })
        countDown.start()
        const getForwardUrl = () => {
          request().then(res => {
            if (res.reasonCode === '10200') {
              const jumpUrl = getJumpUrl({
                // ...customSessionStorage.getItem(STORAGE_KEY.DATA),
                ...parseJson(sessionStorage[STORAGE_KEY.DATA]),
                locationParams,
                data: res.data,
                already: params.status 
            });
              location.href = jumpUrl;
            }
          })
        }
       
        return {
            status: STATUS[params.status] || {},
            getForwardUrl,
            countDown: countDown.current,
        }
    }
}
</script>
<style lang="less" scoped>
.main {
  padding: 32px 22px;
  background: url('../assets/success_bg.png') 0 0 no-repeat;
  background-size: 100%;
  box-sizing: border-box;
  min-height: calc(~'100vh - 148px');
}
.result {
  padding-bottom: 20px;
}
.message-content {
  font-size: 19px;
  text-align: center;
  padding-top: 12px;
}
.icon-img {
  display: block;
  width: 70px;
  margin: 0 auto;
}
.goonBtn {
  border: 0;
  width: 260px;
  height: 58px;
  text-align: center;
  color: #fff;
  font-size: 15px;
  background: linear-gradient(#fdd361, #f9c54e, #f79639);
  display: block;
  margin: 28px auto 0;
  border-radius: 32px;
  box-shadow: 0px 6px 9px #e56137;
}
.double {
  position: relative;
  // background-color: #f5dda6;
  text-align: center;
  // border-radius: 20px;
  // padding-top: 50px;
  padding-bottom: 18px;
  .title {
    font-size: 19px;
    color: #fff;
    text-align: center;
    position: absolute;
    background: url('../assets/double_bg.png') 0 0 no-repeat;
    background-size: 100%;
    width: 265px;
    height: 51px;
    line-height: 51px;
    left: 50%;
    margin-left: -132px;
    top: -18px;
  }
  .safeguard {
    font-size: 25px;
    color: #f56236;
    font-weight: 500;
    padding: 10px 0;
  }
  .receive,
  .welfare {
    color: #ff531f;
    font-size: 15px;

    height: 30px;
    line-height: 30px;
  }
  .welfare {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 0 0;
    i {
      width: 30px;
      height: 20px;
      background: url('../assets/arrow.png') center center no-repeat;
      transform: rotate(90deg);
      background-size: 7px 12px;
    }
  }
}
</style>
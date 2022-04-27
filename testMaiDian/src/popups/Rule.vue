<template>
  <van-popup :show="show" @click="click" @click-overlay="click" teleport="body" closeable round>
    <div class="popup-title van-hairline--bottom">活动规则</div>
    <div class="popup-content rule-content">
      <h5>一、参与方式：</h5>
      <p>
        参与活动的有效用户每人限领一份赠险，同时领取赠险的用户应当符合保险公司的年龄及职业要求等投保限制。同一手机号码或同一身份证号视为一个有效用户，无法重复领取。
      </p>
      <h5>二、中奖规则：</h5>
      <p>
        1、中奖方式：免费领取保险的活动参与者中，首个保单尾号为666666的用户，将免费获得价值6000元的华为P40
        pro手机一部（本次活动限1一部，以首位产生保单尾号是666666的用户为准，若同一保单已参与过国华人寿其他同类型活动的不可重复领取。）
      </p>
      <p>2、中奖结果查看：请成功领取赠险的用户，自行根据电子保单的保单号确认中奖结果。</p>
      <p>
        3、奖品领取方式：获奖用户请关注“有益保”微信公众号并回复“保单尾号666666”进行兑奖，客服将在验证资料成功后，根据用户提供的相关信息于15个工作日内将活动奖品寄出，获奖保单生效后10天内，如未提供完整有效信息，则视为其自动放弃本次奖励。
      </p>
      <h5>三、注意事项：</h5>
      <p>1、用户参与本次活动时，应遵守平台相关规则；</p>
      <p>
        2、活动期间如出现不可抗力或情势变更的情况（包括重大灾害事件、活动受政府机关指令需要停止举办或调整的、活动遭受严重网络攻击或系统故障等）导致活动需要停止或调整的，我们有权停止或调整活动页面而无需向用户进行赔偿或补偿；
      </p>
      <p>
        3、在参与活动过程中，如用户出现作弊领取等违规行为，我们有权取消用户参与活动及获得奖励的资格，并有权收回已获得的权益，必要时追究法律责任；
      </p>
      <p>4、如有任何疑问，可致电客服电话021-31779763。</p>
    </div>
  </van-popup>
</template>
<script>
import { Popup } from 'vant';
export default {
  name: 'pop-rule',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  components: {
    [Popup.name]: Popup
  },
  setup(props, context) {
      const click = () => {
          context.emit('change', !props.show)
      }
      return {
          click
      }
  },
};
</script>
<style lang="less" scoped>
// .rule-content {
//   height: calc(80vh - 54px);
//   overflow: auto;
//   box-sizing: border-box;
//   padding: 15px;
//   p,
//   h5 {
//     color: #282828;
//     font-size: 12px;
//     font-weight: normal;
//   }
//   p {
//     text-indent: 24px;
//   }
// }
.rule-content {
  width: 8rem;
}
</style>

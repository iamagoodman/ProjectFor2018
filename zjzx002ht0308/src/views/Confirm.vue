<template>
  <div class="container">
    <div class="confirm-tip">为保证被保人您的保险权益在理赔时不受影响，请确认被保人是否符合投保条件</div>
    <van-tabs :active="active" type="card" :before-change="() => false">
      <van-tab title="健康告知" name="health">
        <div class="confirm-content">
          <div class="health-content" v-html="HEALTH_CONTENT"></div>
          <p class="product-tip">
            如有隐瞒或告知不实，影响保险公司承保决定的，所签发的保单视为无效，保险公司有权解除合同，并对合同解除前发生的任何保险事故不承担任何责任。
          </p>
          <div class="confirm-action">
            <button class="first-btn" @click="showHealth = true">部分为“否”</button>
            <button class="second-btn" @click="onChange('important')">全部为“否” 下一步</button>
          </div>
        </div>
      </van-tab>
      <van-tab title="重要提示" name="important">
        <div class="confirm-content">
          <div class="know-content" v-html="knowContent"></div>
          <div class="clause">
            <p>保险条款以及特别约定</p>
            <comp-clause :keys="keys" />
          </div>
          <div class="confirm-action">
            <button class="first-btn" @click="onChange('health')">上一步</button>
            <button class="second-btn" @click="onSubmit">我已阅读并投保</button>
          </div>
        </div>
      </van-tab>
    </van-tabs>
    <pop-health v-model:show="showHealth" />
    <pop-fail v-model:show="showFail" :errorMsg="errorMsg" />
    <pop-clause v-model:show="showMajor" title="泰康在线高危职业分类表" :content="MAJOR_CONTENT" />
  </div>
</template>
<script>
import { reactive, toRefs, computed, onUnmounted } from 'vue'

import { Tab, Tabs, Toast } from 'vant'
import Clause from '@/components/Clause'
import { Health, Fail, Clause as PopClause } from '@/popups'
import { KNOW_CONTENT, HEALTH_CONTENT, MAJOR_CONTENT } from '@/utils/clause'
import { useService } from '@/hooks'
import { api } from '@/service'

export default {
  name: 'confirm',
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Clause.name]: Clause,
    [Health.name]: Health,
    [Fail.name]: Fail,
    [PopClause.name]: PopClause,
  },

  setup() {
    // const router = useRouter();
    const state = reactive({
      active: 'health',
      showHealth: false,
      showFail: false,
      showMajor: false,
      errorMsg: '很遗憾，您核保失败，欢迎选购我司其他保险产品',
    })
    const knowContent = computed(() => KNOW_CONTENT)
    const { request } = useService({ api: api.activate, showToast: false })

    const keys = computed(() => {
      return ['insure', 'know', 'serve', 'privacy', 'appoint', 'sqwt', 'customer_know']
    })

    const onChange = (value) => {
      state.active = value
    }
    const createJumpUrl = ({ utm_campaign, utm_medium, utm_source, productNo, already, applicant }) => {
      const data = {
        utm_campaign,
        utm_medium,
        utm_source,
        already,
        fromUrl: `productNo=${productNo}&name=${applicant.applicantName}&id=${applicant.id}&mobile=${applicant.mobile}&sex=${applicant.sex}&already=${already}`,
      }
      const search = Object.keys(data)
        .map((key) => `${key}=${encodeURIComponent(data[key])}`)
        .join('&')
      const targetHtml = 'shPolicy.html'
      const url = location.origin + location.pathname.split('free.html')[0] + targetHtml + '?' + search
      return url
    }
    const toPolicyPage = (data) => {
      const url = createJumpUrl(data)
      sessionStorage.removeItem('memoryArray')
      location.href = url
    }
    const goNext = (data) => {
      toPolicyPage(data)
    }
    const onSubmit = () => {
      const requestData = JSON.parse(sessionStorage.requestData)
      const data = {
        ...requestData,
        recallResource: sessionStorage.memoryArray,
      }
      console.log(data)
      request(JSON.stringify(data))
        .then((res) => {
          // 10200 领取成功
          let already = '',
            policyNo = '',
            businessNo = ''
          window.recordfn()
          if (res.reasonCode === '10200') {
            // 领取成功
            already = 'N'
            policyNo = res.data.policyNo
            businessNo = res.data.businessNo
          } else if (res.reasonCode === '10600') {
            // 已领取过
            already = 'Y'
          } else {
            // 领取失败
            already = 'F'
          }
          goNext({ ...data, already, policyNo, businessNo, productNo: data.common.productNo })
        })
        .catch((err) => {
          Toast(err.message || '投保失败')
        })
    }

    window.showMajor = () => {
      state.showMajor = true
    }
    onUnmounted(() => {
      window.showMajor = null
    })
    return {
      ...toRefs(state),
      HEALTH_CONTENT,
      MAJOR_CONTENT,
      knowContent,
      onChange,
      onSubmit,
      keys,
    }
  },
}
</script>
<style lang="less" scoped>
.container {
  padding: 15px;
  background-color: #fff;
  min-height: 100vh;
  box-sizing: border-box;
}
.confirm-tip {
  font-size: 14px;
  color: #323232;
  background-color: #fff6e5;
  line-height: 22px;
  margin-bottom: 20px;
  padding: 8px 20px;
  border-radius: 30px;
}
.confirm-content {
  color: #666;
  padding: 10px;
  line-height: 2;
  strong {
    color: #3b3b3b;
  }
}
.know-content,
.health-content {
  height: calc(100vh - 30px - 20px - 62px - 38px - 190px);
  overflow: auto;
  border-bottom: 1px solid #eaeaea;
}

.clause,
.product-tip {
  color: #3b3b3b;
  font-weight: 500;
  padding-top: 10px;

  :deep .clause {
    color: #3b3b3b !important;
    font-weight: 500;
  }
}

.confirm-action {
  overflow: hidden;
}
.confirm-action {
  padding-top: 10px;
  button {
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #fff;
    border-radius: 40px;
    font-size: 14px;
  }
  .first-btn {
    background-color: #f9c74f;
    float: left;
    width: 35%;
    box-shadow: 0 0 4px #f9c74f;
  }
  .second-btn {
    background-color: #f59a59;
    float: right;
    width: 60%;
    box-shadow: 0 0 4px #f59a59;
  }
}
</style>

<template>
  <div class="part receive">
    <p class="title no-bottom">
      <var></var>
      <span>凭手机号免费领取</span>
      <var></var>
    </p>
    <comp-person />
    <div>
      <div class="insure-info-wrapper">
        <van-field
          label="手机号"
          label-class="field-label"
          placeholder="请填写手机号"
          maxlength="13"
          type="tel"
          clearable
          v-model="mobile"
          :border="false"
          :error-message="errorMessage.mobile"
          @blur="validateBlur('mobile', $event, false)"
          @focus="onFocus('selfMobile', 'mobile')"
          :formatter="mobileFormatter"
        />
        <comp-captcha
          v-show="showCaptcha"
          :mobile="mobile"
          auto
          v-model="captcha"
          :error-message="errorMessage.captcha"
          @blur="validateBlur('captcha', $event, false)"
          @focus="onFocus('captcha', 'captcha')"
          :formatter="captchaFormatter"
        />
        <van-field
          label="姓&emsp;名"
          label-class="field-label"
          v-model="application.name"
          placeholder="请填写姓名"
          clearable
          :error-message="errorMessage.name"
          @blur="validateBlur('name', $event, false)"
          @focus="onFocus('selfName', 'name')"
          v-if="showInsure"
        ></van-field>
        <van-field
          label="身份证"
          label-class="field-label"
          v-model="application.idNumber"
          placeholder="仅用于领取保障"
          clearable
          :error-message="errorMessage.idNumber"
          @blur="validateBlur('idNumber', $event, false)"
          @focus="onFocus('selfIdNumber', 'idNumber')"
          v-if="showInsure"
        ></van-field>
      </div>
      <!-- <p class="person-count">已有{{personCount}}人领取</p> -->
      <comp-button className="submit-wrapper" text="立即领取" @submit="onActivate"></comp-button>
      <comp-agree
        v-if="visible"
        checked-color="#ffad01"
        :keys="keys"
        v-model:checked="agree"
        v-model:show="show"
        @submit="onSubmit"
      />
    </div>
  </div>
</template>
<script>
import { reactive, toRefs, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Field } from 'vant'
import { Button, Agree, Captcha, Person } from '@/components'
import { useCaptcha, useValidate, useService, useLocationQuery } from '@/hooks'
import { formatterMobile, formatMobile, isMobile, getInfoById, getBasicPolicyData, isValidIdNumber } from 'utils'
import { api } from '@/service'
import { FEE } from '@/constants'
import { getFee, getPaymentListYear, getItem, setItem, getCustomerIp } from '@/utils/utils'
// import { rrwebRun } from '@/utils/rrwebrun';
import track from '@/utils/track'
export default {
  components: {
    [Field.name]: Field,
    [Button.name]: Button,
    [Agree.name]: Agree,
    [Captcha.name]: Captcha,
    [Person.name]: Person,
  },
  setup() {
    // rrwebRun();
    track('freePage')
    const { insureds = INIT_INSUREDS_INFO, mobile } = getItem()
    const { countDown, sendCode, showCode, getCaptcha } = useCaptcha({ mobile, auto: true })

    const { request: receiveRequest } = useService({ api: api.receive })
    const locationParams = useLocationQuery()
    const router = useRouter()
    // const { request: forwardRequest } = useService({ api: api.forward, data: { link: locationParams.link}})
    const { request: saveRequest } = useService({ api: api.save, showToast: false })
    const { errorMessage, validate, validateBlur, changeErrorMessage } = useValidate({
      defaultMessage: { name: '', idNumber: '', mobile: '', captcha: '' },
      strategyMap: {
        idNumber: [
          {
            message: '身份证号码不能为空',
            test: (value) => !!value,
          },
          {
            message: '身份证号码格式不正确',
            test: (value) => isValidIdNumber(value),
          },
        ],
      },
    })

    const state = reactive({
      agree: false,
      show: false,
      mobile,
      captcha: '',
      showCaptcha: false, // 是否显示验证码
      confirm: true, // 是否需要确认页面
      // personCount: 783773,
      auto: false, // 验证码自动跳转
      showInsure: false,
      visible: true,
      keys: ['insure', 'health', 'know', 'serve', 'privacy', 'appoint', 'sqwt', 'customer_know'],
      insureds,
      submitAppliIdentity: 'Self',
      jump: true, // 是否有成功页 true->无  false->有
    })

    const fee = computed(() => {
      return getFee(insured.value.age, FEE) || { amount: 600, premium: 0.24 }
    })
    const application = computed(() => {
      // 投保人
      return state.insureds[state.submitAppliIdentity]
    })

    const insured = computed(() => {
      // 被保人
      return state.insureds[state.submitAppliIdentity]
    })
    const transFKey = {
      selfMobile: 'mobile',
      captcha: 'captcha',
      selfName: 'applicantName',
      selfIdNumber: 'applicantId',
    }
    const onFocus = (trackKey, errorKey) => {
      track(transFKey[trackKey])
      changeErrorMessage(errorKey, '')
    }

    const captchaFormatter = (value) => {
      if (value && value.length > 4) {
        return value.substring(0, 4)
      }
      return value
    }
    const getPayBackUrl = () => {
      return location.origin + location.pathname + location.search
    }
    const onSubmit = () => {
      state.agree = true
      state.show = false
      track('activationGuarantee')
      const { common = {} } = getBasicPolicyData(locationParams)
      const phoneNo = formatMobile(state.mobile)
      const data = {
        paybackUrl: getPayBackUrl(),
        utm_campaign: locationParams.utm_campaign,
        utm_source: locationParams.utm_source,
        utm_medium: locationParams.utm_medium,
        needMsgCheck: false,
        phoneNo,
        captcha: state.captcha,
        channelTranslate: {
          common: {
            ...locationParams,
            utmCampaign: locationParams.utm_campaign,
            utmSource: locationParams.utm_source,
            utmMedium: locationParams.utm_medium,
          },
        },
        customerIp: getCustomerIp(),
        // cookie: getCookie('uuid'),
        // recallResource: sessionStorage.memoryArray,
        common: {
          ...common,
          channelNo: window.channelNo,
          productNo: window.productNo,
          companyNo: window.companyNo,
          sumAmount: fee.value.amount,
          sumPremium: fee.value.premium,
          autoRenewal: false,
          payMode: '01',
        },
        paymentInfoList: getPaymentListYear(fee.value.premium),
        applicant: {
          // 投保人
          applicantType: 'IndividualClient',
          applicantName: application.value.name,
          idType: 'IdentityCard',
          id: application.value.idNumber,
          mobile: phoneNo,
          sex: application.value.gender,
          birthday: application.value.birthday,
          socialSecurityType: '1',
          insuredIdentity: state.submitAppliIdentity, // 与被保人关系
        },
        enableCorrect: false,
        insured: [
          // 被保人
          {
            insuredType: 'IndividualClient',
            insuredName: insured.value.name,
            idType: 'IdentityCard',
            id: insured.value.idNumber,
            mobile: phoneNo,
            sex: insured.value.gender,
            birthday: insured.value.birthday,
            socialSecurityType: '1',
            applicantIdentity: state.submitAppliIdentity, // 与投保人关系
          },
        ],
      }
      sessionStorage.requestData = JSON.stringify(data)
      router.push({
        path: '/confirm',
      })
    }
    const onReceive = () => {
      const phoneNo = formatMobile(state.mobile)
      state.agree = true
      state.show = false
      receiveRequest({
        phoneNo,
        uniqueId: window.productNo,
        link: locationParams.tbblink || locationParams.link,
        type: 'CAPTCHA_PRODUCT',
        captcha: state.captcha,
      }).then((res) => {
        if (res.reasonCode === '10200') {
          onSubmit()
        }
      })
    }
    const onActivate = () => {
      const data = { mobile: state.mobile }
      if (state.showCaptcha) {
        data.captcha = state.captcha
      }
      if (state.showInsure) {
        data.idNumber = insured.value.idNumber
        data.name = insured.value.name
      }
      const isNext = validate(data, true)

      if (isNext) {
        if (!state.agree) {
          state.show = true
          return
        }

        // onSubmit();
        onReceive()
      }
    }

    watch(
      [() => state.mobile, () => insured, () => application],
      ([mobile]) => {
        setItem({
          insureds: state.insureds,
          mobile,
          appliIdentity: state.submitAppliIdentity,
        })
      },
      { deep: true },
    )

    const onSave = (captcha) => {
      const clients = Object.keys(state.insureds).map((item) => ({
        name: state.insureds[item].name,
        identityNo: state.insureds[item].idNumber,
      }))
      const data = {
        link: locationParams.link,
        phoneNo: formatMobile(state.mobile),
        captcha,
        clients,
      }
      saveRequest(JSON.stringify(data)).catch(() => {})
    }

    watch(
      () => insured.value.idNumber,
      (value) => {
        const { age, birthday, gender } = getInfoById(value, 1, 0)
        insured.value.birthday = birthday
        insured.value.gender = gender
        insured.value.age = age
      },
      { deep: true, immediate: true },
    )

    watch(
      () => application.value.idNumber,
      (value) => {
        const { age, birthday, gender } = getInfoById(value, 1, 0)
        application.value.birthday = birthday
        application.value.gender = gender
        application.value.age = age
        if (age > -1) {
          onSave(state.captcha)
        }
      },
      { deep: true, immediate: true },
    )

    const onSend = () => {
      const isNext = validate({ mobile: state.mobile }, true)
      if (isNext) {
        getCaptcha(state.mobile)
      }
    }

    // watch(() => state.captcha, (val) => {
    //     const errs = judge({ mobile: state.mobile, captcha: val}, true);
    //     if (!errs.length && state.auto && state.agree) {
    //         onSubmit();
    //     }
    // })
    watch(
      () => state.captcha,
      (val) => {
        if (/^\d{4}$/.test(val)) {
          state.showInsure = true
          changeErrorMessage('captcha', '')
          onSave(val)
        }
      },
    )

    watch(
      () => state.mobile,
      (val) => {
        if (isMobile(val)) {
          state.showCaptcha = true
        }
      },
      { immediate: true },
    )

    // 12345678900

    return {
      ...toRefs(state),
      errorMessage,
      countDown: countDown.current,
      sendCode,
      showCode,
      onSend,
      validateBlur,
      track,
      onFocus,
      mobileFormatter: formatterMobile,
      onSubmit,
      onActivate,
      insured,
      application,
      captchaFormatter,
    }
  },
}
</script>
<style lang="less" scoped>
.person-count {
  color: #eb5744;
  font-size: 15px;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 15px;
}
.submit-wrapper {
  margin-top: 20px;
}
</style>

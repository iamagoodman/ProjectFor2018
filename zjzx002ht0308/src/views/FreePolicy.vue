<template>
<div class="part activate">
   <p class="title no-bottom">最后一步，完善被保人信息，激活保障</p>
   <comp-person />
    <div >
      <div>
        <div  class="insure-info-wrapper">
          <van-field
            label="姓&emsp;名"
            label-class="field-label"
            v-model="insured.name"
            placeholder="请填写姓名"
            clearable
            :error-message="errorMessage.name"
            @blur="validateBlur('name', $event)"
            @focus="track('selfName')"
          ></van-field>
          <van-field
            label="身份证"
            label-class="field-label"
            v-model="insured.idNumber"
            placeholder="信息仅用于投保"
            clearable
            :error-message="errorMessage.idNumber"
            @blur="validateBlur('idNumber', $event)"
            @focus="track('selfIdNumber')"
          ></van-field>
         <van-field
            class="mobile-container"
            placeholder="请输入手机号"
            label="手机号"
            label-class="field-label"
            v-model="encryptMobile"
            readonly
          ></van-field>
        </div>
      </div>
      <!-- <comp-agree 
      checked-color="#ffad01"
        :keys="keys" 
        v-model:checked="agree" 
        v-model:show="show"
        @submit="onSubmit"
      /> -->
      <comp-button text="激活保障" @submit="onActivate"></comp-button>
      
    </div>
  </div>
</template>
<script>
import { reactive, toRefs ,  watch, computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Field, Toast } from 'vant';
// import Agree from '@/components/Agree';
import  {Button, Person } from '@/components';
import { useValidate, useService, useLocationQuery } from '@/hooks';
import { getInfoById, encryptionMobile,  getJumpUrl , getBasicPolicyData, track, giftActivationGuaranteeCallback, isValidIdNumber} from 'utils';
import { STORAGE_KEY } from '@/constants';
import { api } from '@/service';

export default {
    components: {
        [Field.name]: Field,
        // [Agree.name]: Agree,
        [Button.name]: Button,
        [Person.name]: Person
    },
    setup() {
       

        const locationParams = useLocationQuery();

        const { request } = useService({ api: api.activate, showToast: false});
        const { request: forwardRequest } = useService({ api: api.forward, data: { link: locationParams.link}})

        const router  = useRouter();
        
        const name = ref(''), idNumber = ref('');
      const { errorMessage, validate, validateInput,  validateBlur } = useValidate({ 
        defaultMessage: { name: '', idNumber: ''}, 
        reactiveData: { name, idNumber },
        strategyMap: {
          idNumber: [{
            message: '身份证号码不能为空',
            test: (value) => !!value
        },
        {
            message: '身份证号码格式不正确',
            test: (value) => isValidIdNumber(value)
        }]
        }
        });
      
        const state = reactive({
            agree: true,
            show: false,
            mobile: sessionStorage[STORAGE_KEY.MOBILE],
            insured: {
                name,
                idNumber,
                birthday: '',
                gender: '',
                age: -1
            },
            submitAppliIdentity: 'Self',
            application: {

            },
            jump: false,// 是否有成功页 true->无  false->有
            // keys: ['insure','health','know', 'serve', 'privacy', 'appoint'],
            keys: ['insure', 'health', 'know']
        })

        const encryptMobile = computed(() => encryptionMobile(state.mobile));

        const gotoSuccess = (data) => {
          router.push({
            path: `/result/${data.already}`
          })
        }

        const getForwardUrl = (data) => {
          forwardRequest().then(res => {
            if (res.reasonCode === '10200') {
              const jumpUrl = getJumpUrl({ ...data, data: res.data, locationParams });
              location.href = jumpUrl;
            }
          })
        }

        const setCacheData = (data) => {
          const prePolicyData = {
            preProductNo: data.productNo,
            prePolicyNo: data.policyNo
          };
          sessionStorage[STORAGE_KEY.POLICY] = JSON.stringify(prePolicyData);
          sessionStorage[STORAGE_KEY.DATA] = JSON.stringify(data);
        }

        const goNext = (data) => {
          // customSessionStorage.setItem(STORAGE_KEY.DATA, data);
          // sessionStorage[STORAGE_KEY.DATA] = data;
          setCacheData(data);
          if (state.jump) { // 无成功页
            getForwardUrl(data);
          } else { // 有成功页
            gotoSuccess(data);
          }
        }

        const onSubmit = () => {
          state.agree = true;
          state.show = false;
        const { basic = {}, channelTranslate = {}, common = {}} = getBasicPolicyData(locationParams);
                const data = {
                  ...basic,
                  needMsgCheck: false,
                  phoneNo: state.mobile,
                  channelTranslate,
                  common: {
                    ...common,
                    sumAmount: 5000,
                    sumPremium: 0,
                    payMode: '01'
                  },
                  applicant: {
                    // 投保人
                    applicantType: 'IndividualClient',
                    applicantName: state.application.name,
                    idType: 'IdentityCard',
                    id: state.application.idNumber,
                    mobile: state.mobile,
                    sex: state.application.gender,
                    birthday: state.application.birthday,
                    socialSecurityType: '1',
                    insuredIdentity: state.submitAppliIdentity // 与被保人关系
                  },
                  insured: [
                    // 被保人
                    {
                      insuredType: 'IndividualClient',
                      insuredName: state.insured.name,
                      idType: 'IdentityCard',
                      id: state.insured.idNumber,
                      mobile: state.mobile,
                      sex: state.insured.gender,
                      birthday: state.insured.birthday,
                      socialSecurityType: '1',
                      applicantIdentity: state.submitAppliIdentity // 与投保人关系
                    }
                  ],
                  paymentInfoList: []
                }
                request(JSON.stringify(data)).then(res => { // 10200 领取成功
                   let already = '', policyNo = '', businessNo = '';
                  if (res.reasonCode === '10200') { // 领取成功
                    already = 'N';
                    policyNo = res.data.policyNo;
                    businessNo = res.data.businessNo;
                    try {
                      giftActivationGuaranteeCallback();
                    } catch(e) {
                      console.log(e);
                    }
                  } else if (res.reasonCode === '10600') { // 已领取过
                    already = 'Y'
                  } else { // 领取失败
                    already = 'F'
                  }
                  goNext({...data, already, policyNo, businessNo, productNo: data.common.productNo })
                }).catch(err => {
                  Toast(err.message || '投保失败');
                })
        }

        const onActivate = () => {
           track('activationGuarantee');
            const isNext = validate({name: state.insured.name, idNumber: state.insured.idNumber}, true);
            
            if (isNext) {
              if (!state.agree) {
                state.show = true;
                return;
              }
                
              onSubmit();
                
            }
        }

        

        watch(() => state.insured, (value) => {
            if (state.submitAppliIdentity === 'Self') {
                state.application = { ...value }
            }
        }, { deep: true })

        watch(() => state.insured.idNumber, (value) => {
            const { age, birthday, gender} = getInfoById(value);
            state.insured.birthday = birthday;
            state.insured.gender = gender;
            state.insured.age = age;
        }, { deep: true })

        return {
            ...toRefs(state),
            encryptMobile,
            errorMessage,
            validateInput,
            validateBlur,
            onActivate,
            onSubmit,
            track
        }
    },
}
</script>
<style lang="less" scoped>
.activate {
  .title {
    font-size: 17px;
  }
}
</style>

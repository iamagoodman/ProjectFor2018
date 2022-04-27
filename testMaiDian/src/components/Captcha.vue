<template>
    <div class="code-wrapper">
        <van-field 
            label="验证码" 
            label-class="field-label"
            placeholder="请输入验证码"
            clearable
            type="digit"
            :border="false"
            :model-value="modelValue"
            :error-message="errorMessage"
            @blur="$emit('blur', $event)"
            @focus="$emit('focus', $event)"
            @update:model-value="$emit('update:model-value', $event)"
            :formatter="formatter"
        />
        <button class="code-btn code-text-btn" v-if="countDown.seconds<=0" @click="onSend">获取</button>
        <button class="code-btn code-second-btn" v-else>{{countDown.seconds}}秒</button>
    </div>
</template>
<script>
    import { watch } from 'vue';
    import { Field , Toast } from 'vant';
    import { isMobile } from 'utils';
    import { useCaptcha, useValidate } from '@/hooks';

    export default {
        name: 'comp-captcha',
        components: {
            [Field.name]: Field
        },
        props: {
            errorMessage: {
                type: String
            },
            mobile: {
                type: String
            },
            modelValue: {
                type: String
            },
            auto: {
                type: Boolean,
                default: true
            },
            formatter: {
                type: Function
            }

        },
        setup(props) {
            const { countDown, getCaptcha } = useCaptcha();
            const {  validate } = useValidate({ defaultMessage: { mobile: ''}, reactiveData: { mobile: props.mobile}});
           
            // 发送验证码
            const onSend = () => {
                const isNext = validate({mobile: props.mobile}, true);
                if (isNext) {
                    getCaptcha(props.mobile);
                } else {
                    if (!props.mobile) {
                        Toast('请输入合法的手机号')
                    }
                    
                }
            }
            
          
            
           
            
            watch(() => props.mobile, (val) => { 
                if (props.auto && isMobile(val)) { // 自动发送验证码
                    getCaptcha(val);
                } 
            })
            return {
                countDown: countDown.current,
                onSend,
            }
        }
    }
</script>
<style lang="less" scoped>

.code {
    &-wrapper {
        position: relative;
        padding-right: 65px;
        border: 1px solid #ea7050;
        border-radius: 50px;
        background-color: #fff2f0;
        margin-bottom: 14px;
        :deep .van {
            &-field {
                border: 0 !important;
                margin-bottom: 0 !important;
            }
        }
    }
    &-btn {
        border: none;
        border-radius: 20px;
        font-size: 13px;
        position: absolute;
        right: 15px;
        top: 50%;
        transform: translateY(-50%);
        color: #fff;
        padding: 3px 12px;
    }

    &-text-btn {
        background-color: #ea7050;
    }

    &-second-btn {
        background-color: #bebebe;
    }
    
}

</style>
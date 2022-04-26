<template>
    <van-popup round :close-on-click-overlay="false">
        <div class="tip">
            <div class="tip-title">温馨提示</div>
            <div class="tip-content">
                <p class="tip-detail">很抱歉，您当前不符合该产品投保条件，无法获取保障，如有疑问请咨询客服</p>
                <p>客服电话：021-31779763</p>
                <p>工作时间：9:30～18:30</p>
            </div>
            <div class="tip-footer" @click="$emit('update:show', false)">确认</div>
        </div>
        
    </van-popup>
</template>
<script>
import { Popup } from 'vant';

export default {
    name: 'pop-health',
    components: {
        [Popup.name]: Popup
    }
}
</script>
<style lang="less" scoped>
    .tip {
        padding: 20px 20px 0;
        width: 7rem;
        box-sizing: border-box;
        &-title {
            color: @primaryColor;
            text-align: center;
            font-size: 18px;
            padding-bottom: 15px;
        }
        &-content {
            color: #616161;
            font-size: 14px;
            text-align: left;
            line-height: 1.6;
            padding-bottom: 10px;
        }
        &-detail {
            color: #a8a8a8;
            padding-bottom: 10px;
        }
        &-footer {
            border-top: 1px solid #f1f1f1;
            font-size: 14px;
            line-height: 36px;
            color: #56b630;

        }
    }
    
</style>
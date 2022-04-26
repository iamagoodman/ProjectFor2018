<template>
    <van-popup round>
        <div class="fail">
            <div class="fail-title">领取失败</div>
            <div class="fail-content">
                <img src="@/assets/fail.png" class="fail-bg"/>
                <p class="fail-reason">{{errorMsg}}</p>
            </div>
            <div class="fail-btn">
                <button @click="$emit('update:show', false)">我知道了</button>
            </div>
        </div>
        
    </van-popup>
</template>
<script>
import { Popup } from 'vant';

export default {
    name: 'pop-fail',
    components: {
        [Popup.name]: Popup
    },
    props: {
        errorMsg: {
            type: String,
            default: '很遗憾，您核保失败，欢迎选购我司其他保险产品'
        }
    }
}
</script>
<style lang="less" scoped>
    .fail {
        width: 7rem;
        box-sizing: border-box;
    }
    .fail-title {
        color: #fff;
        font-size: 15px;
        line-height: 45px;
        height: 45px;
        text-align: center;
        background-color: #faa24d;
    }
    .fail-reason {
        color: #4b4b4b;
        font-size: 14px;
        text-align: center;
        padding: 0 10px;
    }

    .fail-bg {
        display: block;
        width: 80px;
        margin: 20px auto;
    }
    .fail-btn {
        padding: 20px 40px;
        button {
            height: 40px;
            line-height: 40px;
            width: 100%;
            text-align: center;
            color: #fff;
            border-radius: 40px;
            font-size: 14px;
            background-color: #f9c74f;
            box-shadow: 0 0 4px #f9c74f;
        }
    }
</style>
<template>
    <van-popup
        class="radius-pop"
        teleport="body"
        :show="show"
        @click="click"
        @click-overlay="click"
    >
        <div class="van-hairline--bottom popup-title">我已阅读并同意以上条款</div>
        <div class="popup-content inform-content">
            <comp-clause :keys="keys"/>
            <div class="agree">
                <button class="agree-btn" @click.stop="$emit('submit')">确认</button>
            </div>
        </div>
    </van-popup>
</template>
<script>
    import { Popup } from 'vant';
    import Clause from '@/components/Clause';

    export default {
        name: 'pop-agree',
        components: {
            [Popup.name]: Popup,
            [Clause.name]: Clause
        },
        props: {
            keys: {
                type: Array,
                default: () => ([])
            },
            show: {
                type: Boolean,
                default: false
            }
        },
        setup(props, context) {
            
             const click = () => {
                context.emit('change', !props.show);
            }
            return {
                click
            }
        }
    }
</script>
<style lang="less" scoped>
.inform-content {
    width: 7rem;
    height: auto;
    box-sizing: border-box;
    padding: calc(@distance * 2);
    .agree {
        text-align: center;
        &-btn {
            width: 185px;
            height: 38px;
            color: #fff;
            border-radius: 30px;
            margin-top: 12px;
            border: none;
            font-size: 13px;
            background: linear-gradient(#f1895b, #e45532);
        }
    }
}
</style>
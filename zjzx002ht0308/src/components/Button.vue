<template>
    <div :class="'submit '+className"  @click="$emit('submit')">
        
        <div class="shinning-pos">
            <div class="shinning-wrapper">
                <div class="shinning shinning1"></div>
                <div class="shinning shinning2"></div>
            </div>
        </div>
        <button class="submit-btn">{{text}}</button>
    </div>
</template>
<script>
export default {
    name: 'comp-button',
    props: {
        text: {
            type: String
        },
        className: {
            type: String,
            default: ''
        }
    },
    
}
</script>
<style lang="less" scoped>
.submit {
    position: relative;
    overflow: hidden;
    // background: linear-gradient(#ef5a3e, #f2603e, #f25f3d);
    // background: url('../assets/btn.png') center center no-repeat;
    // border-radius: 55px;
    // box-shadow: 0 0.16rem 0.24rem #fbdcb1;
    transform: scale(1.06)
}
.submit-btn {
    width: 100%;
    display: block;
    color: #fff;
    font-size: 23px;
    padding-top: 6px;
    line-height: 55px;
    height: 80px;
    box-sizing: border-box;
    padding-bottom: 19px;
    text-align: center;
    font-weight: 500;
    background: url('../assets/btn.png') 0 0 no-repeat;
    background-size: 100%;
    
}
.shinning {
    background-color: rgba(255,255,255, 0.5);
    width: 150px;
    &-wrapper {
        position: absolute;
        left: -40px;
        top: 0;
        transform: rotate(52deg);
        animation: shinning 1.2s infinite 0.5s;
    }
    &-pos {
        position: absolute;
        left: 12px;
        height: 53px;
        top: 6px;
        right: 11px;
        overflow: hidden;
        border-radius: 55px;
    }
}
.shinning1 {
    height: 20px;
    margin-bottom: 5px;
}
.shinning2 {
    height: 10px;
}

@keyframes shinning {
  0% {
    left: -40px;
  }
  100% {
    left: 220px;
  }
}
</style>
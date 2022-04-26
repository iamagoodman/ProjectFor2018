<template>
    <div class="loading-wrapper">
        <van-loading size="36px" type="spinner"/>
    </div>
</template>
<script>
    import { Loading } from 'vant';
    export default {
        name: 'loading',
        components: {
            [Loading.name]: Loading
        }
    }
</script>
<style lang="less" scoped>
    
    .loading-wrapper {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 999;
        
        :deep .van-loading {
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
            } 
        
    }                   
    
</style>
<template>
    <div class="person">已有{{increaseCount}}人领取</div>
</template>
<script>
    import { ref } from 'vue';
    import { useInterval } from '@/hooks';
    import { getRand } from 'utils';
    import { STORAGE_KEY } from '@/constants';
    export default {
        name: 'comp-person',
        props: {
            count: {
                type: Number,
                default: localStorage.getItem(STORAGE_KEY.COUNT) ? Number(localStorage.getItem(STORAGE_KEY.COUNT)) : 123773
            }
        },
        setup(props) {
            const  increaseCount = ref(props.count)
            useInterval(() => {
                const data = increaseCount.value + getRand(2, 5);
                localStorage.setItem(STORAGE_KEY.COUNT, data);
                increaseCount.value = data;
             }, 3000)
             return {
                 increaseCount
             }
        }
    }
</script>
<style lang="less" scoped>
    .person {
        text-align: center;
        color: #eb5744;
        padding: 10px 0;
        font-size: 14px;
        font-weight: 500;
    }
</style>
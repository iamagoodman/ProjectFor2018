<template>
    <span class="clause-wrapper">
        <span class="clause" v-for="(item, index) in clause" :key="index" @click.stop="click(item.key)">《{{ item.name }}》</span>
        <pop-clause :title="data.title||data.name" :content="data.content" v-model:show="show"/>   
    </span>
</template> 
<script>
    import { computed, reactive, toRefs} from 'vue';
    import { Popup } from 'vant';
    import Clause from '@/popups/Clause.vue';
    import clauses from '@/utils/clause';

    export default {
        name: 'comp-clause',
        props: {
            keys: {
                type: Array,
                default: () => ([])
            }
        },
        components: {
            [Popup.name]: Popup,
            [Clause.name]: Clause
        },
        setup(props) {
            const state = reactive({
                show: false,
                data: {}
            })
            const clause = computed(() => {
                return props.keys.map(key => {
                    const item = clauses.find(c => c.key === key);
                    return { ...item };
                });
            })
            const click = (key) => {
                const cur = clause.value.find(c => c.key === key) || {};
                state.show = true;
                state.data = { ...cur };
            }
            return {
                ...toRefs(state),
                clause,
                click
            }
        },
    }
</script>
<style lang="less" scoped>
    .clause {
        color: @primaryColor;
        &-wrapper {
            font-size: 14px;
            color: #999;
            padding: @distance 0;
            line-height: 1.6;
        }
    }
</style>
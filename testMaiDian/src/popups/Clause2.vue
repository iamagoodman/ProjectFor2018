<template>
    <van-popup
        :show="show"
        teleport="body"
        closeable
        position="bottom"
        @click-close-icon="click"
        @click-overlay="click"
    >
        <div class="van-hairline--bottom popup-title">{{ title }}</div>
        <div class="popup-content" v-html="content" ref="containerRef"></div>
    </van-popup>
</template>
<script>
    import {  ref, watch, nextTick} from 'vue';
    import { Popup } from 'vant';
    import { scrollTo } from 'utils';


    export default {
        name: 'pop-clause',
        props: {
            show: {
                type: Boolean,
                default: false
            },
            
            title: {
                type: String,
                default: ''
            },
            content: {
                type: String,
                default: ''
            }
        },
       
        components: {
            [Popup.name]: Popup
        },

        setup(props, context) {
            const containerRef = ref(null);
            watch(() => props.show, (cur) => {
                if (cur) {
                    nextTick(() => {
                        scrollTo(0, { getContainer: () => containerRef?.value, duration: 0})
                    })
                }
            })
            const click = () => {
                context.emit('update:show', !props.show);
            }
            return {
                containerRef,
                click
            }
        },
    }
</script>

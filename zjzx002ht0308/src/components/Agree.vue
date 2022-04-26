<template>
    <div class="agree">
        <van-checkbox 
            shape="square"
            :checked="checked"
            :checked-color="checkedColor"
            @click="change"
        >
            <div>
                请阅读并同意
                <comp-clause 
                    :keys="keys"
                />
            </div>
        </van-checkbox>  
        <pop-agree 
            :keys="keys" 
            :show="show" 
            @submit="submit" 
            @change="$emit('update:show', $event)"
        />
    </div> 
</template>
<script>
import { Checkbox } from 'vant';
import Clause from './Clause.vue';
import Agree from '@/popups/Agree';

export default {
    name: 'comp-agree',
    components: {
        [Checkbox.name]: Checkbox,
        [Clause.name]: Clause,
        [Agree.name]: Agree,
    },
    props: {
        checked: {
            type: Boolean,
            default: true
        },
        checkedColor: {
            type: String,
            default: '#ffad01'
        },
        show: {
            type: Boolean,
            default: false
        },
        keys: {
            type: Array,
            default: () => ([])
        }
    },
    emits: ['update:checked', 'update:show', 'submit'],
    setup(props, context) {
        const change = () => {
            context.emit('update:checked', !props.checked);
        }
        const submit = () => {
            context.emit('submit', { checked: true, show: false});
        }
        
        return {
            change,
            submit
        }
    },
}
</script>
<style lang="less" scoped>
.agree {
    padding: 15px 0;
    line-height: 30px;
  font-size: 14px;
  font-weight: 500;
  color: #6b6b6b;
  :deep .van {
      &-checkbox {
          align-items: start;
          &__icon {
              margin-top: 3px;
              .van-icon {
                  border-radius: 5px;
                  width: 15px;
                  height: 15px;
                  line-height: 15px;
                  font-size: 12px;
              }
          }
          &__label {
              color: #6b6b6b;
          }
      }
  }
}
</style>

<template>
  <van-config-provider :theme-vars="themeVars">
    <router-view />
    <loading v-show="loading"/>
  </van-config-provider>
  
</template>
<script>
  import { computed } from 'vue';
  import { useStore } from 'vuex';
  import { ConfigProvider} from 'vant';
  import  Loading from '@/components/Loading';

  export default {
    components: {
      [ConfigProvider.name]: ConfigProvider,
      Loading,
    },
    setup() {
      const store = useStore();
      const themeVars = {
        cellHorizontalPadding: '0.2rem',
        paddingMd: '0.05rem'
      }
      return {
        loading: computed(() => store.state.loading),
        themeVars
      }
    }
  }
</script>

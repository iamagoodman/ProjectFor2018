<template>
  <div id="root">
    <LayOut v-if="!isLogin" />
    <Login v-else />
  </div>
</template>

<script>
import LayOut from '@/layout';
import Login from '@/views/Login';
export default {
  name: 'App',
  data () {
    return {
      isLogin: false
    };
  },
  components: {
    LayOut,
    Login
  },
  watch: {
    '$route' () {
      this.isLogin = this.$route.name === 'Login';
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
html,
body,
#app,
#root {
  height: 100%;
}
</style>

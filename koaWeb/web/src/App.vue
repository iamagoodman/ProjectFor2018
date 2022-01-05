<template>
  <div>
    <LayOut />
  </div>
</template>

<script>
import LayOut from '@/layout'
export default {
  name: 'App',
  components: {
    LayOut
  },
  setup() {
    mounted: {
      console.log($route)
      console.log(this)
      console.log(process.env.NODE_ENV)
    }
  },
  methods: {
    handleClick() {
    }
  },
  computed: {

  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.test {
  background: var(--el-color-primary);
  color: var(--base-pirmary);
}
</style>

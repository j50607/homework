<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <hello-world msg="Welcome to Your Vue.js "/>
  <shared-hello msg="shared contentss"></shared-hello>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import SharedHello from '@shared/components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    SharedHello
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

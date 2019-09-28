<template>
  <div id="app">
    <my-header msg="VadZz Loh"/>
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MyHeader from '@/components/Header.vue';

@Component({
  components: {
    MyHeader,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
body, html {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}

body {
  background: url('~@/assets/back.png') no-repeat center/cover;
}

#app {
  display: flex;
  flex-direction: column;
  font-family: 'Roboto', -apple-system, BlinkMacSystemFont, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #FFF;
  width: 100%;
  height: 100%;
}
</style>

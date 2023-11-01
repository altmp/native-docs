<template>
  <div id="app">
    <my-header />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import MyHeader from "@/components/AppHeader.vue";
</script>

<script lang="ts">
export default {
  name: "App",
  components: {
    MyHeader,
  },
};
</script>

<style lang="scss">
body,
html {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}

body {
  background: url("@/assets/back.png") no-repeat center/cover;
}

#app {
  display: flex;
  flex-direction: column;
  font-family:
    "Roboto",
    -apple-system,
    BlinkMacSystemFont,
    Helvetica,
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #fff;
  width: 100%;
  height: 100%;
}
</style>

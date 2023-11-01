<template>
  <div class="home">
    <nav-bar />
    <native-content :hash="nativeHash" />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import NavBar from "@/components/AppNavigation.vue";
import NativeContent from "@/components/NativeContent.vue";

const route = useRoute();
const nativeHash = computed(() => route.params.hash);
</script>

<script lang="ts">
export default {
  name: "AppHome",
  components: {
    NavBar,
    NativeContent,
  },
};
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex: 1 1;
}
</style>

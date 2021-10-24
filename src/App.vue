<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useStore } from './store'
export default defineComponent({
  setup() {
    const nativeStore = useStore()
    onMounted(nativeStore.load)
  }
})
</script>

<template>
  <router-view />
</template>

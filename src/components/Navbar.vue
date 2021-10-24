<script lang="ts">
import { storeToRefs } from 'pinia'
import { defineComponent } from 'vue'
import { useSidebarStore, useStore } from '../store'
export default defineComponent({
  setup() {
    const store = useStore()
    const sidebarStore = useSidebarStore()
    const { nativesCount, nativesNamed, nativesOrigNamed } = storeToRefs(store)
    return {
      nativesCount,
      nativesNamed,
      nativesOrigNamed,
      sidebarStore,
    }
  },
})
</script>

<template>
  <div
    class="
      w-full
      fixed
      z-20
      h-16
      p-3
      bg-gray-base-500/80
      flex
      items-center
      justify-between
      backdrop-blur
    "
  >
    <a href="#">
      <img src="/imgs/v_logo.svg" alt="" class="w-10 h-10" />
    </a>
    <div class="text-xs text-gray-100/50 ml-auto">
      <p>Total natives: {{ nativesCount }}</p>
      <p>Named: {{ nativesNamed }}</p>
      <p>Original names: {{ nativesOrigNamed }}</p>
    </div>
    <svg
      class="inline-flex xl:hidden w-12 h-12 cursor-pointer"
      @click="sidebarStore.toggleSidebar(!sidebarStore.show)"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
        clip-rule="evenodd"
      ></path>
    </svg>
  </div>
</template>

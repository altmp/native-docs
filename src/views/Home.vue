<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import Navbar from '../components/Navbar.vue'
import Sidebar from '../components/Sidebar.vue'
import Content from '../components/Content.vue'
import { useSidebarStore } from '../store'
import { storeToRefs } from 'pinia'
export default defineComponent({
  components: { Navbar, Sidebar, Content },
  setup() {
    const store = useSidebarStore()
    const { show } = storeToRefs(store)
    //@ts-ignore target may be nulled :)
    onMounted(() => window.addEventListener('resize', event => store.toggleSidebar(event.target?.innerWidth >= 1024)))
    return {
      show
    }
  }
})
</script>

<template>
  <div class="min-h-screen overflow-hidden text-gray-100 text-sm lg:text-base">
    <div class="h-full duration-500 fixed z-10 top-16 left-0 overflow-x-hidden bg-gray-800/80 backdrop-blur" :class="[show ? 'w-72' : 'w-0']">
      <sidebar />
    </div>
    <div class="max-h-screen overflow-auto">
      <navbar />
      <content />
    </div>
  </div>
  
</template>

<style lang="postcss">
</style>


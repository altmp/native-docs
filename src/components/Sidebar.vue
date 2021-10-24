<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useStore } from '../store'
import QualityCircle from './QualityCircle.vue'

export default defineComponent({
  components: { QualityCircle },
  setup() {
    const search = ref('')
    const searchResults = ref<any[]>([])
    const store = useStore()
    const select = ref<string>('')
    const categories = computed(() => Object.keys(store.nativesByCat))
    const natives = computed(() =>
      Object.values(store.nativesByCat[select.value])
    )
    function toggleSelect(category: string): void {
      select.value = select.value === category ? '' : category
    }
    function searchNative() {
      searchResults.value = store.search(search.value)
    }
    return {
      toggleSelect,
      categories,
      natives,
      select,
      search,
      searchNative,
      searchResults
    }
  },
})
</script>

<template>
  <ul>
    <form action="#" class="p-3">
      <input type="search" class="inline-block w-full py-2 px-4 rounded-full bg-gray-900 focus:outline-none" v-model="search" @input="searchNative">
    </form>
    <template v-for="category in categories" v-if="search.length <= 0">
      <li
        class="py-2 px-4 font-bold text-lg flex justify-between cursor-pointer"
        @click="toggleSelect(category)"
      >
        {{ category }}
        <svg
          class="w-6 h-6 transition"
          :class="[select === category ? 'rotate-90' : '']"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </li>
      <ul v-if="select === category" class="ml-6">
        <li v-for="native in natives">
          <router-link :to="{name: 'home', params: {hash: native.hash}}" class="flex items-center group cursor-pointer">
            <div class="w-3 h-3 mr-1 flex-shrink-0"><quality-circle :quality="native.quality" /></div>
            <span class="truncate font-medium group-hover:text-gray-300">{{native.altName}}</span>
          </router-link>
        </li>
      </ul>
    </template>
    <ul v-else class="p-3">
      <li v-for="result in searchResults">
        <router-link :to="{name: 'home', params: {hash: result.hash}}" class="flex items-center group cursor-pointer">
          <div class="w-3 h-3 mr-1 flex-shrink-0"><quality-circle :quality="result.quality" /></div>
          <span class="truncate font-medium group-hover:text-gray-300">{{result.altName}}</span>
        </router-link>
      </li>
    </ul>
  </ul>
</template>

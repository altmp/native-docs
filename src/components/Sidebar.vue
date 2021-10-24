<script lang="ts">
import { defineComponent, ref, computed, watchEffect } from 'vue'
import { useStore } from '../store'
import QualityCircle from './QualityCircle.vue'

export default defineComponent({
  components: { QualityCircle },
  setup() {
    let searchTimeout = ref()
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
      if (search.value.length > 0) {
        if (searchTimeout.value) {
          clearTimeout(searchTimeout.value)
        }
        searchTimeout.value = setTimeout(async () => {
          searchTimeout.value = null
          searchResults.value = store.search(search.value)
        }, 100)
      } else {
        searchResults.value = []
      }
      searchResults.value = store.search(search.value)
    }
    return {
      toggleSelect,
      categories,
      natives,
      select,
      search,
      searchNative,
      searchResults,
    }
  },
})
</script>

<template>
  <ul>
    <form action="#" class="p-3">
      <input
        type="search"
        class="
          inline-block
          w-full
          py-2
          px-4
          rounded-full
          bg-gray-base-500
          focus:outline-none
        "
        v-model="search"
        @input="searchNative"
      />
    </form>
    <template v-for="category in categories" v-if="search.length <= 0">
      <li
        class="py-2 px-4 font-black text-lg flex justify-between cursor-pointer"
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
          <router-link
            :to="{ name: 'home', params: { hash: native.hash } }"
            class="flex items-center group cursor-pointer"
          >
            <div class="w-3 h-3 mr-1 flex-shrink-0">
              <quality-circle :quality="native.quality" />
            </div>
            <span class="truncate font-medium group-hover:text-gray-300">{{
              native.altName
            }}</span>
          </router-link>
        </li>
      </ul>
    </template>
    <ul v-else class="p-3">
      <li v-for="result in searchResults">
        <router-link
          :to="{ name: 'home', params: { hash: result.hash } }"
          class="flex items-center group cursor-pointer"
        >
          <div class="w-3 h-3 mr-1 flex-shrink-0">
            <quality-circle :quality="result.quality" />
          </div>
          <span class="truncate font-medium group-hover:text-gray-300">{{
            result.altName
          }}</span>
        </router-link>
      </li>
    </ul>
  </ul>
</template>

<style lang="postcss" scoped>
  input[type="search"]::-webkit-search-cancel-button{
    @apply appearance-none w-5 h-5 cursor-pointer;
    background: url('data:image/svg+xml;utf8,<svg fill="rgb(243,244,246)" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path></svg>');
  }
</style>
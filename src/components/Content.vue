<script lang="ts">
import { storeToRefs } from 'pinia'
import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from '../store'
import QualityCircle from './QualityCircle.vue'
export default defineComponent({
  components: { QualityCircle },
  setup() {
    const store = useStore()
    const route = useRoute()
    const { nativesByHash } = storeToRefs(store)

    const hash = computed(() => route.params?.hash as string)
    const native = computed(() => nativesByHash.value[hash.value])
    const histories = computed(() => {
      const history = [];
      if (native.value && native.value.hashes !== undefined) {
        if (native.value.jhash && native.value.jhash.length > 0) {
          history.unshift({
            version: 'joaat',
            hash: native.value.jhash
          });
        }
        for (const version in native.value.hashes) {
          history.unshift({
            version,
            hash: native.value.hashes[version]
          });
        }
      }
      return history
    })
    return {
      native,
      histories
    }
  },
})
</script>

<template>
  <div class="flex flex-col flex-auto mt-20 mx-4 lg:mx-0" v-if="native">
    <div class="container mx-auto bg-gray-900/80 rounded-lg shadow-lg backdrop-blur p-4">
      <div class="flex flex-wrap">
        <div class="w-full lg:w-2/3 space-y-5">
          <section>
            <h6 class="capitalize text-gray-400">{{native.category?.toLocaleLowerCase()}}</h6>
           <div class="flex items-center">
             <div class="w-4 h-4 flex-shrink-0 mr-2 mt-1.5">
               <quality-circle :quality="2" />
             </div>
             <h1 class="text-lg lg:text-3xl font-bold flex items-center break-all">{{ native.altName }}</h1>
           </div>
            <h6 v-if="native.summary && native.summary.length > 0" class="text-gray-400 mb-4">{{ native.summary }}</h6>
            <h6 v-else class=" text-gray-400 italic mb-4">No summary</h6>
            <hr class="border-gray-100/10 w-full rounded"/>
          </section>
          <section>
            <h4 class="section-header">Declaration</h4>
            <code class="bg-gray-800/80 rounded p-3 inline-block w-full max-w-max overflow-x-auto">
              <span class="text-blue-500">function&nbsp;</span>
              <span>{{ native.altName }}</span>
              <span>(</span>
              <span v-for="(arg, i) in native.params" :key="i" class="function-arg">
                <span class="function-arg-name">{{ arg.name }}</span>
                <span>:&nbsp;</span>
                <span class="text-green-600">{{ arg.type }}</span>
                <span>{{ (i != (native.params.length - 1)) ? ',&nbsp;' : '' }}</span>
              </span>
              <span>):&nbsp;</span>
              <span class="text-green-600">{{ native.results }}</span>
            </code>
          </section>
          <section v-if="native.params.length > 0">
            <h4 class="section-header">Arguments</h4>
            <div class="max-w-full overflow-auto">
              <table class="table-auto">
                <thead>
                  <tr>
                    <th class="border border-gray-100/20 px-4 py-2">Name</th>
                    <th class="border border-gray-100/20 px-4 py-2">Type</th>
                    <th class="border border-gray-100/20 px-4 py-2">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="arg in native.params">
                    <td class="border border-gray-100/20 px-4 py-2">{{arg.name}}</td>
                    <td class="border border-gray-100/20 px-4 py-2">{{arg.type}}</td>
                    <td class="border border-gray-100/20 px-4 py-2">{{arg.description ?? '-'}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
          <section class="container">
            <h4 class="section-header">Description</h4>
            <pre class="whitespace-pre-wrap max-w-max overflow-auto text-xs lg:text-base" v-if="native.comment.length > 0">{{native.comment}}</pre>
            <p class="italic text-gray-400" v-else>No description</p>
          </section>
        </div>
        <div class="w-full lg:w-1/3 p-3">
          <h4 class="section-header">Hashes</h4>
          <div v-for="history in histories" class="flex items-center mb-3 -mx-4 ml-auto">
            <span class="text-sm lg:text-base px-4 min-w-[4.5rem] rounded-full bg-gray-800 text-center font-semibold">{{history.version}}</span>
            <span class="text-sm lg:text-base px-4 inline-block flex-shrink">{{history.hash}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <footer v-else class="absolute w-full bg-gray-900 bottom-0 p-3">
    <div class="text-center">
      <p>Thanks <strong>Alexander Blade</strong> for <a target="_blank" class="text-blue-700 font-bold" href="http://dev-c.com/nativedb/">initial natives database</a> and everybody who contributed.</p>
      <p>Also thanks to <strong>UnknownModder</strong> for researches. Actual native-db based on his <a target="_blank" class="text-blue-700 font-bold" href="https://github.com/UnknownModder/gta5-nativedb-data">repository</a>.</p>
      <p>Designed and developed by <strong>altMP Team</strong>.</p>
    </div>
  </footer>
</template>

<style lang="postcss">
  .section-header {
    @apply text-2xl font-bold mb-4 text-center;
  }
  @screen md {
    .section-header {
      @apply text-left
    }
  }
</style>

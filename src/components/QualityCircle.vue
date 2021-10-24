<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    quality: {
      type: Number,
      required: false
    }
  },
  computed: {
    color() {
      let colorClass = `bg-[#008736]`
      switch(this.quality) {
        case 0: colorClass = 'bg-orange-500'; break;
        case 1: colorClass = 'bg-yellow-500'; break;
        case 2: colorClass = 'bg-[#008736]'; break;
      }
      return colorClass
    }
  }
})
</script>

<template>
  <div class="flex-shrink-0 w-full h-full rounded-full" :class="[color]" />
</template>
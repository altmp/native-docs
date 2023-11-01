<template>
  <div class="nav-collapse">
    <div class="collapse-name" :class="{ opened: opened }" @click="toggle">
      <i class="icon-right-open" />
      <div class="name">{{ category }}</div>
    </div>

    <div
      v-if="opened"
      :class="{
        'collapse-content': true,
        'content-collapsed': opened === false,
      }"
    >
      <native-list-item
        v-for="n in natives"
        :key="n.hash"
        :name="n.altName"
        :quality="n.quality"
        :hash="n.hash"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useStore } from "vuex";
import NativeListItem from "@/components/NativeListItem.vue";

const store = useStore();

// Props declaration
const props = defineProps({
  category: {
    type: String,
    required: true,
  },
});

// State and computed values
const isOpened = ref(false);
const opened = computed(() => isOpened.value);
const natives = computed(() => {
  // Here you might need to access the store differently
  // You can't directly access "this" context in <script setup>
  // Consider injecting the store or importing it directly
  return Object.values(store.state.nativesByCat[props.category]);
});

// Methods
const toggle = () => {
  isOpened.value = !isOpened.value;
};
</script>

<style lang="scss" scoped>
$animTime: 50ms;

.nav-collapse {
  &:not(:first-child) {
    margin-top: 15px;
  }
  &:last-child {
    margin-bottom: 20px;
  }

  .collapse-name {
    display: flex;
    height: 20px;
    align-items: center;
    user-select: none;
    cursor: pointer;

    i {
      padding: 2px 0;
      height: 16px;
      transition: transform 0.1s ease;
    }

    &.opened i {
      transform: rotate(90deg);
    }

    .name {
      margin-left: 10px;
      font-style: normal;
      font-weight: bold;
      font-size: 16px;
      color: #ffffff;
    }

    &:hover {
      opacity: 0.7;
    }
  }

  .collapse-content {
    box-sizing: border-box;
    overflow: hidden;
    padding-left: 20px;
    padding-top: 10px;
  }

  .content-collapsed {
    padding-top: 0px;
    display: none;
  }
}
</style>

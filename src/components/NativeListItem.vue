<template>
  <router-link
    class="native-list-item"
    :to="{ name: 'home', params: { hash } }"
  >
    <div
      :class="{
        'quality-circle': true,
        good: quality == 2,
        medium: quality == 1,
        low: quality == 0,
      }"
    />
    <div class="native-name">{{ name }}</div>
  </router-link>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const { name, quality, hash } = defineProps({
  name: {
    type: String,
    required: true,
  },
  quality: {
    type: Number,
    required: true,
  },
  hash: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.native-list-item {
  color: white;
  text-decoration: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  margin-bottom: 7px;

  &.router-link-active {
    font-weight: 700;
  }

  .quality-circle {
    display: flex;
    min-height: 12px;
    min-width: 12px;
    background-color: black;
    border-radius: 50%;
  }

  .good {
    background: #4dbf60;
  }

  .medium {
    background: #ce8b09;
  }

  .low {
    background: #bf544d;
  }

  .native-name {
    font-size: 18px;
    margin-left: 5px;
  }
}
</style>

<template>
  <router-link class="native-list-item" :to="{name: 'home', params: {hash}}">
    <div :class="{'quality-circle': true, 
      good: this.quality == 2, 
      medium: this.quality == 1, 
      low: this.quality == 0}"/>
    <div class="native-name">{{ name }}</div>
  </router-link>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class NativeListItem extends Vue {
  @Prop() private name!: string;
  @Prop() private quality!: number;
  @Prop() private hash!: string;
}
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

  &.router-link-exact-active {
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
    background: #4DBF60;
  }

  .medium {
    background: #CE8B09;
  }

  .low {
    background: #BF544D;
  }

  .native-name {
    font-size: 18px;
    margin-left: 5px;
  }
}
</style>

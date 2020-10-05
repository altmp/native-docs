<template>
  <div class="nav-collapse">
    <div class="collapse-name" :class="{ opened: isOpened }" @click="toggle">
      <i class="icon-right-open" />
      <div class="name">{{ category }}</div>
    </div>

    <div v-if="isOpened" :class="{'collapse-content': true, 'content-collapsed': this.opened === false }">
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

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import NativeListItem from '@/components/NativeListItem.vue';

@Component({
  components: {
    NativeListItem
  }
})
export default class NavCollapse extends Vue {
  @Prop() private category!: string;
  private isOpened: boolean = false;

  get opened(): boolean {
    return this.isOpened;
  }

  private get natives(): string[] {
    return Object.values(this.$store.state.nativesByCat[this.category]);
  }

  private toggle() {
    this.isOpened = !this.isOpened;
  }
}
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
      transition: transform .1s ease;
    }

    &.opened i {
      transform: rotate(90deg);
    }

    .name {
      margin-left: 10px;
      font-style: normal;
      font-weight: bold;
      font-size: 16px;
      color: #FFFFFF;
    }

    &:hover {
      opacity: .7;
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

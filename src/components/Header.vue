<template>
  <div class="header">
    <router-link to="/" class="logo">
      <img src="@/assets/v_logo.svg"/>
    </router-link>
    <div class="nativesStats">
      <div v-if="nativesCount > 0">Total natives: {{ nativesCount }}</div>
      <div v-if="nativesNamed > 0">Named: {{ nativesNamed }}</div>
      <div v-if="nativesOrigNamed > 0">Original names: {{ nativesOrigNamed }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Header extends Vue {
  get nativesCount() {
    return this.$store.state.nativesCount;
  }

  get nativesNamed() {
    return this.$store.state.nativesNamed;
  }

  get nativesOrigNamed() {
    return this.$store.state.nativesOrigNamed;
  }
}
</script>

<style lang="scss" scoped>
.header {
  background: rgba(34, 34, 34, .7);
  border-bottom: 1px solid rgba(238, 238, 238, .02);
  height: 65px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0 20px;
  width: 100%;
}

.logo {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;

  img {
    height: 32px;
    width: 32px;
  }
}

.nativesStats {
  div {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.7);
    text-align: left;
  }
}

</style>

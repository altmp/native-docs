<template>
  <div class="home">
    <nav-bar/>
    <native-content :hash="nativeHash"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import NavBar from '@/components/Navigation.vue';
import NativeContent from '@/components/Content.vue';

@Component({
  components: {
    NavBar,
    NativeContent
  }
})
export default class Home extends Vue {
  private get nativeHash() {
    return this.$route.params.hash;
  }
}
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex: 1 1;
}
</style>

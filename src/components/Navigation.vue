<template>
  <div class="navbar">
    <div class="find-input">
      <input type="text" placeholder="Search natives"/>
    </div>
    <div class="natives-list-out">
      <div class="natives-list">
        <nav-collapse v-for="cat in categories" :key="cat" :name="cat"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import NavCollapse from '@/components/NavCollapse.vue';

@Component({
  components: {
    NavCollapse
  }
})
export default class Navigation extends Vue {
  private get categories() {
    return this.$store.state.categories;
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  width: 300px;
  height: 100%;
  background: rgba(196, 196, 196, 0.2);
  display: flex;
  flex-direction: column;
}

.find-input {
  margin: 20px 20px 15px 20px;

  input {
    &:focus {
      outline: none;
    }

    &::placeholder {
      color: #969696;
      user-select: none;
    }

    color: white;
    padding-left: 20px;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.4);
    border: 0px solid black;
    height: 35px;
  }
}

.natives-list-out {
  display: block;
  position: relative;
  flex: 1 1;
}

.natives-list {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 0px 20px 0px 20px;
  overflow-y: auto;
}

.natives-list::-webkit-scrollbar {
  width: 10px;
}

.natives-list::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #AAA;
  min-height: 40px;
}

.footer {
  height: 40px;
}
</style>

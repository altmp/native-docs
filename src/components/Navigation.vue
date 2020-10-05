<template>
  <div class="navbar">
    <div class="find-input">
      <input type="text" placeholder="Search natives" v-model="searchStr"/>
      <i v-show="searchStr.length > 0" class="icon-cancel" @click="searchStr = ''" />
    </div>

    <div class="natives-list-out">
      <div v-if="searchStr.length === 0" class="natives-list">
        <nav-collapse v-for="cat in categories" :key="cat" :category="cat"/>
      </div>

      <div v-else class="natives-list">
        <native-list-item
          v-for="n in searchResult"
          :key="n.hash"
          :name="n.altName"
          :quality="n.quality"
          :hash="n.hash"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import NavCollapse from '@/components/NavCollapse.vue';
import NativeListItem from '@/components/NativeListItem.vue';

@Component({
  components: {
    NavCollapse,
    NativeListItem
  }
})
export default class Navigation extends Vue {
  private searchStr: string = '';
  private searchResult: any[] = [];
  private searchTimeout: number | null = null;

  private get categories() {
    return Object.keys(this.$store.state.nativesByCat);
  }

  @Watch('searchStr')
  private async onSearchStrChange(str: string) {
    if (str.length > 0) {
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout);
      }

      this.searchTimeout = setTimeout(async () => {
        this.searchTimeout = null;
        this.searchResult = await this.$store.dispatch('search', str);
      }, 100);
    } else {
      this.searchResult = [];
    }
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
  position: relative;
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

  .icon-cancel {
    position: absolute;
    padding: 8.5px;
    top: 0;
    right: 0;
    opacity: .5;
    cursor: pointer;

    &:hover {
      opacity: .6;
    }
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
  overflow-x: hidden;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #AAA transparent;
}

.natives-list::-webkit-scrollbar {
  width: 5px;
}

.natives-list::-webkit-scrollbar-thumb {
  background-color: #AAA;
  min-height: 40px;
}

.footer {
  height: 40px;
}
</style>

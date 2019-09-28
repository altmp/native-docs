<template>
  <div class="content">
    <div class="doc-header">
      <div class="quality-circle good"></div>
      <div class="function-type">
        <span class="function-name">{{ name }}</span>
      </div>
    </div>
    <div class="doc-data-out">
      <div class="doc-data-in">
        <div class="content-placeholder"></div>
        <div class="content-native-info">
          <div class="summary-info">
            <div class="category-name">{{ categoryLowerCase }}</div>
            <div class="native-name">{{ name }}</div>
            <div v-if="summary && summary.length > 0" class="native-summary">{{ summary }}</div>
            <div v-if="!summary || summary.length === 0" class="native-summary empty">No summary</div>
          </div>
          <div class="divider"></div>
          <div class="description-section">
            <div class="section-header">Declaration</div>
            <div class="code">
              <span class="function-color">function </span>
              <span class="function-name">{{ name }}</span>
              <span>(</span>
              <span v-for="(arg, i) in args" :key="i" class="function-arg">
                <span class="function-arg-name">{{ arg.name }}</span>
                <span>: </span>
                <span class="function-arg-type">{{ arg.type }}</span>
                <span>{{ (i != (args.length - 1)) ? ',&nbsp;' : '' }}</span>
              </span>
              <span>): </span>
              <span class="function-result-type">{{ resultType }}</span>
            </div>
          </div>
          <div v-if="args.length > 0" class="description-section">
            <div class="section-header">Arguments</div>

          </div>
          <div v-if="resultType !== 'void'" class="description-section">
            <div class="section-header">Result</div>

          </div>
          <div class="description-section">
            <div class="section-header">Description</div>

          </div>
        </div>
        <div class="content-hash-history">
          <div class="content-placeholder"></div>
          <div class="hash-history">
            <div class="history-title">History</div>
            <div class="history-hashes-list">
              <div v-for="(hist, i) in hashesHistory" :key="i" class="hashes-list-item">
                <div class="version-ellipse">{{ hist.version }}</div>
                <div class="version-hash">{{ hist.hash }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="content-placeholder"></div>
      </div>
      <!-- <span v-for="(arg, i) in args" :key="i" class="function-arg">
        <span class="function-arg-name">{{ arg.name }}</span>
        <span>: </span>
        <span class="function-arg-type">{{ arg.type }}</span>
        <span>{{ (i != (args.length - 1)) ? ',&nbsp;' : '' }}</span>
      </span> -->
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component
export default class Content extends Vue {
  @Prop() private hash!: string;

  private nativeData: any = {};

  @Watch('hash')
  private onHashChanged(newHash: string, oldHash: string) {
    if (this.$store.state.nativesByHash[newHash] !== undefined) {
      this.nativeData = this.$store.state.nativesByHash[newHash];
    }
  }

  private mounted() {
    this.nativeData = this.$store.state.nativesByHash[this.hash];
  }

  private get category() {
    return this.nativeData ? this.nativeData.category : '';
  }

  private get categoryLowerCase() {
    return this.category.toLowerCase();
  }

  private get name() {
    return this.nativeData ? this.nativeData.altName : '';
  }

  private get summary() {
    return this.nativeData ? this.nativeData.summary : '';
  }

  private get quality() {
    return this.nativeData ? this.nativeData.quality : 0;
  }

  private get args() {
    return this.nativeData ? this.nativeData.params : [];
  }

  private get resultType() {
    return this.nativeData ? this.nativeData.results : '';
  }

  private get hashesHistory() {
    const history = [];
    if (this.nativeData && this.nativeData.hashes !== undefined) {
      for (const version in this.nativeData.hashes) {
        history.unshift({
          version,
          hash: this.nativeData.hashes[version]
        });
      }
    }
    return history;
  }
}
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex: 1 1;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  box-sizing: border-box;
  padding: 20px 20px 0 20px;
  flex-direction: column;

  .function-type {
    margin-left: 10px;
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 28px;
    overflow: hidden;
  }

  .function-color {
    color: #569CD6;
  }

  .function-name {
    color: #FFF;
  }

  .function-arg-type {
    color: #4EC9B0;
  }

  .function-result-type {
    color: #4EC9B0;
  }

  .function-arg span{
    word-wrap: break-word;
  }

  .code {
    display: block;
    background: #292B36;
    border: 1px solid rgba(136, 136, 136, 0.5);
    box-sizing: border-box;
    border-radius: 5px;
    width: 100%;
    box-sizing: border-box;
    padding: 5px;
    text-align: start;
  }

  .doc-header {
    display: flex;
    margin-bottom: 20px;
    height: 45px;
    align-items: center;

    .quality-circle {
      display: block;
      min-height: 16px;
      min-width: 16px;
      background-color: black;
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
  }

  .doc-data-out {
    display: flex;
    flex: 1 1;
    position: relative;
  }

  .doc-data-in {
    display: flex;
    position: absolute;
    width: 100%;
    height: 100%;
    overflow-y: auto;

    .content-placeholder {
      display: flex;
      flex: 1 1;
    }

    .content-native-info {
      display: flex;
      min-width: 400px;
      width: 840px;
      flex-direction: column;

      .divider {
        margin: 20px 0 20px 0;
        height: 2px;
        background: rgba(255, 255, 255, 0.05);
      }

      .description-section {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-bottom: 30px;

        .section-header {
          font-style: normal;
          font-weight: bold;
          font-size: 32px;
          color: #FFFFFF;
          margin-bottom: 10px;
        }
      }

      .summary-info {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      }

      .category-name {
        font-style: normal;
        font-weight: normal;
        font-size: 16px;

        color: rgba(255, 255, 255, 0.7);
        text-transform: capitalize;
      }

      .native-name {
        font-style: normal;
        font-weight: bold;
        font-size: 32px;

        color: #FFFFFF;
      }

      .native-summary {
        margin-top: 5px;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;

        color: #FFFFFF;
      }

      .empty {
        font-style: italic;
      }
    }
    .content-hash-history {
      display: flex;
      min-width: 200px;
      width: 330px;

      .history-title {
        font-style: normal;
        font-weight: bold;
        font-size: 14px;
        text-align: center;
      }

      .hashes-list-item {
        display: flex;
        margin-top: 10px;

        .version-ellipse {
          display: flex;
          width: 60px;
          height: 22px;

          background: rgba(79, 79, 79, 0.5);
          border-radius: 10px;

          text-align: center;
          justify-content: center;
          align-items: center;

          font-style: normal;
          font-weight: bold;
          font-size: 14px;
        }

        .version-hash {
          display: flex;
          margin-left: 10px;
          font-style: normal;
          font-weight: bold;
          font-size: 14px;

          align-items: center;
        }
      }
    }
  }
}
</style>

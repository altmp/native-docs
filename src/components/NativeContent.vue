<template>
  <div v-if="native" class="content">
    <div class="doc-header">
      <div
        :class="{
          'quality-circle': true,
          good: native.quality == 2,
          medium: native.quality == 1,
          low: native.quality == 0,
        }"
      ></div>
      <div class="function-type">
        <span class="function-name">{{ native.altName }}</span>
      </div>
    </div>
    <div class="doc-data-out">
      <div class="doc-data-in">
        <div class="content-native-info">
          <div class="summary-info">
            <div class="category-name">{{ native.category.toLowerCase() }}</div>
            <div class="native-name">{{ native.altName }}</div>
            <div
              v-if="native.summary && native.summary.length > 0"
              class="native-summary"
            >
              {{ native.summary }}
            </div>
            <div v-else class="native-summary empty">No summary</div>
          </div>
          <div class="divider"></div>
          <div class="description-section">
            <div class="section-header">Declaration</div>
            <div class="code">
              <span class="function-color">function&nbsp;</span>
              <span class="function-name">{{ native.altName }}</span>
              <span>(</span>
              <span
                v-for="(arg, i) in native.params"
                :key="i"
                class="function-arg"
              >
                <span class="function-arg-name">{{ arg.name }}</span>
                <span>:&nbsp;</span>
                <span class="function-arg-type">{{ arg.type }}</span>
                <span>{{
                  i != native.params.length - 1 ? ",&nbsp;" : ""
                }}</span>
              </span>
              <span>):&nbsp;</span>
              <span class="function-result-type">{{ native.results }}</span>
            </div>
          </div>
          <div v-if="native.params.length > 0" class="description-section">
            <div class="section-header">Arguments</div>
            <div v-for="(arg, i) in native.params" :key="i" class="arg-data">
              <div class="arg-declaration">
                <span class="arg-name">{{ arg.name }}</span>
                <span>:&nbsp;</span>
                <span class="function-arg-type">{{ arg.type }}</span>
              </div>
              <div class="arg-description">
                <span
                  v-if="arg.description !== undefined"
                  class="arg-description-text"
                ></span>
                <span
                  v-if="arg.description === undefined"
                  class="arg-description-text empty"
                  >No description</span
                >
              </div>
            </div>
          </div>
          <div v-if="native.results !== 'void'" class="description-section">
            <div class="section-header">Result</div>
            <div class="arg-data">
              <div class="arg-declaration">
                <span class="arg-name">result</span>
                <span>:&nbsp;</span>
                <span class="function-arg-type">{{ native.results }}</span>
              </div>
              <div class="arg-description">
                <span
                  v-if="native.resultDescription !== undefined"
                  class="arg-description-text"
                ></span>
                <span v-else class="arg-description-text empty"
                  >No description</span
                >
              </div>
            </div>
          </div>
          <div class="description-section">
            <div class="section-header">Description</div>

            <pre
              v-if="
                native.comment !== undefined && native.comment.trim().length > 0
              "
              >{{ native.comment }}</pre
            >
            <span v-else class="no-description">No description</span>
          </div>
          <div class="description-section">
            <div class="section-header">Old names</div>

            <pre v-if="nativeOldNames.length">{{ nativeOldNames }}</pre>
            <span v-else class="no-description">No old names</span>
          </div>
        </div>
        <div class="content-hash-history">
          <div class="content-placeholder"></div>
          <div class="hash-history">
            <div class="history-title">Hashes</div>
            <div class="history-hashes-list">
              <div
                v-for="(hist, i) in hashesHistory"
                :key="i"
                class="hashes-list-item"
              >
                <div class="version-ellipse">{{ hist.version }}</div>
                <div class="version-hash">{{ hist.hash }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="content credits">
    <span class="thanks"
      >Thanks <strong>Alexander Blade</strong> for
      <a target="_blank" class="credits-link" href="http://dev-c.com/nativedb/"
        >initial natives database</a
      >
      and everybody who contributed.</span
    >
    <span class="thanks"
      >Also thanks to <strong>UnknownModder</strong> for researches. Actual
      native-db based on his
      <a
        target="_blank"
        class="credits-link"
        href="https://github.com/UnknownModder/gta5-nativedb-data"
        >repository</a
      >.</span
    >
    <span class="thanks"
      >Designed and developed by <strong>altMP Team</strong>.</span
    >
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from "vue";
import { useStore } from "vuex";
import { NativeAlt } from "@/models/Native";

const store = useStore();

// No need to import defineProps
const props = defineProps({
  hash: {
    type: String,
    required: true,
  },
});

const native = computed(() => store.state.nativesByHash[props.hash]);

const hashesHistory = computed(() => {
  const history = [];
  if (native.value && native.value.hashes !== undefined) {
    if (native.value.jhash && native.value.jhash.length > 0) {
      history.unshift({
        version: "joaat",
        hash: native.value.jhash,
      });
    }
    for (const version in native.value.hashes) {
      history.unshift({
        version,
        hash: native.value.hashes[version],
      });
    }
  }
  return history;
});

const nativeOldNames = computed(() => {
  const { oldNames = [], old_names = [] } = native.value;
  if (!(oldNames.length || old_names.length)) {
    return [];
  }

  return [...oldNames, ...(oldNames.length ? " " : []), ...old_names].join(
    "\n",
  );
});

watch(
  native,
  (to: NativeAlt) => {
    if (to && to.altName) {
      document.title = `alt:V / NativeDB / ${to.altName}`;
      document
        .querySelector('meta[property="og:title"]')
        ?.setAttribute("content", "alt:V / NativeDB / " + to.altName);
      if (to.comment) {
        document
          .querySelector('meta[property="og:description"]')
          ?.setAttribute("content", to.comment.substring(0, 2047));
      }
    }
  },
  { deep: true },
);
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex: 1 1;
  background: rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
  padding: 20px 0 0 20px;
  flex-direction: column;

  &.credits {
    justify-content: flex-end;
    align-items: center;
    padding-bottom: 20px;
  }

  .thanks {
    font-size: 16px;
    margin-bottom: 5px;
  }

  .credits-link {
    &:visited {
      color: rgba(125, 125, 255, 0.5);
    }
    &:hover {
      color: rgba(125, 125, 255, 0.8);
    }
    color: rgba(125, 125, 255, 0.5);
    font-weight: bold;
    text-decoration: none;
    transition: 200ms color ease;
  }

  .function-type {
    margin-left: 10px;
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 28px;
    overflow: hidden;
  }

  .function-color {
    color: #569cd6;
  }

  .function-name {
    color: #fff;
  }

  .function-arg-type {
    color: #4ec9b0;
  }

  .function-result-type {
    color: #4ec9b0;
  }

  .code {
    font-family: monospace;
    font-size: 1.2rem;

    display: inline-flex;
    flex-wrap: wrap;
    background: #292b36;
    border: 1px solid rgba(136, 136, 136, 0.5);
    box-sizing: border-box;
    border-radius: 5px;
    width: 100%;
    box-sizing: border-box;
    padding: 5px;
    text-align: start;
    word-wrap: break-word;
    margin-top: 10px;
    white-space: break-spaces;
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
      background: #4dbf60;
    }

    .medium {
      background: #ce8b09;
    }

    .low {
      background: #bf544d;
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
    box-sizing: border-box;
    justify-content: center;

    &::-webkit-scrollbar {
      width: 5px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #aaa;
      min-height: 40px;
    }

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
        min-height: 2px;
        background: rgba(255, 255, 255, 0.05);
      }

      .description-section {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-bottom: 30px;

        pre {
          white-space: pre-wrap;
          font-family:
            "Roboto",
            -apple-system,
            BlinkMacSystemFont,
            Helvetica,
            sans-serif;
        }

        .section-header {
          font-style: normal;
          font-weight: bold;
          font-size: 32px;
          color: #ffffff;
        }

        .no-description {
          font-style: italic;
          color: rgba(255, 255, 255, 0.5);
        }

        .arg-data {
          display: flex;
          flex-direction: column;

          .arg-declaration {
            font-size: 24px;
            margin-bottom: 5px;
            margin-top: 10px;
          }

          .arg-description-text {
            text-align: start;
            font-size: 18px;
            color: rgba(255, 255, 255, 0.8);
          }

          .empty {
            font-style: italic;
            color: rgba(255, 255, 255, 0.5);
          }
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

        color: #ffffff;
      }

      .native-summary {
        margin-top: 5px;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;

        color: #ffffff;
      }

      .empty {
        font-style: italic;
        color: rgba(255, 255, 255, 0.5);
      }
    }

    .content-hash-history {
      display: flex;
      min-width: 200px;
      width: 330px;
      margin-right: 20px;

      .history-hashes-list {
        padding-bottom: 20px;
        box-sizing: border-box;
      }

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

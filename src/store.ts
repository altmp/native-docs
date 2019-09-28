import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

interface VersionInfo {
  lastUpdate: number;
}

const NATIVE_VERSION_URL = 'https://native-api.altv.mp/version';
const NATIVE_DATA_URL = 'https://native-api.altv.mp/natives';

export default new Vuex.Store({
  state: {
    nativesCount: 0,
    nativesNamed: 0,
    nativesOrigNames: 0,
    natives: {},
    categories: [],
    nativesByCat: {},
    nativesByHash: {}
  },
  mutations: {
    setNatives(state, natives) {
      state.natives = natives;
    },
    setCategories(state, categories) {
      state.categories = categories;
    },
    setNativesToCategories(state, nativesByCat) {
      state.nativesByCat = nativesByCat;
    },
    setNativesStats(state, stats) {
      state.nativesCount = stats.totalNatives;
      state.nativesNamed = stats.names;
      state.nativesOrigNames = stats.originalNames;
    },
    setNativesByHash(state, nativesByHash) {
      state.nativesByHash = nativesByHash;
    }
  },
  actions: {
    async load(ctx) {
      const response = await fetch(NATIVE_VERSION_URL);
      const realVersionJson: VersionInfo = await response.json();
      const realVersion: number = realVersionJson.lastUpdate;

      const nResponse = await fetch(`${NATIVE_DATA_URL}?v=${realVersion}`);
      const njsData = await nResponse.json();
      const categories: string[] = Object.keys(njsData);

      const nativesByCat: any = {};
      let totalNatives = 0;
      let names = 0;
      let originalNames = 0;
      const nativesByHash: any = {};

      for (const category in njsData) {
        if (nativesByCat[category] === undefined) {
          nativesByCat[category] = [];
        }
        for (const nHash in njsData[category]) {
          const native = njsData[category][nHash];

          totalNatives++;
          let quality = 0;
          if (native.name !== undefined && native.name.length > 0) {
            names++;
            quality = 1;
            if (native.name[0] !== '_') {
              originalNames++;
              quality = 2;
            }
          }
          nativesByCat[category].push({
            name: native.altName,
            quality,
            key: nHash
          });

          native.quality = quality;
          native.category = category;
          nativesByHash[nHash] = native;
        }
      }

      ctx.commit('setNativesStats', {
        totalNatives, names, originalNames
      });
      ctx.commit('setCategories', categories);
      ctx.commit('setNatives', njsData);
      ctx.commit('setNativesToCategories', nativesByCat);
      ctx.commit('setNativesByHash', nativesByHash);
    }
  }
});

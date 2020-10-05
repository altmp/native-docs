import Vue from 'vue';
import Vuex from 'vuex';
import { NativeAlt } from '@/models/Native';
import { NativeDb, NativesByCat, NativesByHash, VersionInfo } from '@/models/NativeDb';

Vue.use(Vuex);

const NATIVE_VERSION_URL = 'https://natives.altv.mp/version';
const NATIVE_DATA_URL = 'https://natives.altv.mp/natives';

export default new Vuex.Store({
  state: {
    nativesCount: 0,
    nativesNamed: 0,
    nativesOrigNamed: 0,
    nativesByCat: {} as NativesByCat,
    nativesByHash: {} as NativesByHash
  },
  mutations: {
    init(state, data) {
      state.nativesByCat = data.nativesByCat;
      state.nativesByHash = data.nativesByHash;
      state.nativesCount = data.nativesCount;
      state.nativesNamed = data.nativesNamed;
      state.nativesOrigNamed = data.nativesOrigNamed;
    }
  },
  actions: {
    async load(ctx) {
      const response = await fetch(NATIVE_VERSION_URL);
      const realVersionJson: VersionInfo = await response.json();
      const realVersion: number = realVersionJson.lastUpdate;

      const nResponse = await fetch(`${NATIVE_DATA_URL}?v=${realVersion}`);
      const nativesByCat: NativeDb = await nResponse.json();

      let nativesCount = 0;
      let nativesNamed = 0;
      let nativesOrigNamed = 0;
      const nativesByHash: NativesByHash = {};

      for (const category in nativesByCat) {
        for (const nHash in nativesByCat[category]) {
          const native = nativesByCat[category][nHash];

          nativesCount++;
          let quality = 0;
          if (native.name !== undefined && native.name.length > 0) {
            nativesNamed++;
            quality = 1;
            if (native.name[0] !== '_') {
              nativesOrigNamed++;
              quality = 2;
            }
          }

          const nativeAlt: NativeAlt = native;
          nativeAlt.hash = nHash;
          nativeAlt.quality = quality;
          nativeAlt.category = category;

          nativesByHash[nHash] = nativeAlt;
          nativesByCat[category][nHash] = nativeAlt;
        }
      }

      ctx.commit('init', { nativesByCat, nativesByHash, nativesCount, nativesNamed, nativesOrigNamed });
    },
    search(ctx, str) {
      const result: any[] = [];
      const strs = str.split(' ')
        .flatMap((s: string) => s.split('_'))
        .filter((s: string) => s.length > 0)
        .map((s: string) => s.toLowerCase());

      let count = 0;

      for (const n of Object.values(ctx.state.nativesByHash)) {
        let found = 0;

        for (const s of strs) {
          if (n.altName!.toLowerCase().search(s) !== -1) {
            ++found;
          } else if (n.jhash!.toLowerCase() === s) {
            ++found;
          } else if (n.hashes) {
            for (const hash of Object.values(n.hashes)) {
              if (hash.toLowerCase() === s) {
                ++found;
                break;
              }
            }
          }
        }

        if (found === strs.length) {
          ++count;
          result.push(n);
        }

        if (n.comment.toLowerCase().includes(str.toLowerCase())) {
          if (!result.includes(n)) {
            ++count;
            result.push(n);
          }
        }

        if (count >= 200) {
          break;
        }
      }

      return result;
    }
  }
});

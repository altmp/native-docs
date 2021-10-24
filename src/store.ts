import { defineStore } from 'pinia'
import {
  NativeAlt,
  NativeDb,
  NativesByCat,
  NativesByHash,
  VersionInfo,
} from './store.interface'
import axios from 'axios'

const NATIVE_VERSION_URL = 'https://natives.altv.mp/version'
const NATIVE_DATA_URL = 'https://natives.altv.mp/natives'

export const useStore = defineStore('nativeStore', {
  state: () => ({
    nativesCount: 0,
    nativesNamed: 0,
    nativesOrigNamed: 0,
    nativesByCat: {} as NativesByCat,
    nativesByHash: {} as NativesByHash,
  }),
  actions: {
    async load() {
      const nativeVersionResponse = await axios.get<VersionInfo>(NATIVE_VERSION_URL)
      const realVersion = nativeVersionResponse.data.lastUpdate
      const nativeDataResponse = await axios.get<NativeDb>(`${NATIVE_DATA_URL}?v=${realVersion}`)
      const nativesByCat = nativeDataResponse.data

      const nativesByHash: NativesByHash = {}
      for (const category in nativesByCat) {
        for (const nHash in nativesByCat[category]) {
          const native = nativesByCat[category][nHash];

          this.nativesCount++;
          let quality = 0;
          if (native.name !== undefined && native.name.length > 0) {
            this.nativesNamed++;
            quality = 1;
            if (native.name[0] !== '_') {
              this.nativesOrigNamed++;
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
      this.nativesByCat = nativesByCat
      this.nativesByHash = nativesByHash
    },
    search(str: string) {
      const result: any[] = [];
      const strs = str.split(' ')
        .flatMap((s: string) => s.split('_'))
        .filter((s: string) => s.length > 0)
        .map((s: string) => s.toLowerCase());

      let count = 0;

      for (const n of Object.values(this.nativesByHash)) {
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
      return result
    }
  }
})


export const useSidebarStore = defineStore('sidebarStore', {
  state: () => {
    return {
      show: true
    }
  },
  actions: {
    toggleSidebar(toggle: boolean) {
      this.show = toggle
    }
  }
})
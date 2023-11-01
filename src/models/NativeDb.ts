import { Native, NativeAlt } from "./Native";

export interface VersionInfo {
  hash: string;
}

export interface NativeDb {
  [key: string]: { [key: string]: Native };
}

export interface NativesByCat {
  [key: string]: { [key: string]: NativeAlt };
}

export interface NativesByHash {
  [key: string]: NativeAlt;
}

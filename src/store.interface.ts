export interface Native {
  name: string;
  jhash: string;
  comment: string;
  params: NativeParam[];
  build: number;
  results: string[];
  hashes: NativeHash;
  altName: string;
  oldNames: string[];
  summary?: string
}

export interface NativeParam {
  type: string;
  name: string;
  ref: boolean;
  description?: string
}

export interface NativeHash {
  [key: number]: string;
}

export interface NativeAlt extends Native {
  hash?: string;
  quality?: number;
  category?: string;
}

export interface VersionInfo {
  lastUpdate: number;
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

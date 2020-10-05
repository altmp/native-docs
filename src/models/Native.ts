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
}

export interface NativeParam {
  type: string;
  name: string;
  ref: boolean;
}

export interface NativeHash {
  [key: number]: string;
}

export interface NativeAlt extends Native {
  hash?: string;
  quality?: number;
  category?: string;
}

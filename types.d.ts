type Pretty<T> = {
  [K in keyof T]: T[K];
} & object;

type RemoveNull<T> = T extends null
  ? undefined
  : {
      [K in keyof T]: T[K] extends null ? undefined : RemoveNull<T[K]>;
    };

export {};

declare module '*.glb';

declare module '*.png';

declare module 'meshline' {
  export const MeshLineGeometry: any;

  export const MeshLineMaterial: any;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      meshLineGeometry: any;

      meshLineMaterial: any;
    }
  }
}

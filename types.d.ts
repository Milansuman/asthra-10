type Pretty<T> = {
  [K in keyof T]: T[K];
} & object;

type RemoveNull<T> = T extends null
  ? undefined
  : {
      [K in keyof T]: T[K] extends null ? undefined : RemoveNull<T[K]>;
    };

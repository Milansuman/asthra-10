type Pretty<T> = {
  [K in keyof T]: T[K];
} & object;

type RemoveNull<T> = T extends null
  ? undefined
  : {
      [K in keyof T]: T[K] extends null ? undefined : RemoveNull<T[K]>;
    };

type RazorpayResponse = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
};

export {};

class Razorpay {
  constructor(options: {
    key: string;
    amount: number;
    currency: 'INR';
    name: string;
    description: string;
    order_id: string;
    handler: (response: RazorpayResponse) => Promise<void> | void;
    theme: {
      color: string;
    };
  });
  on(event: string, callback: (response: object) => void): void;
  open(): void;
}

declare global {
  interface Window {
    Razorpay: typeof Razorpay;
  }

  namespace JSX {
    interface IntrinsicElements {
      meshLineGeometry: any;

      meshLineMaterial: any;
    }
  }
}

export {};

declare module '*.glb';

declare module '*.png';

declare module 'meshline' {
  export const MeshLineGeometry: any;

  export const MeshLineMaterial: any;
}

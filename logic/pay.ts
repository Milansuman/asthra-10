import { env } from '@/env';

export const defaultRazorpayOptions = {
  key: env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  name: 'ASTHRA SJCET PALAI',
  description: 'Payment at ASTHRA Tech Fest',
  currency: 'INR',
  theme: {
    color: '#3399cc',
  },
} as const;

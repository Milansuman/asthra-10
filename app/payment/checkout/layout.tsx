import Script from 'next/script';

const Layout = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <>
    <Script
      id="razorpay-checkout-js"
      src="https://checkout.razorpay.com/v1/checkout.js"
    />
    {children}
  </>
);

export default Layout;

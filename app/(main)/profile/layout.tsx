import Script from 'next/script';

const Layout = ({
    children,
}: {
    children: React.ReactNode;
}) => (
    <>
        <Script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js" />
        {children}
    </>
);

export default Layout;

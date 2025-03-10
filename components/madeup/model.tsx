"use client";

import Script from "next/script";

const GLBPATH = "/assets/asthra.glb" as string;
const altImage = "/assets/poster.jpg" as string;

export const ModelViewer = ({ className }: { className?: string }) => {

    return (
        <>
            {/* <Script
                type="module"
                id="model-viewer.min.js"
                src="https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js"
            />
            <div className={className} dangerouslySetInnerHTML={{
                __html: `<model-viewer id="model-viewer" loading="eager" src="${GLBPATH}" ar ar-modes="webxr scene-viewer quick-look" disable-zoom disable-tap camera-controls tone-mapping="neutral" poster="${altImage}" shadow-intensity="1" ></model-viewer>`
            }} /> */}
        </>
    );
}
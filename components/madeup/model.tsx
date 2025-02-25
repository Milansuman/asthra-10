import Script from "next/script";
import { useEffect } from "react";

const GLBPATH = "/assets/asthra.glb" as string;
const altImage = "/assets/poster.jpg" as string;

export const ModelViewer = ({ className }: { className?: string }) => {
    // useEffect(() => {
    //     const modelViewer = document.querySelector('#model-viewer');
    //     // if (!modelViewer) return;
    //     const orbitCycle = [
    //         '45deg 55deg 4m',
    //         '-60deg 110deg 2m',
    //         // @ts-ignore
    //         modelViewer.cameraOrbit
    //     ];

    //     setInterval(() => {
    //         // @ts-ignore
    //         const currentOrbitIndex = orbitCycle.indexOf(modelViewer.cameraOrbit);
    //         // @ts-ignore
    //         modelViewer.cameraOrbit =
    //             orbitCycle[(currentOrbitIndex + 1) % orbitCycle.length];
    //     }, 3000);
    // }, [])
    return (
        <>
            <Script
                type="module"
                id="model-viewer.min.js"
                src="https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js"
            />
            {/* biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation> */}
            <div className={className} dangerouslySetInnerHTML={{
                __html: `<model-viewer id="model-viewer" loading="eager" src="${GLBPATH}" ar ar-modes="webxr scene-viewer quick-look" disable-zoom disable-tap camera-controls tone-mapping="neutral" poster="${altImage}" shadow-intensity="1" ></model-viewer>`
            }} />
        </>
    );
}
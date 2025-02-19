"use client";
import { useEffect, useRef } from "react";
import "@splinetool/viewer"

export function SplineViewer({url, className}: {url: string, className?: string}){
  const splineRef = useRef(null);

  useEffect(() => {
    let removeLogoInterval: NodeJS.Timeout;
    if(splineRef.current){
      splineRef.current.setAttribute("url", url);
      removeLogoInterval = setInterval(() => {
        const logo = splineRef.current.shadowRoot.querySelector("#logo");
        if(logo) logo.style.display = "none";
      }, 100)

      setTimeout(() => clearInterval(removeLogoInterval!), 5000);
    }

    return () => {
      if(removeLogoInterval) clearInterval(removeLogoInterval!);
    }
  }, [url])

  return (
    <div className={className}>
      <spline-viewer ref={splineRef}/>
    </div>
  )
}
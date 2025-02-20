'use client';
import Spline from '@splinetool/react-spline';

export function SplineViewer({
  url,
  className,
}: { url: string; className: string }) {
  return (
    <div className={className}>
      <Spline scene={url} />
    </div>
  );
}
import { SplineViewer } from '@/components/madeup/spline-viewer';
import LoginButton from './_components/login';

export default function Page() {
  return (
    <main className="flex h-screen w-screen relative overflow-y-auto">
      <SplineViewer
        url="https://prod.spline.design/2GLk35LgytPBcf1w/scene.splinecode"
        className="fixed w-screen h-screen -z-10"
      />
      <section className="flex flex-col w-screen h-screen">
        <div className="flex flex-row h-1/3">
          <div className="border border-neutral-300 w-2/3 h-full flex font-bold items-center justify-center text-2xl">
            Making things pop since 2015
          </div>
          <div className="border border-neutral-300 backdrop-blur-xl h-full w-1/3 flex"></div>
        </div>
        <div className="flex flex-row h-1/3">
          <div className="border border-neutral-300 w-2/3 h-full flex"></div>
          <div className="border border-neutral-300 backdrop-blur-xl h-full w-1/3 flex"></div>
        </div>
      </section>
    </main>
  );
}

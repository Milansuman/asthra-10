import { Lanyard } from '@/components/lanyard'
const Page = () => {
  return <div className="flex w-screen h-screen relative">
    <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
  </div>;
};

export default Page;

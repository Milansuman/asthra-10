"use client";
import Plusbox from '@/components/madeup/box';
import CircularGalleryMade from '@/components/madeup/circularGalleryMade';
import { FAQ } from '@/components/madeup/faq';
import Image from 'next/image';
import LoginButton from '../_components/login';
import { TextRotatingAnimation } from '@/components/madeup/text-animate';
import { Button } from '@/components/ui/button';
import WhatsApp from '@/components/icons/whatsapp';
import { NoiseTexture } from '@/components/noise-texture';

import DepGrid from '../_components/depGrid';
import Header from '../_components/header';
import localFont from "next/font/local";
import dynamic from "next/dynamic";

const ImageGrid = dynamic(() => import("../_components/imageGrid"), { ssr: false });



const dimension = localFont({
  src: "../../public/fonts/fonnts.com-Dimensions_600R.otf",
  variable: "--font-dimension",
});

export default function Page() {
  return (

    <div className="fixed inset-0 bg-black">

      <Header backgroundColor={"#0B91A6"} />


      {/* <div className="absolute -top-[17%] md:top-[20%] pointer-events-none -left-[17%] md:-left-[3%] z-40 ">
        <FluidGlass mobileSize={100} desktopSize={290} />
      </div>

      <div className="absolute top-[10%] md:top-[6%] pointer-events-none -right-[12%] md:-right-[2%] z-40">
        <FluidGlass mobileSize={110} desktopSize={300} />
      </div>

      <div className="absolute top-[18%] md:top-[40%] left-[60%] md:left-[60%] pointer-events-none z-40 transform -translate-x-1/2 ">
        <FluidGlass mobileSize={70} desktopSize={90} />
      </div> */}
      {/* Left vertical navbar */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 z-30 hidden md:block">
        <Image
          src="/assets/side.png"
          alt="Left navigation"
          width={30}
          height={500}
          className="h-[95vh] w-auto"
        />
      </div>

      {/* Right vertical navbar */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-30 hidden md:block">
        <Image
          src="/assets/side.png"
          alt="Right navigation"
          width={30}
          height={500}
          className="h-[95vh] w-auto"
        />
      </div>

      <NoiseTexture />


      <main className="z-10 absolute top-0 right-0 left-0 bottom-0 overflow-y-auto w-full md:w-[calc(100%-150px)] mx-auto scroll-smooth">



        <div className='flex flex-col gap-10'>
          {/* Main ASTHRA section */}
          <section id='Home' className="flex flex-col items-center justify-center h-[100vh] bg-white rounded-b-[2rem] overflow-hidden">
            <div className='flex flex-col items-center justify center md:absolute md:bottom-0 mx-5 md:mx-10'>
              <Image
                src="/asthra.svg"
                alt="SAR 10.0"
                width={200}
                height={100}
                className="w-auto h-36"
              />
              <Image
                src="/assets/final.webp"
                alt="logo"
                width={900}
                height={646.5}
                className="hidden lg:block"
              />
              <Image
                src="/assets/finallandingmd.webp"
                alt="logo"
                width={491.6}
                height={600}
                className="hidden lg:hidden md:block"
              />
              <Image
                src="/assets/mobile_landing.webp"
                alt="logo"
                width={350}
                height={621.99}
                className="block md:hidden"
              />
            </div>
          </section>


          <section id='About' className=" relative p-5  bg-white rounded-[2rem] overflow-hidden ">
            <div className="flex flex-col w-full  mx-auto  md:justify-start ">

              <Image
                src="/assets/abtasthra.webp"
                alt="About Asthra"
                width={400}
                height={100}
                className="sm:w-[95%] md:w-[75%] md:align-top object-cover m-auto block md:block lg:block"
              />

              {/* Content Container */}
              <div className="flex flex-col gap-4 relative  w-[100%] mx-auto md:mx-0 ">
                {/* First Row */}
                <div className="flex flex-col md:flex-row gap-4 items-center">
                  <div className="flex-1  rounded-2xl p-4">
                    <p className="text-gray-800 text-justify leading-relaxed"> St. Joseph's College of Engineering and Technology, Palai, established by the Diocesan Technical Education Trust, is a premier institution offering quality technical education. With NBA accreditation for five B.Tech programs, NAAC A-grade recognition, and ISO certifications, it ensures academic excellence and holistic development. The college emphasizes discipline, eco-friendliness, and innovative teaching methods, supported by state-of-the-art facilities. With a stellar placement record, the college prepares students for successful careers in various fields.</p>
                  </div>
                  <div className="flex-1  rounded-2xl p-1">
                    <Image
                      src="/assets/image_placeholder.webp"
                      alt="Our Mission"
                      width={400}
                      height={100}
                      className=" h-[55%] w-[90%] object-cover m-auto"
                    />
                  </div>
                </div>

                <Image
                  src="/assets/grow.svg"
                  alt="Our Mission"
                  width={4000}
                  height={100}
                  className=" w-full object-cover m-auto hidden md:block"
                />
                <Image
                  src="/assets/mobilegrp.png"
                  alt="Our Mission"
                  width={400}
                  height={100}
                  className="w-full object-cover m-auto block md:hidden"
                />

                {/* Second Row */}
                <div className="flex flex-col md:flex-row gap-4 items-center">
                  <div className="flex-1   rounded-2xl p-1 items-center">
                    <Image
                      src="/assets/image_placeholder.webp"
                      alt="Our Mission"
                      width={400}
                      height={100}
                      className="h-[55%] w-[90%] object-cover m-auto"
                    />
                  </div>
                  <div className="flex-1  rounded-2xl p-4">
                    <p className="text-gray-800 text-justify leading-relaxed"> St. Joseph's College of Engineering and Technology, Palai, established by the Diocesan Technical Education Trust, is a premier institution offering quality technical education. With NBA accreditation for five B.Tech programs, NAAC A-grade recognition, and ISO certifications, it ensures academic excellence and holistic development. The college emphasizes discipline, eco-friendliness, and innovative teaching methods, supported by state-of-the-art facilities. With a stellar placement record, the college prepares students for successful careers in various fields</p>
                  </div>

                </div>
              </div>
            </div>

          </section>

          <section id='AboutSJCET' className=" relative p-5  bg-white rounded-[2rem] overflow-hidden ">
            <div className="flex flex-col w-full  mx-auto  md:justify-start ">

              <Image
                src="/assets/aboutsjcet.png"
                alt="About SJCET Mobile"
                width={400}
                height={100}
                className="sm:w-[95%] md:w-[75%] md:align-top object-cover m-auto block md:block lg:block p-2"
              />

              {/* Content Container */}
              <div className="flex flex-col gap-4 relative  w-[100%] mx-auto md:mx-0 ">
                {/* First Row */}
                <div className="flex flex-col md:flex-row gap-4 items-center">

                  <div className="flex-1  rounded-2xl p-1">
                    <Image
                      src="/assets/image_placeholder.webp"
                      alt="Our Mission"
                      width={400}
                      height={100}
                      className=" h-[55%] w-[90%] object-cover m-auto"
                    />
                  </div>
                  <div className="flex-1  rounded-2xl p-4">
                    <p className="text-gray-800 text-justify leading-relaxed"> St. Joseph's College of Engineering and Technology, Palai, established by the Diocesan Technical Education Trust, is a premier institution offering quality technical education. With NBA accreditation for five B.Tech programs, NAAC A-grade recognition, and ISO certifications, it ensures academic excellence and holistic development. The college emphasizes discipline, eco-friendliness, and innovative teaching methods, supported by state-of-the-art facilities. With a stellar placement record, the college prepares students for successful careers in various fields.</p>
                  </div>
                </div>

                <Image
                  src="/assets/horizontal_line.svg"
                  alt="arrowdesign"
                  width={4000}
                  height={100}
                  className=" w-full object-cover m-auto hidden md:block"
                />

                <Image
                  src="/assets/mobilegrp.png"
                  alt="Our Mission"
                  width={400}
                  height={100}
                  className="w-full object-cover m-auto block md:hidden"
                />

                {/* Second Row */}
                <div className="flex flex-col md:flex-row gap-4 items-center">
                  <div className="flex-1  rounded-2xl p-4">
                    <p className="text-gray-800 text-justify leading-relaxed"> St. Joseph's College of Engineering and Technology, Palai, established by the Diocesan Technical Education Trust, is a premier institution offering quality technical education. With NBA accreditation for five B.Tech programs, NAAC A-grade recognition, and ISO certifications, it ensures academic excellence and holistic development. The college emphasizes discipline, eco-friendliness, and innovative teaching methods, supported by state-of-the-art facilities. With a stellar placement record, the college prepares students for successful careers in various fields</p>
                  </div>
                  <div className="flex-1   rounded-2xl p-1 items-center">
                    <Image
                      src="/assets/image_placeholder.webp"
                      alt="Our Mission"
                      width={400}
                      height={100}
                      className="h-[55%] w-[90%] object-cover m-auto"
                    />
                  </div>


                </div>
              </div>
            </div>

          </section>


          <section className="flex flex-col items-center justify-center relative p-10 bg-white rounded-[2rem] overflow-hidden">
            <div className="w-[90%] flex justify-center ">
              <Image
                src="/assets/images_grid.webp"
                alt="images grid"
                width={300}
                height={200}
                className="w-auto h-36 "
              />
            </div>
            <ImageGrid />

          </section>
          <section id='Discover' className="flex flex-col items-center relative  px-4 p-10  bg-white rounded-[2rem] overflow-hidden">
            <div className="w-[90%] flex justify-center">
              <Image
                src="/assets/departments.webp"
                alt="images grid"
                width={300}
                height={200}
                className="w-auto h-36 "
              />
            </div>
            <DepGrid />
          </section>
        </div>
      </main >
    </div >

  );
}

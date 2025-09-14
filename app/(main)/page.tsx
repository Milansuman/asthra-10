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
import ComprehensiveFooter from '@/components/madeup/footer-new';
import { cdn } from '@/lib/cdn';

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
          src={cdn("/assets/side.png")}
          alt="Left navigation"
          width={30}
          height={500}
          className="h-[95vh] w-auto"
        />
      </div>

      {/* Right vertical navbar */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-30 hidden md:block">
        <Image
          src={cdn("/assets/side.png")}
          alt="Right navigation"
          width={30}
          height={500}
          className="h-[95vh] w-auto"
        />
      </div>

      <NoiseTexture />


      <main className="z-10 absolute top-0 right-0 left-0 bottom-0 overflow-y-auto w-full md:w-[90%] mx-auto scrollbar-hide scroll-smooth">
        <div className='flex flex-col gap-10'>
          {/* Main ASTHRA section */}
          <section id='Home' className="flex flex-col items-center justify-end h-[100vh] bg-white rounded-b-[2rem] overflow-hidden">
            <div className='flex flex-col items-center md:absolute md:bottom-0 mx-5 md:mx-10'>
              <Image
                src={cdn("/asthra.svg")}
                alt="SAR 10.0"
                width={200}
                height={100}
                className="w-auto h-36"
              />
              <Image
                src={cdn("/assets/final.webp")}
                alt="logo"
                width={900}
                height={646.5}
                className="hidden md:block w-[95vh] min-w-[600px]"
              />
              {/* <Image
                src={cdn("/assets/finallandingmd.webp")}
                alt="logo"
                width={491.6}
                height={600}
                className="hidden lg:hidden md:block"
              /> */}
              <Image
                src={cdn("/assets/mobile_landing.webp")}
                alt="logo"
                width={350}
                height={621.99}
                className="block md:hidden w-[90vw] max-w-[400px]"
              />
            </div>
          </section>


          <section id='About' className=" relative p-5  bg-white rounded-[2rem] overflow-hidden ">
            <div className="flex flex-col w-full  mx-auto  md:justify-start ">

              {/* <Image
                src={cdn("/assets/abtasthra.webp")}
                alt="About Asthra"
                width={400}
                height={100}
                className="sm:w-[95%] md:w-[75%] md:align-top object-cover m-auto block md:block lg:block"
              /> */}
              <div className="flex flex-col w-full items-center lg:hidden">
                <div className="flex flex-col items-center lg:items-start max-w-fit"> {/* New container */}
                  <Image
                    src={cdn("/assets/circlestop.webp")}
                    alt="arrowdesign"
                    width={366}
                    height={9}
                    className="w-[75%] object-cover mb-4" // Changed from w-[50%] to w-full
                  />
                  <h1 className="text-7xl md:text-9xl lg:text-9xl text-center lg:hidden text-[#0B91A6] font-dimension whitespace-nowrap">
                    About Asthra
                  </h1>
                </div>
              </div>

              {/* Content Container */}
              <div className="flex flex-col gap-4 relative  w-[100%] mx-auto md:mx-0 ">
                {/* First Row */}
                <div className="flex flex-col md:flex-row gap-4 items-center">
                  <div className="flex-1  rounded-2xl p-4">
                    <div className="flex flex-col w-full items-center lg:items-start">
                      <div className="flex flex-col items-center lg:items-center max-w-fit"> {/* New container */}
                        <Image
                          src={cdn("/assets/circlestop.webp")}
                          alt="arrowdesign"
                          width={366}
                          height={9}
                          className="w-[75%] object-cover mb-4 hidden md:hidden lg:block"
                        />
                        <h1 className="hidden md:hidden lg:block lg:mb-100 lg:text-9xl text-center lg:text-left text-[#0B91A6] font-dimension whitespace-nowrap">
                          About Asthra
                        </h1>
                      </div>
                    </div>
                    <p className="text-gray-800 text-justify font-Montserrat leading-relaxed">Asthra, the national-level tech fest of SJCET Palai, has stood as a symbol of innovation, creativity, and excellence for the past decade. Since its inception, Asthra has provided a dynamic platform where students, innovators, and technophiles across India come together to ideate, compete, and showcase their talents.</p>
                  </div>
                  <div className="flex-1  rounded-2xl p-1 w-full">
                    <Image
                      src={cdn("/assets/grid/img4.webp")}
                      alt="Our Mission"
                      width={400}
                      height={100}
                      className=" h-[55%] w-[90%] object-cover m-auto rounded-2xl"
                    />
                  </div>
                </div>

                <Image
                  src={cdn("/assets/horizontal_line.svg")}
                  alt="Our Circles"
                  width={4000}
                  height={100}
                  className=" w-full object-cover m-auto hidden md:block"
                />
                <Image
                  src={cdn("/assets/mobilegrp.png")}
                  alt="Our Mission"
                  width={400}
                  height={100}
                  className="w-full object-cover m-auto block md:hidden"
                />

                {/* Second Row */}
                <div className="flex flex-col md:flex-row gap-4 items-center">
                  <div className="flex-1  rounded-2xl p-1 items-center w-full">
                    <Image
                      src={cdn("/assets/grid/img8.webp")}
                      alt="Our Mission"
                      width={400}
                      height={100}
                      className="h-[55%] w-[90%] object-cover m-auto rounded-2xl"
                    />
                  </div>
                  <div className="flex-1  rounded-2xl p-4">
                    <p className="text-gray-800 text-justify leading-relaxed">This year marks the 10th edition of Asthra, featuring an exciting lineup of 70+ technical competitions, hands-on workshops and cultural experiences. Participants from engineering colleges across India come together to showcase their talents, compete in various technical and non-technical events, and engage in innovative activities. Asthra 10.0 aims for the participants to not only engage in competitive events but also immerse themselves in learning, networking, and collaborative exploration.</p>
                  </div>

                </div>
              </div>
            </div>

          </section>

          <section id='AboutSJCET' className=" relative p-5  bg-white rounded-[2rem] overflow-hidden ">
            <div className="flex flex-col w-full  mx-auto  md:justify-start ">

              {/* <Image
                src={cdn("/assets/aboutsjcet.png")}
                alt="About SJCET Mobile"
                width={400}
                height={100}
                className="sm:w-[95%] md:w-[75%] md:align-top object-cover m-auto block md:block lg:block p-2"
              /> */}

              <div className="flex flex-col w-full items-center lg:items-end">
                <div className="flex flex-col items-center lg:items-start max-w-fit"> {/* New container */}
                  <Image
                    src={cdn("/assets/circlestop.webp")}
                    alt="arrowdesign"
                    width={366}
                    height={9}
                    className="w-[75%] object-cover lg:hidden " // Changed from w-[50%] to w-full
                  />
                  <h1 className="text-7xl md:text-9xl lg:hidden text-center lg:text-left text-[#0B91A6] font-dimension  whitespace-nowrap">
                    About SJCET
                  </h1>
                </div>
              </div>


              {/* Content Container */}
              <div className="flex flex-col gap-4 relative  w-[100%] mx-auto md:mx-0 ">
                {/* First Row */}
                <div className="flex flex-col md:flex-row gap-4 items-center">

                  <div className="flex-1 w-full rounded-2xl p-1 items-center">
                    <Image
                      src={cdn("/assets/grid/img11.webp")}
                      alt="Our Mission"
                      width={400}
                      height={100}
                      className=" h-auto w-[90%] object-fill m-auto rounded-2xl"
                    />
                  </div>
                  <div className="flex-1  rounded-2xl p-4">
                    <div className="flex flex-col w-full items-center lg:items-end">
                      <div className="flex flex-col items-center lg:items-center max-w-fit"> {/* New container */}
                        <Image
                          src={cdn("/assets/circlestop.webp")}
                          alt="arrowdesign"
                          width={366}
                          height={9}
                          className="w-[75%] object-cover mb-4 hidden md:hidden lg:block"
                        />
                        <h1 className="hidden md:hidden lg:block lg:mb-100 lg:text-9xl text-center lg:text-left font-dimension text-[#0B91A6] whitespace-nowrap">
                          About SJCET
                        </h1>
                      </div>
                    </div>
                    <p className="text-gray-800 text-justify leading-relaxed ">St. Joseph’s College of Engineering and Technology, Palai, established by the Diocesan Technical Education Trust, is a leading institution focused on academic and professional excellence. Accredited by the NBA for multiple B.Tech programs, rated ‘A’ by NAAC, and ISO certified, SJCET is recognized as one of Kerala’s respected technical education centres.</p>
                  </div>
                </div>

                <Image
                  src={cdn("/assets/horizontal_line.svg")}
                  alt="arrowdesign"
                  width={4000}
                  height={100}
                  className=" w-full object-cover m-auto hidden md:block"
                />

                <Image
                  src={cdn("/assets/mobilegrp.png")}
                  alt="Our Mission"
                  width={400}
                  height={100}
                  className="w-full object-cover m-auto block md:hidden"
                />

                {/* Second Row */}
                <div className="flex flex-col md:flex-row gap-4 items-center">
                  <div className="flex-1  rounded-2xl p-4">
                    <p className="text-gray-800 text-justify leading-relaxed">The college is known for its commitment to discipline, eco-friendly practices, and innovative teaching methods. Equipped with state-of-the-art infrastructure, advanced laboratories, and a dedicated faculty, SJCET ensures that its students are prepared for the challenges of a dynamic global landscape. With a strong placement cell and numerous skill development initiatives, the institution has consistently nurtured talent and secured rewarding careers for its graduates. The successful organization of ASTHRA over the past decade is a reflection of SJCET’s vibrant academic ecosystem.</p>
                  </div>
                  <div className="flex-1  w-full h-auto rounded-2xl p-1 items-center">
                    <Image
                      src={cdn("/assets/grid/img12.webp")}
                      alt="Our Mission"
                      width={400}
                      height={100}
                      className="h-auto w-[90%] object-fill m-auto rounded-2xl"
                    />
                  </div>


                </div>
              </div>
            </div>

          </section>

          <section id='Events' className="flex flex-col items-center relative  px-4 p-10  bg-white rounded-[2rem] overflow-hidden">
            {/* <div className="w-[90%] flex justify-center">
              <Image
                src={cdn("/assets/departments.webp")}
                alt="images grid"
                width={300}
                height={200}
                className="w-auto h-36 "
              />
            </div> */}
            <div className="flex flex-col w-full items-center lg:items-center">
              <div className="flex flex-col items-center  max-w-fit"> {/* New container */}
                <Image
                  src={cdn("/assets/circlestop.webp")}
                  alt="arrowdesign"
                  width={366}
                  height={9}
                  className="w-[75%] object-cover mb-4 "
                />
                <h1 className="block md:block lg:block lg:mb-100 text-7xl md:text-9xl lg:text-9xl text-center lg:text-left font-dimension text-[#0B91A6] leading-[63px] max-w-md md:max-w-none">
                  Department Events
                </h1>
              </div>
            </div>
            <DepGrid />
          </section>

          <section className="flex flex-col items-center justify-center relative p-10 bg-white rounded-[2rem] overflow-hidden">
            <div className="flex flex-col w-full items-center lg:items-center">
              <div className="flex flex-col items-center  max-w-fit"> {/* New container */}
                <Image
                  src={cdn("/assets/circlestop.webp")}
                  alt="arrowdesign"
                  width={366}
                  height={9}
                  className="w-[75%] object-cover mb-4 "
                />
                <h1 className="block md:block lg:block lg:mb-100 text-7xl md:text-9xl lg:text-9xl text-center lg:text-left font-dimension text-[#0B91A6]  whitespace-nowrap">
                  Images Grid
                </h1>
              </div>
            </div>
            <ImageGrid />

          </section>

          <section id='Events' className="flex flex-col items-center relative lg:h-[75vh]  px-4 pt-10  bg-white rounded-t-[2rem] overflow-hidden">
            <ComprehensiveFooter />
            <p className='text-white'>01101110 01100101 01110010 01100100</p>
          </section>
        </div>
      </main >
    </div >

  );
}

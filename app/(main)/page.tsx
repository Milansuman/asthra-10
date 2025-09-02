import Plusbox from '@/components/madeup/box';
import CircularGalleryMade from '@/components/madeup/circularGalleryMade';
import { FAQ } from '@/components/madeup/faq';
import Image from 'next/image';
import LoginButton from '../_components/login';
import { TextRotatingAnimation } from '@/components/madeup/text-animate';
import { Button } from '@/components/ui/button';
import WhatsApp from '@/components/icons/whatsapp';
import { NoiseTexture } from '@/components/noise-texture';
import FluidGlass from '@/components/madeup/FluidGlass';
import ImageGrid from '../_components/imageGrid';
import DepGrid from '../_components/depGrid';
import Header from '../_components/header';

export default function Page() {
  return (

    <div className="fixed inset-0 bg-black">

      <Header />


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
      <div className="fixed left-6 top-1/2 -translate-y-1/2 z-30 hidden lg:block">
        <Image
          src="/assets/side.png"
          alt="Left navigation"
          width={30}
          height={500}
          className="h-[95vh] w-auto"
        />
      </div>

      {/* Right vertical navbar */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-30 hidden lg:block">
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
          <section id='Home' className="flex flex-col items-center relative h-[100vh] bg-white rounded-b-[2rem] overflow-hidden">

            <div className="w-full flex justify-center mt-24 mb-2">
              <Image
                src="/asthra.svg"
                alt="SAR 10.0"
                width={200}
                height={100}
                className="w-auto h-36"
              />
            </div>
            <picture className="w-[90%] md:w-[80%] bottom-0 top-[17%] md:top-[23%]">
              <source
                media="(max-width: 768px)"
                srcSet="/assets/mobile_landing.webp"
              />
              <Image
                src="/assets/final.webp"
                alt="logo"
                width={1728}
                height={1117}
                style={{ objectFit: 'contain', width: '100%', height: 'auto' }}
              />
            </picture>
          </section>

          <section id='About' className=" relative p-10 h-[100vh] bg-white rounded-[2rem] overflow-hidden ">
            <div className="flex flex-col space-y-12 w-full  mx-auto ">
              {/* About Title */}
              <div className="w-full">
                <Image
                  src="/assets/about.svg"
                  alt="About ASTHRA"
                  width={100}
                  height={500}
                  className="w-[30%] h-[100vh] object-contain hidden md:block"
                  priority
                />
              </div>
              <Image
                src="/assets/AboutAsthra.png"
                alt="Our Mission"
                width={400}
                height={100}
                className="w-[94%] object-cover m-auto block md:hidden"
              />

              {/* Content Container */}
              <div className="flex flex-col space-y-4 relative md:absolute md:left-[8%] w-[90%] mx-auto md:mx-0 ">
                {/* First Row */}
                <div className="flex flex-col md:flex-row gap-4 items-center">
                  <div className="flex-1 bg-white/10 rounded-2xl p-4">
                    <p className="text-gray-800 text-justify leading-relaxed"> St. Joseph's College of Engineering and Technology, Palai, established by the Diocesan Technical Education Trust, is a premier institution offering quality technical education. With NBA accreditation for five B.Tech programs, NAAC A-grade recognition, and ISO certifications, it ensures academic excellence and holistic development. The college emphasizes discipline, eco-friendliness, and innovative teaching methods, supported by state-of-the-art facilities. With a stellar placement record, the college prepares students for successful careers in various fields.</p>
                  </div>
                  <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-2xl p-1">
                    <Image
                      src="/assets/image_placeholder.webp"
                      alt="Our Mission"
                      width={400}
                      height={100}
                      className=" h-[55%] w-[75%] object-cover m-auto"
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
                  <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-2xl p-1 items-center">
                    <Image
                      src="/assets/image_placeholder.webp"
                      alt="Our Mission"
                      width={400}
                      height={100}
                      className="h-[55%] w-[75%] object-cover m-auto"
                    />
                  </div>
                  <div className="flex-1 bg-white/10 rounded-2xl p-4">
                    <p className="text-gray-800 text-justify leading-relaxed"> St. Joseph's College of Engineering and Technology, Palai, established by the Diocesan Technical Education Trust, is a premier institution offering quality technical education. With NBA accreditation for five B.Tech programs, NAAC A-grade recognition, and ISO certifications, it ensures academic excellence and holistic development. The college emphasizes discipline, eco-friendliness, and innovative teaching methods, supported by state-of-the-art facilities. With a stellar placement record, the college prepares students for successful careers in various fields</p>
                  </div>

                </div>
              </div>
            </div>

            {/* New Section with margin top for spacing */}
            <div className="flex flex-col space-y-12 w-full mx-auto mt-[5vh] md:mt-[12vh p-10 h-[100vh] bg-white rounded-[2rem] overflow-hidden">
              <div className="w-full flex justify-end relative">
                <Image
                  src="/assets/sjcet_palai.svg"
                  alt="About sjcet"
                  width={100}
                  height={500}
                  className="w-[30%] h-[100vh] object-contain hidden md:block sticky top-0"
                  priority
                />
              </div>
              <Image
                src="/assets/aboutsjcet.png"
                alt="aboutsjcetmobile"
                width={400}
                height={100}
                className="w-[94%] object-cover m-auto block md:hidden"
              />

              {/* Content Container */}
              <div className="flex flex-col space-y-4 relative md:absolute md:left-[2%] w-[90%] mx-auto md:mx-0">
                {/* First Row */}
                <div className="flex flex-col md:flex-row gap-4 items-center">

                  <div className="flex-1 bg-white/10  rounded-2xl p-1">
                    <Image
                      src="/assets/image_placeholder.webp"
                      alt="Our Mission"
                      width={400}
                      height={100}
                      className=" h-[55%] w-[75%] object-cover m-auto"
                    />
                  </div>
                  <div className="flex-1 bg-white/10 rounded-2xl p-4">
                    <p className="text-gray-800 text-justify leading-relaxed"> St. Joseph's College of Engineering and Technology, Palai, established by the Diocesan Technical Education Trust, is a premier institution offering quality technical education. With NBA accreditation for five B.Tech programs, NAAC A-grade recognition, and ISO certifications, it ensures academic excellence and holistic development. The college emphasizes discipline, eco-friendliness, and innovative teaching methods, supported by state-of-the-art facilities. With a stellar placement record, the college prepares students for successful careers in various fields.</p>
                  </div>
                </div>

                <Image
                  src="/assets/horizontal_line.svg"
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
                  <div className="flex-1 bg-white/10 rounded-2xl p-4">
                    <p className="text-gray-800 text-justify leading-relaxed"> St. Joseph's College of Engineering and Technology, Palai, established by the Diocesan Technical Education Trust, is a premier institution offering quality technical education. With NBA accreditation for five B.Tech programs, NAAC A-grade recognition, and ISO certifications, it ensures academic excellence and holistic development. The college emphasizes discipline, eco-friendliness, and innovative teaching methods, supported by state-of-the-art facilities. With a stellar placement record, the college prepares students for successful careers in various fields</p>
                  </div>
                  <div className="flex-1 bg-white/10  rounded-2xl p-1 items-center">

                    <Image
                      src="/assets/image_placeholder.webp"
                      alt="Our Mission"
                      width={400}
                      height={100}
                      className="h-[55%] w-[75%] object-cover m-auto"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="flex flex-col items-center relative min-h-[60vh] px-4 p-10 h-[100vh] bg-white rounded-[2rem] overflow-hidden">
            <div className="w-[90%] flex justify-center mt-24 mb-2 ">
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
          <section id='Discover' className="flex flex-col items-center relative min-h-[60vh] px-4 p-10 h-[100vh] bg-white rounded-[2rem] overflow-hidden">
            <div className="w-[90%] flex justify-center mt-24 mb-2 ">
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
      </main>
    </div>

  );
}

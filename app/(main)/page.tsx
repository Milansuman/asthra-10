import Plusbox from '@/components/madeup/box';
import CircularGalleryMade from '@/components/madeup/circularGalleryMade';
import { FAQ } from '@/components/madeup/faq';
import Image from 'next/image';
import LoginButton from '../_components/login';
import { TextRotatingAnimation } from '@/components/madeup/text-animate';
import { Button } from '@/components/ui/button';
import WhatsApp from '@/components/icons/whatsapp';
import { NoiseTexture } from '@/components/noise-texture';
import ImageGrid from '../_components/imageGrid';
import DepGrid from '../_components/depGrid';
import Header from '../_components/header';
import localFont from "next/font/local";

const dimension = localFont({
  src: "../../public/fonts/fonnts.com-Dimensions_600R.otf",
  variable: "--font-dimension",
});

export default function Page() {
  return (
    <div className="fixed inset-0 bg-black">
      <Header />

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
            <div className='flex flex-col items-center justify-center md:absolute md:bottom-0 mx-5 md:mx-10'>
              <Image
                src="/asthra.svg"
                alt="SAR 10.0"
                width={200}
                height={100}
                className="w-[60%] max-w-xs md:max-w-md lg:max-w-lg h-auto object-contain mx-auto"
              />
              <Image
                src="/assets/final.webp"
                alt="logo"
                width={900}
                height={646.5}
                className="hidden lg:block w-full max-w-5xl h-auto object-contain mx-auto"
              />
              <Image
                src="/assets/finallandingmd.webp"
                alt="logo"
                width={491.6}
                height={600}
                className="hidden lg:hidden md:block w-full max-w-3xl h-auto object-contain mx-auto"
              />
              <Image
                src="/assets/mobile_landing.webp"
                alt="logo"
                width={350}
                height={621.99}
                className="block md:hidden w-full max-w-sm h-auto object-contain mx-auto"
              />
            </div>
          </section>

          {/* About Section */}
          <section id='About' className="relative p-10 min-h-[100vh] bg-white rounded-[2rem] overflow-hidden">
            <div className="flex flex-col space-y-12 w-full mx-auto">

              {/* About Title */}
              <div className="w-full">
                <Image
                  src="/assets/about.svg"
                  alt="About ASTHRA"
                  width={100}
                  height={500}
                  className="w-[30%] max-w-md h-auto object-contain hidden md:block"
                  priority
                />
              </div>
              <Image
                src="/assets/AboutAsthra.png"
                alt="Our Mission"
                width={400}
                height={100}
                className="w-full max-w-lg object-contain m-auto block md:hidden"
              />

              {/* Content */}
              <div className="flex flex-col space-y-4 relative md:absolute md:left-[8%] w-[90%] mx-auto md:mx-0">
                <div className="flex flex-col md:flex-row gap-4 items-center">
                  <div className="flex-1 rounded-2xl p-4">
                    <p className="text-gray-800 text-justify leading-relaxed">
                      St. Joseph's College of Engineering and Technology, Palai, established by the Diocesan Technical Education Trust, is a premier institution offering quality technical education. With NBA accreditation for five B.Tech programs, NAAC A-grade recognition, and ISO certifications, it ensures academic excellence and holistic development. The college emphasizes discipline, eco-friendliness, and innovative teaching methods, supported by state-of-the-art facilities. With a stellar placement record, the college prepares students for successful careers in various fields.
                    </p>
                  </div>
                  <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-2xl p-1">
                    <Image
                      src="/assets/image_placeholder.webp"
                      alt="Our Mission"
                      width={400}
                      height={100}
                      className="w-full max-w-md h-auto object-cover rounded-xl mx-auto"
                    />
                  </div>
                </div>

                <Image
                  src="/assets/grow.svg"
                  alt="Our Mission"
                  width={4000}
                  height={100}
                  className="w-full h-auto object-contain m-auto hidden md:block"
                />
                <Image
                  src="/assets/mobilegrp.png"
                  alt="Our Mission"
                  width={400}
                  height={100}
                  className="w-full max-w-lg h-auto object-contain m-auto block md:hidden"
                />

                {/* Second Row */}
                <div className="flex flex-col md:flex-row gap-4 items-center">
                  <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-2xl p-1">
                    <Image
                      src="/assets/image_placeholder.webp"
                      alt="Our Mission"
                      width={400}
                      height={100}
                      className="w-full max-w-md h-auto object-cover rounded-xl mx-auto"
                    />
                  </div>
                  <div className="flex-1 bg-white/10 rounded-2xl p-4">
                    <p className="text-gray-800 text-justify leading-relaxed">
                      St. Joseph's College of Engineering and Technology, Palai, established by the Diocesan Technical Education Trust, is a premier institution offering quality technical education. With NBA accreditation for five B.Tech programs, NAAC A-grade recognition, and ISO certifications, it ensures academic excellence and holistic development. The college emphasizes discipline, eco-friendliness, and innovative teaching methods, supported by state-of-the-art facilities. With a stellar placement record, the college prepares students for successful careers in various fields.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* New Section */}
            <div className="flex flex-col space-y-12 w-full mx-auto mt-[5vh] md:mt-[12vh] p-10 min-h-[100vh] bg-white rounded-[2rem] overflow-hidden">
              <div className="w-full flex justify-end relative">
                <Image
                  src="/assets/sjcet_palai.svg"
                  alt="About sjcet"
                  width={100}
                  height={500}
                  className="w-[30%] max-w-md h-auto object-contain hidden md:block sticky top-0"
                  priority
                />
              </div>
              <Image
                src="/assets/aboutsjcet.png"
                alt="aboutsjcetmobile"
                width={400}
                height={100}
                className="w-full max-w-lg h-auto object-contain m-auto block md:hidden"
              />

              {/* Content Container */}
              <div className="flex flex-col space-y-4 relative md:absolute md:left-[2%] w-[90%] mx-auto md:mx-0">
                {/* First Row */}
                <div className="flex flex-col md:flex-row gap-4 items-center">
                  <div className="flex-1 bg-white/10 rounded-2xl p-1">
                    <Image
                      src="/assets/image_placeholder.webp"
                      alt="Our Mission"
                      width={400}
                      height={100}
                      className="w-full max-w-md h-auto object-cover rounded-xl mx-auto"
                    />
                  </div>
                  <div className="flex-1 bg-white/10 rounded-2xl p-4">
                    <p className="text-gray-800 text-justify leading-relaxed">
                      St. Joseph's College of Engineering and Technology, Palai, established by the Diocesan Technical Education Trust, is a premier institution offering quality technical education. With NBA accreditation for five B.Tech programs, NAAC A-grade recognition, and ISO certifications, it ensures academic excellence and holistic development. The college emphasizes discipline, eco-friendliness, and innovative teaching methods, supported by state-of-the-art facilities. With a stellar placement record, the college prepares students for successful careers in various fields.
                    </p>
                  </div>
                </div>

                <Image
                  src="/assets/horizontal_line.svg"
                  alt="Our Mission"
                  width={4000}
                  height={100}
                  className="w-full h-auto object-contain m-auto hidden md:block"
                />
                <Image
                  src="/assets/mobilegrp.png"
                  alt="Our Mission"
                  width={400}
                  height={100}
                  className="w-full max-w-lg h-auto object-contain m-auto block md:hidden"
                />

                {/* Second Row */}
                <div className="flex flex-col md:flex-row gap-4 items-center">
                  <div className="flex-1 bg-white/10 rounded-2xl p-4">
                    <p className="text-gray-800 text-justify leading-relaxed">
                      St. Joseph's College of Engineering and Technology, Palai, established by the Diocesan Technical Education Trust, is a premier institution offering quality technical education. With NBA accreditation for five B.Tech programs, NAAC A-grade recognition, and ISO certifications, it ensures academic excellence and holistic development. The college emphasizes discipline, eco-friendliness, and innovative teaching methods, supported by state-of-the-art facilities. With a stellar placement record, the college prepares students for successful careers in various fields.
                    </p>
                  </div>
                  <div className="flex-1 bg-white/10 rounded-2xl p-1">
                    <Image
                      src="/assets/image_placeholder.webp"
                      alt="Our Mission"
                      width={400}
                      height={100}
                      className="w-full max-w-md h-auto object-cover rounded-xl mx-auto"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Image Grid */}
          <section className="flex flex-col items-center justify-center relative p-10 bg-white rounded-[2rem] overflow-hidden">
            <div className="w-[90%] flex justify-center">
              <Image
                src="/assets/images_grid.webp"
                alt="images grid"
                width={300}
                height={200}
                className="w-full max-w-md h-auto object-contain mx-auto"
              />
            </div>
            <ImageGrid />
          </section>

          {/* Departments */}
          <section id='Discover' className="flex flex-col items-center relative min-h-[60vh] px-4 p-10 bg-white rounded-[2rem] overflow-hidden">
            <div className="w-[90%] flex justify-center mt-24 mb-2">
              <Image
                src="/assets/departments.webp"
                alt="departments"
                width={300}
                height={200}
                className="w-full max-w-md h-auto object-contain mx-auto"
              />
            </div>
            <DepGrid />
          </section>
        </div>
      </main>
    </div>
  );
}

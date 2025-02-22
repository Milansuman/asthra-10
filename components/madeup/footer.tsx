import { Facebook, Github, Instagram, Youtube } from "lucide-react"
import Image from "next/image"
import Plusbox from "./box"

export default function Footer() {
  return (
    <footer className="w-full bg-[#0A0A19] font-[350] text-white z-50 relative p-2 mt-40">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-0">
        <div className="col-span-1 sm:col-span-2 md:col-start-1 md:col-span-2 md:row-start-1 flex items-center justify-center border-b border-white/20 p-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl tracking-wide font-bold">Asthra 9.0</h2>
        </div>
        <Plusbox className="relative p-2 border-x border-b border-white/20 border-dashed flex items-center justify-center md:col-start-3 md:row-start-1">
          <Image
            src="/asthra glass.png"
            alt="Asthra Logo"
            width={200}
            height={80}
            className="object-contain w-[150px] sm:w-[200px] md:w-[250px] lg:w-[300px]"
          />
        </Plusbox>
        <div className="col-span-1 sm:col-span-2 md:col-start-4 md:row-start-1 border-b border-white/20 flex items-center justify-center p-4">
          <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl">Register Now</span>
        </div>
        <div className="p-4 sm:p-6 lg:p-8 border-b md:border-l border-white/20 ">
          <div className="text-center sm:text-right">
            <span className="text-xl sm:text-2xl md:text-3xl">
              Envisioned to explore the possibilities of tomorrow
            </span>
          </div>
        </div>

        <div className="col-span-1 sm:col-span-2 lg:col-span-3 border-white/20 lg:border-r p-4 sm:p-6 lg:p-8 border-b">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6 lg:gap-8">
            <div className="flex flex-row md:flex-col  gap-4">
              <div>
                <h3 className="text-xl sm:text-2xl md:text-3xl mb-4 sm:mb-6">
                  Student Coordinators
                </h3>
                <div className="space-y-2 sm:space-y-3 text-[#6E72A0]">
                  <p className="text-sm sm:text-base md:text-xl">
                    Rajat Sandeep +91 98461 01882
                  </p>
                  <p className="text-sm sm:text-base md:text-xl">
                    Someone 919191919191
                  </p>
                  <p className="text-sm sm:text-base md:text-xl">
                    Someone 919191919191
                  </p>
                  <p className="text-sm sm:text-base md:text-xl">
                    Someone 919191919191
                  </p>
                </div>
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl md:text-3xl mb-4 sm:mb-6">
                  Faculty Coordinators
                </h3>
                <div className="space-y-2 sm:space-y-3 text-[#6E72A0]">
                  <p className="text-sm sm:text-base md:text-xl">
                    Sarju S +91 94472 33663
                  </p>
                  <p className="text-sm sm:text-base md:text-xl">
                    Someone 919191919191
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full h-[200px] sm:h-[250px] lg:h-[300px] lg:max-w-[400px] mt-4 lg:mt-0">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3932.4623398558606!2d76.72351987502758!3d9.72684669036503!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b07cc024cb7c83f%3A0xc8944aaebb3ba492!2sSt.%20Joseph&#39;s%20College%20of%20Engineering%20and%20Technology%2C%20Palai!5e0!3m2!1sen!2sin!4v1739962715263!5m2!1sen!2sin"
                className="w-full h-full rounded-lg border border-gray-800"
                loading="lazy"
                allowFullScreen
                title="sjcet-location"
              />
            </div>
          </div>
        </div>

        <Plusbox className="hidden lg:block lg:col-span-1 row-span-2">
          <div className="h-full grid grid-rows-3">
            <div className="border-b border-white/20 p-8">
              <div className="text-right">
                <span className="text-xl sm:text-2xl md:text-3xl">
                  One of the biggest tech fests in Kerala
                </span>
              </div>
            </div>
            <div className="border-b border-white/20 p-8">
              <div className="text-right">
                <span className="text-xl sm:text-2xl md:text-3xl">
                  NATIONAL LEVEL TECHNICAL FEST 2025
                </span>
              </div>
            </div>
          </div>
        </Plusbox>
        <Plusbox className="relative p-4 border-b border-l border-dashed border-white/20 flex items-center justify-center md:col-start-4 md:row-start-3">
          <div>
            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-4">Faculty Coordinators</h3>
            <div className="space-y-2 text-[#6E72A0]">
              <p className="text-xs sm:text-sm md:text-base lg:text-xl">Dr. Binoy Baby +91 94478 75050</p>
              <p className="text-xs sm:text-sm md:text-base lg:text-xl">Dr. Arun. P +91 98958 52842</p>
            </div>
          </div>
        </Plusbox>
        <div className="col-span-1 sm:col-span-2 md:col-start-1 md:col-span-2 md:row-start-2 md:row-span-3 flex flex-col items-center justify-around p-4">
          <div className="flex flex-col items-center justify-center mb-6">
            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-4">Vision</h3>
            <p className="text-xs sm:text-sm md:text-base lg:text-xl text-[#6E72A0] w-full sm:w-3/4">
              Developing into a world-class, pace-setting Institute of Engineering and Technology with distinct identity and character, meeting the goals and aspirations of the society.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-4">Mission</h3>
            <p className="text-xs sm:text-sm md:text-base lg:text-xl text-[#6E72A0] w-full sm:w-3/4">
              To maintain a conducive infrastructure and learning environment for world class education. To nurture a team of dedicated, competent and research oriented faculty. To develop students with moral & ethical values, for their successful career by offering variety of programmes and services.
            </p>
          </div>
        </div>
        <Plusbox className="relative p-4 border-y border-l border-r border-b-0 border-dashed border-white/20 flex items-center justify-center md:col-start-3 md:row-start-4">
          <Image
            src="/sjcetauto.webp"
            alt="St. Joseph's College Logo"
            width={150}
            height={75}
            className="object-cover w-[120px] sm:w-[150px] md:w-[150px] lg:w-[190px]"
          />
        </Plusbox>
        <div className="col-span-1 md:col-start-4 md:row-start-4 p-4 flex flex-col justify-between items-center">
          <h4 className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-4">Community</h4>
          <div className="flex gap-4 justify-center mb-4">
            <a
              href="https://www.facebook.com/asthra.sjcet/"
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
            <a
              href="https://www.youtube.com/@sjcetpalai/videos"
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
              aria-label="Youtube"
            >
              <Youtube className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
            <a
              href="https://instagram.com/asthra_sjcet"
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
            <a
              href="https://github.com/AsthraSJCET/"
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
              aria-label="Github"
            >
              <Github className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
          </div>
          <p className="text-xs sm:hidden flex sm:text-sm text-gray-400 text-center">&copy; 2025 ASTHRA 9.0, All Rights Reserved</p>
        </div>
      </div>

      <div className="md:border-0 border-t border-gray-800">
        <p className="text-xs sm:flex hidden sm:text-sm text-gray-400 text-center sm:text-right p-4 sm:p-6 lg:p-8">
          &copy; 2025 ASTHRA 9.0, All Rights Reserved
        </p>
      </div>
    </footer>
  )
}
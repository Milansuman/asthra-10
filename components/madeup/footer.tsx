import { Facebook, Github, Instagram, Youtube } from "lucide-react"
import Image from "next/image"
import Plusbox from "./box"

export default function Footer() {
  return (
    <footer className="w-full bg-[#0A0A19] font-[350] text-white z-30 relative p-2 m-0 -bottom-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-0">
        <div className="col-span-1 sm:col-span-2 md:col-start-1 md:col-span-2 md:row-start-1 flex items-center justify-center border-b border-white/50 p-4">
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
        <div className="col-span-1 sm:col-span-2 md:col-start-4 md:row-start-1 border-b border-white/50 flex items-center justify-center p-4">
          <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl">Register Now</span>
        </div>
        <div className="col-span-1 sm:col-span-2 md:col-span-1 md:col-start-3 md:row-start-2 md:row-span-2 border-l border-dashed border-white/50 p-4 flex items-center justify-center">
          <div className="w-[300px] h-[200px] sm:h-[250px] lg:h-[300px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3932.4623398558606!2d76.72351987502758!3d9.72684669036503!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b07cc024cb7c83f%3A0xc8944aaebb3ba492!2sSt.%20Joseph's%20College%20of%20Engineering%20and%20Technology%2C%20Palai!5e0!3m2!1sen!2sin!4v1739962715263!5m2!1sen!2sin"
              className="w-full h-full rounded-lg border border-gray-800"
              loading="lazy"
              allowFullScreen
              title="sjcet-location"
            />
          </div>
        </div>
        <Plusbox className="relative p-4 border-b border-l border-dashed border-white/50 flex items-center justify-center md:col-start-4 md:row-start-2">
          <div>
            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-4">Student Coordinators</h3>
            <div className="space-y-2 text-[#6E72A0]">
              <p className="text-xs sm:text-sm md:text-base lg:text-xl">Mr. Allen Sanjai +91 7907369056</p>
              <p className="text-xs sm:text-sm md:text-base lg:text-xl">Mr. Basil Babu +91 85900 13252</p>
              <p className="text-xs sm:text-sm md:text-base lg:text-xl">Ms. Shabeeha K P +91 97787 65008</p>
              <p className="text-xs sm:text-sm md:text-base lg:text-xl">Ms. Sona Binu +91 85902 21705</p>
            </div>
          </div>
        </Plusbox>
        <Plusbox className="relative p-4 border-b border-l border-dashed border-white/50 flex items-center justify-center md:col-start-4 md:row-start-3">
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
        <Plusbox className="relative p-4 border-y border-l border-r border-b-0 border-dashed border-white/50 flex items-center justify-center md:col-start-3 md:row-start-4">
          <Image
            src="/sjcet.svg"
            alt="St. Joseph's College Logo"
            width={150}
            height={75}
            className="object-cover w-[120px] sm:w-[150px] md:w-[200px] lg:w-[300px]"
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
          <p className="text-xs sm:text-sm text-gray-400 text-center">@2025 ASTHRA 9.0, All Rights Reserved</p>
        </div>
      </div>
    </footer>
  )
}
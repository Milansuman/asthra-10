import { Facebook, Github, Instagram, Youtube } from 'lucide-react';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="w-full bg-[#0A0A19] font-[350] text-white z-50">
      <div className="min-h-[95vh] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 divide-dashed  ">
        <div className="col-span-1 sm:col-span-2 border-white/50 border-b p-4 sm:p-6 lg:p-8 flex items-center justify-center font-bold ">
          <h2 className="text-3xl sm:text-4xl md:text-6xl tracking-wide font-bold">
            Asthra 9.0
          </h2>
        </div>

        <div className="flex items-center justify-center border-b border-white/50  p-4 sm:border-x">
          <Image
            src="/asthra glass.png"
            alt="Asthra Logo"
            width={200}
            height={80}
            className="object-contain sm:w-[250px] md:w-[300px]"
          />
        </div>
        <div className="p-4 sm:p-6 lg:p-8 border-b border-white/50 ">
          <div className="text-center sm:text-right">
            <span className="text-xl sm:text-2xl md:text-3xl">
              Envisioned to explore the possibilities of tomorrow
            </span>
          </div>
        </div>

        <div className="col-span-1 sm:col-span-2 lg:col-span-3 border-white/50 lg:border-r p-4 sm:p-6 lg:p-8 border-b">
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

        <div className="hidden lg:block lg:col-span-1 row-span-2">
          <div className="h-full grid grid-rows-3">
            <div className="border-b border-white/50 p-8">
              <div className="text-right">
                <span className="text-xl sm:text-2xl md:text-3xl">
                  One of the biggest tech fests in Kerala
                </span>
              </div>
            </div>
            <div className="border-b border-white/50 p-8">
              <div className="text-right">
                <span className="text-xl sm:text-2xl md:text-3xl">
                  NATIONAL LEVEL TECHNICAL FEST 2025
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row - Menu Links */}
        {/* <div className="col-span-1 sm:col-span-2 lg:col-span-2 p-4 sm:p-6 lg:p-8 border-t border-white/50">
          <div className="grid grid-cols-3 sm:grid-cols-3 gap-6 sm:gap-8">
            <div>
              <h4 className="text-lg sm:text-xl md:text-2xl mb-4 sm:mb-6">
                Menu
              </h4>
              <ul className="space-y-2 sm:space-y-3 text-gray-400">
                <li>About Us</li>
                <li>Events</li>
                <li>Schedule</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg sm:text-xl md:text-2xl mb-4 sm:mb-6">
                Menu
              </h4>
              <ul className="space-y-2 sm:space-y-3 text-gray-400">
                <li>Register</li>
                <li>Sponsors</li>
                <li>Gallery</li>
                <li>FAQ</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg sm:text-xl md:text-2xl mb-4 sm:mb-6">
                Menu
              </h4>
              <ul className="space-y-2 sm:space-y-3 text-gray-400">
                <li>Terms</li>
                <li>Privacy</li>
                <li>Support</li>
                <li>Blog</li>
              </ul>
            </div>
          </div>
        </div> */}

        <div className="md:col-span-2 p-4 sm:p-6 lg:p-8 flex justify-center items-center">
          <Image
            src="/sjcet.svg"
            alt="St. Joseph's College Logo"
            width={150}
            height={75}
            className="object-cover sm:w-[180px] md:w-[300px]"
          />
        </div>

        <div className="p-4 sm:p-6 lg:p-8 flex flex-col items-center md:mt-6">
          <h4 className="text-lg sm:text-xl md:text-3xl mb-4 sm:mb-6">
            Community
          </h4>
          <div className="flex gap-4 justify-center">
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
        </div>
      </div>

      <div className="border-t border-gray-800">
        <p className="text-xs sm:text-sm text-gray-400 text-center sm:text-right p-4 sm:p-6 lg:p-8">
          @2025 ASTHRA 9.0, All Rights Reserved
        </p>
      </div>
    </footer>
  );
}

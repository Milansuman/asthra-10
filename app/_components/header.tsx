import React from 'react'
import Image from 'next/image';



export default function Header() {
  return (
    <nav className="fixed top-0 left-1/2 transform -translate-x-1/2 w-[calc(100%-200px)] h-20 mt-4 bg-transparent flex items-center justify-end md:justify-center  z-[9999]">
            <div className="hidden md:flex items-center w-full max-w-6xl">
              {/* Left Logo */}
              <div className="w-[230px] min-w-[136px] flex items-center justify-center py-2 bg-transparent border border-black rounded-full font-black tracking-widest text-black">
                <Image src="/asthratext.svg" alt="asthra" width={85.65} height={27.26} className="min-w-[85px] min-h-[27px]" />
              </div>
    
              {/* Connector Line */}
              <div className="flex items-center -ml-px">
                <div className="w-8 min-w- h-[2px] bg-gray-600"></div>
                <div className="w-2 h-2 border-2 border-gray-600 rounded-full -mx-px"></div>
                <div className="w-12 h-[2px] bg-gray-600 -mx-px"></div>
                <div className="w-2 h-2 border-2 border-gray-600 rounded-full -mx-px"></div>
                <div className="w-3 h-[2px] bg-gray-600 -mx-px"></div>
                <div className="w-2 h-2 border-2 border-gray-600 rounded-full -mx-px"></div>
                <div className="w-3 h-[2px] bg-gray-600 -mx-px"></div>
                <div className="w-2 h-2 border-2 border-gray-600 rounded-full -mx-px"></div>
                <div className="w-12 h-[2px] bg-gray-600 -mx-px"></div>
                <div className="w-2 h-2 border-2 border-gray-600 rounded-full -mx-px"></div>
                <div className="w-8 h-[2px] bg-gray-600"></div>
              </div>
    
              {/* Center Nav Links */}
              <div className="flex gap-12 justify-center px-8 py-3 bg-[#0B91A6] text-white rounded-full -ml-px -mr-px flex-1">
                <a href="#Home" className="hover:underline">Home</a>
                <a href="#About" className="hover:underline">About</a>
                <a href="#Discover" className="hover:underline">Discover</a>
              </div>
    
              {/* Connector Line */}
              <div className="flex items-center -ml-px">
                <div className="w-8 h-[2px] bg-gray-600"></div>
                <div className="w-2 h-2 border-2 border-gray-600 rounded-full -mx-px"></div>
                <div className="w-12 h-[2px] bg-gray-600 -mx-px"></div>
                <div className="w-2 h-2 border-2 border-gray-600 rounded-full -mx-px"></div>
                <div className="w-3 h-[2px] bg-gray-600 -mx-px"></div>
                <div className="w-2 h-2 border-2 border-gray-600 rounded-full -mx-px"></div>
                <div className="w-3 h-[2px] bg-gray-600 -mx-px"></div>
                <div className="w-2 h-2 border-2 border-gray-600 rounded-full -mx-px"></div>
                <div className="w-12 h-[2px] bg-gray-600 -mx-px"></div>
                <div className="w-2 h-2 border-2 border-gray-600 rounded-full -mx-px"></div>
                <div className="w-8 h-[2px] bg-gray-600"></div>
              </div>
    
              {/* Sign In */}
              <button className='bg-black text-white font-semibold py-3 rounded-full w-[230px] min-w-[136px]'>
                Sign In
              </button>
            </div>
            <div className="flex md:hidden px-6">
              <span className="font-extrabold text-2xl text-black">Menu</span>
            </div>
          </nav>
  )
}

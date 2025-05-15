import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen bg-[#181818] overflow-hidden pt-56">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#000287]/20 to-transparent blur-[300px]" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#1317E9]/20 blur-[125px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[#1B1DBD]/20 blur-[125px]" />
      </div>


      {/* Main content */}


<div className="relative m-14  mb-4 p-4 bg-[#141414] rounded-[24px] overflow-visible">

  {/* Dashed Container */}
  <div className="relative bg-[#131313] rounded-[22px] border-2 border-dashed border-[#424242] p-10">
    {/* Main Content */}
    <div className="max-w-2xl z-10 relative">
      <h1 className="text-6xl font-bold text-white mb-6">
        <span className="block">paradox</span>
        <span className="text-gradient-gold">merch store</span>
      </h1>
      <p className="text-xl text-gray-300 mb-8">
        Discover our exclusive collection of high-quality merchandise. From t-shirts to hoodies, express your style with Paradox.
      </p>
      <Link
        href="/shop"
        className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-[#9F8600] to-[#F0CC0E] text-black font-semibold rounded-full hover:opacity-90 transition-opacity"
      >
        Shop Now
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 ml-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </Link>
    </div>
  </div>

  {/* ✅ Images OUTSIDE dashed box, but inside outer container */}
  <div className="absolute right-10 bottom-0 flex gap-4 z-0">
    <div className="-mt-24">
      <Image
        src="/humans/back.png"
        alt="Back"
        width={220}
        height={400}
        className="object-contain"
      />
    </div>
    <div className="-mt-24">
      <Image
        src="/humans/front.png"
        alt="Front"
        width={220}
        height={400}
        className="object-contain"
      />
    </div>
  </div>
</div>


    </section>
  );
};

export default Hero; 
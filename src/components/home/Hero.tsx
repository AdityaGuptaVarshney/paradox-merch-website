import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface HeroProps {
  onShopNow?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onShopNow }) => {
  const scrollToNewArrivals = () => {
    if (onShopNow) {
      onShopNow();
      setTimeout(() => {
        const newArrivalsSection = document.getElementById('new-arrivals');
        if (newArrivalsSection) {
          newArrivalsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const newArrivalsSection = document.getElementById('new-arrivals');
      if (newArrivalsSection) {
        newArrivalsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="relative min-h-[50vh] sm:min-h-screen bg-[#181818] overflow-hidden pt-28 sm:pt-32 md:pt-40 lg:pt-56">
      {/* Animated background */}
      <div className="absolute inset-0 ">
        <div className="absolute inset-0 bg-gradient-to-b from-[#000287]/20 to-transparent blur-[300px]" />
        <div className="absolute top-1/4 left-1/4 w-72 h-72 md:w-96 md:h-96 rounded-full bg-[#1317E9]/20 blur-[125px]" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 md:w-96 md:h-96 rounded-full bg-[#1B1DBD]/20 blur-[125px]" />
      </div>
      {/* TEST: SlideUp Animation */}

      {/* Main content */}
      <div className="relative mx-4 mt-28 sm:mx-8 md:mx-10 lg:m-14 mb-4 sm:p-4 bg-[#141414] rounded-[20px] sm:rounded-[24px] overflow-visible">
        {/* Dashed Container */}
        <div className="relative bg-[#131313] rounded-[18px] sm:rounded-[22px] border-2 border-dashed border-[#424242] p-6 sm:p-8 md:p-10">
          {/* Main Content */}
          <div className="relative max-w-2xl z-10">
            <div className="relative z-20">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 sm:mb-6">
                <span className="block">paradox</span>
                <span className="text-gradient-gold">merch store</span>
              </h1>
              <p className="hidden md:block text-xl text-gray-300 mb-8">
                Discover our exclusive collection of high-quality merchandise. From t-shirts to hoodies, express your style with Paradox.
              </p>
              <button
                onClick={scrollToNewArrivals}
                className="inline-flex items-center px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-[#9F8600] to-[#F0CC0E] text-black font-semibold rounded-full hover:opacity-90 transition-opacity text-sm sm:text-base"
              >
                Shop Now
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 sm:h-5 sm:w-5 ml-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            
            {/* Mobile gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#131313] via-[#131313]/90 to-transparent md:hidden z-10"></div>
          </div>
        </div>

        {/* Images OUTSIDE dashed box, but inside outer container */}
        <div className="absolute right-0 sm:right-4 md:right-10 bottom-0 flex items-end gap-1 sm:gap-2 md:gap-4 z-0">
          <div className="w-[120px] sm:w-[180px] md:w-[220px]">
            <Image
              src="/humans/back.png"
              alt="Back"
              width={220}
              height={400}
              className="w-full h-auto object-contain transform scale-110 origin-bottom"
              priority
            />
          </div>
          <div className="w-[120px] sm:w-[180px] md:w-[220px]">
            <Image
              src="/humans/front.png"
              alt="Front"
              width={220}
              height={400}
              className="w-full h-auto object-contain transform scale-110 origin-bottom"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 
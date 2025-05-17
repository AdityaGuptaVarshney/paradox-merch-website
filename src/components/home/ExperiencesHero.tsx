import React from 'react';
import Image from 'next/image';

interface ExperiencesHeroProps {
  onExploreNow?: () => void;
}

const ExperiencesHero: React.FC<ExperiencesHeroProps> = ({ onExploreNow }) => {
  const scrollToExperiences = () => {
    if (onExploreNow) {
      onExploreNow();
      setTimeout(() => {
        const experiencesSection = document.getElementById('experiences-section');
        if (experiencesSection) {
          experiencesSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const experiencesSection = document.getElementById('experiences-section');
      if (experiencesSection) {
        experiencesSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="relative -mt-25 mb-35">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#870000]/20 to-transparent blur-[300px]" />
        <div className="absolute top-1/4 right-1/4 w-72 h-72 md:w-96 md:h-96 rounded-full bg-[#E91313]/20 blur-[125px]" />
        <div className="absolute bottom-1/4 left-1/4 w-72 h-72 md:w-96 md:h-96 rounded-full bg-[#BD1B1B]/20 blur-[125px]" />
      </div>

      {/* Main content */}
      <div className="relative mx-4 mt-16 sm:mx-8 md:mx-10 lg:m-14 mb-4 sm:p-4 bg-[#141414] rounded-[20px] sm:rounded-[24px] overflow-visible">
        {/* Dashed Container */}
        <div className="relative bg-[#131313] rounded-[18px] sm:rounded-[22px] border-2 border-dashed border-[#424242] p-4 sm:p-6 md:p-8 min-h-[180px] sm:min-h-[220px] flex flex-col-reverse md:flex-row items-center justify-between overflow-visible">
          {/* Images on the left, overflowing */}
          <div className="relative w-full md:w-1/2 flex justify-start md:justify-end h-[160px] sm:h-[220px] md:h-[260px] lg:h-[300px] -ml-6 md:-ml-12 lg:-ml-20 overflow-visible z-0">
            <div className="flex items-end gap-2 md:gap-4">
              <div className="w-[90px] sm:w-[130px] md:w-[160px] lg:w-[180px] drop-shadow-xl">
                <Image
                  src="/images/products/tshirt-2.png"
                  alt="Experience 1"
                  width={180}
                  height={300}
                  className="w-full h-auto object-contain transform scale-110 origin-bottom"
                  priority
                />
              </div>
              <div className="w-[90px] sm:w-[130px] md:w-[160px] lg:w-[180px] drop-shadow-xl">
                <Image
                  src="/images/products/tshirt-3.png"
                  alt="Experience 2"
                  width={180}
                  height={300}
                  className="w-full h-auto object-contain transform scale-110 origin-bottom"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Text content on the right */}
          <div className="relative w-full md:w-1/2 z-10 md:pl-8">
            <div className="relative z-20">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
                <span className="block">paradox</span>
                <span className="text-gradient-red">experiences</span>
              </h1>
              <p className="hidden md:block text-base sm:text-lg text-gray-300 mb-6">
                Immerse yourself in unforgettable experiences. From thrilling adventures to exclusive events, create memories with Paradox.
              </p>
              <button
                onClick={scrollToExperiences}
                className="inline-flex items-center px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-[#870000] to-[#E91313] text-white font-semibold rounded-full hover:opacity-90 transition-opacity text-sm sm:text-base"
              >
                Explore Now
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
          </div>

          {/* Mobile gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-l from-[#131313] via-[#131313]/90 to-transparent md:hidden z-10"></div>
        </div>
      </div>
    </section>
  );
};

export default ExperiencesHero; 
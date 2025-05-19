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
    <section className="relative mt-1 mb-36">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#870000]/20 to-transparent blur-[300px]" />
        <div className="absolute top-1/4 right-1/4 w-72 h-72 md:w-96 md:h-96 rounded-full bg-[#E91313]/20 blur-[125px]" />
        <div className="absolute bottom-1/4 left-1/4 w-72 h-72 md:w-96 md:h-96 rounded-full bg-[#BD1B1B]/20 blur-[125px]" />
      </div>

      {/* Main content */}
      <div className="relative mx-4 sm:mx-8 md:mx-5 lg:m-14 mt-4 mb-9 sm:p-4 bg-[#141414] rounded-[20px] sm:rounded-[24px] overflow-visible">
        {/* Desktop gradient overlay behind everything */}
        <div className="absolute inset-0 bg-gradient-to-l from-[#131313] via-[#131313]/90 to-transparent hidden md:block z-0 pointer-events-none"></div>
        {/* Dashed Container */}
        <div className="relative bg-[#131313] rounded-[18px] sm:rounded-[22px] border-2 border-dashed border-[#424242] p-4 sm:p-6 md:p-8 min-h-[180px] sm:min-h-[220px] flex flex-col md:flex-row items-center justify-between overflow-visible gap-4 z-10">
          {/* Image on top for mobile, left for desktop */}
          <div className="w-full md:w-1/2 flex justify-center items-center">
            <Image
              src="/backgrounds/hero/paradox-exp-banner.png"
              alt="Experience 1"
              width={400}
              height={200}
              className="w-full max-w-[400px] h-auto object-contain transform scale-110 origin-bottom"
              priority
            />
          </div>

          {/* Text content on bottom for mobile, right for desktop */}
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
              <span className="block">paradox</span>
              <span className="text-gradient-red">experiences</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-300 mb-6">
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
      </div>
    </section>
  );
};

export default ExperiencesHero; 
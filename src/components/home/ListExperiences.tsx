import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';

interface ListExperiencesProps {
  onGoToMerch?: () => void;
}

const experiences = [
  {
    id: 'laser-tag',
    name: 'LASER TAG',
    price: 499,
    description: 'Experience the thrill of laser tag with your friends. Dodge, hide, and score points in a neon-lit arena!',
    image: '/images/experiences/lazer.jpg',
    duration: '60 mins',
    hasDetails: true,
    startTimes: ['10:00 AM', '2:00 PM', '6:00 PM']
  },
  {
    id: 'linkedin-headshot',
    name: 'LINKEDIN HEADSHOT',
    price: 299,
    description: 'Get a professional LinkedIn headshot taken by our expert photographers. Perfect for your next career move.',
    image: '/images/experiences/linkedin_headshot.jpg',
    duration: '30 mins',
    hasDetails: true,
    startTimes: ['11:00 AM', '3:00 PM', '5:00 PM']
  },
  {
    id: 'prom-night',
    name: 'Prom Night',
    price: 999,
    description: 'Dance the night away at our glamorous prom night. Dress up, enjoy music, and make memories!',
    image: '/images/experiences/prom_night.png',
    duration: '240 mins',
    hasDetails: false,
    startTimes: ['7:00 PM']
  },
  {
    id: 'comedy-night',
    name: 'Comedy Night',
    price: 399,
    description: 'Laugh out loud with top comedians at our Comedy Night. A perfect way to unwind and have fun.',
    image: '/images/experiences/comedy.jpg',
    duration: '120 mins',
    hasDetails: false,
    startTimes: ['8:00 PM']
  },
];

const ListExperiences: React.FC<ListExperiencesProps> = ({ onGoToMerch }) => {
  const { addToCart } = useCart();
  const [selectedTimes, setSelectedTimes] = useState<{ [key: string]: string }>({});
  const [modalOpen, setModalOpen] = useState(false);
  const [modalExperience, setModalExperience] = useState<typeof experiences[0] | null>(null);
  const [modalClosing, setModalClosing] = useState(false);
  const [selectedDayIdx, setSelectedDayIdx] = useState(0);
  const [selectedSectionIdx, setSelectedSectionIdx] = useState(0);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const router = useRouter();

  const handleGoToMerch = () => {
    if (onGoToMerch) {
      onGoToMerch();
      setTimeout(() => {
        const newArrivalsSection = document.getElementById('new-arrivals');
        if (newArrivalsSection) {
          newArrivalsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const handleBookNow = (experience: typeof experiences[0]) => {
    const selectedTime = selectedTimes[experience.id] || experience.startTimes[0];
    addToCart({
      id: experience.id,
      name: experience.name,
      price: experience.price,
      image: experience.image,
      quantity: 1,
      startTime: selectedTime,
      duration: experience.duration,
      type: 'experience'
    });
  };

  const handleBookNowWithTime = (experience: typeof experiences[0], day: dayjs.Dayjs, time: string) => {
    addToCart({
      id: experience.id,
      name: experience.name,
      price: experience.price,
      image: experience.image,
      quantity: 1,
      startTime: `${day.format('YYYY-MM-DD')} ${time}`,
      duration: experience.duration,
      type: 'experience',
    });
    setModalClosing(true);
    setTimeout(() => {
      setModalOpen(false);
      setModalExperience(null);
      setModalClosing(false);
      setSelectedTime(null);
      router.push('/cart');
    }, 350);
  };

  const handleCloseModal = () => {
    setModalClosing(true);
    setTimeout(() => {
      setModalOpen(false);
      setModalExperience(null);
      setModalClosing(false);
    }, 350); // match animation duration
  };

  // Helper to generate time slots
  const generateTimeSlots = (interval: number) => {
    const slots = [];
    const start = dayjs().hour(10).minute(30).second(0).millisecond(0);
    const end = dayjs().hour(18).minute(30).second(0).millisecond(0);
    let current = start.clone();
    while (current.isBefore(end)) {
      const sectionStart = current.clone();
      const sectionEnd = current.add(2, 'hour');
      const sectionSlots = [];
      let slot = sectionStart.clone();
      while (slot.isBefore(sectionEnd) && slot.isBefore(end)) {
        sectionSlots.push(slot.format('hh:mm A'));
        slot = slot.add(interval, 'minute');
      }
      slots.push({
        section: `${sectionStart.format('hh:mm A')} - ${sectionEnd.format('hh:mm A')}`,
        times: sectionSlots,
      });
      current = sectionEnd;
    }
    return slots;
  };

  // Days: June 4-7
  const days = [4, 5, 6, 7].map(day => dayjs('2024-06-' + String(day).padStart(2, '0')));

  return (
    <section id="experiences-section" className="py-24 m-2 md:mx-10 bg-[#181818]">

      {/* Bottom Sheet Modal */}
      {modalOpen && modalExperience && (
        <>
          <style>{`
            @keyframes customSlideUp {
              from { transform: translateY(100%); }
              to { transform: translateY(0); }
            }
            @keyframes customSlideDown {
              from { transform: translateY(0); }
              to { transform: translateY(100%); }
            }
            .custom-slide-up {
              animation: customSlideUp 0.35s cubic-bezier(0.4,0,0.2,1);
            }
            .custom-slide-down {
              animation: customSlideDown 0.35s cubic-bezier(0.4,0,0.2,1);
            }
          `}</style>
          <div className="fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-40 transition-opacity duration-300">
            <div className={`w-[calc(100vw-20px)] max-w-2xl h-[70vh] bg-[#232323] rounded-t-3xl shadow-lg p-6 relative mx-[10px] ${modalClosing ? 'custom-slide-down' : 'custom-slide-up'}`}>
              {/* Top row: Back button and heading */}
              <div className="flex items-center justify-between mb-4">
                <button
                  className="mr-2 text-white text-2xl flex items-center"
                  onClick={handleCloseModal}
                  aria-label="Back"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                </button>
                <span className="text-lg font-bold text-white flex-1 text-left">Book your time slots</span>
                <button
                  className={`bg-[#F0CC0E] text-black px-4 py-2 rounded-lg font-semibold ml-2 transition-opacity ${selectedTime ? '' : 'opacity-50 cursor-not-allowed'}`}
                  disabled={!selectedTime}
                  onClick={() => {
                    if (selectedTime) {
                      handleBookNowWithTime(modalExperience, days[selectedDayIdx], selectedTime);
                    }
                  }}
                >
                  Confirm
                </button>
              </div>
              {/* Day filter */}
              <div className="flex gap-1 sm:gap-2 mb-3 sm:mb-4">
                {days.map((day, idx) => (
                  <button
                    key={day.format('YYYY-MM-DD')}
                    onClick={() => { setSelectedDayIdx(idx); setSelectedSectionIdx(0); setSelectedTime(null); }}
                    className={`px-2 sm:px-4 py-1.5 sm:py-2 rounded-full border text-xs sm:text-sm font-semibold transition-colors
                      ${selectedDayIdx === idx ? 'bg-[#F0CC0E] text-black border-[#F0CC0E]' : 'bg-[#232323] text-white border-[#444]'}`}
                  >
                    {day.format('ddd, MMM D')}
                  </button>
                ))}
              </div>
              {/* Time section filter */}
              <div className="flex gap-1 sm:gap-2 mb-3 sm:mb-4 flex-wrap">
                {generateTimeSlots(
                  modalExperience.id === 'laser-tag' ? 10 : 5
                ).map((section, idx) => (
                  <button
                    key={section.section}
                    onClick={() => { setSelectedSectionIdx(idx); setSelectedTime(null); }}
                    className={`px-2 sm:px-3 py-1 rounded-full border text-xs font-semibold transition-colors
                      ${selectedSectionIdx === idx ? 'bg-[#F0CC0E] text-black border-[#F0CC0E]' : 'bg-[#232323] text-white border-[#444]'}`}
                  >
                    {section.section.replace(/:00 /g, '').replace(/:30 /g, ':30')}
                  </button>
                ))}
              </div>
              {/* Time slots UI */}
              <div className="overflow-y-auto h-[60%] pr-1 sm:pr-2">
                <div className="mb-4 sm:mb-6">
                  <div className="font-semibold text-white mb-2 hidden sm:block">{days[selectedDayIdx].format('dddd, MMM D')}</div>
                  <div className="font-semibold text-white mb-2 sm:hidden text-xs">{days[selectedDayIdx].format('ddd, MMM D')}</div>
                  {(() => {
                    const sections = generateTimeSlots(
                      modalExperience.id === 'laser-tag' ? 10 : 5
                    );
                    const section = sections[selectedSectionIdx];
                    return (
                      <div key={section.section} className="mb-2">
                        <div className="text-gray-300 text-xs sm:text-sm mb-1">{section.section.replace(/:00 /g, '').replace(/:30 /g, ':30')}</div>
                        <div className="flex flex-wrap gap-1 sm:gap-2 pb-2">
                          {section.times.map((time) => (
                            <button
                              key={time}
                              onClick={() => setSelectedTime(time)}
                              className={`px-2 sm:px-3 py-1 rounded-full border text-xs whitespace-nowrap transition-colors
                                ${selectedTime === time ? 'bg-[#F0CC0E] text-black border-[#F0CC0E]' : 'bg-[#232323] text-white border-[#444]'}`}
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 ">
          <h2 className="text-4xl font-bold text-white mb-4 md:mb-0">Experiences</h2>
          <button 
            onClick={handleGoToMerch}
            className="text-[#F0CC0E] font-bold hover:text-white transition-colors"
          >
            Go to Merch Store →
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {experiences.map((exp) => (
            <div key={exp.id} className="bg-[#1A1A1A] rounded-2xl p-6 flex flex-col items-start shadow-lg">
              <div className="w-full h-40 bg-[#232323] rounded-xl mb-4 flex items-center justify-center text-3xl text-[#F0CC0E] font-bold overflow-hidden">
                {exp.image ? (
                  <img src={exp.image} alt={exp.name} className="w-full h-full object-cover" />
                ) : (
                  exp.name
                )}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{exp.name}</h3>
              <p className="text-gray-400 mb-4">{exp.description}</p>
              <div className="mt-auto flex items-center justify-between w-full">
                <span className="text-lg font-bold text-[#F0CC0E]">Rs {exp.price}</span>
                <div className="flex gap-2">
                  {exp.hasDetails && exp.id !== 'laser-tag' && exp.id !== 'linkedin-headshot' && (
                    <button className="px-4 py-2 bg-[#232323] text-white rounded-lg font-semibold hover:bg-[#2a2a2a] transition-colors text-sm">
                      View Details
                    </button>
                  )}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      if (exp.id === 'laser-tag' || exp.id === 'linkedin-headshot') {
                        setModalExperience(exp);
                        setModalOpen(true);
                      } else {
                        handleBookNow(exp);
                      }
                    }}
                    className="px-4 py-2 bg-[#F0CC0E] text-black rounded-lg font-semibold hover:bg-[#e6bb00] transition-colors text-sm"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ListExperiences; 
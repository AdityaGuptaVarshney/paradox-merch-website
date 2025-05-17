import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';

interface ListExperiencesProps {
  onGoToMerch?: () => void;
}

const experiences = [
  {
    id: 'laser-tag',
    name: 'LASER TAG',
    price: 499,
    description: 'Experience the thrill of laser tag with your friends. Dodge, hide, and score points in a neon-lit arena!',
    image: '/images/experiences/laser-tag.jpg',
    duration: '60 mins',
    hasDetails: true,
    startTimes: ['10:00 AM', '2:00 PM', '6:00 PM']
  },
  {
    id: 'linkedin-headshot',
    name: 'LINKEDIN HEADSHOT',
    price: 299,
    description: 'Get a professional LinkedIn headshot taken by our expert photographers. Perfect for your next career move.',
    image: '/images/experiences/linkedin.jpg',
    duration: '30 mins',
    hasDetails: true,
    startTimes: ['11:00 AM', '3:00 PM', '5:00 PM']
  },
  {
    id: 'prom-night',
    name: 'Prom Night',
    price: 999,
    description: 'Dance the night away at our glamorous prom night. Dress up, enjoy music, and make memories!',
    image: '/images/experiences/prom.jpg',
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

  return (
    <section id="experiences-section" className="py-24 p-10 bg-[#181818]">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-bold text-white">Experiences</h2>
          <button 
            onClick={handleGoToMerch}
            className="text-gray-300 hover:text-white transition-colors"
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
              <div className="w-full mb-4">
                <select
                  value={selectedTimes[exp.id] || exp.startTimes[0]}
                  onChange={(e) => setSelectedTimes(prev => ({ ...prev, [exp.id]: e.target.value }))}
                  className="w-full px-3 py-2 bg-[#232323] text-white rounded-lg"
                >
                  {exp.startTimes.map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
              <div className="mt-auto flex items-center justify-between w-full">
                <span className="text-lg font-bold text-[#F0CC0E]">Rs {exp.price}</span>
                <div className="flex gap-2">
                  {exp.hasDetails && (
                    <button className="px-4 py-2 bg-[#232323] text-white rounded-lg font-semibold hover:bg-[#2a2a2a] transition-colors text-sm">
                      View Details
                    </button>
                  )}
                  <button 
                    onClick={() => handleBookNow(exp)}
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
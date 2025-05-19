import React from 'react';
import Link from 'next/link';

const categories = [
  {
    id: 'deals',
    name: 'Deals',
    icon: '🏷️',
    bgColor: 'from-[#F12F2F]/10',
  },
  {
    id: 'tshirts',
    name: 'T-shirt',
    icon: '👕',
    bgColor: 'from-[#1013CA]/10',
  },
  {
    id: 'polos',
    name: 'Polos',
    icon: '👔',
    bgColor: 'from-[#4346F2]/10',
  },
  {
    id: 'caps',
    name: 'Caps',
    icon: '🧢',
    bgColor: 'from-[#3538F3]/10',
  },
  {
    id: 'hoodies',
    name: 'Hoodies',
    icon: '🧥',
    bgColor: 'from-[#2024E9]/10',
  },
];

const Categories: React.FC = () => {
  return (
    <section className="m-2 md:mx-10 bg-[#181818]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/shop?category=${category.id}`}
              className={`group relative flex flex-col items-center justify-center p-6 rounded-2xl bg-gradient-to-b ${category.bgColor} to-transparent hover:scale-105 transition-transform`}
            >
              <span className="text-4xl mb-4">{category.icon}</span>
              <span className="text-white font-medium">{category.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories; 
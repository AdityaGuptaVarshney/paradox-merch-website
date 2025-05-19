import React from 'react';
import ProductCard from '../product/ProductCard';

interface NewArrivalsProps {
  onGoToExperiences?: () => void;
}

const newArrivals = [
  {
    id: 'hoodie-1',
    name: 'Paradox - Spy themed Unisex Hoodie',
    price: 999,
    salePrice: 799,
    salePercentage: 30,
    image: '/images/products/hoodie-1.jpg',
  },
  {
    id: 'tshirt-1',
    name: 'Paradox - Spy themed Unisex T-shirt',
    price: 599,
    salePrice: 499,
    salePercentage: 25,
    image: '/images/products/tshirt-1.jpg',
  },
  {
    id: 'cap-1',
    name: 'Paradox - Spy themed Unisex Cap',
    price: 399,
    salePrice: 249,
    salePercentage: 35,
    image: '/images/products/cap-1.jpg',
  },
  {
    id: 'polo-1',
    name: 'Paradox - Spy themed Unisex Polo',
    price: 799,
    salePrice: 549,
    salePercentage: 35,
    image: '/images/products/polo-1.jpg',
  },
];

const NewArrivals: React.FC<NewArrivalsProps> = ({ onGoToExperiences }) => {
  const handleGoToExperiences = () => {
    if (onGoToExperiences) {
      onGoToExperiences();
      setTimeout(() => {
        const experiencesSection = document.getElementById('experiences-section');
        if (experiencesSection) {
          experiencesSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <section id="new-arrivals" className="py-24 m-2 md:mx-10 bg-[#181818]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4 md:mb-0">New Arrivals</h2>
          <button 
            onClick={handleGoToExperiences}
            className="bg-gradient-to-r from-[#870000] to-[#E91313] bg-clip-text text-transparent font-bold hover:text-white transition-colors"
          >
            Go to Experiences →
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals; 
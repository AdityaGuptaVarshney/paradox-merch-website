import React from 'react';
import ProductCard from '../product/ProductCard';

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

const NewArrivals: React.FC = () => {
  return (
    <section id="new-arrivals" className="py-24 p-10 bg-[#181818]">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-bold text-white">New Arrivals</h2>
          <a href="/shop" className="text-gray-300 hover:text-white transition-colors">
            View All →
          </a>
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
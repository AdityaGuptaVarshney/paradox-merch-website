import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Header from '../components/layout/Header';
import ProductCard from '../components/product/ProductCard';

const products = [
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

const Shop: NextPage = () => {
  return (
    <>
      <Head>
        <title>Shop - Paradox Merch Store</title>
        <meta name="description" content="Shop the latest Paradox merchandise including t-shirts, hoodies, caps, and more." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-[#181818]">
        <Header />
        <div className="container mx-auto px-4 pt-24">
          <h1 className="text-4xl font-bold text-white mb-8">Shop</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Shop; 
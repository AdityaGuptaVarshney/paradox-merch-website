import React, { useState } from 'react';
import type { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Header from '../../components/layout/Header';
import { useCart } from '../../context/CartContext';
import toast from 'react-hot-toast';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  price: number;
  salePrice?: number;
  salePercentage?: number;
  image: string;
  description?: string;
  sizes: string[];
  gallery: string[];
}

interface ProductPageProps {
  product: Product;
}

const products: Product[] = [
  {
    id: 'hoodie-1',
    name: 'Paradox - Spy themed Unisex Hoodie',
    price: 999,
    salePrice: 799,
    salePercentage: 30,
    image: '/images/products/hoodie-1.jpg',
    description: 'Introducing our premium spy-themed unisex hoodie, crafted for both style and comfort. Made from high-quality cotton blend fabric, featuring a sleek design with our signature Paradox branding.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    gallery: [
      '/images/products/hoodie-1.jpg',
      '/images/products/hoodie-2.jpg',
      '/images/products/hoodie-3.jpg',
    ]
  },
  {
    id: 'tshirt-1',
    name: 'Paradox - Spy themed Unisex T-shirt',
    price: 599,
    salePrice: 499,
    salePercentage: 25,
    image: '/images/products/tshirt-1.jpg',
    description: 'Our signature spy-themed t-shirt combines style with comfort. Made from premium cotton, featuring our iconic Paradox design.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    gallery: [
      '/images/products/tshirt-1.jpg',
      '/images/products/tshirt-2.png',
      '/images/products/tshirt-3.png',
    ]
  },
  {
    id: 'cap-1',
    name: 'Paradox - Spy themed Unisex Cap',
    price: 399,
    salePrice: 249,
    salePercentage: 35,
    image: '/images/products/cap-1.jpg',
    description: 'Complete your spy look with our premium adjustable cap. Features our subtle Paradox branding and comfortable fit.',
    sizes: ['One Size'],
    gallery: [
      '/images/products/cap-1.jpg',
      '/images/products/cap-2.jpg',
      '/images/products/cap-3.jpg',
    ]
  },
  {
    id: 'polo-1',
    name: 'Paradox - Spy themed Unisex Polo',
    price: 799,
    salePrice: 549,
    salePercentage: 35,
    image: '/images/products/polo-1.jpg',
    description: 'Elevate your style with our spy-themed polo shirt. Made from premium cotton pique fabric with our signature Paradox detailing.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    gallery: [
      '/images/products/polo-1.jpg',
      '/images/products/polo-2.jpg',
      '/images/products/polo-3.jpg',
    ]
  },
];

const ProductPage: NextPage<ProductPageProps> = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState(product.gallery[0]);
  const router = useRouter();
  const { addToCart } = useCart();

  if (!product) return null;

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      salePrice: product.salePrice,
      image: product.image,
      size: selectedSize,
      quantity: 1,
    });

    toast.success('Added to cart!');
    router.push('/cart');
  };

  return (
    <>
      <Head>
        <title>{product.name} - Paradox Merch Store</title>
        <meta name="description" content={product.name} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen mt-39 bg-[#121212]">
        <Header />
        <div className="container mx-auto px-4 sm:px-10 pt-24 -mt-15 pb-10 sm:pt-25 lg:py-20">
          {/* Back Button - Mobile Only
          <Link href="/shop" className="inline-flex items-center text-gray-400 hover:text-white mb-6 sm:hidden">
            <img src="/icons/back.svg" alt="back" className="w-8 h-8 mr-2" />
            <span>Back to Shop</span>
          </Link> */}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Left Column - Mobile: Gallery & Info, Desktop: Info only */}
            <div className="flex flex-col space-y-6">
              {/* Mobile Preview - Shown only on mobile */}
              <div className="block lg:hidden relative aspect-square w-full overflow-hidden rounded-2xl bg-gradient-to-b from-[#1A1A1A] to-[#121212]">
                <Image
                  src={selectedImage}
                  alt={product.name}
                  fill
                  className="object-contain p-4"
                  priority
                />
              </div>

              {/* Mobile Gallery - Shown only on mobile */}
              <div className="grid grid-cols-3 gap-3 lg:hidden">
                {product.gallery.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(img)}
                    className={`relative aspect-square overflow-hidden rounded-xl bg-[#1A1A1A] ${
                      selectedImage === img ? 'ring-2 ring-[#F0CC0E]' : ''
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} view ${index + 1}`}
                      fill
                      className="object-contain p-2"
                    />
                  </button>
                ))}
              </div>

              {/* Desktop Gallery - Hidden on mobile */}
              <div className="hidden lg:flex gap-4 overflow-x-hidden pb-4 scrollbar-hide p-4">
                {product.gallery.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(img)}
                    className={`relative flex-shrink-0 w-[180px] h-[230px] overflow-hidden rounded-xl ${
                      selectedImage === img ? 'ring-2 ring-[#F0CC0E]' : ''
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} view ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                {/* Price Tag */}
                <div className="inline-flex items-center gap-2 rounded-full bg-[#1A1A1A]/60 px-4 py-2">
                  {product.salePrice ? (
                    <>
                      <span className="text-xl font-semibold text-[#F0CC0E]">Rs {product.salePrice}</span>
                      <span className="text-sm text-gray-400 line-through">Rs {product.price}</span>
                      <span className="text-xs font-medium text-[#F12F2F] bg-[#1A1A1A] px-2 py-1 rounded-full">
                        early bird price
                      </span>
                    </>
                  ) : (
                    <span className="text-xl font-semibold text-white">Rs {product.price}</span>
                  )}
                </div>

                {/* Product Name and Description */}
                <div>
                  <h1 className="text-2xl font-bold text-white mb-2">{product.name}</h1>
                  <p className="text-gray-400">{product.description}</p>
                </div>

                {/* Size Selection */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex flex-start justify-center align-center items-center gap-5">
                      <h3 className="text-sm font-medium text-white">sizes</h3>
                      <div className="flex gap-3">
                        {product.sizes.map((size) => (
                          <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`h-10 sm:h-12 w-10 sm:w-12 rounded-full border ${
                              selectedSize === size
                                ? 'border-[#F0CC0E] bg-[#F0CC0E] text-black'
                                : 'border-[#2A2A2A] bg-[#1A1A1A] text-white hover:border-[#F0CC0E]'
                            } text-sm font-medium transition-colors`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                    <button className="text-sm text-[#F0CC0E] hover:underline">
                      size chart
                    </button>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button 
                  onClick={handleAddToCart}
                  className="w-full bg-[#F0CC0E] text-black font-semibold py-3 sm:py-4 rounded-full hover:bg-[#F0CC0E]/90 transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>

            {/* Right Column - Main Preview (Desktop Only) */}
            <div className="hidden lg:block w-[700px] aspect-[4/3]">
              <div className="relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-b from-[#1A1A1A] to-[#121212]">
                <Image
                  src={selectedImage}
                  alt={product.name}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = products.map((product) => ({
    params: { id: product.id },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<ProductPageProps> = async ({ params }) => {
  const product = products.find((p) => p.id === params?.id);

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product,
    },
  };
};

export default ProductPage; 
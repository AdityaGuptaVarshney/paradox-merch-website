import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  salePrice?: number;
  salePercentage?: number;
  image: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  salePrice,
  salePercentage,
  image,
}) => {
  return (
    <div className="w-full">
      <Link href={`/product/${id}`} className="block">
        <div className="group relative w-full">
          {/* Card Container */}
          <div className="relative w-full rounded-2xl bg-[#121212] p-4">
            {/* Image Container */}
            <div className="relative aspect-square w-full overflow-hidden h-120 rounded-xl">
              <Image
                src={image}
                alt={name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>

            {/* Sale Tag */}
            {salePercentage && (
              <div className="absolute left-8 top-8">
                <div className="flex items-center gap-2 rounded-full bg-[#1A1A1A] px-3 py-1.5">
                  <span className="text-xs font-medium text-[#F12F2F]">SALE</span>
                  <span className="text-xs font-medium text-white">-{salePercentage}%</span>
                </div>
              </div>
            )}

            {/* Add to Cart Button - Visible on Hover */}
            <div className="absolute bottom-8 left-1/2 w-[calc(100%-2rem)] -translate-x-1/2 transform">
              <button className="w-full rounded-xl bg-[#1A1A1A] py-3 text-sm font-medium text-white opacity-0 transition-opacity duration-300 hover:bg-[#2A2A2A] group-hover:opacity-100">
                Add to cart
              </button>
            </div>
          </div>

          {/* Product Info */}
          <div className="mt-4 space-y-1.5">
            <h3 className="text-sm font-medium text-white">{name}</h3>
            <div className="flex items-center gap-2">
              {salePrice ? (
                <>
                  <span className="text-base font-semibold text-[#F12F2F]">Rs {salePrice}</span>
                  <span className="text-sm text-gray-400 line-through">Rs {price}</span>
                </>
              ) : (
                <span className="text-base font-semibold text-white">Rs {price}</span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard; 
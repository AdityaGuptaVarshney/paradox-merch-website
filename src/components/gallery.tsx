import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { Product } from '@/utils/gql.generated';

type GalleryProps = {
  product: Product;
  selectedImage: string;
  setSelectedImage: (img: string) => void;
};

const Gallery = ({ product, selectedImage, setSelectedImage }: GalleryProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;

    const scrollAmount = 220;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <div className="relative hidden lg:block">
      <button
        onClick={() => scroll('left')}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md p-2 rounded-full hover:bg-gray-100"
      >
        <ChevronLeft />
      </button>

      <button
        onClick={() => scroll('right')}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md p-2 rounded-full hover:bg-gray-100"
      >
        <ChevronRight />
      </button>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-hidden pb-4 scrollbar-hide p-4"
      >
        {product.images?.map((img, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(img.imageURL)}
            className={`relative flex-shrink-0 w-[180px] h-[230px] overflow-hidden rounded-xl ${
              selectedImage === img.imageURL ? 'ring-2 ring-[#F0CC0E]' : ''
            }`}
          >
            <Image
              src={img.imageURL.startsWith('http') ? img.imageURL : `${process.env.NEXT_PUBLIC_BACKEND_URL}/${img.imageURL.replace(/^\/+/, '')}`}
              alt={`${product.name} view ${index + 1}`}
              fill
              className="object-cover object-top"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Gallery;

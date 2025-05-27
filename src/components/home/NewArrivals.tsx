'use client';

import React from 'react';
import ProductCard from '../product/ProductCard';
import { useQuery, gql } from '@apollo/client';

interface NewArrivalsProps {
  onGoToExperiences?: () => void;
}

const GET_ALL_PRODUCTS = gql`
  query GetAllProducts {
    ProductQuery {
      edges {
        node {
          id
          name
          price
          category
          images {
            imageURL
          }
        }
      }
    }
  }
`;

const NewArrivals: React.FC<NewArrivalsProps> = ({ onGoToExperiences }) => {
  const { data, loading, error } = useQuery(GET_ALL_PRODUCTS);

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:8082';

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

  const products =
    data?.ProductQuery?.edges
      ?.map(({ node }: any) => node)
      ?.filter((p: any) => p.category === 'merchandise')
      ?.map((p: any) => ({
        id: p.id,
        name: p.name,
        price: Math.round(p.price * 1.2),
        salePrice: Math.round(p.price * 1),
        salePercentage: 20,
        image: p.images?.[0]?.imageURL
          ? p.images[0].imageURL.startsWith('http')
            ? p.images[0].imageURL
            : `${backendUrl}/${p.images[0].imageURL.replace(/^\/+/, '')}`
          : '/images/placeholder.png',
      })) ?? [];

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

        {loading ? (
          <p className="text-white text-center">Loading...</p>
        ) : error ? (
          <p className="text-red-500 text-center">Error loading products</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product: any) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default NewArrivals;

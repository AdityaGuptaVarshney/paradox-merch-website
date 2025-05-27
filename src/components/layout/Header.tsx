'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';
import { useAuth } from '@/context/AuthContext';

const Header: React.FC = () => {
  const { getItemCount } = useCart();
  const cartCount = getItemCount();

  const { memberData } = useAuth(); // ✅ use context instead of localStorage

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#121212]/80 backdrop-blur-md">
      <nav className="bg-[#181818] py-2 sm:py-4">
        <div className="container mx-auto px-4 flex items-center justify-between h-16 sm:h-20">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo.svg"
              alt="Paradox Logo"
              width={90}
              height={30}
              className="h-14 w-auto sm:h-16"
            />
          </Link>

          <Image
            src="/images/INFILTRATE b.png"
            alt="Paradox Logo"
            width={90}
            height={30}
            className="h-16 w-auto sm:block"
          />

          <div className="flex items-center gap-3 sm:gap-6">
            {/* 👤 Profile Picture or Login */}
            {memberData ? (
              <Link href="/auth" className="flex items-center gap-2">
                <img
                  src={memberData.profilePicURL || '/images/default-avatar.png'}
                  alt="Profile"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-white object-cover"
                />
              </Link>
            ) : (
              <Link href="/auth">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center bg-[#1A1A1A] hover:bg-[#2A2A2A] transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5.121 17.804A6 6 0 0112 15a6 6 0 016.879 2.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
              </Link>
            )}

            {/* 🛒 Cart */}
            <Link
              href="/cart"
              className="relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#1A1A1A] hover:bg-[#2A2A2A] transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 sm:h-6 sm:w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 text-xs font-medium text-black bg-[#F0CC0E] rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>

      {/* Ribbon Banner */}
      <div className="relative h-6 sm:h-8 bg-[#0000FF] overflow-hidden rotate-[-0.65deg]">
        <div className="absolute inset-0 flex items-center whitespace-nowrap animate-scroll">
          <div className="flex items-center space-x-4 text-white text-xs sm:text-sm font-medium transform -skew-x-12">
            {Array(10).fill(null).map((_, i) => (
              <React.Fragment key={i}>
                <span>paradox</span>
                <span className="text-gray-400">Store</span>
                <span>paradox</span>
                <span className="text-gray-400">Store</span>
                <span>paradox</span>
                <span className="text-gray-400">Store</span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';

const Header: React.FC = () => {
  const { getItemCount } = useCart();
  const cartCount = getItemCount();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#121212]/80 backdrop-blur-md">
      {/* Main Navigation */}
      <nav className="bg-[#181818] py-4">
        <div className="container mx-auto px-4 flex items-center justify-between h-25">
          {/* Left side - Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo.svg"
              alt="Paradox Logo"
              width={120}
              height={40}
              className="h-20 w-auto"
            />
          </Link>

          <Image
              src="/images/INFILTRATE b.png"
              alt="Paradox Logo"
              width={120}
              height={40}
              className="h-25 w-auto"
            />

          {/* Right side - Navigation & Icons */}
          <div className="flex items-center gap-6 mr-5">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/shop" className="text-gray-300 hover:text-white transition-colors">
              <img src="/icons/mail BTN.svg" alt="Mail" className="w-10 h-10" />
              </Link>
              <Link 
                href="/cart" 
                className="relative flex items-center justify-center w-12 h-12 rounded-full bg-[#1A1A1A] hover:bg-[#2A2A2A] transition-colors"
              >
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
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-medium text-black bg-[#F0CC0E] rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Ribbon Banner */}
      <div className="relative h-8 bg-[#0000FF] overflow-hidden rotate-[-0.65deg]">
        <div className="absolute inset-0 flex items-center whitespace-nowrap animate-scroll">
          <div className="flex items-center space-x-4 text-white text-sm font-medium transform -skew-x-12">
            {Array(10).fill(null).map((_, i) => (
              <React.Fragment key={i}>
                <span>paradox</span>
                <span className="text-gray-400">merch store</span>
                <span>paradox</span>
                <span className="text-gray-400">merch store</span>
                <span>paradox</span>
                <span className="text-gray-400">merch store</span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 
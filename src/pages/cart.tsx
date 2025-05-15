import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../components/layout/Header';
import { useCart } from '../context/CartContext';

const CartPage: NextPage = () => {
  const { items, removeFromCart, updateQuantity, getCartTotal } = useCart();

  if (items.length === 0) {
    return (
      <>
        <Head>
          <title>Cart - Paradox Merch Store</title>
          <meta name="description" content="Your shopping cart" />
        </Head>
        <main className="min-h-screen mt-30 bg-[#121212]">
          <Header />
          <div className="container mx-auto px-10 py-20">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-white mb-4">Your cart is empty</h1>
              <Link href="/" className="text-[#F0CC0E] hover:underline">
                Continue Shopping
              </Link>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Cart - Paradox Merch Store</title>
        <meta name="description" content="Your shopping cart" />
      </Head>

      <main className="min-h-screen mt-30 bg-[#121212]">
        <Header />
        <div className="container mx-auto px-10 py-20">
          <h1 className="text-3xl font-bold text-white mb-8">Shopping Cart</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div
                  key={`${item.id}-${item.size}`}
                  className="flex gap-4 bg-[#1A1A1A] p-4 rounded-xl"
                >
                  {/* Product Image */}
                  <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-grow">
                    <h3 className="text-white font-medium">{item.name}</h3>
                    <p className="text-gray-400 text-sm">Size: {item.size}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[#F0CC0E] font-semibold">
                        Rs {item.salePrice || item.price}
                      </span>
                      {item.salePrice && (
                        <span className="text-gray-400 line-through text-sm">
                          Rs {item.price}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Quantity and Remove */}
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.size, Math.max(1, item.quantity - 1))}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-[#2A2A2A] text-white hover:bg-[#3A3A3A]"
                      >
                        -
                      </button>
                      <span className="text-white w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-[#2A2A2A] text-white hover:bg-[#3A3A3A]"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id, item.size)}
                      className="text-red-500 text-sm hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-[#1A1A1A] p-6 rounded-xl h-fit">
              <h2 className="text-xl font-bold text-white mb-4">Order Summary</h2>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span>Rs {getCartTotal()}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
              </div>
              <div className="border-t border-[#2A2A2A] pt-4">
                <div className="flex justify-between text-white font-bold mb-4">
                  <span>Total</span>
                  <span>Rs {getCartTotal()}</span>
                </div>
                <button className="w-full bg-[#F0CC0E] text-black font-semibold py-4 rounded-full hover:bg-[#F0CC0E]/90 transition-colors">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default CartPage; 
import React, { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../components/layout/Header';
import { useCart } from '../context/CartContext';

type CollectionMode = 'delivery' | 'pickup';

interface DeliveryFormData {
  fullName: string;
  address: string;
  landmark: string;
  city: string;
  pincode: string;
  state: string;
  country: string;
  phone: string;
  alternatePhone: string;
  termsAccepted: boolean;
}

const CITIES = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 
  'Kolkata', 'Pune', 'Ahmedabad', 'Surat', 'Jaipur'
];

const STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 
  'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh',
  'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra'
];

const COUNTRIES = ['India', 'United States', 'United Kingdom', 'Canada', 'Australia'];

const CartPage: NextPage = () => {
  const { items, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const [collectionMode, setCollectionMode] = useState<CollectionMode>('pickup');
  const [deliveryForm, setDeliveryForm] = useState<DeliveryFormData>({
    fullName: '',
    address: '',
    landmark: '',
    city: '',
    pincode: '',
    state: '',
    country: '',
    phone: '',
    alternatePhone: '',
    termsAccepted: false
  });

  const handleDeliveryFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setDeliveryForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

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

      <main className="min-h-screen mt-20 sm:mt-30  bg-[#121212]">
        <Header />
        <div className="container mx-auto px-4 sm:px-15 -mt-5 py-8 sm:py-20 mt-18">
          <div className="max-w-8xl mx-auto">
            <div className="flex justify-between align-center items-center mb-8">
              <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                <img src="/icons/back.svg" alt="back" className="w-8 sm:w-10 h-8 sm:h-10" />
              </Link>
              <div className='text-right'>
                <h1 className="text-2xl sm:text-3xl font-bold text-white">My Cart</h1>
                <h3 className='text-[16px] sm:text-[21px] font-semibold text-[#404040]'>Logged in as, Chirag</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-13 gap-4 sm:gap-8">
              {/* Cart Items - Left Column */}
              <div className="lg:col-span-6 space-y-4">
                {items.map((item) => (
                  <div
                    key={`${item.id}-${item.size}`}
                    className="flex flex-col sm:flex-row gap-4 sm:gap-6 bg-[#1A1A1A] p-6 sm:p-6 rounded-2xl"
                  >
                    {/* Product Image */}
                    <div className="relative w-full sm:w-32 h-119 sm:h-32 flex-shrink-0 rounded-xl overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-base sm:text-lg font-medium text-white mb-1">{item.name}</h3>
                          <p className="text-sm text-gray-400 mb-2 sm:mb-4">Size: {item.size}</p>
                          <div className="flex items-center gap-2">
                            <span className="text-base sm:text-lg text-[#F0CC0E] font-semibold">
                              Rs {item.salePrice || item.price}
                            </span>
                            {item.salePrice && (
                              <span className="text-xs sm:text-sm text-gray-400 line-through">
                                Rs {item.price}
                              </span>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id, item.size)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>

                      {/* Quantity Controls */}
                      <div className="mt-4 sm:mt-6">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateQuantity(item.id, item.size, Math.max(1, item.quantity - 1))}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-[#2A2A2A] text-white hover:bg-[#3A3A3A] transition-colors"
                          >
                            -
                          </button>
                          <span className="text-white w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-[#2A2A2A] text-white hover:bg-[#3A3A3A] transition-colors"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Column - Collection Mode & Order Summary */}
              <div className="lg:col-span-7 space-y-4 sm:space-y-6">
                {/* Mode of Collection */}
                <div className="bg-[#1A1A1A] p-4 sm:p-6 rounded-2xl">
                  <h2 className="text-lg sm:text-xl font-bold text-white mb-4">Mode of Collection</h2>
                  <div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-3 sm:gap-2">
                    <button
                      onClick={() => setCollectionMode('delivery')}
                      className="w-full flex items-center justify-between p-3 sm:p-4 rounded-xl border transition-colors"
                      style={{
                        borderColor: collectionMode === 'delivery' ? '#F0CC0E' : '#2A2A2A',
                        backgroundColor: collectionMode === 'delivery' ? '#1A1A1A' : '#1A1A1A'
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                          collectionMode === 'delivery' ? 'border-[#F0CC0E]' : 'border-[#2A2A2A]'
                        }`}>
                          {collectionMode === 'delivery' && (
                            <div className="w-3 h-3 rounded-full bg-[#F0CC0E]" />
                          )}
                        </div>
                        <span className={`text-sm font-medium ${
                          collectionMode === 'delivery' ? 'text-white' : 'text-gray-400'
                        }`}>
                          Home Delivery
                        </span>
                      </div>
                      <span className="text-sm font-medium text-gray-400">
                        Rs 100
                      </span>
                    </button>

                    <button
                      onClick={() => setCollectionMode('pickup')}
                      className="w-full flex items-center justify-between p-3 sm:p-4 rounded-xl border transition-colors"
                      style={{
                        borderColor: collectionMode === 'pickup' ? '#F0CC0E' : '#2A2A2A',
                        backgroundColor: collectionMode === 'pickup' ? '#1A1A1A' : '#1A1A1A'
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                          collectionMode === 'pickup' ? 'border-[#F0CC0E]' : 'border-[#2A2A2A]'
                        }`}>
                          {collectionMode === 'pickup' && (
                            <div className="w-3 h-3 rounded-full bg-[#F0CC0E]" />
                          )}
                        </div>
                        <span className={`text-sm font-medium ${
                          collectionMode === 'pickup' ? 'text-white' : 'text-gray-400'
                        }`}>
                          Pick Up
                        </span>
                      </div>
                      <span className="text-sm font-medium text-gray-400">
                        Free
                      </span>
                    </button>
                  </div>

                  {/* Delivery Form */}
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    collectionMode === 'delivery' ? 'max-h-[2000px] mt-4 sm:mt-6 p-1' : 'max-h-0'
                  }`}>
                    <form className="space-y-4">
                      {/* Form fields with mobile optimization */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400">Full Name:</label>
                        <input
                          type="text"
                          name="fullName"
                          value={deliveryForm.fullName}
                          onChange={handleDeliveryFormChange}
                          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-[#2A2A2A] rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F0CC0E]"
                        />
                      </div>

                      {/* Address */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400">Address:</label>
                        <textarea
                          name="address"
                          value={deliveryForm.address}
                          onChange={handleDeliveryFormChange}
                          rows={3}
                          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-[#2A2A2A] rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F0CC0E] resize-none"
                        />
                      </div>

                      {/* Landmark */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400">Landmark:</label>
                        <input
                          type="text"
                          name="landmark"
                          value={deliveryForm.landmark}
                          onChange={handleDeliveryFormChange}
                          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-[#2A2A2A] rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F0CC0E]"
                        />
                      </div>

                      {/* City and Pincode */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-400">City:</label>
                          <select
                            name="city"
                            value={deliveryForm.city}
                            onChange={handleDeliveryFormChange}
                            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-[#2A2A2A] rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#F0CC0E] appearance-none cursor-pointer"
                          >
                            <option value="">Select City</option>
                            {CITIES.map(city => (
                              <option key={city} value={city}>{city}</option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-400">Pincode:</label>
                          <input
                            type="text"
                            name="pincode"
                            value={deliveryForm.pincode}
                            onChange={handleDeliveryFormChange}
                            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-[#2A2A2A] rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F0CC0E]"
                          />
                        </div>
                      </div>

                      {/* State and Country */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-400">State:</label>
                          <select
                            name="state"
                            value={deliveryForm.state}
                            onChange={handleDeliveryFormChange}
                            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-[#2A2A2A] rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#F0CC0E] appearance-none cursor-pointer"
                          >
                            <option value="">Select State</option>
                            {STATES.map(state => (
                              <option key={state} value={state}>{state}</option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-400">Country:</label>
                          <select
                            name="country"
                            value={deliveryForm.country}
                            onChange={handleDeliveryFormChange}
                            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-[#2A2A2A] rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#F0CC0E] appearance-none cursor-pointer"
                          >
                            <option value="">Select Country</option>
                            {COUNTRIES.map(country => (
                              <option key={country} value={country}>{country}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Phone Numbers */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400">Phone Number:</label>
                        <input
                          type="tel"
                          name="phone"
                          value={deliveryForm.phone}
                          onChange={handleDeliveryFormChange}
                          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-[#2A2A2A] rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F0CC0E]"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400">Alternate Phone Number:</label>
                        <input
                          type="tel"
                          name="alternatePhone"
                          value={deliveryForm.alternatePhone}
                          onChange={handleDeliveryFormChange}
                          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-[#2A2A2A] rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F0CC0E]"
                        />
                      </div>

                      {/* Terms and Conditions */}
                      <div className="flex items-start sm:items-center gap-3">
                        <input
                          type="checkbox"
                          name="termsAccepted"
                          checked={deliveryForm.termsAccepted}
                          onChange={handleDeliveryFormChange}
                          className="w-5 h-5 mt-0.5 sm:mt-0 rounded border-gray-400 text-[#F0CC0E] focus:ring-[#F0CC0E] bg-[#2A2A2A]"
                        />
                        <label className="text-sm text-gray-400">
                          I hereby confirm that I have read the terms and conditions
                        </label>
                      </div>

                      {/* Save Button */}
                      <button
                        type="submit"
                        className="w-full bg-[#2A2A2A] text-white font-semibold py-3 sm:py-4 rounded-xl hover:bg-[#2A2A2A]/90 transition-colors"
                      >
                        Save Address
                      </button>
                    </form>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="bg-[#141414] p-4 sm:p-6 rounded-2xl">
                  <div className="space-y-6">
                    {/* Subtotal Row */}
                    <div className="flex justify-between items-center">
                      <span className="text-[#404040] text-lg sm:text-2xl font-semibold">Subtotal:</span>
                      <span className="text-[#404040] text-lg sm:text-2xl font-semibold">
                        Rs {getCartTotal()}
                      </span>
                    </div>

                    {/* Offer Type Row */}
                    <div className="flex justify-between items-center">
                      <span className="text-[#404040] text-lg sm:text-2xl font-semibold">Offer Type:</span>
                      <div className="px-4 py-1.5 rounded-[55px] bg-[#2C1000] border-[3px] border-gradient-to-r from-[#BD450E] via-[#F56E2F] to-[#CB5621]">
                        <span className="text-[#E8722E] text-base sm:text-lg font-semibold">
                          early bird offer
                        </span>
                      </div>
                    </div>

                    {/* Total Discount Row */}
                    <div className="flex justify-between items-center">
                      <span className="text-[#404040] text-lg sm:text-2xl font-semibold">Total Discount</span>
                      <span className="text-[#404040] text-lg sm:text-2xl font-semibold">
                        Rs 200.00
                      </span>
                    </div>

                    {/* Divider */}
                    <div className="border-t-[2.5px] border-[#DFDFDF] border-dashed"></div>

                    {/* Total Row */}
                    <div className="flex justify-between items-center">
                      <span className="text-[#DFDFDF] text-xl sm:text-3xl font-semibold">Total:</span>
                      <span className="text-[#DFDFDF] text-xl sm:text-3xl font-semibold">
                        Rs {getCartTotal() - 200}
                      </span>
                    </div>

                    {/* Proceed Button */}
                    <button className="w-full bg-[#F0CC0E] text-black font-semibold py-3 sm:py-4 rounded-xl hover:bg-[#F0CC0E]/90 transition-colors text-lg">
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default CartPage; 
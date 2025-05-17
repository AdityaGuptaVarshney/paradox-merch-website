import type { NextPage } from 'next';
import Head from 'next/head';
import Header from '../components/layout/Header';
import Hero from '../components/home/Hero';
import ExperiencesHero from '../components/home/ExperiencesHero';
import Categories from '../components/home/Categories';
import NewArrivals from '../components/home/NewArrivals';
import ListExperiences from '../components/home/ListExperiences';
import React, { useState } from 'react';

const Home: NextPage = () => {
  const [showExperiences, setShowExperiences] = useState(false);

  const handleShopNow = () => {
    setShowExperiences(false);
  };

  const handleGoToExperiences = () => {
    setShowExperiences(true);
  };

  const handleGoToMerch = () => {
    setShowExperiences(false);
  };

  return (
    <>
      <Head>
        <title>Paradox Merch Store - Official Merchandise</title>
        <meta name="description" content="Shop the latest Paradox merchandise including t-shirts, hoodies, caps, and more." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-[#181818]">
        <Header />
        <Hero onShopNow={handleShopNow} />
        <ExperiencesHero onExploreNow={() => setShowExperiences(true)} />
        <Categories />
        {showExperiences ? (
          <ListExperiences onGoToMerch={handleGoToMerch} />
        ) : (
          <NewArrivals onGoToExperiences={handleGoToExperiences} />
        )}
      </main>
    </>
  );
};

export default Home;

import type { NextPage } from 'next';
import Head from 'next/head';
import Header from '../components/layout/Header';
import Hero from '../components/home/Hero';
import Categories from '../components/home/Categories';
import NewArrivals from '../components/home/NewArrivals';

const Home: NextPage = () => {
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
        <Hero />
        <Categories />
        <NewArrivals />
      </main>
    </>
  );
};

export default Home;

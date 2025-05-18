import type { NextPage } from 'next';
import Head from 'next/head';
import { useAuth } from '../context/AuthContext';

const AuthPage: NextPage = () => {
  const { signInWithGoogle } = useAuth();

  return (
    <>
      <Head>
        <title>Sign In - Paradox Merch Store</title>
        <meta name="description" content="Sign in to Paradox Merch Store" />
      </Head>

      <main className="min-h-screen bg-[#121212] flex items-center justify-center">
        <button
          onClick={signInWithGoogle}
          className="flex items-center gap-3 px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-100 transition-colors"
        >
          <img src="/icons/google.svg" alt="Google" className="w-6 h-6" />
          <span className="font-medium">Sign in with Google</span>
        </button>
      </main>
    </>
  );
};

export default AuthPage; 
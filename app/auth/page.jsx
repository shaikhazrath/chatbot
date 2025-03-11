'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabaseClient';
import LoginButton from '@/components/LoginButton';
import { useRouter } from 'next/navigation';
import logo from '@/public/logo.png'
import Image from 'next/image';
export default function Home() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      console.log(user)
      if (user) {
        router.push('/create');
      } else {
        alert(`Unexpected error: ${err.message}`);
        setLoading(false); 
      }
    };

    fetchUser();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <p className="text-lg text-gray-400">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black px-4 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute w-48 h-48 bg-blue-500 rounded-full opacity-30 blur-3xl top-1/4 left-1/4 animate-pulse"></div>
        <div className="absolute w-32 h-32 bg-purple-500 rounded-full opacity-30 blur-3xl bottom-1/4 right-1/4 animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-md w-full space-y-8 p-10 bg-black/80 rounded-3xl shadow-2xl text-center border border-gray-800 backdrop-blur-lg">
        <div className="mb-6">
          <Image
          width={10}
          height={10}
            src={logo}
            alt="App Logo"
            className="w-24 h-24 mx-auto"
          />
        </div>

        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-4">
          Welcome to Gala
        </h1>

        <p className="text-sm text-gray-400 mb-8">
          Log in to access your account and explore the future.
        </p>

        <LoginButton />

        <p className="text-xs text-gray-500 mt-8">
          © 2023 Your App Name. All rights reserved.
        </p>
      </div>
    </div>
  );
}
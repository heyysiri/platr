'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { UserButton, useAuth } from "@clerk/nextjs";
import PreferencesForm from '@/components/preferences/PreferencesForm';

export default function Dashboard() {
  const { userId, isLoaded } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !userId) {
      router.push('/');
    }
  }, [isLoaded, userId, router]);

  if (!isLoaded || !userId) {
    return null;
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <UserButton afterSignOutUrl="/" />
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <PreferencesForm />
        </div>
      </div>
    </div>
  );
} 
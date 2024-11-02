'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

const BtnBack = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="p-4 bg-blue-500 text-white rounded hover:bg-blue-600">
      Назад
    </button>
  );
};

export default BtnBack;

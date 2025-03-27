'use client';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const Dither = dynamic(() => import('src/blocks/Backgrounds/Dither/Dither'), {
  ssr: false,
  loading: () => <div className='w-full h-full bg-black' />,
});

export default function DitherWrapper() {
  return (
    <div className='relative w-full h-full'>
      <Suspense fallback={<div className='w-full h-full bg-black' />}>
        <Dither waveSpeed={0.04} />
      </Suspense>
    </div>
  );
}

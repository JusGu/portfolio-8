'use client';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const Dither = dynamic(() => import('src/blocks/Backgrounds/Dither/Dither'), {
  ssr: false,
  loading: () => <div className='w-full h-[400px] bg-black rounded-2xl' />,
});

export default function DitherWrapper() {
  return (
    <div className='relative w-full h-[400px] rounded-2xl overflow-hidden pointer-events-auto'>
      <Suspense
        fallback={<div className='w-full h-[400px] bg-black rounded-2xl' />}
      >
        <Dither waveSpeed={0.04} waveColor={[0.5, 0.5, 0.5]} />
      </Suspense>
    </div>
  );
}

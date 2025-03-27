'use client';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const Dither = dynamic(() => import('src/blocks/Backgrounds/Dither/Dither'), {
  ssr: false,
  loading: () => (
    <div className='-mx-8 w-[calc(100%+64px)] h-full bg-black rounded-2xl animate-fade-in' />
  ),
});

export default function DitherWrapper() {
  return (
    <div className='relative -mx-8 w-[calc(100%+64px)] h-[400px] rounded-2xl overflow-hidden pointer-events-auto animate-fade-in'>
      <Suspense
        fallback={
          <div className='absolute inset-0 bg-black rounded-2xl animate-fade-in' />
        }
      >
        <div className='absolute inset-0 w-full h-full'>
          <Dither waveSpeed={0.04} waveColor={[0.2, 0.2, 0.2]} />
        </div>
      </Suspense>
    </div>
  );
}

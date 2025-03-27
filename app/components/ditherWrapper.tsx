'use client';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const Dither = dynamic(() => import('src/blocks/Backgrounds/Dither/Dither'), {
  ssr: false,
  loading: () => (
    <div className='-mx-8 w-[calc(100%+64px)] h-[400px] bg-black rounded-2xl' />
  ),
});

export default function DitherWrapper() {
  return (
    <div className='relative -mx-8 w-[calc(100%+64px)] h-[400px] rounded-2xl overflow-hidden pointer-events-auto'>
      <Suspense
        fallback={
          <div className='-mx-8 w-[calc(100%+64px)] h-[400px] bg-black rounded-2xl' />
        }
      >
        <Dither waveSpeed={0.04} waveColor={[0.2, 0.2, 0.2]} />
      </Suspense>
    </div>
  );
}

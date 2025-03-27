'use client';
import dynamic from 'next/dynamic';

const Dither = dynamic(() => import('src/blocks/Backgrounds/Dither/Dither'), {
  ssr: false,
});

export default function DitherWrapper() {
  return (
    <div className='relative'>
      <Dither />
    </div>
  );
}

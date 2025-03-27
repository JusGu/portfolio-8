import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import type { DitheredWavesProps } from './types';

const ThreeCanvas = dynamic(
  () => import('./ThreeCanvas').then((mod) => mod.default),
  { ssr: false },
);

export const DitheredWaves = React.memo(function DitheredWaves(
  props: DitheredWavesProps,
) {
  const [loading, setLoading] = useState(true);

  const handleLoad = () => {
    console.log('Canvas loaded');
    setLoading(false);
  };

  return (
    <div className='w-full h-full'>
      {loading && (
        <div className='absolute inset-0 bg-black transition-opacity duration-500' />
      )}
      <div
        className={`w-full h-full transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}
      >
        <ThreeCanvas {...props} onLoad={handleLoad} />
      </div>
    </div>
  );
});

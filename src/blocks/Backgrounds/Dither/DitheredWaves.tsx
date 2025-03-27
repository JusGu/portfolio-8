import React from 'react';
import { Canvas } from '@react-three/fiber';
import dynamic from 'next/dynamic';
import type { DitheredWavesProps } from './types';

const Scene = dynamic(() => import('./Scene'), {
  ssr: false,
  loading: () => null,
});

export const DitheredWaves = React.memo(function DitheredWaves(
  props: DitheredWavesProps,
) {
  return (
    <Canvas
      className='w-full h-full relative'
      camera={{ position: [0, 0, 6] }}
      dpr={Math.min(window.devicePixelRatio, 2)}
      gl={{
        antialias: false,
        powerPreference: 'high-performance',
        preserveDrawingBuffer: true,
      }}
      performance={{ min: 0.5 }}
    >
      <Scene {...props} />
    </Canvas>
  );
});

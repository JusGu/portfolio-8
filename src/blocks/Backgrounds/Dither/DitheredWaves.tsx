import React from 'react';
import { Canvas } from '@react-three/fiber';
import dynamic from 'next/dynamic';
import type { DitheredWavesProps } from './types';

const Scene = dynamic(() => import('./Scene'), { ssr: false });

export const DitheredWaves = React.memo(function DitheredWaves(
  props: DitheredWavesProps,
) {
  return (
    <Canvas
      className='w-full h-full relative'
      camera={{ position: [0, 0, 6] }}
      dpr={window.devicePixelRatio}
      gl={{ antialias: true, preserveDrawingBuffer: true }}
    >
      <Scene {...props} />
    </Canvas>
  );
});

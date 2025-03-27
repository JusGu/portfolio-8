import React from 'react';
import { Canvas } from '@react-three/fiber';
import type { DitheredWavesProps } from './types';
import Scene from './Scene';

export default function ThreeCanvas(props: DitheredWavesProps) {
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
}

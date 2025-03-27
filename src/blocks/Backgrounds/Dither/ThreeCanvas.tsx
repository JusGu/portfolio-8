import React, { useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import type { DitheredWavesProps } from './types';
import Scene from './Scene';

interface ThreeCanvasProps extends DitheredWavesProps {
  onLoad?: () => void;
}

const ThreeCanvas: React.FC<ThreeCanvasProps> = ({ onLoad, ...props }) => {
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
      onCreated={() => onLoad?.()}
    >
      <Scene {...props} />
    </Canvas>
  );
};

export default ThreeCanvas;

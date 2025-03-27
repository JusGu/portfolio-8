import React from 'react';
import dynamic from 'next/dynamic';
import type { DitheredWavesProps } from './types';

const ThreeCanvas = dynamic(
  () => import('./ThreeCanvas').then((mod) => mod.default),
  { ssr: false },
);

export const DitheredWaves = React.memo(function DitheredWaves(
  props: DitheredWavesProps,
) {
  return <ThreeCanvas {...props} />;
});

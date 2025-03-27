import React, { useRef, useState, useCallback } from 'react';
import { useFrame, useThree, ThreeEvent } from '@react-three/fiber';
import { EffectComposer } from '@react-three/postprocessing';
import * as THREE from 'three';
import { RetroEffect } from './Dither';
import type { RetroEffectImpl } from './Dither';
import type { DitheredWavesProps } from './types';
import { waveVertexShader, waveFragmentShader } from './Dither';

function SceneContent(props: DitheredWavesProps) {
  const {
    waveSpeed,
    waveFrequency,
    waveAmplitude,
    waveColor,
    colorNum,
    pixelSize,
    disableAnimation,
    enableMouseInteraction,
    mouseRadius,
  } = props;

  const mesh = useRef<THREE.Mesh>(null);
  const effect = useRef<RetroEffectImpl>(null);
  const mousePosRef = useRef(new THREE.Vector2(0, 0));
  const { viewport, size, gl } = useThree();

  const waveUniforms = React.useMemo(
    () => ({
      time: { value: 0 },
      resolution: { value: new THREE.Vector2(0, 0) },
      waveSpeed: { value: waveSpeed },
      waveFrequency: { value: waveFrequency },
      waveAmplitude: { value: waveAmplitude },
      waveColor: { value: new THREE.Color(...waveColor) },
      mousePos: { value: mousePosRef.current },
      enableMouseInteraction: { value: enableMouseInteraction ? 1 : 0 },
      mouseRadius: { value: mouseRadius },
    }),
    [],
  );

  React.useEffect(() => {
    const dpr = gl.getPixelRatio();
    const newWidth = Math.floor(size.width * dpr);
    const newHeight = Math.floor(size.height * dpr);
    waveUniforms.resolution.value.set(newWidth, newHeight);
  }, [size, gl, waveUniforms]);

  useFrame(({ clock }) => {
    if (!disableAnimation) {
      waveUniforms.time.value = clock.getElapsedTime();
    }
    waveUniforms.waveSpeed.value = waveSpeed;
    waveUniforms.waveFrequency.value = waveFrequency;
    waveUniforms.waveAmplitude.value = waveAmplitude;
    waveUniforms.waveColor.value.set(...waveColor);
    waveUniforms.enableMouseInteraction.value = enableMouseInteraction ? 1 : 0;
    waveUniforms.mouseRadius.value = mouseRadius;
    if (effect.current) {
      effect.current.colorNum = colorNum;
      effect.current.pixelSize = pixelSize;
    }
  });

  const handlePointerMove = useCallback(
    (e: ThreeEvent<PointerEvent>) => {
      if (!enableMouseInteraction) return;
      const rect = gl.domElement.getBoundingClientRect();
      const dpr = gl.getPixelRatio();
      const x = (e.clientX - rect.left) * dpr;
      const y = (e.clientY - rect.top) * dpr;
      mousePosRef.current.set(x, y);
    },
    [enableMouseInteraction, gl],
  );

  return (
    <>
      <mesh ref={mesh} scale={[viewport.width, viewport.height, 1]}>
        <planeGeometry args={[1, 1]} />
        <shaderMaterial
          vertexShader={waveVertexShader}
          fragmentShader={waveFragmentShader}
          uniforms={waveUniforms}
        />
      </mesh>
      <EffectComposer>
        <RetroEffect ref={effect} />
      </EffectComposer>
      <mesh
        onPointerMove={handlePointerMove}
        position={[0, 0, 0.01]}
        scale={[viewport.width, viewport.height, 1]}
        visible={false}
      >
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
    </>
  );
}

export default function Scene(props: DitheredWavesProps) {
  return React.createElement(SceneContent, props);
}

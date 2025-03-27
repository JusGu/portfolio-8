import React, { useMemo, useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { EffectComposer } from '@react-three/postprocessing';
import * as THREE from 'three';
import { RetroEffect } from './Dither';
import type { DitheredWavesProps } from './types';
import { waveVertexShader, waveFragmentShader } from './Dither';
import { Mesh, PlaneGeometry, ShaderMaterial } from 'three';

const Scene = React.memo(function Scene(props: DitheredWavesProps) {
  const { viewport, size, gl } = useThree();
  const meshRef = useRef<Mesh>(null);
  const materialRef = useRef<ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      time: { value: 0 },
      resolution: { value: new THREE.Vector2() },
      waveSpeed: { value: props.waveSpeed },
      waveFrequency: { value: props.waveFrequency },
      waveAmplitude: { value: props.waveAmplitude },
      waveColor: { value: new THREE.Color(...props.waveColor) },
      mousePos: { value: new THREE.Vector2() },
      enableMouseInteraction: { value: props.enableMouseInteraction ? 1 : 0 },
      mouseRadius: { value: props.mouseRadius },
    }),
    [],
  ); // Empty dependency array to keep uniforms stable

  // Handle resize
  useEffect(() => {
    const updateResolution = () => {
      const dpr = gl.getPixelRatio();
      uniforms.resolution.value.set(size.width * dpr, size.height * dpr);
    };
    updateResolution();
    window.addEventListener('resize', updateResolution);
    return () => window.removeEventListener('resize', updateResolution);
  }, [gl, size, uniforms]);

  useFrame(({ clock }) => {
    if (!props.disableAnimation) {
      uniforms.time.value = clock.getElapsedTime();
      uniforms.waveSpeed.value = props.waveSpeed;
      uniforms.waveFrequency.value = props.waveFrequency;
      uniforms.waveAmplitude.value = props.waveAmplitude;
      uniforms.waveColor.value.set(...props.waveColor);
      uniforms.enableMouseInteraction.value = props.enableMouseInteraction
        ? 1
        : 0;
      uniforms.mouseRadius.value = props.mouseRadius;
    }
  });

  const handlePointerMove = (e: THREE.Event) => {
    if (!props.enableMouseInteraction) return;
    const rect = gl.domElement.getBoundingClientRect();
    const dpr = gl.getPixelRatio();
    const x = (e.clientX - rect.left) * dpr;
    const y = (e.clientY - rect.top) * dpr;
    uniforms.mousePos.value.set(x, y);
  };

  return (
    <>
      <mesh
        ref={meshRef}
        scale={[viewport.width, viewport.height, 1]}
        onPointerMove={handlePointerMove}
      >
        <planeGeometry />
        <shaderMaterial
          vertexShader={waveVertexShader}
          fragmentShader={waveFragmentShader}
          uniforms={uniforms}
        />
      </mesh>
      <EffectComposer>
        <RetroEffect pixelSize={props.pixelSize} colorNum={props.colorNum} />
      </EffectComposer>
      <mesh
        position={[0, 0, 0.01]}
        scale={[viewport.width, viewport.height, 1]}
        onPointerMove={handlePointerMove}
      >
        <planeGeometry />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
    </>
  );
});

export default Scene;

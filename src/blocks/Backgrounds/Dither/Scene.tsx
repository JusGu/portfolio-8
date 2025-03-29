import React, { useMemo, useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { EffectComposer } from '@react-three/postprocessing';
import * as THREE from 'three';
import { RetroEffect } from './Dither';
import type { DitheredWavesProps } from './types';
import { waveVertexShader, waveFragmentShader } from './Dither';

const Scene = React.memo(function Scene(props: DitheredWavesProps) {
  const { viewport, size, gl } = useThree();
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      time: { value: 0 },
      resolution: { value: new THREE.Vector2() },
      waveSpeed: { value: props.waveSpeed },
      waveFrequency: { value: props.waveFrequency },
      waveAmplitude: { value: props.waveAmplitude },
      waveColor: { value: new THREE.Color(...props.waveColor) },
      mousePos: { value: new THREE.Vector2() },
      targetMousePos: { value: new THREE.Vector2() },
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

      // Smoothly interpolate the mouse position
      uniforms.mousePos.value.lerp(uniforms.targetMousePos.value, 0.1);
    }
  });

  const handlePointerMove = (x: number, y: number) => {
    const rect = gl.domElement.getBoundingClientRect();
    const dpr = gl.getPixelRatio();
    const posX = (x - rect.left) * dpr;
    const posY = (y - rect.top) * dpr;
    uniforms.targetMousePos.value.set(posX, posY);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      handlePointerMove(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        handlePointerMove(touch.clientX, touch.clientY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <>
      <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
        <planeGeometry />
        <shaderMaterial
          ref={materialRef}
          vertexShader={waveVertexShader}
          fragmentShader={waveFragmentShader}
          uniforms={uniforms}
        />
      </mesh>
      <EffectComposer>
        <RetroEffect pixelSize={props.pixelSize} colorNum={props.colorNum} />
      </EffectComposer>
    </>
  );
});

export default Scene;

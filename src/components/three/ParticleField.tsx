'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const PARTICLE_COUNT = 300;

export default function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  const { positions, colors, sizes } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const sizes = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Spread particles in a wide field
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

      // Mix of white and coral-tinted particles
      if (Math.random() > 0.7) {
        // Coral accent particles
        colors[i * 3] = 1.0;
        colors[i * 3 + 1] = 0.44;
        colors[i * 3 + 2] = 0.35;
      } else {
        // White/blue-ish particles
        const brightness = 0.5 + Math.random() * 0.5;
        colors[i * 3] = brightness;
        colors[i * 3 + 1] = brightness;
        colors[i * 3 + 2] = brightness + 0.1;
      }

      sizes[i] = Math.random() * 2 + 0.5;
    }

    return { positions, colors, sizes };
  }, []);

  // Track mouse for subtle parallax
  useMemo(() => {
    if (typeof window === 'undefined') return;
    const handler = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const time = state.clock.elapsedTime;

    // Slow rotation
    pointsRef.current.rotation.y = time * 0.02 + mouseRef.current.x * 0.1;
    pointsRef.current.rotation.x = time * 0.01 + mouseRef.current.y * 0.05;

    // Subtle float
    pointsRef.current.position.y = Math.sin(time * 0.3) * 0.2;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={PARTICLE_COUNT}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={PARTICLE_COUNT}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={PARTICLE_COUNT}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

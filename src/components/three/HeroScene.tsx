'use client';

import { Canvas } from '@react-three/fiber';
import ParticleField from './ParticleField';

export default function HeroScene() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        dpr={[1, 2]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ParticleField />
      </Canvas>
    </div>
  );
}

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const Globe = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.rotation.x += 0.002;
    }
  });

  return (
    <Sphere args={[1, 32, 32]} ref={meshRef}>
      <MeshDistortMaterial
        color="#00ff41"
        wireframe
        distort={0.3}
        speed={2}
        roughness={0}
      />
    </Sphere>
  );
};

const CyberGlobe: React.FC = () => {
  return (
    <div style={{ width: '120px', height: '120px', border: '1px solid var(--neon-green)', background: '#000' }}>
      <Canvas camera={{ position: [0, 0, 3] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Globe />
      </Canvas>
    </div>
  );
};

export default CyberGlobe;

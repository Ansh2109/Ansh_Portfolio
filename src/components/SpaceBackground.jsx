import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, Stars, Float } from '@react-three/drei';
import * as THREE from 'three';

const SubtleNebula = ({ position, color = "#00f3ff", scale = 1 }) => {
  const count = 5000;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const radius = Math.random() * 40;
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i3 + 2] = radius * Math.cos(phi);
    }
    return pos;
  }, []);

  return (
    <group position={position} scale={scale}>
      <Points positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          vertexColors={false}
          size={0.06}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          color={color}
          opacity={0.05}
        />
      </Points>
    </group>
  );
};

const SpaceBackground = ({ scrollProgress = 0 }) => {
  const { mouse } = useThree();
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      const targetRotationX = (mouse.y * Math.PI) * 0.05;
      const targetRotationY = (mouse.x * Math.PI) * 0.05;
      groupRef.current.rotation.x += (targetRotationX - groupRef.current.rotation.x) * 0.05;
      groupRef.current.rotation.y += (targetRotationY - groupRef.current.rotation.y) * 0.05;

      const targetZ = -scrollProgress * 25;
      groupRef.current.position.z += (targetZ - groupRef.current.position.z) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <color attach="background" args={['#000000']} />
      <ambientLight intensity={0.1} />
      
      {/* Restoring ONLY SPACE: Subtle Starfields */}
      <Stars radius={300} depth={60} count={20000} factor={4} saturation={0} fade speed={1} />
      
      {/* Very faint nebulae at extreme distance */}
      <SubtleNebula position={[30, 20, -100]} color="#00f3ff" scale={2.5} />
      <SubtleNebula position={[-50, -30, -150]} color="#00ff41" scale={3.5} />
      
      <Float speed={0.5} rotationIntensity={0.05} floatIntensity={0.1}>
         <Stars radius={150} depth={50} count={5000} factor={7} saturation={0.5} fade speed={1.5} />
      </Float>

      <fog attach="fog" args={['#000000', 5, 250]} />
    </group>
  );
};

export default SpaceBackground;

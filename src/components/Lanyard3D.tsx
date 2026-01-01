"use client";

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, RoundedBox, Sphere, Ring } from '@react-three/drei';
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Komponen Tali Lanyard
function LanyardRope() {
  const ropeRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (ropeRef.current) {
      ropeRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  return (
    <group ref={ropeRef} position={[0, 2, 0]}>
      {/* Segments tali dengan tekstur realistis */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={i} position={[0, -i * 0.3, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.25]} />
          <meshStandardMaterial 
            color="#4a4a4a" 
            roughness={0.8}
            metalness={0.1}
          />
        </mesh>
      ))}
    </group>
  );
}

// Komponen Ring Logam
function MetalRing() {
  const ringRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group position={[0, 0.5, 0]}>
      <mesh ref={ringRef}>
        <torusGeometry args={[0.15, 0.03, 8, 16]} />
        <meshStandardMaterial 
          color="#c0c0c0" 
          metalness={0.9}
          roughness={0.1}
          envMapIntensity={1}
        />
      </mesh>
    </group>
  );
}

// Komponen Avatar 3D
function Avatar3D() {
  const avatarRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (avatarRef.current) {
      avatarRef.current.rotation.y = hovered ? 
        Math.PI : 
        Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <group 
      ref={avatarRef} 
      position={[0, 0.8, 0.1]}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      {/* Front side - Avatar */}
      <Sphere args={[0.25]} position={[0, 0, 0]}>
        <meshStandardMaterial 
          color="#fbbf24" 
          metalness={0.3}
          roughness={0.2}
        />
      </Sphere>
      
      {/* Back side - Code icon (simplified) */}
      <group position={[0, 0, -0.5]} rotation={[0, Math.PI, 0]}>
        <Sphere args={[0.25]}>
          <meshStandardMaterial 
            color="#3b82f6" 
            metalness={0.3}
            roughness={0.2}
          />
        </Sphere>
      </group>
      
      {/* Text on avatar */}
      <Text
        position={[0, 0, 0.26]}
        fontSize={0.15}
        color="black"
        anchorX="center"
        anchorY="middle"
      >
        MR
      </Text>
    </group>
  );
}

// Komponen Badge Utama
function Badge3D() {
  const badgeRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (badgeRef.current) {
      badgeRef.current.rotation.x = hovered ? 0.1 : Math.sin(state.clock.elapsedTime * 0.4) * 0.05;
      badgeRef.current.rotation.y = hovered ? 0.2 : Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      badgeRef.current.position.z = hovered ? 0.1 : 0;
    }
  });

  return (
    <group 
      ref={badgeRef}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      {/* Badge Base */}
      <RoundedBox args={[1.2, 1.6, 0.1]} radius={0.1}>
        <meshStandardMaterial 
          color="#1f2937"
          metalness={0.1}
          roughness={0.3}
        />
      </RoundedBox>
      
      {/* Border dengan efek glow */}
      <RoundedBox args={[1.25, 1.65, 0.05]} radius={0.12} position={[0, 0, -0.03]}>
        <meshStandardMaterial 
          color="#fbbf24"
          metalness={0.8}
          roughness={0.2}
          emissive="#fbbf24"
          emissiveIntensity={hovered ? 0.3 : 0.1}
        />
      </RoundedBox>
      
      {/* Avatar */}
      <Avatar3D />
      
      {/* Name Text */}
      <Text
        position={[0, 0.3, 0.06]}
        fontSize={0.08}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        Mohammad Raihan
      </Text>
      
      {/* Job Title */}
      <Text
        position={[0, 0.15, 0.06]}
        fontSize={0.05}
        color="#fbbf24"
        anchorX="center"
        anchorY="middle"
      >
        FULL STACK DEVELOPER
      </Text>
      
      {/* Info Items */}
      <Text
        position={[0, -0.1, 0.06]}
        fontSize={0.04}
        color="#9ca3af"
        anchorX="center"
        anchorY="middle"
      >
        📍 Jakarta, Indonesia
      </Text>
      
      <Text
        position={[0, -0.25, 0.06]}
        fontSize={0.04}
        color="#9ca3af"
        anchorX="center"
        anchorY="middle"
      >
        💻 React • Node.js • Python
      </Text>
      
      <Text
        position={[0, -0.4, 0.06]}
        fontSize={0.04}
        color="#9ca3af"
        anchorX="center"
        anchorY="middle"
      >
        📅 3+ Years Experience
      </Text>
      
      {/* Status Indicator */}
      <group position={[0, -0.6, 0.06]}>
        <Sphere args={[0.02]} position={[-0.15, 0, 0]}>
          <meshStandardMaterial 
            color="#10b981"
            emissive="#10b981"
            emissiveIntensity={0.5}
          />
        </Sphere>
        <Text
          position={[0, 0, 0]}
          fontSize={0.04}
          color="#10b981"
          anchorX="center"
          anchorY="middle"
        >
          Available for work
        </Text>
      </group>
      
      {/* Decorative elements */}
      <Sphere args={[0.03]} position={[0.5, 0.7, 0.06]}>
        <meshStandardMaterial 
          color="#fbbf24"
          metalness={0.8}
          roughness={0.1}
          emissive="#fbbf24"
          emissiveIntensity={0.2}
        />
      </Sphere>
      
      <Sphere args={[0.02]} position={[-0.5, -0.7, 0.06]}>
        <meshStandardMaterial 
          color="#f59e0b"
          metalness={0.8}
          roughness={0.1}
          emissive="#f59e0b"
          emissiveIntensity={0.2}
        />
      </Sphere>
    </group>
  );
}

// Scene Lighting
function Lighting() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight 
        position={[2, 2, 2]} 
        intensity={1} 
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[-2, -2, 2]} intensity={0.5} color="#fbbf24" />
      <spotLight 
        position={[0, 0, 4]} 
        intensity={0.3} 
        angle={0.3} 
        penumbra={1}
        castShadow
      />
    </>
  );
}

// Main Lanyard3D Component
export default function Lanyard3D() {
  return (
    <div className="w-48 h-72 md:w-64 md:h-96 absolute top-16 right-4 md:right-8 lg:right-16 z-10 pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, 3], fov: 45 }}
        shadows
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
        style={{ background: 'transparent' }}
        frameloop="demand"
        performance={{ min: 0.8 }}
      >
        <Lighting />
        
        {/* Lanyard Components */}
        <LanyardRope />
        <MetalRing />
        <Badge3D />
        
        {/* Controls with limited interaction */}
        <OrbitControls 
          enablePan={false}
          enableZoom={false}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 3}
          autoRotate
          autoRotateSpeed={0.3}
          dampingFactor={0.05}
          enableDamping
        />
      </Canvas>
    </div>
  );
}

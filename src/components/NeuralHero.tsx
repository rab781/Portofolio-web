'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Line } from '@react-three/drei';
import * as THREE from 'three';

function NetworkNode({ position, color }: { position: [number, number, number], color: string }) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;
        // Pulse effect
        const t = state.clock.getElapsedTime();
        const scale = 1 + Math.sin(t * 2 + position[0]) * 0.1;
        meshRef.current.scale.set(scale, scale, scale);
    });

    return (
        <Sphere ref={meshRef} position={position} args={[0.15, 16, 16]}>
            <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.8}
                roughness={0.2}
                metalness={0.8}
            />
        </Sphere>
    );
}

function Connections({ points, color }: { points: [number, number, number][], color: string }) {
    // Create connections between some points
    const lines = useMemo(() => {
        const connections: [number, number, number][] = [];
        points.forEach((p1, i) => {
            // Connect to nearest 3 neighbors or random
            points.slice(i + 1, i + 4).forEach(p2 => {
                if (Math.random() > 0.5) { // Randomly connect
                    connections.push(p1);
                    connections.push(p2);
                }
            });
        });
        return connections;
    }, [points]);

    if (lines.length === 0) return null;

    return (
        <Line
            points={lines}
            color={color}
            lineWidth={1}
            transparent
            opacity={0.3}
        />
    );
}

function Scene() {
    const groupRef = useRef<THREE.Group>(null);

    // Generate random node positions
    const nodes = useMemo(() => {
        const positions: [number, number, number][] = [];
        for (let i = 0; i < 20; i++) {
            positions.push([
                (Math.random() - 0.5) * 8, // Spread X
                (Math.random() - 0.5) * 8, // Spread Y
                (Math.random() - 0.5) * 8  // Spread Z
            ]);
        }
        return positions;
    }, []);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.002; // Slow rotation
        }
    });

    return (
        <group ref={groupRef}>
            {nodes.map((pos, i) => (
                <NetworkNode
                    key={i}
                    position={pos}
                    color={i % 3 === 0 ? "#FFD700" : "#00F0FF"} // Gold or Neon Blue
                />
            ))}
            <Connections points={nodes} color="#00F0FF" />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#FFD700" />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00F0FF" />
        </group>
    );
}

export default function NeuralHero() {
    return (
        <div className="h-[500px] w-full relative">
            <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
                <Scene />
                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
            </Canvas>
        </div>
    );
}

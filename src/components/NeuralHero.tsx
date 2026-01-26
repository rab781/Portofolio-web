'use client';

import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Line } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
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

function DataPacket({ start, end }: { start: THREE.Vector3, end: THREE.Vector3 }) {
    const ref = useRef<THREE.Mesh>(null);
    const [active] = useState(true);
    const speed = 1; // Units per second
    const progress = useRef(0);

    useFrame((state, delta) => {
        if (!active || !ref.current) return;

        progress.current += delta * speed / start.distanceTo(end);

        if (progress.current >= 1) {
            progress.current = 0;
        }

        ref.current.position.lerpVectors(start, end, progress.current);
    });

    if (!active) return null;

    return (
        <Sphere ref={ref} args={[0.08, 8, 8]}>
            <meshBasicMaterial color={[10, 10, 10]} toneMapped={false} />
        </Sphere>
    );
}

function Scene() {
    const groupRef = useRef<THREE.Group>(null);


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

    // Calculate connections and packets
    const { connections, packets } = useMemo(() => {
        const lines: [number, number, number][] = [];
        const packetPaths: { start: THREE.Vector3, end: THREE.Vector3 }[] = [];

        nodes.forEach((p1, i) => {
            // Connect to nearest 3 neighbors or random
            nodes.slice(i + 1, i + 4).forEach(p2 => {
                if (Math.random() > 0.5) { // Randomly connect
                    lines.push(p1);
                    lines.push(p2);

                    // Add a packet path for some connections
                    if (Math.random() > 0.8) {
                        packetPaths.push({
                            start: new THREE.Vector3(...p1),
                            end: new THREE.Vector3(...p2)
                        });
                    }
                }
            });
        });
        return { connections: lines, packets: packetPaths };
    }, [nodes]);

    useFrame(() => {
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

            {/* Connections */}
            <Line
                points={connections}
                color="#00F0FF"
                lineWidth={1}
                transparent
                opacity={0.3}
            />

            {/* Moving Packets */}
            {packets.map((path, i) => (
                <DataPacket key={i} start={path.start} end={path.end} />
            ))}

            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#FFD700" />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00F0FF" />

            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00F0FF" />
        </group>
    );
}

export default function NeuralHero() {
    return (
        <div className="h-[500px] w-full absolute ">
            <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
                <Scene />
                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
                <EffectComposer multisampling={0}>
                    <Bloom luminanceThreshold={1} mipmapBlur intensity={1.5} radius={0.4} />
                </EffectComposer>
            </Canvas>
        </div>
    );
}

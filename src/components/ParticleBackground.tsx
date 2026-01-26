'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random';
import * as THREE from 'three';


function Stars(props: React.ComponentProps<typeof Points>) {
    const ref = useRef<THREE.Points>(null);

    // Generate random points in a sphere
    const sphere = useMemo(() => {
        // Generate 3000 points (Float32Array) inside a sphere of radius 1.5
        // Using explicit type assertion to handle the precise return type of the generator
        return random.inSphere(new Float32Array(3000), { radius: 1.5 }) as Float32Array;
    }, []);

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 10;
            ref.current.rotation.y -= delta / 15;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color="#FFD700" /* Gold */
                    size={0.010}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    );
}

export default function ParticleBackground() {
    return (
        <div className="fixed inset-0 -z-10 h-full w-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0f1c2e] via-[#050A14] to-[#020409]">
            <Canvas camera={{ position: [0, 0, 1] }} dpr={[1, 2]}>
                <Stars />
            </Canvas>
        </div>
    );
}

'use client';

import dynamic from 'next/dynamic';

const CustomCursor = dynamic(() => import('@/components/CustomCursor'), { ssr: false });
const GradientMesh = dynamic(() => import('@/components/GradientMesh'), { ssr: false });

export default function ClientEffects() {
  return (
    <>
      <CustomCursor />
      <GradientMesh />
    </>
  );
}

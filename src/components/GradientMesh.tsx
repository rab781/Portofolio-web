"use client";

export default function GradientMesh() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#F9FAFB]">
            <div className="absolute inset-0 bg-noise opacity-[0.03]" />

            {/*
              Each orb promotes to its own compositor layer via will-change: transform.
              mix-blend-multiply removed — blend modes prevent layer isolation and force
              the browser to flatten, defeating the compositing benefit.
              pointer-events: none ensures no hit-testing cost.
            */}

            {/* Orb 1: Soft Blue — Top Left */}
            <div className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-[#8CE4FF] opacity-20 blur-[120px] will-change-transform" />

            {/* Orb 2: Warm Orange — Center Right */}
            <div className="absolute top-[20%] -right-[10%] w-[40vw] h-[40vw] rounded-full bg-[#FFA239] opacity-15 blur-[100px] will-change-transform" />

            {/* Orb 3: Accent Red — Bottom Left */}
            <div className="absolute bottom-[10%] left-[20%] w-[35vw] h-[35vw] rounded-full bg-[#FF5656] opacity-10 blur-[130px] will-change-transform" />

            {/* Orb 4: Pale Yellow — Bottom Right */}
            <div className="absolute -bottom-[20%] -right-[10%] w-[45vw] h-[45vw] rounded-full bg-[#FEEE91] opacity-20 blur-[110px] will-change-transform" />
        </div>
    );
}

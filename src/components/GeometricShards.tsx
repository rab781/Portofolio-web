"use client";

// All shard animations are pure CSS keyframes — runs on compositor thread,
// zero JS overhead, browser can skip when tab is hidden.
export default function GeometricShards() {
    return (
        <div className="absolute inset-0 pointer-events-none z-[-1]">
            {/* Red Triangle — large, top-left */}
            <div
                className="absolute w-28 h-28 bg-red-500 shadow-xl shard-float-a will-change-transform"
                style={{
                    top: "20%",
                    left: "-10%",
                    clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                    transform: "rotate(-15deg)",
                    boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
                }}
            />

            {/* Red Triangle — small, bottom-right */}
            <div
                className="absolute w-20 h-20 bg-red-500 shadow-lg shard-float-b will-change-transform"
                style={{
                    top: "60%",
                    right: "-15%",
                    clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                    transform: "rotate(45deg)",
                    boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)",
                }}
            />

            {/* Orange Arrow — top-right */}
            <div
                className="absolute w-14 h-14 bg-[#FFA239] shadow-2xl shadow-orange-500/20 shard-pulse will-change-transform"
                style={{
                    top: "10%",
                    right: "5%",
                    clipPath: "polygon(0 0, 0% 100%, 100% 50%)",
                    transform: "rotate(15deg)",
                }}
            />

            {/* Blue Diamond — bottom-left, continuous spin */}
            <div
                className="absolute w-8 h-8 bg-[#2563EB] shard-spin will-change-transform"
                style={{
                    bottom: "20%",
                    left: "-5%",
                    clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                }}
            />
        </div>
    );
}

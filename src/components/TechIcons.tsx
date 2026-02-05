import React from 'react';

// Props interface
interface IconProps {
    className?: string;
    size?: number;
}

// ----------------------------------------------------------------------
// PYTHON (Blue & Yellow)
// ----------------------------------------------------------------------
export const PythonIcon = ({ size = 24, className }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 256 256" className={className}>
        <defs>
            <linearGradient id="pyGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3776AB" />
                <stop offset="100%" stopColor="#1E415E" />
            </linearGradient>
            <linearGradient id="pyGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFD343" />
                <stop offset="100%" stopColor="#FFFF73" />
            </linearGradient>
        </defs>
        <path d="M126.916 2.124c-12.722-.505-24.773.04-35.452 1.942-32.186 5.732-26.65 26.696-26.65 26.696l.036 27.643h54.553c4.136 0 7.429 2.053 7.429 6.225v8.665c0 4.172-3.33 6.958-7.464 6.958H45.82C13.25 80.25 9.87 54.267 9.87 54.267V26.248C9.87 11.235 23.36 1.487 45.82 2.124 64.957 2.667 96.166.392 126.916 2.124z" fill="url(#pyGradient1)" />
        <path d="M127.42 254.12c12.722.504 24.773-.04 35.453-1.941 32.185-5.733 26.65-26.696 26.65-26.696l-.037-27.644h-54.552c-4.137 0-7.43-2.053-7.43-6.225v-8.664c0-4.173 3.33-6.959 7.465-6.959h73.543c32.57 0 35.952 25.983 35.952 25.983v28.019c0 15.012-13.491 24.761-35.952 24.124-19.137-.543-50.346 1.733-81.092 0z" fill="url(#pyGradient2)" />
        <path d="M99.757 195.424h19.554v19.462H99.757z" fill="white" opacity="0.5" />
        <circle cx="83" cy="28" r="7" fill="white" />
        <circle cx="173" cy="226" r="7" fill="white" />
    </svg>
);

// ----------------------------------------------------------------------
// REACT (Cyan)
// ----------------------------------------------------------------------
export const ReactIcon = ({ size = 24, className }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <circle cx="12" cy="12" r="2" fill="#61DAFB" />
        <g stroke="#61DAFB" strokeWidth="1.5">
            <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(0 12 12)" />
            <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
            <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
        </g>
    </svg>
);

// ----------------------------------------------------------------------
// JAVASCRIPT (Yellow)
// ----------------------------------------------------------------------
export const JSIcon = ({ size = 24, className }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 48 48" className={className}>
        <rect width="48" height="48" fill="#F7DF1E" rx="4" />
        <path d="M24.75 35.5c-2.3 0-3.9-.99-4.72-2.38l3.72-2.18c.55.97 1.35 1.54 2.5 1.54 1.1 0 1.77-.6 1.77-1.46 0-.96-.75-1.39-2.58-2.18-3.05-1.31-4.95-2.95-4.95-5.93 0-3.23 2.5-5.5 6.07-5.5 2.5 0 4.4 1 5.39 3.09l-3.5 2.15c-.62-1.12-1.4-1.68-2.4-1.68-1.07 0-1.62.64-1.62 1.3 0 .97.94 1.32 2.95 2.22 3.1 1.41 4.6 3.1 4.6 5.86 0 3.32-2.35 5.5-6.68 5.5h-.55zm13.15 0c-3.55 0-5.75-1.75-6.3-4.2l3.85-1.7c.39 1.15 1.25 1.75 2.55 1.75 1.05 0 1.65-.4 1.65-1.3v-12.6h4.5v12.5c0 3.5-2.2 5.55-6.25 5.55z" fill="#000" />
    </svg>
);

// ----------------------------------------------------------------------
// TYPESCRIPT (Blue)
// ----------------------------------------------------------------------
export const TSIcon = ({ size = 24, className }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 48 48" className={className}>
        <rect width="48" height="48" fill="#3178C6" rx="4" />
        <path d="M22 25h-6v11h-4v-11h-6v-3.5h16v3.5zm10.3 8.1c1 0 1.6-.4 1.6-1.3v-1.7c0-2-2.4-1.8-4-2.5-1.7-.75-2.5-1.7-2.5-3.6 0-2.8 2.3-4.5 5.5-4.5 2.5 0 4.2 1 5.1 2.8l-3.3 2c-.55-1-1.3-1.4-2.2-1.4-1 0-1.5.5-1.5 1.2v.4c0 1.7 2.4 1.8 4 2.5 1.7.75 2.5 1.8 2.5 3.6 0 3.2-2.3 4.9-5.9 4.9-2.8 0-4.8-1.2-5.7-3.4l3.3-2c.6 1.4 1.7 2 3.1 2z" fill="#FFF" />
    </svg>
);

// ----------------------------------------------------------------------
// NEXT.JS (Black/White)
// ----------------------------------------------------------------------
export const NextIcon = ({ size = 24, className }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <circle cx="12" cy="12" r="10" fill="#000" stroke="#333" strokeWidth="1" />
        <path d="M10 8v8M15 8v8M10 8l5 8" stroke="#FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

// ----------------------------------------------------------------------
// TAILWIND (Cyan)
// ----------------------------------------------------------------------
export const TailwindIcon = ({ size = 24, className }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
        <path d="M4.5 9.5c.8-2 2.7-3.5 5-3.5 1.5 0 2.8.6 3.8 1.5-.7 1.8-2.5 3-4.8 3-1.5 0-3-.5-4-1.5zm8 0c.8-2 2.7-3.5 5-3.5 1.5 0 2.8.6 3.8 1.5-.7 1.8-2.5 3-4.8 3-1.5 0-3-.5-4-1.5z" stroke="#38BDF8" strokeWidth="2" fill="#38BDF8" fillOpacity="0.2" strokeLinecap="round" />
    </svg>
);

// ----------------------------------------------------------------------
// GIT (Red/Orange)
// ----------------------------------------------------------------------
export const GitIcon = ({ size = 24, className }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M6 8v8M6 12h6a2 2 0 0 0 2-2V8 m0 14v-4" stroke="#F05032" strokeWidth="2" strokeLinecap="round" />
        <circle cx="6" cy="6" r="2" stroke="#F05032" strokeWidth="2" fill="#FFEFEF" />
        <circle cx="6" cy="18" r="2" stroke="#F05032" strokeWidth="2" fill="#FFEFEF" />
        <circle cx="18" cy="12" r="2" stroke="#F05032" strokeWidth="2" fill="#FFEFEF" />
    </svg>
);

// ----------------------------------------------------------------------
// TENSORFLOW (Orange)
// ----------------------------------------------------------------------
export const TensorflowIcon = ({ size = 24, className }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M11.5 22l-8.5-4.5V7l9-5l9 5v10.5l-8.5 4.5z" fill="#FF6F00" />
        <path d="M12 2v6l7 3M12 12l-7-3" stroke="#FFF" strokeWidth="2" strokeOpacity="0.5" />
    </svg>
);

// ----------------------------------------------------------------------
// OTHER ICONS (Fallback)
// ----------------------------------------------------------------------
import { Database, Box, PlayCircle, BarChart3, Binary, Globe } from "lucide-react";

export const LaravelIcon = ({ size = 24, className }: IconProps) => <Globe size={size} className={className} color="#FF2D20" />;
export const PandasIcon = ({ size = 24, className }: IconProps) => <BarChart3 size={size} className={className} color="#150458" />;
export const NumPyIcon = ({ size = 24, className }: IconProps) => <Binary size={size} className={className} color="#4D77CF" />;
export const SkLearnIcon = ({ size = 24, className }: IconProps) => <Database size={size} className={className} color="#F7931E" />;
export const DockerIcon = ({ size = 24, className }: IconProps) => <Box size={size} className={className} color="#2496ED" />;
export const StreamlitIcon = ({ size = 24, className }: IconProps) => <PlayCircle size={size} className={className} color="#FF4B4B" />;


import React from 'react';

// Props interface
interface IconProps {
    className?: string;
    size?: number;
}

// Helper to standardise generic icon wrapper
const SvgIcon = ({ className, size = 24, children, viewBox = "0 0 24 24", fill = "currentColor" }: any) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox={viewBox}
        fill={fill}
        className={className}
    >
        {children}
    </svg>
);

export const PythonIcon = (props: IconProps) => (
    <SvgIcon {...props} viewBox="0 0 256 256">
        <path d="M213.6,101.05l-108-63.15c-16-9.43-13.61-34.19,3.67-40.24L114.71,2.06a38,38,0,0,1,28.89.88l68.61,28.06A38,38,0,0,1,234.69,63.1Z" opacity="0.2" /><path d="M106.33,184.18H104a32,32,0,0,1-32-32V115a20,20,0,0,1,20-20H200a4,4,0,0,0,4-4V60a16,16,0,0,0-16-16H114.93a12,12,0,0,0-4.9.43L41.34,69.58A16,16,0,0,0,32,84.49v65.6a16,16,0,0,0,9.33,14.61l65,24.36Z" opacity="0.2" /><circle cx="76" cy="76" r="12" /><circle cx="180" cy="180" r="12" /><path d="M100,52V88a8,8,0,0,0,8,8h72a12,12,0,0,1,12,12v72a8,8,0,0,0,8,8h34.69a16,16,0,0,0,13.69-6.84l23.5-35.34a16,16,0,0,0,2.12-13.25L257.6,83.08A16,16,0,0,0,242.07,72H188V52a20,20,0,0,0-20-20H156a4,4,0,0,0-4,4V91a16,16,0,0,0,16,16h73.07a12,12,0,0,0,4.9-.43l68.69-25.15A16,16,0,0,0,324,66.6V39.06A16,16,0,0,0,307.74,23.36Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /><path d="M156,204H112a20,20,0,0,1-20-20V144a16,16,0,0,1,16-16h73.07a12,12,0,0,1,4.9.43l68.69,25.15A16,16,0,0,1,264,168.39V212a4,4,0,0,1-4,4H176a20,20,0,0,1-20-20V160a8,8,0,0,0-8-8H76a12,12,0,0,0-12,12v73.07a12,12,0,0,0,.43,4.9l25.15,68.69A16,16,0,0,0,104.39,320h42.17a16,16,0,0,0,15.7-16.26l-3.32-49.88A16,16,0,0,0,156,240.23Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /><circle cx="124" cy="180" r="10" fill="currentColor" /><circle cx="132" cy="76" r="10" fill="currentColor" />
    </SvgIcon>
);

export const ReactIcon = (props: IconProps) => (
    <SvgIcon {...props} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="2" fill="currentColor" />
        <g stroke="currentColor" strokeWidth="1.5">
            <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(0 12 12)" />
            <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
            <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
        </g>
    </SvgIcon>
);

export const JSIcon = (props: IconProps) => (
    <SvgIcon {...props} viewBox="0 0 24 24">
        <path d="M3 3h18v18H3V3zm14.5 13.5v-5h-1.5v3.5h-1v-2h-1v2.5a1 1 0 0 1-1 1h-1.5a1 1 0 0 1-1-1v-0.5h1.5v0.5h1v-1.5H12v-2h1.5v-1h-2v4h-1.5v-5h4v5zM7.5 9v5H9v1.5H6V9H7.5z" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M12 15v-2h1.5v1h1v-1.5h-2.5v-2H16v4h-4zm-5 0.5V9h2v1.5H7.5v4H9V16H7z" fill="currentColor" />
    </SvgIcon>
);

export const TSIcon = (props: IconProps) => (
    <SvgIcon {...props} viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M8 16v-4h3m-1.5 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M14 15.5c0 .8.7 1.5 1.8 1.5s1.7-.7 1.7-1.5c0-2-3-1.5-3-3.5 0-1.2 1-2 2.5-2 1.3 0 2 .6 2 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </SvgIcon>
);

export const NextIcon = (props: IconProps) => (
    <SvgIcon {...props} viewBox="0 0 24 24" fill="none">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" stroke="currentColor" strokeWidth="2" />
        <path d="M9 8v8M15 8v8M9 8l6 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </SvgIcon>
);

export const TailwindIcon = (props: IconProps) => (
    <SvgIcon {...props} viewBox="0 0 24 24">
        <path d="M4.5 9.5c.8-2 2.7-3.5 5-3.5 1.5 0 2.8.6 3.8 1.5-.7 1.8-2.5 3-4.8 3-1.5 0-3-.5-4-1.5zm8 0c.8-2 2.7-3.5 5-3.5 1.5 0 2.8.6 3.8 1.5-.7 1.8-2.5 3-4.8 3-1.5 0-3-.5-4-1.5z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
    </SvgIcon>
);

export const GitIcon = (props: IconProps) => (
    <SvgIcon {...props} viewBox="0 0 24 24" fill="none">
        <circle cx="6" cy="6" r="2" stroke="currentColor" strokeWidth="2" />
        <circle cx="6" cy="18" r="2" stroke="currentColor" strokeWidth="2" />
        <circle cx="18" cy="12" r="2" stroke="currentColor" strokeWidth="2" />
        <path d="M6 8v8M6 12h6a2 2 0 0 0 2-2V8 m0 14v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </SvgIcon>
);

export const LaravelIcon = (props: IconProps) => (
    <SvgIcon {...props} viewBox="0 0 24 24" fill="none">
        <path d="M3 3h18v18H3z" stroke="currentColor" strokeWidth="0" />
        <path d="M6 4l12 0l-4 4l4 4l-4 4l4 4l-12 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </SvgIcon>
);

export const TensorflowIcon = (props: IconProps) => (
    <SvgIcon {...props} viewBox="0 0 24 24" fill="none">
        <path d="M11.5 22l-8.5-4.5V7l9-5l9 5v10.5l-8.5 4.5z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M12 2v6l7 3M12 12l-7-3" stroke="currentColor" strokeWidth="2" />
    </SvgIcon>
);

// Fallbacks for others
import { Database, Box, PlayCircle, BarChart3, Binary } from "lucide-react";

export const PandasIcon = BarChart3;
export const NumPyIcon = Binary;
export const SkLearnIcon = Database;
export const DockerIcon = Box;
export const StreamlitIcon = PlayCircle;

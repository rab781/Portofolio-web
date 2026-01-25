import React from 'react';

interface TerminalCardProps {
    title: string;
    children: React.ReactNode;
    className?: string;
}

const TerminalCard: React.FC<TerminalCardProps> = ({ title, children, className = "" }) => {
    return (
        <div className={`glass-panel rounded-lg overflow-hidden border border-gray-700/50 hover:border-[var(--color-gold-500)] transition-colors duration-300 ${className}`}>
            {/* Terminal Header */}
            <div className="bg-black/40 px-4 py-2 flex items-center justify-between border-b border-white/5">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <div className="text-xs font-mono text-[var(--color-gold-500)] opacity-80 uppercase tracking-widest">
                    {title}
                </div>
                <div className="w-10"></div> {/* Spacer for centering */}
            </div>

            {/* Content Area */}
            <div className="p-6 relative">
                {children}
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[var(--color-gold-500)] opacity-50"></div>
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[var(--color-gold-500)] opacity-50"></div>
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[var(--color-gold-500)] opacity-50"></div>
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[var(--color-gold-500)] opacity-50"></div>
            </div>
        </div>
    );
};

export default TerminalCard;

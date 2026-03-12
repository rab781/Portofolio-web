import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

const styles = {
    wrapper: {
        display: 'inline-block',
        whiteSpace: 'pre-wrap' as const
    },
    srOnly: {
        position: 'absolute' as const,
        width: '1px',
        height: '1px',
        padding: 0,
        margin: '-1px',
        overflow: 'hidden' as const,
        clip: 'rect(0,0,0,0)',
        border: 0
    }
};

interface DecryptedTextProps {
    text: string;
    speed?: number;
    maxIterations?: number;
    sequential?: boolean;
    revealDirection?: 'start' | 'end' | 'center';
    useOriginalCharsOnly?: boolean;
    characters?: string;
    className?: string;
    parentClassName?: string;
    encryptedClassName?: string;
    animateOn?: 'view' | 'hover' | 'both' | 'auto';
    [key: string]: string | number | boolean | undefined;
}

export default function DecryptedText({
    text,
    speed = 50,
    maxIterations = 10,
    sequential = false,
    revealDirection = 'start',
    useOriginalCharsOnly = false,
    characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+',
    className = '',
    parentClassName = '',
    encryptedClassName = '',
    animateOn = 'hover',
    ...props
}: DecryptedTextProps) {
    const [displayText, setDisplayText] = useState(animateOn === 'auto' ? '' : text);
    const [isHovering, setIsHovering] = useState(animateOn === 'auto');
    const [isScrambling, setIsScrambling] = useState(false);
    const [revealedIndices, setRevealedIndices] = useState(new Set<number>());
    const [hasAnimated, setHasAnimated] = useState(false);
    const containerRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        let currentIteration = 0;

        const getNextIndex = (revealedSet: Set<number>) => {
            const textLength = text.length;
            switch (revealDirection) {
                case 'start':
                    return revealedSet.size;
                case 'end':
                    return textLength - 1 - revealedSet.size;
                case 'center': {
                    const middle = Math.floor(textLength / 2);
                    const offset = Math.floor(revealedSet.size / 2);
                    const nextIndex = revealedSet.size % 2 === 0 ? middle + offset : middle - offset - 1;

                    if (nextIndex >= 0 && nextIndex < textLength && !revealedSet.has(nextIndex)) {
                        return nextIndex;
                    }

                    for (let i = 0; i < textLength; i++) {
                        if (!revealedSet.has(i)) return i;
                    }
                    return 0;
                }
                default:
                    return revealedSet.size;
            }
        };

        // ⚡ Bolt: Pre-calculate arrays outside the interval loop to prevent re-allocating on every tick
        const originalTextArray = text.split('');
        const availableChars = useOriginalCharsOnly
            ? Array.from(new Set(originalTextArray)).filter(char => char !== ' ')
            : characters.split('');

        const shuffleText = (currentRevealed: Set<number>) => {
            if (useOriginalCharsOnly) {
                // ⚡ Bolt: Collect unrevealed, non-space characters without mapping full positions array
                const nonSpaceChars: string[] = [];
                for (let i = 0; i < originalTextArray.length; i++) {
                    const char = originalTextArray[i];
                    if (char !== ' ' && !currentRevealed.has(i)) {
                        nonSpaceChars.push(char);
                    }
                }

                // Fisher-Yates shuffle
                for (let i = nonSpaceChars.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [nonSpaceChars[i], nonSpaceChars[j]] = [nonSpaceChars[j], nonSpaceChars[i]];
                }

                let charIndex = 0;
                return originalTextArray
                    .map((char, i) => {
                        if (char === ' ') return ' ';
                        if (currentRevealed.has(i)) return char;
                        return nonSpaceChars[charIndex++];
                    })
                    .join('');
            } else {
                return originalTextArray
                    .map((char, i) => {
                        if (char === ' ') return ' ';
                        if (currentRevealed.has(i)) return char;
                        return availableChars[Math.floor(Math.random() * availableChars.length)];
                    })
                    .join('');
            }
        };

        if (isHovering) {
            setIsScrambling(true);
            interval = setInterval(() => {
                setRevealedIndices(prevRevealed => {
                    if (sequential) {
                        if (prevRevealed.size < text.length) {
                            const nextIndex = getNextIndex(prevRevealed);
                            const newRevealed = new Set(prevRevealed);
                            newRevealed.add(nextIndex);
                            setDisplayText(shuffleText(newRevealed));
                            return newRevealed;
                        } else {
                            clearInterval(interval);
                            setIsScrambling(false);
                            return prevRevealed;
                        }
                    } else {
                        setDisplayText(shuffleText(prevRevealed));
                        currentIteration++;
                        if (currentIteration >= maxIterations) {
                            clearInterval(interval);
                            setIsScrambling(false);
                            setDisplayText(text);
                        }
                        return prevRevealed;
                    }
                });
            }, speed);
        } else {
            setDisplayText(text);
            setRevealedIndices(new Set());
            setIsScrambling(false);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isHovering, text, speed, maxIterations, sequential, revealDirection, characters, useOriginalCharsOnly]);



    useEffect(() => {
        if (animateOn !== 'view' && animateOn !== 'both') return;

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasAnimated) {
                    setIsHovering(true);
                    setHasAnimated(true);
                }
            });
        };

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        const currentRef = containerRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [animateOn, hasAnimated]);

    const hoverProps =
        animateOn === 'hover' || animateOn === 'both'
            ? {
                onMouseEnter: () => setIsHovering(true),
                onMouseLeave: () => setIsHovering(false)
            }
            : {};

    return (
        <motion.span
            className={parentClassName}
            ref={containerRef}
            style={styles.wrapper}
            {...hoverProps}
            {...props}
        >
            <span style={styles.srOnly} aria-hidden="true">{displayText}</span>

            <span aria-hidden="true">
                {displayText.split('').map((char, index) => {
                    const isRevealedOrDone = revealedIndices.has(index) || !isScrambling || !isHovering;

                    return (
                        <span key={index} className={isRevealedOrDone ? className : encryptedClassName}>
                            {char}
                        </span>
                    );
                })}
            </span>
        </motion.span>
    );
}

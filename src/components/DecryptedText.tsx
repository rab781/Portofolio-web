import { useEffect, useState, useRef, useMemo } from 'react';
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
    // ⚡ Bolt: Store character arrays directly in state rather than strings.
    // This eliminates redundant `.split('')` allocations on every React render tick during rapid animations.
    // Replace `Set`-based index tracking with a numeric `revealedCount` state and a pre-calculated `Int32Array` mapping
    // indices to their reveal step via `useMemo` to eliminate garbage collection pressure and O(N) lookups.
    const [displayText, setDisplayText] = useState<string[]>(animateOn === 'auto' ? [] : text.split(''));
    const [isHovering, setIsHovering] = useState(animateOn === 'auto');
    const [isScrambling, setIsScrambling] = useState(false);
    const [revealedCount, setRevealedCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);
    const containerRef = useRef<HTMLSpanElement>(null);

    // ⚡ Bolt: Pre-calculate invariant data outside the interval loop and memoize it across renders
    const { originalTextArray, availableChars, revealStepForIndex } = useMemo(() => {
        const textArray = text.split('');
        const chars = useOriginalCharsOnly
            ? Array.from(new Set(textArray)).filter(char => char !== ' ')
            : characters.split('');

        const length = textArray.length;
        const revealOrder = new Int32Array(length);

        // Pre-calculate at which step each character should be revealed
        let step = 0;
        if (sequential) {
            switch (revealDirection) {
                case 'start':
                    for (let i = 0; i < length; i++) revealOrder[i] = step++;
                    break;
                case 'end':
                    for (let i = length - 1; i >= 0; i--) revealOrder[i] = step++;
                    break;
                case 'center': {
                    const middle = Math.floor(length / 2);
                    for (let i = 0; i < length; i++) {
                        const offset = Math.floor(i / 2);
                        const nextIndex = i % 2 === 0 ? middle + offset : middle - offset - 1;
                        if (nextIndex >= 0 && nextIndex < length) {
                            revealOrder[nextIndex] = step++;
                        }
                    }
                    // Fallback for any unassigned indices
                    for (let i = 0; i < length; i++) {
                        if (revealOrder[i] === 0 && i !== middle) {
                            revealOrder[i] = step++;
                        }
                    }
                    break;
                }
                default:
                    for (let i = 0; i < length; i++) revealOrder[i] = step++;
            }
        }

        return {
            originalTextArray: textArray,
            availableChars: chars,
            revealStepForIndex: revealOrder
        };
    }, [text, characters, useOriginalCharsOnly, sequential, revealDirection]);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        let currentIteration = 0;

        const shuffleText = (currentCount: number) => {
            if (useOriginalCharsOnly) {
                // ⚡ Bolt: Collect unrevealed, non-space characters
                const nonSpaceChars: string[] = [];
                for (let i = 0; i < originalTextArray.length; i++) {
                    const char = originalTextArray[i];
                    if (char !== ' ' && revealStepForIndex[i] >= currentCount) {
                        nonSpaceChars.push(char);
                    }
                }

                // Fisher-Yates shuffle
                for (let i = nonSpaceChars.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [nonSpaceChars[i], nonSpaceChars[j]] = [nonSpaceChars[j], nonSpaceChars[i]];
                }

                let charIndex = 0;
                return originalTextArray.map((char, i) => {
                    if (char === ' ') return ' ';
                    if (revealStepForIndex[i] < currentCount) return char;
                    return nonSpaceChars[charIndex++] || char;
                });
            } else {
                return originalTextArray.map((char, i) => {
                    if (char === ' ') return ' ';
                    if (revealStepForIndex[i] < currentCount) return char;
                    return availableChars[Math.floor(Math.random() * availableChars.length)];
                });
            }
        };

        if (isHovering) {
            setIsScrambling(true);
            interval = setInterval(() => {
                setRevealedCount(prevCount => {
                    if (sequential) {
                        if (prevCount < text.length) {
                            const newCount = prevCount + 1;
                            setDisplayText(shuffleText(newCount));
                            return newCount;
                        } else {
                            clearInterval(interval);
                            setIsScrambling(false);
                            return prevCount;
                        }
                    } else {
                        // Non-sequential handles everything as revealed at once or none
                        setDisplayText(shuffleText(0));
                        currentIteration++;
                        if (currentIteration >= maxIterations) {
                            clearInterval(interval);
                            setIsScrambling(false);
                            setDisplayText(originalTextArray);
                        }
                        return prevCount;
                    }
                });
            }, speed);
        } else {
            setDisplayText(originalTextArray);
            setRevealedCount(0);
            setIsScrambling(false);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isHovering, text, speed, maxIterations, sequential, originalTextArray, availableChars, revealStepForIndex, useOriginalCharsOnly]);



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
            <span style={styles.srOnly} aria-hidden="true">{displayText.join('')}</span>

            <span aria-hidden="true">
                {displayText.map((char, index) => {
                    // Simplify: if not scrambling/hovering, or if its index step is already revealed, it's done
                    // Note: for non-sequential, we can consider them all "done" once the iteration is complete, which is handled
                    // by the !isScrambling state reset anyway.
                    const finalIsRevealedOrDone = !isScrambling || !isHovering || revealStepForIndex[index] < revealedCount;

                    return (
                        <span key={index} className={finalIsRevealedOrDone ? className : encryptedClassName}>
                            {char}
                        </span>
                    );
                })}
            </span>
        </motion.span>
    );
}

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
    const [displayText, setDisplayText] = useState<string[]>(animateOn === 'auto' ? [] : text.split(''));
    const [isHovering, setIsHovering] = useState(animateOn === 'auto');
    const [isScrambling, setIsScrambling] = useState(false);

    // ⚡ Bolt: Replace Set-based index tracking with a numeric revealedCount state
    // This eliminates O(N) Set allocations and garbage collection pressure on every render tick
    const [revealedCount, setRevealedCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);
    const containerRef = useRef<HTMLSpanElement>(null);

    // ⚡ Bolt: Memoize original text array to eliminate redundant .split('') allocations
    const originalTextArray = useMemo(() => text.split(''), [text]);

    // ⚡ Bolt: Pre-calculate an Int32Array mapping indices to their reveal step
    // This completely eliminates loop-based O(N) lookups in getNextIndex during animation ticks
    const revealOrder = useMemo(() => {
        const length = text.length;
        const order = new Int32Array(length);
        const revealedSet = new Set<number>();
        for (let step = 0; step < length; step++) {
            let nextIndex = step;
            if (revealDirection === 'start') {
                nextIndex = step;
            } else if (revealDirection === 'end') {
                nextIndex = length - 1 - step;
            } else if (revealDirection === 'center') {
                const middle = Math.floor(length / 2);
                const offset = Math.floor(step / 2);
                const candidate = step % 2 === 0 ? middle + offset : middle - offset - 1;
                if (candidate >= 0 && candidate < length && !revealedSet.has(candidate)) {
                    nextIndex = candidate;
                } else {
                    for (let i = 0; i < length; i++) {
                        if (!revealedSet.has(i)) {
                            nextIndex = i;
                            break;
                        }
                    }
                }
            }
            revealedSet.add(nextIndex);
            order[nextIndex] = step;
        }
        return order;
    }, [text.length, revealDirection]);

    const availableChars = useMemo(() => {
        return useOriginalCharsOnly
            ? Array.from(new Set(originalTextArray)).filter(char => char !== ' ')
            : characters.split('');
    }, [useOriginalCharsOnly, originalTextArray, characters]);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        let currentIteration = 0;

        const shuffleText = (currentRevealedCount: number) => {
            if (useOriginalCharsOnly) {
                // ⚡ Bolt: Collect unrevealed, non-space characters without mapping full positions array
                const nonSpaceChars: string[] = [];
                for (let i = 0; i < originalTextArray.length; i++) {
                    const char = originalTextArray[i];
                    if (char !== ' ' && revealOrder[i] >= currentRevealedCount) {
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
                    if (revealOrder[i] < currentRevealedCount) return char;
                    return nonSpaceChars[charIndex++];
                });
            } else {
                return originalTextArray.map((char, i) => {
                    if (char === ' ') return ' ';
                    if (revealOrder[i] < currentRevealedCount) return char;
                    return availableChars[Math.floor(Math.random() * availableChars.length)];
                });
            }
        };

        if (isHovering) {
            setIsScrambling(true);
            interval = setInterval(() => {
                if (sequential) {
                    setRevealedCount(prevCount => {
                        if (prevCount < text.length) {
                            const newCount = prevCount + 1;
                            setDisplayText(shuffleText(newCount));
                            return newCount;
                        } else {
                            clearInterval(interval);
                            setIsScrambling(false);
                            return prevCount;
                        }
                    });
                } else {
                    setDisplayText(shuffleText(0));
                    currentIteration++;
                    if (currentIteration >= maxIterations) {
                        clearInterval(interval);
                        setIsScrambling(false);
                        setDisplayText(originalTextArray);
                    }
                }
            }, speed);
        } else {
            setDisplayText(originalTextArray);
            setRevealedCount(0);
            setIsScrambling(false);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isHovering, text.length, speed, maxIterations, sequential, originalTextArray, availableChars, revealOrder, useOriginalCharsOnly]);



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
                    const isRevealedOrDone = revealOrder[index] < revealedCount || !isScrambling || !isHovering;

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

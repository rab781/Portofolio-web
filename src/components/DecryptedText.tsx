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

    // ⚡ Bolt: Replace Set-based index tracking with a numeric count state
    const [revealedCount, setRevealedCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);
    const containerRef = useRef<HTMLSpanElement>(null);

    // ⚡ Bolt: Pre-calculate arrays using useMemo to prevent re-allocating on every render
    const originalTextArray = useMemo(() => text.split(''), [text]);

    // ⚡ Bolt: Pre-calculate an Int32Array mapping character index -> reveal step
    // Eliminates O(N) Set.has() lookups and GC pressure inside the high-frequency animation loop
    const revealSteps = useMemo(() => {
        const steps = new Int32Array(text.length);
        const textLength = text.length;

        for (let step = 0; step < textLength; step++) {
            let indexToReveal = step;

            if (revealDirection === 'end') {
                indexToReveal = textLength - 1 - step;
            } else if (revealDirection === 'center') {
                const middle = Math.floor(textLength / 2);
                const offset = Math.floor(step / 2);
                indexToReveal = step % 2 === 0 ? middle + offset : middle - offset - 1;

            }
            // For non-center cases, just assign
            if (revealDirection !== 'center') {
                steps[indexToReveal] = step;
            }
        }

        // More robust center logic using assignment tracking
        if (revealDirection === 'center') {
            steps.fill(-1);
            const middle = Math.floor(textLength / 2);
            for (let step = 0; step < textLength; step++) {
                const offset = Math.floor(step / 2);
                const nextIndex = step % 2 === 0 ? middle + offset : middle - offset - 1;

                if (nextIndex >= 0 && nextIndex < textLength && steps[nextIndex] === -1) {
                    steps[nextIndex] = step;
                } else {
                    for (let i = 0; i < textLength; i++) {
                        if (steps[i] === -1) {
                            steps[i] = step;
                            break;
                        }
                    }
                }
            }
        }

        return steps;
    }, [text, revealDirection]);

    const availableChars = useMemo(() => {
        return useOriginalCharsOnly
            ? Array.from(new Set(originalTextArray)).filter(char => char !== ' ')
            : characters.split('');
    }, [useOriginalCharsOnly, originalTextArray, characters]);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        let currentIteration = 0;

        const shuffleText = (currentCount: number) => {
            if (useOriginalCharsOnly) {
                // ⚡ Bolt: Collect unrevealed, non-space characters
                const nonSpaceChars: string[] = [];
                for (let i = 0; i < originalTextArray.length; i++) {
                    const char = originalTextArray[i];
                    if (char !== ' ' && revealSteps[i] >= currentCount) {
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
                        if (revealSteps[i] < currentCount) return char;
                        return nonSpaceChars[charIndex++];
                    });
            } else {
                return originalTextArray
                    .map((char, i) => {
                        if (char === ' ') return ' ';
                        if (revealSteps[i] < currentCount) return char;
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
                        setDisplayText(shuffleText(prevCount));
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
    }, [isHovering, text, speed, maxIterations, sequential, originalTextArray, availableChars, useOriginalCharsOnly, revealSteps]);



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
                    const isRevealedOrDone = revealSteps[index] < revealedCount || !isScrambling || !isHovering;

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

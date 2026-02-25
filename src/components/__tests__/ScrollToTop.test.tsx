/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent, act } from '@testing-library/react';
import ScrollToTop from '../ScrollToTop';
import * as framerMotion from 'framer-motion';

// Mock implementation inline
jest.mock('framer-motion', () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const React = require('react');

    class MotionValue {
        value: any;
        listeners = new Set<(v: any) => void>();
        constructor(initial: any) {
            this.value = initial;
        }
        get() { return this.value; }
        set(v: any) {
            this.value = v;
            this.listeners.forEach(cb => cb(v));
        }
        onChange(cb: (v: any) => void) {
            this.listeners.add(cb);
            return () => this.listeners.delete(cb);
        }
    }

    const scrollY = new MotionValue(0);

    const MockButton = ({ style, children, onClick, className, 'aria-label': ariaLabel, ...props }: any) => {
        // Remove Framer Motion props that are not valid DOM attributes
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { whileHover, whileTap, whileInView, viewport, transition, initial, animate, exit, variants, ...domProps } = props;

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [_, forceUpdate] = React.useState(0);
        React.useEffect(() => {
            const unsubs: (() => void)[] = [];
            if (style) {
                Object.values(style).forEach((val: any) => {
                    if (val && val.onChange) unsubs.push(val.onChange(() => forceUpdate((n: number) => n + 1)));
                });
            }
            return () => unsubs.forEach((u: () => void) => u());
        }, [style]);

        const resolvedStyle: any = {};
        if (style) {
            if (style.opacity) resolvedStyle.opacity = style.opacity.get ? style.opacity.get() : style.opacity;
            if (style.scale) resolvedStyle.transform = `scale(${style.scale.get ? style.scale.get() : style.scale})`;
            if (style.pointerEvents) resolvedStyle.pointerEvents = style.pointerEvents.get ? style.pointerEvents.get() : style.pointerEvents;
            if (style.display) resolvedStyle.display = style.display.get ? style.display.get() : style.display;
        }

        return (
            <button
                onClick={onClick}
                className={className}
                aria-label={ariaLabel}
                style={resolvedStyle}
                {...domProps}
            >
                {children}
            </button>
        );
    };

    return {
        // Expose for testing
        __mockScrollY: scrollY,
        useScroll: () => ({ scrollY }),
        useTransform: (value: any, input: any, output: any) => {
            // Handle function signature: useTransform(value, transformer)
            if (typeof input === 'function') {
                const derived = new MotionValue(input(value.get()));
                const update = () => {
                     derived.set(input(value.get()));
                };
                value.onChange(update);
                return derived;
            }

            // Handle array signature: useTransform(value, input, output)
            const initialValue = output && output.length > 0 ? output[0] : undefined;
            const derived = new MotionValue(initialValue);

            const update = () => {
                const current = value.get();
                let result = initialValue;

                if (Array.isArray(input) && Array.isArray(output)) {
                   if (current >= input[1]) result = output[1];
                   else if (current <= input[0]) result = output[0];
                   else {
                       const p = (current - input[0]) / (input[1] - input[0]);
                       if (typeof output[0] === 'number' && typeof output[1] === 'number') {
                           result = output[0] + p * (output[1] - output[0]);
                       }
                   }
                }
                derived.set(result);
            };
            value.onChange(update);
            update(); // initial

            return derived;
        },
        motion: {
            button: MockButton
        },
        AnimatePresence: ({ children }: any) => <>{children}</>,
        useSpring: (v: any) => v,
        useMotionValue: (v: any) => new MotionValue(v),
    };
});

// Mock Lucide React
jest.mock('lucide-react', () => ({
  ArrowUp: () => <svg data-testid="arrow-up-icon" />,
}));

describe('ScrollToTop', () => {
  const originalScrollTo = window.scrollTo;

  const getMockScrollY = () => (framerMotion as any).__mockScrollY;

  beforeAll(() => {
    Object.defineProperty(window, 'scrollTo', {
      value: jest.fn(),
      writable: true,
    });
  });

  afterAll(() => {
    window.scrollTo = originalScrollTo;
  });

  beforeEach(() => {
      act(() => {
          getMockScrollY().set(0);
      });
  });

  it('is initially hidden', () => {
    render(<ScrollToTop />);
    // With useTransform, the button is always in DOM but might have opacity: 0 and pointer-events: none
    const button = screen.getByRole('button', { hidden: true });
    expect(button).toHaveAttribute('aria-label', 'Scroll to top');

    // Check initial styles
    // We expect opacity 0 and pointerEvents none
    expect(button).toHaveStyle({ opacity: '0' });
    expect(button).toHaveStyle({ pointerEvents: 'none' });
  });

  it('becomes visible after scrolling down', async () => {
    render(<ScrollToTop />);
    const button = screen.getByRole('button', { hidden: true });

    // Simulate scroll to 600
    act(() => {
        getMockScrollY().set(600);
    });

    expect(button).toHaveStyle({ opacity: '1' });
    expect(button).toHaveStyle({ pointerEvents: 'auto' });
  });

  it('scrolls to top when clicked', async () => {
    render(<ScrollToTop />);
    const button = screen.getByRole('button', { hidden: true });

    act(() => {
        getMockScrollY().set(600);
    });

    fireEvent.click(button);

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    });
  });

  it('becomes hidden after scrolling back up', async () => {
    render(<ScrollToTop />);
    const button = screen.getByRole('button', { hidden: true });

    act(() => {
        getMockScrollY().set(600);
    });
    expect(button).toHaveStyle({ opacity: '1' });

    act(() => {
        getMockScrollY().set(0);
    });

    expect(button).toHaveStyle({ opacity: '0' });
    expect(button).toHaveStyle({ pointerEvents: 'none' });
  });
});

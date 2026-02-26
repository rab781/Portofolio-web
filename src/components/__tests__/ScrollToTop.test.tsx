import { render, screen, fireEvent, act } from '@testing-library/react';
import ScrollToTop from '../ScrollToTop';

// Helper to create a mock MotionValue
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createMotionValue = (initialValue: any) => {
  let value = initialValue;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const subscribers = new Set<(v: any) => void>();
  return {
    get: () => value,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    set: (newValue: any) => {
      value = newValue;
      subscribers.forEach((cb) => cb(value));
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onChange: (cb: (v: any) => void) => {
      subscribers.add(cb);
      return () => subscribers.delete(cb);
    },
    isMotionValue: true,
  };
};

const mockScrollY = createMotionValue(0);

jest.mock('framer-motion', () => {
  return {
    useScroll: () => ({ scrollY: mockScrollY }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    useTransform: (input: any, ...args: any[]) => {
      // Basic interpolation logic
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const transform = (val: any) => {
        if (typeof args[0] === 'function') {
          return args[0](val);
        }
        // Linear interpolation: input range, output range
        const inputRange = args[0] as number[];
        const outputRange = args[1] as number[];

        // Simple clamp and lerp
        if (val <= inputRange[0]) return outputRange[0];
        if (val >= inputRange[inputRange.length - 1]) return outputRange[outputRange.length - 1];

        // Simple linear interpolation between first two points
        const progress = (val - inputRange[0]) / (inputRange[1] - inputRange[0]);
        return outputRange[0] + progress * (outputRange[1] - outputRange[0]);
      };

      const output = createMotionValue(transform(input.get()));

      // Subscribe to input updates
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      input.onChange((val: any) => {
        output.set(transform(val));
      });

      return output;
    },
    motion: {
      // Filter out framer-motion props
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
      button: ({ style, children, onClick, className, 'aria-label': ariaLabel, whileHover, whileTap, initial, ...props }: any) => {
        // Resolve MotionValues in style to plain values for rendering
        // We use a state to force re-render when motion values change
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const [resolvedStyle, setResolvedStyle] = require('react').useState(() => {
             // eslint-disable-next-line @typescript-eslint/no-explicit-any
             const s: any = {};
             if (style) {
                 Object.keys(style).forEach((key) => {
                     const val = style[key];
                     s[key] = (val && val.get) ? val.get() : val;
                 });
             }
             return s;
        });

        // eslint-disable-next-line @typescript-eslint/no-require-imports
        require('react').useEffect(() => {
            const cleanups: (() => void)[] = [];
            if (style) {
                Object.keys(style).forEach((key) => {
                    const val = style[key];
                    if (val && val.onChange) {
                         // eslint-disable-next-line @typescript-eslint/no-explicit-any
                         cleanups.push(val.onChange((newVal: any) => {
                             // eslint-disable-next-line @typescript-eslint/no-explicit-any
                             setResolvedStyle((prev: any) => ({ ...prev, [key]: newVal }));
                         }));
                    }
                });
            }
            return () => cleanups.forEach(c => c());
        }, [style]);

        return (
          <button
            style={resolvedStyle}
            onClick={onClick}
            className={className}
            aria-label={ariaLabel}
            {...props}
          >
            {children}
          </button>
        );
      },
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    AnimatePresence: ({ children }: any) => <>{children}</>,
  };
});

// Mock Lucide React
jest.mock('lucide-react', () => ({
  ArrowUp: () => <svg data-testid="arrow-up-icon" />,
}));

describe('ScrollToTop', () => {
  const originalScrollTo = window.scrollTo;

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
      mockScrollY.set(0); // Reset scroll position
  });

  it('is initially hidden', () => {
    render(<ScrollToTop />);
    // When display: none is set, accname calculation returns empty string, so we can't query by name.
    // Query by role with hidden: true is enough since it's the only button.
    const button = screen.getByRole('button', { hidden: true });

    // Check initial styles (scroll 0)
    expect(button).toHaveStyle({ opacity: '0', display: 'none', pointerEvents: 'none' });
  });

  it('becomes visible after scrolling down', () => {
    render(<ScrollToTop />);
    const button = screen.getByRole('button', { hidden: true });

    // Simulate scroll to 600
    act(() => {
        mockScrollY.set(600);
    });

    // Check styles
    expect(button).toHaveStyle({ opacity: '1', display: 'block', pointerEvents: 'auto' });
  });

  it('scrolls to top when clicked', () => {
    render(<ScrollToTop />);
    const button = screen.getByRole('button', { hidden: true });

    act(() => {
        mockScrollY.set(600);
    });

    fireEvent.click(button);

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    });
  });

  it('becomes hidden after scrolling back up', () => {
    render(<ScrollToTop />);
    const button = screen.getByRole('button', { hidden: true });

    // Scroll down
    act(() => {
        mockScrollY.set(600);
    });
    expect(button).toHaveStyle({ opacity: '1', display: 'block' });

    // Scroll up
    act(() => {
        mockScrollY.set(0);
    });
    expect(button).toHaveStyle({ opacity: '0', display: 'none' });
  });
});

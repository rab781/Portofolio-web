import { render, screen, fireEvent } from '@testing-library/react';
import ScrollToTop from '../ScrollToTop';

// Mock scrollY object to control scroll position
const mockScrollY = { current: 0 };

// Mock Framer Motion
jest.mock('framer-motion', () => ({
  motion: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
    button: ({ children, onClick, style, 'aria-label': ariaLabel, whileHover, whileTap, initial, animate, exit, transition, variants, ...props }: any) => (
      <button
          onClick={onClick}
          aria-label={ariaLabel}
          style={style}
          {...props}
      >
        {children}
      </button>
    ),
  },
  useScroll: () => ({ scrollY: mockScrollY }),
  // Mock useTransform to return the calculated value synchronously
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useTransform: (value: any, arg2: any, arg3: any) => {
      // Handle function transform: useTransform(value, fn)
      if (typeof arg2 === 'function') {
          return arg2(value.current);
      }
      // Handle range transform: useTransform(value, input, output)
      if (Array.isArray(arg2) && Array.isArray(arg3)) {
          const val = value.current;
          const input = arg2;
          const output = arg3;

          if (val <= input[0]) return output[0];
          if (val >= input[input.length - 1]) return output[output.length - 1];
          // Simple logic for in-between
          return output[output.length - 1];
      }
      return 0;
  }
}));

// Mock Lucide React
jest.mock('lucide-react', () => ({
  ArrowUp: () => <svg data-testid="arrow-up-icon" />,
}));

describe('ScrollToTop', () => {
  const originalScrollTo = window.scrollTo;

  beforeEach(() => {
    mockScrollY.current = 0; // Reset scroll
    jest.clearAllMocks();
  });

  beforeAll(() => {
    Object.defineProperty(window, 'scrollTo', {
      value: jest.fn(),
      writable: true,
    });
  });

  afterAll(() => {
    window.scrollTo = originalScrollTo;
  });

  it('is hidden (opacity: 0, display: none) when at top', () => {
    mockScrollY.current = 0;
    const { container } = render(<ScrollToTop />);
    // eslint-disable-next-line testing-library/no-node-access, testing-library/no-container
    const button = container.querySelector('button');

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-label', 'Scroll to top');
    expect(button).toHaveStyle({ opacity: '0' });
    expect(button).toHaveStyle({ display: 'none' });
  });

  it('is visible (opacity: 1, display: block) when scrolled down', () => {
    mockScrollY.current = 600;
    render(<ScrollToTop />);
    const button = screen.getByRole('button', { name: /scroll to top/i });

    expect(button).toHaveStyle({ opacity: '1' });
    expect(button).toHaveStyle({ display: 'block' });
  });

  it('scrolls to top when clicked', () => {
    mockScrollY.current = 600;
    render(<ScrollToTop />);

    const button = screen.getByRole('button', { name: /scroll to top/i });
    fireEvent.click(button);

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    });
  });
});

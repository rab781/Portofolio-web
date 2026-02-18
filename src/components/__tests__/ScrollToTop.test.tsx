import { render, screen, fireEvent } from '@testing-library/react';
import ScrollToTop from '../ScrollToTop';
import { useScroll, useTransform } from 'framer-motion';

// Mock Framer Motion
jest.mock('framer-motion', () => ({
  motion: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    button: ({ children, onClick, className, 'aria-label': ariaLabel, style }: any) => (
      <button
        onClick={onClick}
        className={className}
        aria-label={ariaLabel}
        data-style={JSON.stringify(style)}
      >
        {children}
      </button>
    ),
  },
  useScroll: jest.fn(),
  useTransform: jest.fn(),
}));

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

  beforeEach(() => {
    jest.clearAllMocks();
    (useScroll as jest.Mock).mockReturnValue({ scrollY: 'mock-scroll-y' });
    (useTransform as jest.Mock).mockImplementation((value) => `transformed-${value}`);
  });

  afterAll(() => {
    window.scrollTo = originalScrollTo;
  });

  it('renders correctly with motion values', () => {
    render(<ScrollToTop />);

    const button = screen.getByRole('button', { name: /scroll to top/i });
    expect(button).toBeInTheDocument();

    // Check if useScroll was called
    expect(useScroll).toHaveBeenCalled();

    // Check if useTransform was called with correct parameters
    // Opacity
    expect(useTransform).toHaveBeenCalledWith('mock-scroll-y', [400, 500], [0, 1]);
    // Scale
    expect(useTransform).toHaveBeenCalledWith('mock-scroll-y', [400, 500], [0.8, 1]);
    // Pointer Events (function check)
    expect(useTransform).toHaveBeenCalledWith('mock-scroll-y', expect.any(Function));
  });

  it('scrolls to top when clicked', () => {
    render(<ScrollToTop />);

    const button = screen.getByRole('button', { name: /scroll to top/i });
    fireEvent.click(button);

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    });
  });

  it('correctly calculates pointerEvents threshold', () => {
    render(<ScrollToTop />);

    // Find the call for pointerEvents
    const calls = (useTransform as jest.Mock).mock.calls;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pointerEventsCall = calls.find((call: any[]) => typeof call[1] === 'function');

    expect(pointerEventsCall).toBeDefined();
    const thresholdFn = pointerEventsCall[1];

    expect(thresholdFn(300)).toBe('none');
    expect(thresholdFn(401)).toBe('auto');
    expect(thresholdFn(500)).toBe('auto');
  });
});

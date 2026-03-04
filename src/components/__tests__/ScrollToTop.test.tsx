import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ScrollToTop from '../ScrollToTop';

// Mock framer-motion hooks and components
let mockScrollY = 0;
jest.mock('framer-motion', () => ({
  motion: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    button: ({ children, onClick, className, 'aria-label': ariaLabel, style }: any) => {
      // For tests, if opacity is 0 or display is none, hide it from screen readers so testing-library
      // behaves similarly to when the component was conditionally rendered.
      const isHidden = style?.opacity === '0' || style?.opacity === 0 || style?.display === 'none';
      return (
        <button
          onClick={onClick}
          className={className}
          aria-label={ariaLabel}
          style={style}
          aria-hidden={isHidden ? "true" : undefined}
          data-testid={isHidden ? "hidden-button" : "visible-button"}
        >
          {children}
        </button>
      )
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  AnimatePresence: ({ children }: any) => <>{children}</>,
  useScroll: () => ({
    scrollY: mockScrollY,
  }),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useTransform: (val: any, input: any, output: any) => {
    // Handle the function case (e.g. `(v) => v > 500 ? "auto" : "none"`)
    if (typeof input === 'function') {
      return input(mockScrollY);
    }
    // Handle the array case (e.g. `[400, 500], [0, 1]`)
    if (Array.isArray(input) && Array.isArray(output)) {
      if (mockScrollY <= input[0]) return output[0];
      if (mockScrollY >= input[1]) return output[1];
      // Linear interpolation
      const ratio = (mockScrollY - input[0]) / (input[1] - input[0]);
      return output[0] + ratio * (output[1] - output[0]);
    }
    return output;
  }
}));

// Mock Lucide React
jest.mock('lucide-react', () => ({
  ArrowUp: () => <svg data-testid="arrow-up-icon" />,
}));

describe('ScrollToTop', () => {
  const originalScrollTo = window.scrollTo;

  beforeAll(() => {
    // Mock scrollTo
    Object.defineProperty(window, 'scrollTo', {
      value: jest.fn(),
      writable: true,
    });
    jest.useFakeTimers();
  });

  beforeEach(() => {
    mockScrollY = 0;
  });

  afterAll(() => {
    window.scrollTo = originalScrollTo;
    jest.useRealTimers();
  });

  it('is initially hidden', () => {
    mockScrollY = 0;
    render(<ScrollToTop />);
    // Testing library's getByRole won't find it if it's technically in DOM but invisible
    // unless we use hidden: true, but our testid trick helps us check it's 'hidden'
    const button = screen.getByTestId('hidden-button');
    expect(button).toHaveStyle({ opacity: '0', display: 'none' });
  });

  it('becomes visible after scrolling down', async () => {
    mockScrollY = 600;
    render(<ScrollToTop />);

    await waitFor(() => {
        const button = screen.getByTestId('visible-button');
        expect(button).toHaveStyle({ opacity: '1', display: 'flex' });
    });
  });

  it('scrolls to top when clicked', async () => {
    mockScrollY = 600;
    render(<ScrollToTop />);

    const button = await screen.findByTestId('visible-button');
    fireEvent.click(button);

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    });
  });

  it('becomes hidden after scrolling back up', async () => {
    mockScrollY = 600;
    const { rerender } = render(<ScrollToTop />);

    await waitFor(() => {
      const button = screen.getByTestId('visible-button');
      expect(button).toHaveStyle({ opacity: '1', display: 'flex' });
    });

    mockScrollY = 0;
    rerender(<ScrollToTop />);

    await waitFor(() => {
        const button = screen.getByTestId('hidden-button');
        expect(button).toHaveStyle({ opacity: '0', display: 'none' });
    });
  });
});

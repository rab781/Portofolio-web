import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import ScrollToTop from '../ScrollToTop';

type MotionButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  className: string;
  'aria-label': string;
};

type AnimatePresenceProps = {
  children: React.ReactNode;
};

// Mock Framer Motion to render immediately
jest.mock('framer-motion', () => ({
  motion: {
    button: ({ children, onClick, className, 'aria-label': ariaLabel }: MotionButtonProps) => (
      <button onClick={onClick} className={className} aria-label={ariaLabel}>
        {children}
      </button>
    ),
  },
  AnimatePresence: ({ children }: AnimatePresenceProps) => <>{children}</>,
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

  afterAll(() => {
    window.scrollTo = originalScrollTo;
    jest.useRealTimers();
  });

  it('is initially hidden', () => {
    render(<ScrollToTop />);
    const button = screen.queryByRole('button', { name: /scroll to top/i });
    expect(button).not.toBeInTheDocument();
  });

  it('becomes visible after scrolling down', async () => {
    render(<ScrollToTop />);

    // Mock scrollY
    Object.defineProperty(window, 'scrollY', { value: 600, writable: true });

    act(() => {
        window.dispatchEvent(new Event('scroll'));
        jest.runAllTimers(); // Process requestAnimationFrame
    });

    await waitFor(() => {
        const button = screen.getByRole('button', { name: /scroll to top/i });
        expect(button).toBeInTheDocument();
    });
  });

  it('scrolls to top when clicked', async () => {
    render(<ScrollToTop />);

    Object.defineProperty(window, 'scrollY', { value: 600, writable: true });
    act(() => {
        window.dispatchEvent(new Event('scroll'));
        jest.runAllTimers();
    });

    const button = await screen.findByRole('button', { name: /scroll to top/i });
    fireEvent.click(button);

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    });
  });

  it('becomes hidden after scrolling back up', async () => {
    render(<ScrollToTop />);

    Object.defineProperty(window, 'scrollY', { value: 600, writable: true });
    act(() => {
        window.dispatchEvent(new Event('scroll'));
        jest.runAllTimers();
    });

    await screen.findByRole('button', { name: /scroll to top/i });

    Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
    act(() => {
        window.dispatchEvent(new Event('scroll'));
        jest.runAllTimers();
    });

    await waitFor(() => {
        const button = screen.queryByRole('button', { name: /scroll to top/i });
        expect(button).not.toBeInTheDocument();
    });
  });
});

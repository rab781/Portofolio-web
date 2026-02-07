import { render, fireEvent, act, screen } from '@testing-library/react';
import ScrollToTop from '../ScrollToTop';

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    button: ({ children, onClick, className, 'aria-label': ariaLabel }: any) => (
      <button onClick={onClick} className={className} aria-label={ariaLabel}>
        {children}
      </button>
    ),
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe('ScrollToTop', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Mock requestAnimationFrame to run immediately
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      cb(0);
      return 0;
    });

    // Mock window.scrollTo
    window.scrollTo = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('is initially hidden', () => {
    render(<ScrollToTop />);
    const button = screen.queryByRole('button', { name: /scroll to top/i });
    expect(button).not.toBeInTheDocument();
  });

  it('becomes visible after scrolling down', () => {
    render(<ScrollToTop />);

    act(() => {
      window.scrollY = 400;
      fireEvent.scroll(window);
    });

    const button = screen.getByRole('button', { name: /scroll to top/i });
    expect(button).toBeInTheDocument();
  });

  it('hides when scrolling back up', () => {
    render(<ScrollToTop />);

    // Show it first
    act(() => {
      window.scrollY = 400;
      fireEvent.scroll(window);
    });
    expect(screen.getByRole('button', { name: /scroll to top/i })).toBeInTheDocument();

    // Hide it
    act(() => {
      window.scrollY = 100;
      fireEvent.scroll(window);
    });

    const button = screen.queryByRole('button', { name: /scroll to top/i });
    expect(button).not.toBeInTheDocument();
  });

  it('scrolls to top when clicked', () => {
    render(<ScrollToTop />);

    act(() => {
      window.scrollY = 400;
      fireEvent.scroll(window);
    });

    const button = screen.getByRole('button', { name: /scroll to top/i });
    fireEvent.click(button);

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    });
  });
});

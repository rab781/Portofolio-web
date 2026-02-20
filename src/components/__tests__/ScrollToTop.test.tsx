import { render, screen, fireEvent } from '@testing-library/react';
import ScrollToTop from '../ScrollToTop';

// Mock Framer Motion
jest.mock('framer-motion', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const React = require('react');

  const MotionButton = React.forwardRef(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ({ children, onClick, className, style, 'aria-label': ariaLabel }: any, ref: any) => (
      <button
        ref={ref}
        onClick={onClick}
        className={className}
        style={style}
        aria-label={ariaLabel}
      >
        {children}
      </button>
    )
  );
  MotionButton.displayName = 'MotionButton';

  return {
    motion: {
      button: MotionButton,
    },
    useScroll: () => ({
      scrollY: { get: () => 0, onChange: () => () => {} },
    }),
    useTransform: () => ({ get: () => 0 }),
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

  it('renders the button in the document', () => {
    render(<ScrollToTop />);
    const button = screen.getByRole('button', { name: /scroll to top/i });
    expect(button).toBeInTheDocument();
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
});

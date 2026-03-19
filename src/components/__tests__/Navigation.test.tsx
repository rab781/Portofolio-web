import { render, act, screen } from '@testing-library/react';
import Navigation from '../Navigation';

// Mock framer-motion hooks used by Navigation
jest.mock('framer-motion', () => ({
  ...jest.requireActual('framer-motion'),
  useScroll: () => ({ scrollY: 0 }),
  useMotionValueEvent: jest.fn(),
}));

// Mock IntersectionObserver
let observerCallback: (entries: Partial<IntersectionObserverEntry>[]) => void;
const mockObserve = jest.fn();
const mockDisconnect = jest.fn();

const mockIntersectionObserver = jest.fn((cb) => {
  observerCallback = cb;
  return {
    observe: mockObserve,
    unobserve: jest.fn(),
    disconnect: mockDisconnect,
  };
});
// eslint-disable-next-line @typescript-eslint/no-explicit-any
window.IntersectionObserver = mockIntersectionObserver as any;

describe('Navigation', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Mock requestAnimationFrame to run immediately
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      cb(0);
      return 0;
    });

    // Mock getElementById to return dummy elements
    jest.spyOn(document, 'getElementById').mockImplementation((id) => {
      const el = document.createElement('div');
      el.id = id;
      return el;
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('updates active section via IntersectionObserver', () => {
    render(<Navigation />);

    // Check that we are observing sections
    expect(mockObserve).toHaveBeenCalled();

    // Simulate 'about' section intersection
    act(() => {
      if (observerCallback) {
        observerCallback([
          { target: { id: 'about' } as Element, isIntersecting: true },
          { target: { id: 'home' } as Element, isIntersecting: false }
        ]);
      }
    });

    // Check if 'about' link is active
    const aboutLink = screen.getByRole('link', { name: /About/i });
    expect(aboutLink).toHaveAttribute('aria-current', 'true');

    // Check if 'home' link is inactive
    // Use getByText to specifically target the text link "Home" and not the logo link which also has aria-label="Home"
    const homeLink = screen.getByText('Home');
    expect(homeLink).not.toHaveAttribute('aria-current');
  });

  it('updates scrolled state on scroll via useMotionValueEvent', () => {
    // We need to capture the useMotionValueEvent callback provided by framer-motion
    let motionValueCallback: (latest: number) => void;
    jest.requireMock('framer-motion').useMotionValueEvent = jest.fn((val, evt, cb) => {
      motionValueCallback = cb;
    });

    render(<Navigation />);

    const nav = screen.getByRole('navigation');
    expect(nav).toHaveClass('py-4');

    // Simulate scrolling down past 20px via the framer-motion hook
    act(() => {
      if (motionValueCallback) {
        motionValueCallback(50);
      }
    });

    expect(nav).toHaveClass('py-3');

    // Simulate scrolling up
    act(() => {
      if (motionValueCallback) {
        motionValueCallback(0);
      }
    });

    expect(nav).toHaveClass('py-4');
  });
});

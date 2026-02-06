import { render, fireEvent, act, screen } from '@testing-library/react';
import Navigation from '../Navigation';

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
    expect(aboutLink).toHaveClass('bg-[#111111]');

    // Check if 'home' link is inactive
    const homeLink = screen.getByRole('link', { name: /Home/i });
    expect(homeLink).not.toHaveClass('bg-[#111111]');
  });

  it('updates scrolled state on scroll', () => {
    render(<Navigation />);

    const nav = screen.getByRole('navigation');
    // Initial state: py-4
    expect(nav).toHaveClass('py-4');

    // Scroll down
    act(() => {
        window.scrollY = 50;
        fireEvent.scroll(window);
    });

    // Scrolled state: py-3
    expect(nav).toHaveClass('py-3');

    // Scroll up
    act(() => {
        window.scrollY = 0;
        fireEvent.scroll(window);
    });

    expect(nav).toHaveClass('py-4');
  });
});

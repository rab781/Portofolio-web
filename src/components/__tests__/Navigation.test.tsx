import { render, fireEvent, act, screen } from '@testing-library/react';
import Navigation from '../Navigation';

// Mock active sections logic
// We need to properly type the mock
const mockGetBoundingClientRect = jest.fn();
Element.prototype.getBoundingClientRect = mockGetBoundingClientRect;

describe('Navigation', () => {
  beforeEach(() => {
    // Reset mocks
    mockGetBoundingClientRect.mockReset();

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

  it('updates active section on scroll', () => {
    render(<Navigation />);

    // Verify initial state (home is usually default active or nothing if scrolled to top and home is top)
    // The component sets activeSection to "home" initially.

    // Setup mock return values for sections
    // Section 'about' is in view (top <= 150 && bottom >= 150)
    mockGetBoundingClientRect.mockImplementation(function(this: HTMLElement) {
      if (this.id === 'about') {
        return { top: 100, bottom: 400, height: 300, left: 0, right: 0, width: 0, x: 0, y: 0, toJSON: () => {} } as DOMRect;
      }
      return { top: 1000, bottom: 1300, height: 300, left: 0, right: 0, width: 0, x: 0, y: 0, toJSON: () => {} } as DOMRect;
    });

    // Scroll
    act(() => {
        window.scrollY = 300;
        fireEvent.scroll(window);
    });

    // Check if 'about' link is active
    // Active link has "bg-[#111111]" class
    const aboutLink = screen.getByRole('link', { name: /About/i });
    expect(aboutLink).toHaveClass('bg-[#111111]');

    // Check if 'home' link is inactive
    const homeLink = screen.getByRole('link', { name: /Home/i });
    expect(homeLink).not.toHaveClass('bg-[#111111]');
  });
});

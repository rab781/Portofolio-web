
import { render, fireEvent, act } from '@testing-library/react';
import Navigation from '../Navigation';

// Mock IntersectionObserver
const mockObserve = jest.fn();
const mockDisconnect = jest.fn();
const mockIntersectionObserver = jest.fn(() => ({
  observe: mockObserve,
  unobserve: jest.fn(),
  disconnect: mockDisconnect,
}));
// eslint-disable-next-line @typescript-eslint/no-explicit-any
window.IntersectionObserver = mockIntersectionObserver as any;

// Mock getElementById to return dummy elements
const mockElement = document.createElement('div');
document.getElementById = jest.fn(() => mockElement);

describe('Navigation Performance', () => {
  let getBoundingClientRectSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock requestAnimationFrame to run immediately
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      cb(0);
      return 0;
    });

    getBoundingClientRectSpy = jest.spyOn(Element.prototype, 'getBoundingClientRect').mockReturnValue({
      top: 1000, bottom: 2000, left: 0, right: 0, width: 100, height: 1000, x: 0, y: 0, toJSON: () => {}
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('verifies zero getBoundingClientRect calls during scroll', () => {
    render(<Navigation />);

    // Reset spy count after initial render effects
    getBoundingClientRectSpy.mockClear();

    // Scroll multiple times
    act(() => {
        for (let i = 0; i < 10; i++) {
            window.scrollY = i * 100;
            fireEvent.scroll(window);
        }
    });

    expect(getBoundingClientRectSpy).not.toHaveBeenCalled();
  });
});

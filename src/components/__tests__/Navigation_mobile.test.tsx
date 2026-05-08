import { render, fireEvent, screen } from '@testing-library/react';
import Navigation from '../Navigation';

// Mock IntersectionObserver
const mockObserve = jest.fn();
const mockDisconnect = jest.fn();
const mockUnobserve = jest.fn();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).IntersectionObserver = jest.fn(() => ({
  observe: mockObserve,
  unobserve: mockUnobserve,
  disconnect: mockDisconnect,
}));

describe('Navigation Mobile Accessibility', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    document.body.style.overflow = '';
  });

  it('toggles mobile menu and sets accessibility attributes', () => {
    const { container } = render(<Navigation />);

    const toggleButton = screen.getByRole('button', { name: /open menu/i });

    // Initial state: menu closed
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
    expect(container.querySelector('#mobile-menu')).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe('');

    // Open menu
    fireEvent.click(toggleButton);

    // State: menu open
    expect(toggleButton).toHaveAttribute('aria-expanded', 'true');
    expect(document.body.style.overflow).toBe('hidden');
    expect(toggleButton).toHaveAttribute('aria-controls', 'mobile-menu');

    const menu = container.querySelector('#mobile-menu');
    expect(menu).toBeInTheDocument();

    // Close menu
    const closeButton = screen.getByRole('button', { name: /close menu/i });
    fireEvent.click(closeButton);
    const updatedToggleButton = screen.getByRole('button', { name: /open menu/i });
    expect(updatedToggleButton).toHaveAttribute('aria-expanded', 'false');
    expect(document.body.style.overflow).toBe('');
    expect(container.querySelector('#mobile-menu')).not.toBeInTheDocument();
  });

  it('closes on Escape key', () => {
    render(<Navigation />);
    const toggleButton = screen.getByRole('button', { name: /open menu/i });

    fireEvent.click(toggleButton);
    const closeButton = screen.getByRole('button', { name: /close menu/i });
    expect(closeButton).toHaveAttribute('aria-expanded', 'true');

    fireEvent.keyDown(window, { key: 'Escape' });

    const updatedToggleButton = screen.getByRole('button', { name: /open menu/i });
    expect(updatedToggleButton).toHaveAttribute('aria-expanded', 'false');
    expect(document.body.style.overflow).toBe('');
  });
});

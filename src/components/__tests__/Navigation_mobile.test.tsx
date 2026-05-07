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

    let toggleButton = screen.getByLabelText(/open menu/i);

    // Initial state: menu closed
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
    expect(container.querySelector('#mobile-menu')).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe('');

    // Open menu
    fireEvent.click(toggleButton);

    // Re-query the button with its new label
    toggleButton = screen.getByLabelText(/close menu/i);

    // State: menu open
    expect(toggleButton).toHaveAttribute('aria-expanded', 'true');
    expect(document.body.style.overflow).toBe('hidden');
    expect(toggleButton).toHaveAttribute('aria-controls', 'mobile-menu');

    const menu = container.querySelector('#mobile-menu');
    expect(menu).toBeInTheDocument();

    // Close menu
    fireEvent.click(toggleButton);

    // Re-query the button with its new label
    toggleButton = screen.getByLabelText(/open menu/i);
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
    expect(document.body.style.overflow).toBe('');
    expect(container.querySelector('#mobile-menu')).not.toBeInTheDocument();
  });

  it('closes on Escape key', () => {
    render(<Navigation />);
    let toggleButton = screen.getByLabelText(/open menu/i);

    fireEvent.click(toggleButton);

    toggleButton = screen.getByLabelText(/close menu/i);
    expect(toggleButton).toHaveAttribute('aria-expanded', 'true');

    fireEvent.keyDown(window, { key: 'Escape' });

    toggleButton = screen.getByLabelText(/open menu/i);
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
    expect(document.body.style.overflow).toBe('');
  });
});

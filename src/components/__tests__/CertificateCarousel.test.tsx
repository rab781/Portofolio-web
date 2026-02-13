import { render, fireEvent, screen } from '@testing-library/react';
import CertificateCarousel from '../CertificateCarousel';
import React from 'react';

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt} />;
  },
}));

// Mock IntersectionObserver for framer-motion whileInView
class MockIntersectionObserver {
  observe = jest.fn();
  disconnect = jest.fn();
  unobserve = jest.fn();
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
});

const mockItems = [
  { image: '/cert1.jpg', text: 'Cert 1' },
  { image: '/cert2.jpg', text: 'Cert 2' },
];

describe('CertificateCarousel', () => {
  it('renders correctly', () => {
    render(<CertificateCarousel items={mockItems} />);
    expect(screen.getByText('Cert 1')).toBeInTheDocument();
    expect(screen.getByText('Cert 2')).toBeInTheDocument();
  });

  it('handles mouse drag interaction', () => {
    render(<CertificateCarousel items={mockItems} />);

    const item = screen.getByText('Cert 1');
    const carouselContainer = item.closest('div.overflow-x-auto');

    if (!carouselContainer) throw new Error('Carousel container not found');

    Object.defineProperty(carouselContainer, 'scrollLeft', {
      value: 0,
      writable: true,
    });

    // Mouse Down
    // We pass clientX/Y as well, though pageX should work.
    fireEvent.mouseDown(carouselContainer, { clientX: 100, pageX: 100 });

    // Mouse Move (drag)
    // 100 - 50 = 50 delta. walk = 100. new scrollLeft = -100 (0 - 100).
    // Correct logic:
    // startX = 100
    // move pageX = 50
    // walk = (50 - 100) * 2 = -100
    // scrollLeft = oldScrollLeft - walk = 0 - (-100) = 100.
    fireEvent.mouseMove(carouselContainer, { clientX: 50, pageX: 50 });

    expect(carouselContainer.scrollLeft).toBe(100);

    // Mouse Up
    fireEvent.mouseUp(carouselContainer);
  });

  it('handles touch drag interaction', () => {
    render(<CertificateCarousel items={mockItems} />);
    const item = screen.getByText('Cert 1');
    const carouselContainer = item.closest('div.overflow-x-auto');

    if (!carouselContainer) throw new Error('Carousel container not found');

    Object.defineProperty(carouselContainer, 'scrollLeft', {
      value: 100,
      writable: true,
    });

    // Touch Start
    fireEvent.touchStart(carouselContainer, { touches: [{ pageX: 200, clientX: 200 }] });

    // Touch Move
    // startX = 200
    // move pageX = 220
    // walk = (220 - 200) * 2 = 40
    // scrollLeft = 100 - 40 = 60
    fireEvent.touchMove(carouselContainer, { touches: [{ pageX: 220, clientX: 220 }] });

    expect(carouselContainer.scrollLeft).toBe(60);
  });
});

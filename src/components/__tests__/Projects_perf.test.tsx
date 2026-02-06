import React from 'react';
import { render, screen } from '@testing-library/react';
import Projects from '../Projects';

// Mock next/image to verify props
jest.mock('next/image', () => ({
  __esModule: true,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt} data-testid="project-image" />;
  },
}));

describe('Projects Component Performance', () => {
  it('renders images with the correct sizes attribute for performance', () => {
    render(<Projects />);

    const images = screen.getAllByTestId('project-image');
    expect(images.length).toBeGreaterThan(0);

    images.forEach(img => {
      expect(img).toHaveAttribute('sizes', '(max-width: 767px) 100vw, 50vw');
    });
  });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import Projects from '../Projects';

// Mock next/image since it's not supported in jest-environment-jsdom by default without configuration
jest.mock('next/image', () => ({
  __esModule: true,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt} />;
  },
}));

describe('Projects Component', () => {
  it('renders GitHub links with accessible attributes', () => {
    render(<Projects />);

    // Find all links that have the accessible label
    const githubLinks = screen.getAllByRole('link', { name: /View source code on GitHub/i });

    // There are 4 projects in the mock data, all have githubUrl.
    // verifying we have at least one ensures the loop runs
    expect(githubLinks.length).toBeGreaterThan(0);

    githubLinks.forEach(link => {
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      expect(link).toHaveAttribute('title', 'View source code on GitHub');
      expect(link.getAttribute('href')).toMatch(/^https:\/\/github\.com\//);
    });
  });
});

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

  it('renders project images as clickable links', () => {
    render(<Projects />);

    // Query for links that might be hidden from accessibility tree
    // We look for links with href starting with /projects/
    // Since aria-hidden="true" is used, we need hidden: true option
    const links = screen.getAllByRole('link', { hidden: true });

    // Filter for the project detail links that are likely our image wrappers (they have tabIndex -1)
    const imageLinks = links.filter(link =>
      link.getAttribute('href')?.startsWith('/projects/') &&
      link.getAttribute('tabIndex') === '-1' &&
      link.getAttribute('aria-hidden') === 'true'
    );

    expect(imageLinks.length).toBeGreaterThan(0);
    imageLinks.forEach(link => {
       expect(link).toHaveClass('group/image');
       // Verify it contains an image (our mock renders an img tag)
       expect(link.querySelector('img')).toBeInTheDocument();
    });
  });
});

import { render, screen } from '@testing-library/react';
import SkipLink from '../SkipLink';
import '@testing-library/jest-dom';

describe('SkipLink', () => {
  it('renders a link to the main content', () => {
    render(<SkipLink />);

    const link = screen.getByRole('link', { name: /skip to content/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '#main-content');
  });

  it('has the correct styles for accessibility (hidden by default, visible on focus)', () => {
    render(<SkipLink />);

    const link = screen.getByRole('link', { name: /skip to content/i });

    // Check for classes that handle visibility
    expect(link).toHaveClass('fixed');
    expect(link).toHaveClass('-translate-y-[150%]');
    expect(link).toHaveClass('focus:translate-y-0');
  });
});

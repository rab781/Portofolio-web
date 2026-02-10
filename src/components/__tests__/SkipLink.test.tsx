import { render, screen } from '@testing-library/react';
import SkipLink from '../SkipLink';

describe('SkipLink', () => {
  it('renders a skip link with correct href', () => {
    render(<SkipLink />);
    const link = screen.getByRole('link', { name: /skip to content/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '#main-content');
  });

  it('has correct styling classes for accessibility', () => {
    render(<SkipLink />);
    const link = screen.getByRole('link', { name: /skip to content/i });
    // Check for classes that make it hidden/visible
    expect(link).toHaveClass('fixed');
    expect(link).toHaveClass('-translate-y-[150%]');
    expect(link).toHaveClass('focus:translate-y-0');
  });
});

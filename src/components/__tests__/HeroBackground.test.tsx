import { render, waitFor } from '@testing-library/react';
import HeroBackground from '../HeroBackground';

describe('HeroBackground', () => {
  it('renders blinking cells after mounting', async () => {
    const { container } = render(<HeroBackground />);

    // Wait for the component to mount (useEffect sets mounted=true)
    await waitFor(() => {
      expect(container.querySelector('.absolute.inset-0')).toBeInTheDocument();
    });

    // Verify that 40 blinking cells are rendered
    // The cells have the class "bg-accent-blue/20"
    // We use querySelectorAll to count them
    // We need to escape the forward slash in the class selector if we were using it strictly,
    // but looking for the suffix or exact string match via attribute is safer if selector is tricky.

    // Using simple class selector with escaped slash
    const cells = container.querySelectorAll('.bg-accent-blue\\/20');
    expect(cells.length).toBe(40);
  });
});

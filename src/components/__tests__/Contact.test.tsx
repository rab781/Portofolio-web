import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Contact from '../Contact';
import '@testing-library/jest-dom';

describe('Contact Component', () => {
  it('renders correctly and handles submission', async () => {
    render(<Contact />);

    // Check initial state
    // Note: The button text is split by icon, so we use regex flexible match
    const submitButton = screen.getByRole('button');
    expect(submitButton).toHaveTextContent(/send message/i);
    expect(submitButton).not.toBeDisabled();

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/subject/i), { target: { value: 'Test Subject' } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'Test Message' } });

    // Submit
    fireEvent.click(submitButton);

    // Check loading state
    expect(screen.getByText(/sending/i)).toBeInTheDocument();
    expect(submitButton).toBeDisabled();

    // Wait for success state
    await waitFor(() => {
      expect(screen.getByText(/message sent/i)).toBeInTheDocument();
    }, { timeout: 2000 });

    // Check success state
    expect(submitButton).toBeDisabled();
    expect(submitButton).toHaveClass('bg-green-600');
  });
});

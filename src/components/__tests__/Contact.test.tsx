import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Contact from '../Contact';

describe('Contact Component', () => {
  it('renders form elements', () => {
    render(<Contact />);

    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Subject/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Send Message/i })).toBeInTheDocument();
  });

  it('shows success message and does not alert on submission', async () => {
    // Spy on window.alert
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

    render(<Contact />);

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Subject/i), { target: { value: 'Test Subject' } });
    fireEvent.change(screen.getByLabelText(/Message/i), { target: { value: 'Test Message' } });

    // Submit
    fireEvent.click(screen.getByRole('button', { name: /Send Message/i }));

    // Check loading state
    expect(screen.getByRole('button')).toHaveTextContent(/Sending.../i);

    // Wait for success message (timeout is 1500ms in component)
    await waitFor(() => {
        expect(screen.getByRole('status')).toBeInTheDocument();
    }, { timeout: 3000 });

    expect(screen.getByText(/Message sent successfully/i)).toBeInTheDocument();

    // Ensure alert was NOT called
    expect(alertMock).not.toHaveBeenCalled();

    alertMock.mockRestore();
  });
});

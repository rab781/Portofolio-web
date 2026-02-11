import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Contact from '../Contact';

describe('Contact Component', () => {
  it('renders form elements', () => {
    render(<Contact />);

    expect(screen.getByRole('textbox', { name: /Name/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /Email/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /Subject/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /Message/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Send Message/i })).toBeInTheDocument();
  });

  it('shows success message and does not alert on submission', async () => {
    // Spy on window.alert
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

    render(<Contact />);

    // Fill out the form
    fireEvent.change(screen.getByRole('textbox', { name: /Name/i }), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByRole('textbox', { name: /Email/i }), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByRole('textbox', { name: /Subject/i }), { target: { value: 'Test Subject' } });
    fireEvent.change(screen.getByRole('textbox', { name: /Message/i }), { target: { value: 'Test Message' } });

    // Submit
    fireEvent.click(screen.getByRole('button', { name: /Send Message/i }));

    // Check loading state
    expect(screen.getByRole('button', { name: /Sending.../i })).toBeInTheDocument();

    // Wait for success message (timeout is 1500ms in component)
    await waitFor(() => {
        expect(screen.getByRole('status')).toBeInTheDocument();
    }, { timeout: 3000 });

    expect(screen.getByText(/Message sent successfully/i)).toBeInTheDocument();

    // Ensure alert was NOT called
    expect(alertMock).not.toHaveBeenCalled();

    alertMock.mockRestore();
  });

  it('copies email to clipboard when copy button is clicked', async () => {
    // Mock navigator.clipboard
    const writeTextMock = jest.fn().mockImplementation(() => Promise.resolve());
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock,
      },
    });

    render(<Contact />);

    const copyButton = screen.getByLabelText(/Copy email address/i);
    expect(copyButton).toBeInTheDocument();

    fireEvent.click(copyButton);

    expect(writeTextMock).toHaveBeenCalledWith('raihanrabani199@gmail.com');

    // Check if the label changes
    await waitFor(() => {
        expect(screen.getByLabelText(/Email copied to clipboard/i)).toBeInTheDocument();
    });
  });
});

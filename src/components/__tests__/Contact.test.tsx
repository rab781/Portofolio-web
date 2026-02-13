import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Contact from '../Contact';

describe('Contact Component', () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('renders form elements', () => {
    render(<Contact />);

    expect(screen.getByRole('textbox', { name: /Name/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /Email/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /Subject/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /Message/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Send Message/i })).toBeInTheDocument();
  });

  it('shows success message on successful submission', async () => {
    // Mock fetch
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message: 'Success' }),
      }) as Promise<Response>
    );

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

    // Wait for success message
    await waitFor(() => {
        expect(screen.getByRole('status')).toBeInTheDocument();
    });

    expect(screen.getByText(/Message sent successfully/i)).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledWith('/api/contact', expect.any(Object));
  });

  it('shows error message on failed submission', async () => {
    // Mock fetch failure
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: false,
        status: 400,
      }) as Promise<Response>
    );

    render(<Contact />);

    // Fill out the form
    fireEvent.change(screen.getByRole('textbox', { name: /Name/i }), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByRole('textbox', { name: /Email/i }), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByRole('textbox', { name: /Subject/i }), { target: { value: 'Test Subject' } });
    fireEvent.change(screen.getByRole('textbox', { name: /Message/i }), { target: { value: 'Test Message' } });

    // Submit
    fireEvent.click(screen.getByRole('button', { name: /Send Message/i }));

    // Wait for error message
    await waitFor(() => {
        expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
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

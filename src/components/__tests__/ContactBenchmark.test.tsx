import React, { Profiler } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Contact from '../Contact';

// Mock scrollIntoView since it's not available in JSDOM
window.HTMLElement.prototype.scrollIntoView = jest.fn();

describe('Contact Benchmark', () => {
  it('counts renders during typing', () => {
    let renderCount = 0;
    const onRender = (id, phase, actualDuration) => {
      renderCount++;
    };

    render(
      <Profiler id="Contact" onRender={onRender}>
        <Contact />
      </Profiler>
    );

    const nameInput = screen.getByLabelText(/Name/i);

    // Simulate typing "Hello"
    fireEvent.change(nameInput, { target: { value: 'H' } });
    fireEvent.change(nameInput, { target: { value: 'He' } });
    fireEvent.change(nameInput, { target: { value: 'Hel' } });
    fireEvent.change(nameInput, { target: { value: 'Hell' } });
    fireEvent.change(nameInput, { target: { value: 'Hello' } });

    console.log(`BENCHMARK_RENDER_COUNT: ${renderCount}`);
  });
});

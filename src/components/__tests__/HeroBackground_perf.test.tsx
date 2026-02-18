import React, { Profiler } from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import HeroBackground from '../HeroBackground';

// Mock requestAnimationFrame
const originalRAF = window.requestAnimationFrame;
const originalCancelRAF = window.cancelAnimationFrame;

beforeAll(() => {
  jest.useFakeTimers();
  window.requestAnimationFrame = (cb) => {
    return setTimeout(cb, 0) as unknown as number;
  };
  window.cancelAnimationFrame = (id) => {
    clearTimeout(id);
  };
});

afterAll(() => {
  window.requestAnimationFrame = originalRAF;
  window.cancelAnimationFrame = originalCancelRAF;
  jest.useRealTimers();
});

describe('HeroBackground Performance', () => {
  it('re-renders on mouse move (Baseline)', () => {
    const onRender = jest.fn();

    render(
      <Profiler id="HeroBackground" onRender={onRender}>
        <HeroBackground />
      </Profiler>
    );

    // Initial render only — useEffect mutates CSS variables directly (no setState),
    // so there is exactly 1 render, not 2.
    expect(onRender).toHaveBeenCalledTimes(1);

    // Simulate mouse move
    act(() => {
      fireEvent.mouseMove(window, { clientX: 100, clientY: 100 });
      jest.runAllTimers(); // Run rAF/setTimeout
    });

    // Should NOT re-render due to state update (Optimized behavior)
    expect(onRender).toHaveBeenCalledTimes(1);

    act(() => {
      fireEvent.mouseMove(window, { clientX: 200, clientY: 200 });
      jest.runAllTimers();
    });

    expect(onRender).toHaveBeenCalledTimes(1);
  });
});

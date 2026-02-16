import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import HeroBackground from '../HeroBackground';

// Mock Framer Motion
jest.mock('framer-motion', () => {
    const original = jest.requireActual('framer-motion');
    return {
        ...original,
        useMotionValue: jest.fn((initial) => ({
            set: jest.fn(),
            get: jest.fn(() => initial),
            on: jest.fn(() => () => { }),
        })),
        useTransform: jest.fn(() => ({
            on: jest.fn(() => () => { }),
            get: jest.fn(),
        })),
        motion: {
            div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
        },
    };
});

describe('HeroBackground Paused Prop', () => {
    it('does not attach mousemove listener when paused', () => {
        const addEventListenerSpy = jest.spyOn(window, 'addEventListener');
        const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');

        const { rerender } = render(<HeroBackground paused={true} />);

        // Should not attach mousemove listener
        expect(addEventListenerSpy).not.toHaveBeenCalledWith('mousemove', expect.any(Function));

        // Rerender with paused=false
        rerender(<HeroBackground paused={false} />);
        expect(addEventListenerSpy).toHaveBeenCalledWith('mousemove', expect.any(Function));

        // Rerender with paused=true again
        rerender(<HeroBackground paused={true} />);
        expect(removeEventListenerSpy).toHaveBeenCalledWith('mousemove', expect.any(Function));

        addEventListenerSpy.mockRestore();
        removeEventListenerSpy.mockRestore();
    });

    it('does not render blinking cells when paused', () => {
        // We can inspect the number of motion.divs rendered (mocked as divs)
        // The base grid has 2 divs (base + 2 overlays = 3?)
        // HeroBackground renders:
        // 1. Base Grid (div)
        // 2. Blinking Cells (motion.divs)
        // 3. Radial Overlay (div)
        // 4. Radial Overlay 2 (div)

        // Wait, Base Grid is a div.
        // Blinking cells are motion.divs.

        const { container, rerender } = render(<HeroBackground paused={true} />);

        // Count total elements?
        // Let's look for "absolute bg-accent-blue/20" class which is on Cell

        const cellsPaused = container.querySelectorAll('.bg-accent-blue\\/20');
        expect(cellsPaused.length).toBe(0);

        rerender(<HeroBackground paused={false} />);

        const cellsActive = container.querySelectorAll('.bg-accent-blue\\/20');
        expect(cellsActive.length).toBe(40);
    });
});

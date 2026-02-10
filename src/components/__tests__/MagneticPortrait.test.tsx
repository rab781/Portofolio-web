import { render, fireEvent, screen } from '@testing-library/react';
import MagneticPortrait from '../MagneticPortrait';

// Mock framer-motion
jest.mock('framer-motion', () => ({
    motion: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        div: ({ children, onMouseMove, onMouseEnter, onMouseLeave, className, style, ...props }: any) => (
            <div
                className={className}
                style={style}
                onMouseMove={onMouseMove}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                {...props}
            >
                {children}
            </div>
        )
    },
    useMotionValue: jest.fn((val) => ({ set: jest.fn(), get: () => val })),
    useSpring: jest.fn((val) => val),
    useTransform: jest.fn((val) => val),
}));

describe('MagneticPortrait', () => {
    it('renders without crashing', () => {
        render(<MagneticPortrait />);
        const img = screen.getByRole('img', { name: /Raihan Rabbani/i });
        expect(img).toBeInTheDocument();
    });

    it('optimizes getBoundingClientRect calls', () => {
        const { container } = render(<MagneticPortrait />);
        const wrapper = container.firstChild as HTMLElement;

        const mockRect = {
            width: 400,
            height: 500,
            top: 100,
            left: 100,
            bottom: 600,
            right: 500,
            x: 100,
            y: 100,
            toJSON: () => {}
        };

        const spy = jest.spyOn(wrapper, 'getBoundingClientRect').mockReturnValue(mockRect);

        // 1. Mouse Enter - should trigger calculation
        fireEvent.mouseEnter(wrapper);
        expect(spy).toHaveBeenCalledTimes(1);

        // 2. Mouse Move - should NOT trigger calculation again (uses cached rect)
        fireEvent.mouseMove(wrapper, { clientX: 150, clientY: 150, pageX: 150, pageY: 150 });
        expect(spy).toHaveBeenCalledTimes(1); // Still 1

        // 3. Another Move
        fireEvent.mouseMove(wrapper, { clientX: 160, clientY: 160, pageX: 160, pageY: 160 });
        expect(spy).toHaveBeenCalledTimes(1); // Still 1

        // 4. Resize - should invalidate cache
        fireEvent(window, new Event('resize'));

        // 5. Mouse Move after resize - should trigger calculation again
        fireEvent.mouseMove(wrapper, { clientX: 170, clientY: 170, pageX: 170, pageY: 170 });
        expect(spy).toHaveBeenCalledTimes(2); // Increased to 2

        spy.mockRestore();
    });
});

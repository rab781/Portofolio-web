import { render, screen, fireEvent, act } from "@testing-library/react";
import BackToTop from "../BackToTop";

// Define interface for the callback
type ScrollCallback = (v: number) => void;

// Mock framer-motion
jest.mock("framer-motion", () => {
  const actual = jest.requireActual("framer-motion");
  return {
    ...actual,
    useScroll: () => ({ scrollY: {} }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    useMotionValueEvent: (_value: any, _event: string, callback: ScrollCallback) => {
       // Attach callback to a global helper so we can trigger it
       // eslint-disable-next-line @typescript-eslint/no-explicit-any
       (global as any).mockScrollChange = callback;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    AnimatePresence: ({ children }: any) => <>{children}</>,
    motion: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
        button: ({ children, onClick, whileHover, whileTap, initial, animate, exit, ...props }: any) => (
            <button onClick={onClick} {...props}>{children}</button>
        )
    }
  };
});

describe("BackToTop", () => {
  beforeAll(() => {
    // Mock window.scrollTo
    Object.defineProperty(window, 'scrollTo', { value: jest.fn(), writable: true });
  });

  it("is hidden initially", () => {
    render(<BackToTop />);
    const button = screen.queryByLabelText("Back to top");
    expect(button).not.toBeInTheDocument();
  });

  it("appears when scrolled down", () => {
    render(<BackToTop />);

    // Trigger scroll event > 400
    act(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((global as any).mockScrollChange) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (global as any).mockScrollChange(500);
        }
    });

    const button = screen.getByLabelText("Back to top");
    expect(button).toBeInTheDocument();
  });

  it("scrolls to top when clicked", () => {
    render(<BackToTop />);

    // Make visible
    act(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((global as any).mockScrollChange) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (global as any).mockScrollChange(500);
        }
    });

    const button = screen.getByLabelText("Back to top");
    fireEvent.click(button);

    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
  });

  it("hides when scrolled back up", () => {
    render(<BackToTop />);

    // Make visible
    act(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((global as any).mockScrollChange) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (global as any).mockScrollChange(500);
        }
    });
    expect(screen.getByLabelText("Back to top")).toBeInTheDocument();

    // Make hidden
    act(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((global as any).mockScrollChange) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (global as any).mockScrollChange(100);
        }
    });

    expect(screen.queryByLabelText("Back to top")).not.toBeInTheDocument();
  });
});

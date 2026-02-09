import { render, act } from '@testing-library/react';
import Home from '../page';
import React from 'react';
import HeroBackground from '@/components/HeroBackground';

// Mock child components
jest.mock('@/components/Navigation', () => {
  const Navigation = () => <div data-testid="navigation">Navigation</div>;
  Navigation.displayName = 'Navigation';
  return Navigation;
});
jest.mock('@/components/About', () => {
  const About = () => <div data-testid="about">About</div>;
  About.displayName = 'About';
  return About;
});
jest.mock('@/components/Skills', () => {
  const Skills = () => <div data-testid="skills">Skills</div>;
  Skills.displayName = 'Skills';
  return Skills;
});
jest.mock('@/components/Projects', () => {
  const Projects = () => <div data-testid="projects">Projects</div>;
  Projects.displayName = 'Projects';
  return Projects;
});
jest.mock('@/components/Contact', () => {
  const Contact = () => <div data-testid="contact">Contact</div>;
  Contact.displayName = 'Contact';
  return Contact;
});
jest.mock('@/components/Preloader', () => {
  const Preloader = ({ onComplete }: { onComplete: () => void }) => {
    React.useEffect(() => {
      onComplete();
    }, [onComplete]);
    return <div data-testid="preloader">Preloader</div>;
  };
  Preloader.displayName = 'Preloader';
  return Preloader;
});
jest.mock('@/components/Experience', () => {
  const Experience = () => <div data-testid="experience">Experience</div>;
  Experience.displayName = 'Experience';
  return Experience;
});
jest.mock('@/components/Certificates', () => {
  const Certificates = () => <div data-testid="certificates">Certificates</div>;
  Certificates.displayName = 'Certificates';
  return Certificates;
});
jest.mock('@/components/HeroBackground', () => {
  return jest.fn(() => <div data-testid="hero-background">HeroBackground</div>);
});
jest.mock('@/components/MaskedReveal', () => {
  const MaskedReveal = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;
  MaskedReveal.displayName = 'MaskedReveal';
  return MaskedReveal;
});
jest.mock('@/components/GeometricShards', () => {
  const GeometricShards = () => <div data-testid="geometric-shards">GeometricShards</div>;
  GeometricShards.displayName = 'GeometricShards';
  return GeometricShards;
});

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img {...props} />,
}));

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => <div {...props}>{children}</div>,
    section: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => <section {...props}>{children}</section>,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useScroll: () => ({ scrollY: { on: jest.fn(), get: () => 0 } }),
  useTransform: () => ({ get: () => 0 }),
  useMotionValue: (v: any) => ({ get: () => v, set: jest.fn() }),
  useSpring: () => ({ get: () => 0 }),
  useInView: () => false,
  useMotionValueEvent: jest.fn(),
}));

describe('Home Page Scroll Performance', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('avoids re-renders on scroll by using Framer Motion hooks directly', () => {
    jest.useFakeTimers();
    render(<Home />);

    const HeroBackgroundMock = HeroBackground as jest.Mock;
    HeroBackgroundMock.mockClear();

    // Trigger multiple scroll events rapidly
    act(() => {
        window.scrollY = 100;
        window.dispatchEvent(new Event('scroll'));
        window.scrollY = 101;
        window.dispatchEvent(new Event('scroll'));
        window.scrollY = 102;
        window.dispatchEvent(new Event('scroll'));
    });

    // Execute pending timers / animation frames
    act(() => {
        jest.runAllTimers();
    });

    // With optimization using useScroll/useTransform, scroll events should NOT trigger React re-renders
    // for child components like HeroBackground, as updates happen directly on DOM via Framer Motion.
    expect(HeroBackgroundMock).toHaveBeenCalledTimes(0);
  });
});

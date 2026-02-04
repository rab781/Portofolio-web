/**
 * Quadratic Bézier curve calculation utilities
 * Uses 3 control points for smooth S-curve path animation
 */

export interface Point {
  x: number;
  y: number;
}

export interface BezierControlPoints {
  P0: Point; // Start point
  P1: Point; // Control point (creates the curve)
  P2: Point; // End point
}

/**
 * Calculate a point on a quadratic Bézier curve
 * @param t - Progress value from 0 to 1
 * @param p0 - Start value
 * @param p1 - Control point value
 * @param p2 - End value
 * @returns The interpolated value at position t
 */
export function quadraticBezier(t: number, p0: number, p1: number, p2: number): number {
  const u = 1 - t;
  return u * u * p0 + 2 * u * t * p1 + t * t * p2;
}

/**
 * Get responsive control points based on viewport
 * @param isMobile - Whether the viewport is mobile size
 * @returns Control points adjusted for viewport
 */
export function getResponsiveControlPoints(isMobile: boolean): BezierControlPoints {
  if (isMobile) {
    return {
      P0: { x: 50, y: 85 },    // Start: center-bottom (50vw, 85vh)
      P1: { x: 35, y: 50 },    // Control: slight left-up (creates S-curve)
      P2: { x: 25, y: 15 }     // End: left-top (where About image is)
    };
  }
  return {
    P0: { x: 50, y: 85 },      // Start: center-bottom (50vw, 85vh)
    P1: { x: 30, y: 45 },      // Control: left-up (creates S-curve)
    P2: { x: 18, y: 12 }       // End: left-top (where About image is)
  };
}

/**
 * Calculate icon position along the Bézier curve
 * @param scrollProgress - Progress from 0 to 1
 * @param isMobile - Whether viewport is mobile
 * @returns Position in viewport units (vw, vh)
 */
export function getScrollIconPosition(
  scrollProgress: number,
  isMobile: boolean
): { x: number; y: number; rotation: number; scale: number } {
  const points = getResponsiveControlPoints(isMobile);
  
  // Eased progress for smooth deceleration at the end
  const eased = easeOutQuad(scrollProgress);
  
  const x = quadraticBezier(eased, points.P0.x, points.P1.x, points.P2.x);
  const y = quadraticBezier(eased, points.P0.y, points.P1.y, points.P2.y);
  
  // Add rotation during travel (360° full rotation)
  const rotation = scrollProgress * 360;
  
  // Scale from 1 to 0.7 during animation (shrink to badge size)
  const scale = 1 - (scrollProgress * 0.3);
  
  return { x, y, rotation, scale };
}

/**
 * Ease-out quadratic function for smooth deceleration
 */
export function easeOutQuad(t: number): number {
  return t * (2 - t);
}

/**
 * Ease-in-out quadratic function for smooth acceleration and deceleration
 */
export function easeInOutQuad(t: number): number {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

/**
 * Generate SVG path string for the Bézier curve
 * @param isMobile - Whether viewport is mobile
 * @param viewportWidth - Current viewport width
 * @param viewportHeight - Current viewport height
 * @returns SVG path d attribute string
 */
export function generateSVGPath(
  isMobile: boolean,
  viewportWidth: number,
  viewportHeight: number
): string {
  const points = getResponsiveControlPoints(isMobile);
  
  // Convert viewport units to pixels
  const startX = (points.P0.x / 100) * viewportWidth;
  const startY = (points.P0.y / 100) * viewportHeight;
  const controlX = (points.P1.x / 100) * viewportWidth;
  const controlY = (points.P1.y / 100) * viewportHeight;
  const endX = (points.P2.x / 100) * viewportWidth;
  const endY = (points.P2.y / 100) * viewportHeight;
  
  return `M ${startX} ${startY} Q ${controlX} ${controlY}, ${endX} ${endY}`;
}

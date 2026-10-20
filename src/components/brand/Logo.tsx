type Variant = 'mark' | 'lockup' | 'full';

// The traced artwork is 526 x 508. Each variant is a crop of the same paths.
const VIEWBOX: Record<Variant, string> = {
  mark: '70 0 436 336', // E, A, D monogram with the rising arrow
  lockup: '0 0 526 462', // monogram plus wordmark
  full: '0 0 526 508', // lockup plus tagline
};
const RATIO: Record<Variant, [number, number]> = { mark: [436, 336], lockup: [526, 462], full: [526, 508] };

interface Props {
  variant?: Variant;
  /** Rendered height in px. Minimum sizes: mark 24, lockup/full 120 wide. */
  height?: number;
  title?: string;
  className?: string;
}

export function Logo({ variant = 'mark', height = 32, title = 'ErAlDev', className }: Props) {
  const [w, h] = RATIO[variant];
  return (
    <svg
      className={className}
      viewBox={VIEWBOX[variant]}
      width={Math.round((height * w) / h)}
      height={height}
      role="img"
      aria-label={title}
      focusable="false"
    >
      <use href="#eal-logo" />
    </svg>
  );
}

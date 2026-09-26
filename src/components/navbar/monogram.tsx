import { forwardRef, useId, SVGProps } from 'react';
import styles from './monogram.module.css';

interface MonogramProps extends SVGProps<SVGSVGElement> {
  highlight?: boolean;
  className?: string;
}

export const Monogram = forwardRef<SVGSVGElement, MonogramProps>(
  ({ highlight = true, className = '', ...props }, ref) => {
    const id = useId();
    const clipId = `${id}monogram-clip`;

    return (
      <svg
        aria-hidden
        className={`${styles.monogram} ${className}`}
        width="48"
        height="29"
        viewBox="0 0 48 29"
        ref={ref}
        {...props}
      >
        <defs>
          <clipPath id={clipId}>
            {/* 
              Masterpiece Interlocking Stencil "RH" (Rayan El Habib):
              - Precision-sculpted 'R' bowl transitioning dynamically into the 'H' crossbar
              - Parallel 61.2° forward-slanted diagonal cuts
              - Harmonious counter-spaces with balanced optical weights
              - Hamish Williams signature aerodynamic shard in the top-right
            */}
            <path d="M0 0h14.5a6.5 6.5 0 0 1 5.8 3.5L25 14h3.5V0h6v29h-6v-9.5h-4.8L16.2 29H9.5l6-11.8c-1-.2-2-.7-2.8-1.5H6V29H0V0Zm6 5.2v5.8h8.2c1.8 0 3-1.1 3-2.9 0-1.7-1.2-2.9-3-2.9H6Zm40.7-2.4A2 2 0 0 0 45 0h-6.8l5.4 10 3.1-7.2Z" />
          </clipPath>
        </defs>
        <rect clipPath={`url(#${clipId})`} width="100%" height="100%" />
        {highlight && (
          <g clipPath={`url(#${clipId})`}>
            <rect className={styles.highlight} width="100%" height="100%" />
          </g>
        )}
      </svg>
    );
  }
);

Monogram.displayName = 'Monogram';

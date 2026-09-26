import { forwardRef, SVGProps } from 'react';
import styles from './icon.module.css';

interface IconProps extends SVGProps<SVGSVGElement> {
  icon: string;
  className?: string;
  size?: number | string;
}

export const Icon = forwardRef<SVGSVGElement, IconProps>(
  ({ icon, className = '', size = 24, ...rest }, ref) => {
    return (
      <svg
        aria-hidden
        ref={ref}
        className={`${styles.icon} ${className}`}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        {...rest}
      >
        <use href={`/icons.svg#${icon}`} />
      </svg>
    );
  }
);

Icon.displayName = 'Icon';

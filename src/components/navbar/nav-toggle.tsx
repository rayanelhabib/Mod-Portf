import { ButtonHTMLAttributes } from 'react';
import { Icon } from './icon';
import styles from './nav-toggle.module.css';

interface NavToggleProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  menuOpen: boolean;
}

export const NavToggle = ({ menuOpen, className = '', ...rest }: NavToggleProps) => {
  return (
    <button
      type="button"
      className={`${styles.toggle} ${className}`}
      aria-label="Menu"
      aria-expanded={menuOpen}
      {...rest}
    >
      <div className={styles.inner}>
        <Icon className={styles.icon} data-menu={true} data-open={menuOpen} icon="menu" />
        <Icon
          className={styles.icon}
          data-close={true}
          data-open={menuOpen}
          icon="close"
        />
      </div>
    </button>
  );
};

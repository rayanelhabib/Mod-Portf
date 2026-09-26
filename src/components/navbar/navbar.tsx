"use client";

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Monogram } from './monogram';
import { Icon } from './icon';
import { NavToggle } from './nav-toggle';
import { navLinks, socialLinks } from './nav-data';
import styles from './navbar.module.css';

export const Navbar = () => {
  const [current, setCurrent] = useState<string>('/#projects');
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrent(window.location.pathname + (window.location.hash || ''));

      const handleHashChange = () => {
        setCurrent(window.location.pathname + (window.location.hash || ''));
      };

      window.addEventListener('hashchange', handleHashChange);
      return () => window.removeEventListener('hashchange', handleHashChange);
    }
  }, [pathname]);

  const getCurrent = (url: string = '') => {
    return current === url ? 'page' : undefined;
  };

  const handleNavItemClick = (href: string) => {
    setCurrent(href);
    if (menuOpen) setMenuOpen(false);
  };

  return (
    <header className={styles.navbar} ref={headerRef}>
      {/* Top Monogram Logo */}
      <Link
        href="/#intro"
        data-navbar-item
        className={styles.logo}
        aria-label="Rayan El Habib"
        onClick={() => handleNavItemClick('/#intro')}
      >
        <Monogram highlight />
      </Link>

      {/* Mobile Hamburger / Close Button */}
      <NavToggle onClick={() => setMenuOpen(!menuOpen)} menuOpen={menuOpen} />

      {/* Desktop Vertical Rail */}
      <nav className={styles.nav}>
        <div className={styles.navList}>
          {navLinks.map(({ label, pathname: linkPath }) => (
            <Link
              href={linkPath}
              key={label}
              data-navbar-item
              className={styles.navLink}
              aria-current={getCurrent(linkPath)}
              onClick={() => handleNavItemClick(linkPath)}
            >
              {label}
            </Link>
          ))}
        </div>
        <NavbarIcons desktop />
      </nav>

      {/* Mobile Drawer */}
      <nav className={styles.mobileNav} data-visible={menuOpen}>
        {navLinks.map(({ label, pathname: linkPath }, index) => (
          <Link
            href={linkPath}
            key={label}
            className={styles.mobileNavLink}
            data-visible={menuOpen}
            aria-current={getCurrent(linkPath)}
            onClick={() => handleNavItemClick(linkPath)}
            style={{
              transitionDelay: `${300 + index * 50}ms`,
            }}
          >
            {label}
          </Link>
        ))}
        <NavbarIcons />
      </nav>
    </header>
  );
};

interface NavbarIconsProps {
  desktop?: boolean;
}

const NavbarIcons = ({ desktop }: NavbarIconsProps) => (
  <div className={styles.navIcons}>
    {socialLinks.map(({ label, url, icon }) => (
      <a
        key={label}
        data-navbar-item={desktop ? true : undefined}
        className={styles.navIconLink}
        aria-label={label}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon className={styles.navIcon} icon={icon} />
      </a>
    ))}
  </div>
);

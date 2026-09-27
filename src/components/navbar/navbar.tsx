"use client";

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Monogram } from './monogram';
import { Icon } from './icon';
import { NavToggle } from './nav-toggle';
import { navLinks as defaultNavLinks, socialLinks } from './nav-data';
import styles from './navbar.module.css';
import { useLanguage } from '@/hooks/use-language';

export const Navbar = () => {
  const [current, setCurrent] = useState<string>('/#projects');
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const { lang } = useLanguage();

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

  // Translations
  const navTranslations: Record<string, { en: string, de: string }> = {
    'Projects': { en: 'Projects', de: 'Projekte' },
    'Details': { en: 'Details', de: 'Details' },
    'Articles': { en: 'Articles', de: 'Artikel' },
    'Contact': { en: 'Contact', de: 'Kontakt' },
  };

  const getTranslatedLabel = (label: string) => {
    if (navTranslations[label]) {
      return navTranslations[label][lang] || label;
    }
    return label;
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
          {defaultNavLinks.map(({ label, pathname: linkPath }) => (
            <Link
              href={linkPath}
              key={label}
              data-navbar-item
              className={styles.navLink}
              aria-current={getCurrent(linkPath)}
              onClick={() => handleNavItemClick(linkPath)}
            >
              {getTranslatedLabel(label)}
            </Link>
          ))}
        </div>
        <NavbarIcons desktop />
      </nav>

      {/* Mobile Drawer */}
      <nav className={styles.mobileNav} data-visible={menuOpen}>
        {defaultNavLinks.map(({ label, pathname: linkPath }, index) => (
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
            {getTranslatedLabel(label)}
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

const NavbarIcons = ({ desktop = false }: NavbarIconsProps) => (
  <div className={desktop ? styles.navIcons : styles.mobileNavIcons}>
    {socialLinks.map(({ label, url, icon }) => (
      <a
        key={label}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={desktop ? styles.navIconLink : styles.mobileNavLink}
        aria-label={label}
      >
        <Icon icon={icon} />
      </a>
    ))}
  </div>
);

import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useSettings } from '@/context/SettingsContext';
import { LOGO_TRIMMED } from '@/lib/brand';

const NAV_ITEMS = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Exhibitions' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { settings } = useSettings();
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-cream/95 backdrop-blur">
      {settings.announcements.enabled && settings.announcements.text ? (
        <div className="bg-ink px-4 py-2 text-center text-[10px] font-medium uppercase tracking-[0.2em] text-brand-200">
          {settings.announcements.text}
        </div>
      ) : null}

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
        <Link to="/" className="flex shrink-0 items-center gap-3" aria-label="Lavish Events — home">
          <img
            src={LOGO_TRIMMED}
            alt=""
            width={824}
            height={824}
            className="h-12 w-auto object-contain sm:h-14"
          />
          <span className="hidden leading-none sm:block">
            <span className="block font-display text-2xl font-semibold tracking-wide">Lavish</span>
            <span className="block text-[9px] font-medium uppercase tracking-[0.42em] text-brand-600">
              Events
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `text-[11px] font-medium uppercase tracking-[0.2em] transition-colors ${
                  isActive ? 'text-brand-600' : 'text-ink/70 hover:text-ink'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {settings.instagramUrl ? (
            <a
              href={settings.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 border border-ink/20 px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink transition-colors hover:border-brand-600 hover:text-brand-700 sm:inline-flex"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
              </svg>
              Follow
            </a>
          ) : null}

          <Link to="/contact" className="btn-primary hidden !px-5 !py-2.5 md:inline-flex">
            Book a Stall
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="p-2 text-ink md:hidden"
            aria-expanded={menuOpen}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="border-t border-ink/10 bg-cream px-4 pb-5 pt-2 md:hidden" aria-label="Mobile">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `block border-b border-ink/5 px-2 py-3.5 text-[11px] font-medium uppercase tracking-[0.2em] ${
                  isActive ? 'text-brand-600' : 'text-ink'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <Link to="/contact" className="btn-primary mt-4 w-full">
            Book a Stall
          </Link>
        </nav>
      )}
    </header>
  );
}

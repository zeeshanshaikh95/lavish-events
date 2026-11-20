import { Link } from 'react-router-dom';
import { useSettings } from '@/context/SettingsContext';
import { WhatsAppGlyph } from '@/components/ProductCard';
import { LOGO_TRANSPARENT } from '@/lib/brand';

export function Footer() {
  const { settings } = useSettings();

  return (
    <footer className="mt-24 bg-ink text-cream">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-12 lg:px-10">
        <div className="md:col-span-5">
          <img
            src={LOGO_TRANSPARENT}
            alt="Lavish Events"
            width={1080}
            height={1080}
            loading="lazy"
            className="h-20 w-auto object-contain"
          />
          <p className="mt-5 max-w-sm text-sm font-light leading-relaxed text-cream/65">
            Curated shopping exhibitions, festive edits and pop-ups by Irfaana, Zainab &amp;
            Shazia. Bringing the best home-grown labels to your city.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {settings.instagramUrl ? (
              <a
                href={settings.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-cream/25 px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-cream transition-colors hover:border-brand-400 hover:text-brand-300"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
                </svg>
                @lavish__event_
              </a>
            ) : null}
            {settings.whatsappNumber ? (
              <a
                href={settings.whatsappNumber}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-cream/25 px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-cream transition-colors hover:border-brand-400 hover:text-brand-300"
              >
                <WhatsAppGlyph className="h-4 w-4" /> Join the list
              </a>
            ) : null}
          </div>
        </div>

        <nav className="md:col-span-3" aria-label="Footer">
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-brand-300">Explore</p>
          <ul className="mt-5 space-y-3 text-sm font-light">
            <li><Link to="/shop" className="text-cream/70 hover:text-brand-300">Exhibitions</Link></li>
            <li><Link to="/gallery" className="text-cream/70 hover:text-brand-300">Gallery</Link></li>
            <li><Link to="/about" className="text-cream/70 hover:text-brand-300">Our story</Link></li>
            <li><Link to="/reviews" className="text-cream/70 hover:text-brand-300">Kind words</Link></li>
            <li><Link to="/contact" className="text-cream/70 hover:text-brand-300">Contact &amp; stalls</Link></li>
          </ul>
        </nav>

        <div className="md:col-span-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-brand-300">Next stop</p>
          <p className="mt-5 font-display text-2xl leading-snug">
            Qubool Hai Exhibition
            <span className="mt-1 block text-sm font-body font-light uppercase tracking-[0.18em] text-cream/60">
              24 Nov · Hotel Clifton · Jogeshwari West
            </span>
          </p>
          <p className="mt-4 text-sm font-light leading-relaxed text-cream/60">
            Free entry · 12 noon – 9 pm. Follow us on Instagram for venue updates and new stall
            announcements.
          </p>
        </div>
      </div>

      <div className="border-t border-cream/10 px-4 py-6 sm:px-6 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-[10px] uppercase tracking-[0.16em] text-cream/40 sm:flex-row">
          <p>© {new Date().getFullYear()} Lavish Events. All rights reserved.</p>
          <p>Curated with care · Mumbai · Bhavnagar</p>
          <Link
            to="/admin/login"
            className="text-cream/30 underline decoration-transparent underline-offset-2 transition-colors hover:text-cream/60 hover:decoration-current"
          >
            Admin Login
          </Link>
        </div>
      </div>
    </footer>
  );
}

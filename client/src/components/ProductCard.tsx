import { Link } from 'react-router-dom';
import { useSettings } from '@/context/SettingsContext';
import { buildSingleProductMessage, buildWhatsAppLink } from '@/lib/whatsapp';
import { trackEvent } from '@/lib/analytics';
import { truncate } from '@/lib/format';
import { PlaceholderImage } from './PlaceholderImage';
import type { Product } from '@/types';

interface Props {
  product: Product;
}

export function ProductCard({ product }: Props) {
  const { settings, whatsappConfigured } = useSettings();

  const waLink = whatsappConfigured
    ? buildWhatsAppLink(
        settings,
        buildSingleProductMessage(settings, {
          productName: product.name,
          variantName: null,
          quantity: 1,
          price: null,
        })
      )
    : null;

  return (
    <article className="group relative flex flex-col border border-brand-200/70 bg-white transition-colors hover:border-brand-500">
      <Link
        to={`/product/${product.slug}`}
        className="relative block aspect-[4/5] overflow-hidden bg-brand-50"
        aria-label={`View ${product.name}`}
      >
        {product.images[0] ? (
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          <PlaceholderImage seed={product.slug} />
        )}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.featured ? <span className="badge-leaf">Upcoming</span> : null}
        </div>
        <div className="absolute inset-x-0 bottom-0 p-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-200">
            Free Entry
          </p>
          <h3 className="mt-1 font-display text-2xl font-medium leading-tight text-cream">
            {truncate(product.name, 48)}
          </h3>
          <p className="mt-1 line-clamp-2 text-[11px] font-light leading-relaxed text-cream/75">
            {product.size}
          </p>
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <p className="line-clamp-2 text-xs font-light leading-relaxed text-ink-soft">
          {product.description}
        </p>

        <div className="mt-auto flex gap-2 pt-1">
          <Link
            to={`/product/${product.slug}`}
            className="btn-outline flex-1 !px-3 !py-2.5 text-[10px]"
          >
            Details
          </Link>
          {waLink ? (
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent({ type: 'whatsapp_click', productSlug: product.slug })}
              className="btn-whatsapp flex-1 !px-3 !py-2.5 text-[10px]"
              aria-label={`Enquire about ${product.name}`}
            >
              <WhatsAppGlyph className="h-4 w-4" /> Enquire
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export function WhatsAppGlyph({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12.04 2a9.9 9.9 0 0 0-8.4 15.2L2 22l4.9-1.6A9.9 9.9 0 1 0 12.04 2zm0 18.1a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-2.9 1 1-2.9-.2-.3a8.2 8.2 0 1 1 6.6 3.6zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4 0-.5.1-.7l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.8-2c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.9.9-1.2 2.1-.7 3.4.6 1.7 2 3.3 3.6 4.2 1.7.9 2.9 1.1 3.9.8.6-.2 1.4-.7 1.6-1.3.2-.5.2-1 .1-1.1 0-.1-.2-.2-.4-.3z" />
    </svg>
  );
}

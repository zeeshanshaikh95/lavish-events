import { placeholderGradient } from '@/lib/format';

interface Props {
  seed?: string;
  /** Short caption shown over the placeholder. Defaults to a customer-friendly label. */
  label?: string;
  className?: string;
}

/**
 * Brand-styled placeholder shown whenever real client imagery is not yet
 * available. Deliberately NOT stock photography (real-data policy) — the
 * brand's own floral motif stands in until the client supplies photos.
 */
export function PlaceholderImage({ seed = 'lavish', label = 'Photo coming soon', className = '' }: Props) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`relative flex h-full w-full items-center justify-center bg-gradient-to-br ${placeholderGradient(seed)} ${className}`}
    >
      <svg viewBox="0 0 120 120" className="h-2/5 w-2/5 text-brand-400/70" fill="none" aria-hidden="true">
        <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M60 22l7 31 31 7-31 7-7 31-7-31-31-7 31-7 7-31z" />
        </g>
        <circle cx="60" cy="60" r="4" fill="currentColor" />
      </svg>
      {label ? (
        <span className="absolute bottom-2 left-0 right-0 px-2 text-center text-[10px] font-medium uppercase tracking-wider text-brand-700/60">
          {label}
        </span>
      ) : null}
    </div>
  );
}

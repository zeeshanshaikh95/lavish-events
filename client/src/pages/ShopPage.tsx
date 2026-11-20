import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { publicApi } from '@/api/endpoints';
import { useApi } from '@/hooks/useApi';
import { ProductCard } from '@/components/ProductCard';
import { EmptyState } from '@/components/EmptyState';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { Seo } from '@/components/seo/Seo';

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured first' },
  { value: 'bestseller', label: 'Most popular' },
  { value: 'newest', label: 'Newest' },
  { value: 'price_asc', label: 'A – Z' },
  { value: 'price_desc', label: 'Z – A' },
] as const;

export function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('search') ?? '';
  const category = searchParams.get('category') ?? '';
  const sort = (searchParams.get('sort') ?? 'featured') as string;

  const categories = useApi(() => publicApi.listCategories().then((r) => r.categories), []);

  const products = useApi(
    () => publicApi.listProducts({ search, category, sort: sort as never }).then((r) => r.products),
    [search, category, sort]
  );

  const [searchInput, setSearchInput] = useState(search);

  function setParam(key: string, value: string) {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    setSearchParams(next, { replace: true });
  }

  const hasFilters = Boolean(search || category || (sort && sort !== 'featured'));

  return (
    <>
      <Seo
        title="Exhibitions & Pop-Ups"
        description="Explore upcoming Lavish Events exhibitions, festive edits and pop-ups. Free entry, curated labels and beautiful venues."
        canonicalPath="/shop"
      />

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-10">
        <header className="border-b border-brand-200 pb-10">
          <p className="eyebrow">The calendar</p>
          <h1 className="mt-3 font-display text-5xl font-medium leading-none sm:text-6xl">
            Exhibitions &amp; pop-ups
          </h1>
          <p className="mt-5 max-w-2xl text-sm font-light leading-relaxed text-ink-soft">
            Every Lavish event is hand-curated — fashion, beauty, jewellery and lifestyle labels
            chosen for quality and character. Entry is always free.
          </p>
        </header>

        {/* Filters */}
        <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <form
            role="search"
            className="relative w-full lg:max-w-xs"
            onSubmit={(e) => {
              e.preventDefault();
              setParam('search', searchInput.trim());
            }}
          >
            <input
              type="search"
              className="input !pl-10"
              placeholder="Search exhibitions…"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              aria-label="Search exhibitions"
            />
            <svg viewBox="0 0 24 24" className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.5-3.5" strokeLinecap="round" />
            </svg>
          </form>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setParam('category', '')}
              className={`px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.16em] transition-colors ${
                !category ? 'bg-ink text-cream' : 'border border-brand-200 bg-white text-ink-soft hover:border-brand-500'
              }`}
            >
              All
            </button>
            {categories.data?.map((c) => (
              <button
                key={c._id}
                type="button"
                onClick={() => setParam('category', c.slug)}
                className={`px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.16em] transition-colors ${
                  category === c.slug
                    ? 'bg-ink text-cream'
                    : 'border border-brand-200 bg-white text-ink-soft hover:border-brand-500'
                }`}
              >
                {c.name}
              </button>
            ))}
            <select
              className="input !w-auto !py-2.5 text-[10px] uppercase tracking-[0.14em]"
              value={sort}
              onChange={(e) => setParam('sort', e.target.value)}
              aria-label="Sort exhibitions"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results */}
        <div className="mt-10">
          {products.loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => <div key={i} className="skeleton aspect-[4/5]" />)}
            </div>
          ) : products.error ? (
            <EmptyState icon="error" title="Couldn't load exhibitions" description={products.error} action={<button className="btn-outline" onClick={() => products.refetch()}>Try again</button>} />
          ) : !products.data?.length ? (
            hasFilters ? (
              <EmptyState
                icon="search"
                title="No exhibitions match your filters"
                description="Try a different search term or category."
                action={<button className="btn-outline" onClick={() => setSearchParams({})}>Clear filters</button>}
              />
            ) : (
              <EmptyState
                title="Next dates are being confirmed"
                description="Follow us on Instagram or join the WhatsApp list and we'll announce the next exhibition first."
                action={<WhatsAppButton message="Hi Lavish Events! Please let me know about upcoming exhibitions." label="Join the list" />}
              />
            )
          ) : (
            <>
              <p className="mb-5 text-[10px] uppercase tracking-[0.2em] text-ink-soft" aria-live="polite">
                {products.data.length} exhibition{products.data.length === 1 ? '' : 's'}
                {search ? ` matching “${search}”` : ''}
              </p>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {products.data.map((p) => <ProductCard key={p._id} product={p} />)}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

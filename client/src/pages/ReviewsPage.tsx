import { publicApi } from '@/api/endpoints';
import { useApi } from '@/hooks/useApi';
import { Stars } from '@/components/Stars';
import { EmptyState } from '@/components/EmptyState';
import { Seo } from '@/components/seo/Seo';
import { Link } from 'react-router-dom';

export function ReviewsPage() {
  const { data, loading, error, refetch } = useApi(
    () => publicApi.listReviews().then((r) => r.reviews),
    []
  );

  return (
    <>
      <Seo
        title="Kind Words"
        description="What shoppers and exhibitors say about Lavish Events exhibitions."
        canonicalPath="/reviews"
      />

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-10">
        <header className="max-w-3xl">
          <p className="eyebrow">Kind words</p>
          <h1 className="mt-3 font-display text-5xl font-medium leading-none sm:text-6xl">
            Good people, good taste.
          </h1>
          <p className="mt-5 text-sm font-light leading-relaxed text-ink-soft">
            Notes from the shoppers, designers and brands who make every Lavish exhibition what it
            is.
          </p>
        </header>

        {loading ? (
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {[...Array(4)].map((_, i) => <div key={i} className="skeleton h-48" />)}
          </div>
        ) : error ? (
          <div className="mt-10">
            <EmptyState icon="error" title="Couldn't load reviews" description={error} action={<button className="btn-outline" onClick={() => refetch()}>Try again</button>} />
          </div>
        ) : !data?.length ? (
          <div className="mt-10">
            <EmptyState
              title="No reviews yet"
              description="Kind words will be shared here as soon as they're approved."
            />
          </div>
        ) : (
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {data.map((r) => (
              <figure key={r._id} className="flex flex-col border border-brand-200 bg-white p-8">
                <Stars rating={r.rating} />
                <blockquote className="mt-4 flex-1 font-display text-2xl leading-snug text-ink">
                  “{r.text}”
                </blockquote>
                <figcaption className="mt-6 text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-700">
                  {r.customerName}
                </figcaption>
              </figure>
            ))}
          </div>
        )}

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          <Link to="/shop" className="btn-primary">Upcoming exhibitions</Link>
          <Link to="/gallery" className="btn-outline">See the gallery</Link>
        </div>
      </div>
    </>
  );
}

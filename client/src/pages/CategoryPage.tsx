import { Link, useParams } from 'react-router-dom';
import { publicApi } from '@/api/endpoints';
import { useApi } from '@/hooks/useApi';
import { ProductCard } from '@/components/ProductCard';
import { EmptyState } from '@/components/EmptyState';
import { Seo } from '@/components/seo/Seo';
import { WhatsAppButton } from '@/components/WhatsAppButton';

export function CategoryPage() {
  const { slug = '' } = useParams();
  const { data, loading, error } = useApi(
    () => publicApi.getCategory(slug),
    [slug]
  );

  return (
    <>
      {data ? (
        <Seo
          title={data.category.name}
          description={data.category.description || `Browse ${data.category.name} exhibitions from Lavish Events.`}
          canonicalPath={`/category/${data.category.slug}`}
        />
      ) : (
        <Seo title="Category" canonicalPath={`/category/${slug}`} />
      )}

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-10">
        {loading ? (
          <>
            <div className="skeleton h-10 w-72" />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(3)].map((_, i) => <div key={i} className="skeleton aspect-[4/5]" />)}
            </div>
          </>
        ) : error || !data ? (
          <div className="py-10">
            <EmptyState
              icon="error"
              title="Category not found"
              description={error ?? 'It may have been removed or renamed.'}
              action={<Link to="/shop" className="btn-primary">Browse All Exhibitions</Link>}
            />
          </div>
        ) : (
          <>
            <header className="border-b border-brand-200 pb-10">
              <p className="eyebrow">Category</p>
              <h1 className="mt-3 font-display text-5xl font-medium leading-none sm:text-6xl">
                {data.category.name}
              </h1>
              {data.category.description ? (
                <p className="mt-5 max-w-2xl text-sm font-light leading-relaxed text-ink-soft">
                  {data.category.description}
                </p>
              ) : null}
            </header>

            {data.category.image ? (
              <div className="mt-8 aspect-[21/9] overflow-hidden bg-brand-50">
                <img src={data.category.image} alt={data.category.name} className="h-full w-full object-cover" />
              </div>
            ) : null}

            {data.products.length === 0 ? (
              <div className="mt-10">
                <EmptyState
                  title="No exhibitions in this category right now"
                  description="New dates are added regularly. Join the WhatsApp list and we'll announce them first."
                  action={
                    <div className="flex flex-wrap justify-center gap-3">
                      <Link to="/shop" className="btn-outline">Browse All</Link>
                      <WhatsAppButton message="Hi Lavish Events! Please tell me about upcoming exhibitions." label="Join the list" />
                    </div>
                  }
                />
              </div>
            ) : (
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {data.products.map((p) => <ProductCard key={p._id} product={p} />)}
              </div>
            )}

            <div className="mt-12 text-center">
              <Link to="/shop" className="btn-outline">← All exhibitions</Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}

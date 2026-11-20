import { Link } from 'react-router-dom';
import { Seo } from '@/components/seo/Seo';

export function NotFoundPage() {
  return (
    <>
      <Seo title="Page Not Found" noIndex />
      <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-28 text-center sm:px-6">
        <p className="font-display text-8xl font-medium text-brand-300">404</p>
        <h1 className="mt-4 font-display text-3xl font-medium text-ink">This page has left the building</h1>
        <p className="mt-4 text-sm font-light text-ink-soft">
          The page you're looking for doesn't exist or may have moved.
        </p>
        <div className="mt-8 flex gap-3">
          <Link to="/" className="btn-primary">Back to Home</Link>
          <Link to="/shop" className="btn-outline">See Exhibitions</Link>
        </div>
      </div>
    </>
  );
}

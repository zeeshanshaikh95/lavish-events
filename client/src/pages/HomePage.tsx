import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { publicApi } from '@/api/endpoints';
import { useApi } from '@/hooks/useApi';
import { useSettings } from '@/context/SettingsContext';
import { ProductCard } from '@/components/ProductCard';
import { Seo } from '@/components/seo/Seo';
import { Stars } from '@/components/Stars';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { trackEvent } from '@/lib/analytics';

const SERVICES = [
  {
    title: 'Curated Exhibitions',
    text: 'Carefully edited floors of fashion, festive wear, jewellery, beauty and lifestyle — never a random mix of stalls.',
  },
  {
    title: 'Vendor Curation',
    text: 'We scout and shortlist every label so shoppers discover something new and exhibitors meet the right audience.',
  },
  {
    title: 'Pop-Ups & Launches',
    text: 'Focused, intimate events for brands that want a beautiful space and a ready-made community around them.',
  },
  {
    title: 'Festive Edits',
    text: 'Season-led exhibitions timed around weddings, Eid, Diwali and the moments people actually shop for.',
  },
];

const STATS = [
  { value: '120+', label: 'Exhibitions hosted' },
  { value: '39.7K', label: 'Community' },
  { value: '2', label: 'Cities & growing' },
  { value: '100%', label: 'Curated stalls' },
];

export function HomePage() {
  const { settings } = useSettings();
  const featured = useApi(() => publicApi.listProducts({ sort: 'featured' }).then((r) => r.products), []);
  const gallery = useApi(() => publicApi.listGallery().then((r) => r.items), []);
  const reviews = useApi(() => publicApi.listReviews().then((r) => r.reviews), []);
  const categories = useApi(() => publicApi.listCategories().then((r) => r.categories), []);

  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    trackEvent({ type: 'page_view', path: '/' });
  }, []);

  const slides =
    gallery.data && gallery.data.length
      ? gallery.data.slice(0, 5)
      : [{ _id: 'hero', image: settings.hero.imageUrl, caption: '', externalUrl: '' }];

  const current = slides[slideIndex % slides.length];

  useEffect(() => {
    if (slides.length <= 1) return;
    const t = setInterval(() => setSlideIndex((i) => (i + 1) % slides.length), 5200);
    return () => clearInterval(t);
  }, [slides.length]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: settings.businessName,
    description: settings.about.intro,
    ...(settings.instagramUrl ? { sameAs: [settings.instagramUrl] } : {}),
  };

  return (
    <>
      <Seo
        title="Lavish Events — Curated Exhibitions & Pop-Ups"
        description="Curated shopping exhibitions, festive edits and pop-ups by Irfaana, Zainab & Shazia. Fashion, beauty, jewellery and lifestyle under one roof. Free entry."
        canonicalPath="/"
        jsonLd={jsonLd}
      />

      {/* ── Hero slider ───────────────────────────────────────── */}
      <section className="relative isolate min-h-[78vh] overflow-hidden bg-ink" aria-label="Featured exhibitions">
        {slides.map((s, i) => (
          <div
            key={s._id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              i === slideIndex ? 'opacity-100' : 'opacity-0'
            }`}
            aria-hidden={i !== slideIndex}
          >
            {s.image ? (
              <img
                src={s.image}
                alt={s.caption || 'Lavish Events exhibition'}
                className="h-full w-full object-cover"
                loading={i === 0 ? 'eager' : 'lazy'}
              />
            ) : null}
            <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/65 to-ink/20" />
          </div>
        ))}

        <div className="relative mx-auto flex min-h-[78vh] max-w-7xl flex-col justify-center px-4 py-20 sm:px-6 lg:px-10">
          <div className="max-w-3xl">
            <p className="text-[11px] font-medium uppercase tracking-[0.42em] text-brand-300">
              Irfaana · Zainab · Shazia
            </p>
            <h1 className="mt-5 font-display text-5xl font-medium leading-[0.95] text-cream sm:text-7xl lg:text-[6rem]">
              {settings.hero.headline || 'Where style meets celebration.'}
            </h1>
            <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-cream/75 sm:text-lg">
              {settings.hero.subheadline}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link to="/shop" className="btn-primary !bg-cream !text-ink hover:!bg-brand-200">
                Explore Exhibitions
              </Link>
              <WhatsAppButton
                message="Hi Lavish Events! I would like to know about your upcoming exhibitions."
                label="Join the WhatsApp list"
                className="!bg-transparent !border !border-cream/40 hover:!bg-cream/10"
              />
            </div>
          </div>

          {/* Slider controls */}
          <div className="mt-14 flex items-end justify-between gap-6">
            <div className="flex items-center gap-3">
              {slides.length > 1
                ? slides.map((s, i) => (
                    <button
                      key={s._id}
                      type="button"
                      onClick={() => setSlideIndex(i)}
                      aria-label={`Go to slide ${i + 1}`}
                      className={`h-px transition-all ${
                        i === slideIndex ? 'w-12 bg-brand-300' : 'w-5 bg-cream/30 hover:bg-cream/60'
                      }`}
                    />
                  ))
                : null}
            </div>
            <p className="hidden text-[10px] uppercase tracking-[0.24em] text-cream/50 sm:block">
              {current?.caption || 'Curated by Lavish Events'}
            </p>
          </div>
        </div>
      </section>

      {/* ── Marquee ───────────────────────────────────────────── */}
      <div className="overflow-hidden border-y border-brand-200 bg-brand-50 py-3.5">
        <div className="marquee-track flex w-max items-center gap-10 whitespace-nowrap">
          {[0, 1].map((n) => (
            <div key={n} className="flex items-center gap-10">
              {['Fashion', 'Beauty', 'Jewellery', 'Festive', 'Lifestyle', 'Home', 'Accessories'].map(
                (word) => (
                  <span key={word} className="flex items-center gap-10">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-brand-800">
                      {word}
                    </span>
                    <span className="text-brand-400">✦</span>
                  </span>
                )
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Upcoming exhibitions ──────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-10" aria-labelledby="upcoming-heading">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">On the calendar</p>
            <h2 id="upcoming-heading" className="section-title mt-3">
              Upcoming exhibitions
            </h2>
          </div>
          <Link to="/shop" className="btn-outline self-start sm:self-auto">
            View all
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.loading
            ? [...Array(3)].map((_, i) => <div key={i} className="skeleton aspect-[4/5]" />)
            : featured.data?.slice(0, 3).map((p) => <ProductCard key={p._id} product={p} />)}
        </div>
      </section>

      {/* ── Experience ────────────────────────────────────────── */}
      <section className="bg-ink py-20 text-cream" aria-labelledby="experience-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-brand-300">
                The Lavish experience
              </p>
              <h2 id="experience-heading" className="mt-4 font-display text-4xl font-medium leading-tight sm:text-5xl">
                More than a market. A room full of good taste.
              </h2>
              <p className="mt-6 max-w-md text-sm font-light leading-relaxed text-cream/65">
                We bring together labels we genuinely love, in spaces designed to slow you down.
                Come for the shopping, stay for the conversations, the styling and the little
                discoveries you will not find anywhere else.
              </p>
              <div className="mt-8">
                <Link to="/about" className="btn-primary !bg-cream !text-ink hover:!bg-brand-200">
                  Our story
                </Link>
              </div>
            </div>

            <div className="grid gap-px bg-cream/15 sm:grid-cols-2 lg:col-span-7">
              {SERVICES.map((item, i) => (
                <div key={item.title} className="bg-ink p-7">
                  <span className="font-display text-3xl text-brand-300/70">0{i + 1}</span>
                  <h3 className="mt-4 font-display text-2xl font-medium">{item.title}</h3>
                  <p className="mt-2 text-sm font-light leading-relaxed text-cream/60">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-8 border-t border-cream/15 pt-10 sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label}>
                <p className="font-display text-4xl font-medium text-brand-300 sm:text-5xl">{s.value}</p>
                <p className="mt-2 text-[10px] uppercase tracking-[0.22em] text-cream/50">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About split ───────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-10" aria-labelledby="about-heading">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden bg-brand-50">
              <img
                src={settings.about.founderImageUrl || slides[0]?.image}
                alt="Lavish Events exhibition"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-6 -right-2 hidden max-w-[220px] border border-brand-300 bg-cream p-5 sm:block">
              <p className="font-display text-xl leading-snug text-ink">
                “The trend makers.”
              </p>
              <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-brand-700">
                Irfaana · Zainab · Shazia
              </p>
            </div>
          </div>

          <div>
            <p className="eyebrow">Our story</p>
            <h2 id="about-heading" className="section-title mt-3">
              Three friends. One shared eye for what is next.
            </h2>
            <p className="mt-6 text-sm font-light leading-relaxed text-ink-soft">
              {settings.about.intro}
            </p>
            <p className="mt-4 whitespace-pre-line text-sm font-light leading-relaxed text-ink-soft">
              {settings.about.story}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/about" className="btn-primary">
                Read more
              </Link>
              <Link to="/gallery" className="btn-outline">
                See the gallery
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Categories ────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-10" aria-labelledby="categories-heading">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Shop the edit</p>
            <h2 id="categories-heading" className="section-title mt-3">
              Find your kind of beautiful
            </h2>
          </div>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {categories.data?.map((cat) => (
            <Link key={cat._id} to={`/category/${cat.slug}`} className="group relative aspect-[4/3] overflow-hidden bg-brand-50">
              {cat.image ? (
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : null}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <h3 className="font-display text-2xl font-medium text-cream">{cat.name}</h3>
                <p className="mt-1 line-clamp-2 text-[11px] font-light text-cream/65">{cat.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Gallery ───────────────────────────────────────────── */}
      <section className="bg-brand-50/70 py-20" aria-labelledby="gallery-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">From the floor</p>
              <h2 id="gallery-heading" className="section-title mt-3">
                @lavish__event_
              </h2>
            </div>
            <a
              href={settings.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline self-start sm:self-auto"
            >
              Follow on Instagram
            </a>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {slides.slice(0, 5).map((g) => (
              <a
                key={g._id}
                href={g.externalUrl || settings.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square overflow-hidden bg-brand-100"
              >
                {g.image ? (
                  <img
                    src={g.image}
                    alt={g.caption || 'Lavish Events exhibition'}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : null}
                <div className="absolute inset-0 bg-ink/0 transition-colors group-hover:bg-ink/25" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-10" aria-labelledby="reviews-heading">
        <div className="text-center">
          <p className="eyebrow">Kind words</p>
          <h2 id="reviews-heading" className="section-title mt-3">
            Loved by shoppers &amp; exhibitors
          </h2>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {reviews.data?.slice(0, 4).map((r) => (
            <figure key={r._id} className="border border-brand-200 bg-white p-6">
              <Stars rating={r.rating} />
              <blockquote className="mt-4 text-sm font-light leading-relaxed text-ink-soft">
                “{r.text}”
              </blockquote>
              <figcaption className="mt-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-700">
                {r.customerName}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-ink py-20 text-cream">
        <img
          src={slides[0]?.image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-25"
          loading="lazy"
        />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-brand-300">
            Save your spot
          </p>
          <h2 className="mt-4 font-display text-4xl font-medium leading-tight sm:text-6xl">
            Come for the labels. Stay for the energy.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm font-light leading-relaxed text-cream/70">
            Join our WhatsApp list for venue updates, new stall reveals and early access to every
            Lavish exhibition.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <WhatsAppButton
              message="Hi Lavish Events! Please add me to your exhibition updates list."
              label="Join the WhatsApp list"
              size="lg"
              className="!bg-cream !text-ink hover:!bg-brand-200"
            />
            <Link to="/contact" className="btn-outline !border-cream/40 !text-cream hover:!bg-cream/10">
              Book a stall
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

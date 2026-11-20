import { Link } from 'react-router-dom';
import { useSettings } from '@/context/SettingsContext';
import { Seo } from '@/components/seo/Seo';
import { WhatsAppButton } from '@/components/WhatsAppButton';

const VALUES = [
  {
    title: 'Curated, never crowded',
    text: 'We would rather have twenty brilliant stalls than a hundred average ones. Every label is chosen by us.',
  },
  {
    title: 'A beautiful room',
    text: 'Light, space and a calm layout — shopping should feel like an afternoon out, not a scramble.',
  },
  {
    title: 'Fair to everyone',
    text: 'Free entry for shoppers. Thoughtful, transparent terms for exhibitors. Everyone wins.',
  },
];

export function AboutPage() {
  const { settings } = useSettings();

  return (
    <>
      <Seo
        title="Our Story"
        description="Lavish Events is a curated exhibition company by Irfaana, Zainab and Shazia — bringing fashion, beauty and lifestyle labels together in Mumbai and beyond."
        canonicalPath="/about"
      />

      <section className="border-b border-brand-200">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10">
          <p className="eyebrow">Our story</p>
          <h1 className="mt-4 max-w-4xl font-display text-5xl font-medium leading-[0.95] sm:text-7xl">
            The trend makers behind Lavish Events.
          </h1>
          <p className="mt-6 max-w-2xl text-base font-light leading-relaxed text-ink-soft">
            {settings.about.intro}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="aspect-[4/5] overflow-hidden bg-brand-50">
            <img
              src={settings.about.founderImageUrl}
              alt="Lavish Events exhibition"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div>
            <p className="font-display text-3xl leading-snug text-ink sm:text-4xl">
              “We wanted a shopping experience that felt personal — like a friend with very good
              taste showing you exactly where to look.”
            </p>
            <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.24em] text-brand-700">
              Irfaana · Zainab · Shazia
            </p>
            <div className="mt-8 whitespace-pre-line text-sm font-light leading-relaxed text-ink-soft">
              {settings.about.story}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/shop" className="btn-primary">See exhibitions</Link>
              <WhatsAppButton
                message="Hi Lavish Events! I'd love to know more about your exhibitions."
                label="Say hello"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ink py-16 text-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-brand-300">
            What we believe
          </p>
          <div className="mt-8 grid gap-px bg-cream/15 md:grid-cols-3">
            {VALUES.map((v, i) => (
              <div key={v.title} className="bg-ink p-8">
                <span className="font-display text-3xl text-brand-300/70">0{i + 1}</span>
                <h2 className="mt-4 font-display text-2xl font-medium">{v.title}</h2>
                <p className="mt-3 text-sm font-light leading-relaxed text-cream/60">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-10">
        <p className="eyebrow">Join us</p>
        <h2 className="mx-auto mt-4 max-w-2xl font-display text-4xl font-medium leading-tight sm:text-5xl">
          The next Lavish exhibition is already being planned.
        </h2>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/shop" className="btn-primary">Upcoming dates</Link>
          <Link to="/contact" className="btn-outline">Book a stall</Link>
        </div>
      </section>
    </>
  );
}

import { useSettings } from '@/context/SettingsContext';
import { Seo } from '@/components/seo/Seo';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { WhatsAppGlyph } from '@/components/ProductCard';

export function ContactPage() {
  const { settings, whatsappConfigured } = useSettings();

  return (
    <>
      <Seo
        title="Contact & Stall Bookings"
        description="Get in touch with Lavish Events — join the WhatsApp list for exhibition updates, or enquire about booking a stall at our next event."
        canonicalPath="/contact"
      />

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-10">
        <header className="max-w-3xl">
          <p className="eyebrow">Get in touch</p>
          <h1 className="mt-3 font-display text-5xl font-medium leading-none sm:text-6xl">
            Let's talk.
          </h1>
          <p className="mt-5 text-sm font-light leading-relaxed text-ink-soft">
            Whether you want to shop the next exhibition, book a stall, or collaborate with us —
            the quickest way to reach the team is our WhatsApp group or an Instagram DM.
          </p>
        </header>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <div className="border border-brand-300 bg-ink p-8 text-cream">
            <WhatsAppGlyph className="h-8 w-8 text-[#25D366]" />
            <h2 className="mt-5 font-display text-3xl font-medium">Shoppers</h2>
            <p className="mt-3 text-sm font-light leading-relaxed text-cream/65">
              Join our WhatsApp list for venue announcements, new stall reveals and early access.
            </p>
            <div className="mt-6">
              {whatsappConfigured ? (
                <WhatsAppButton
                  message="Hi Lavish Events! Please add me to your exhibition updates list."
                  label="Join the list"
                  className="!bg-cream !text-ink hover:!bg-brand-200"
                />
              ) : (
                <p className="text-xs uppercase tracking-[0.16em] text-cream/60">
                  WhatsApp link coming soon
                </p>
              )}
            </div>
          </div>

          <div className="border border-brand-200 bg-white p-8">
            <span className="font-display text-3xl text-brand-500">02</span>
            <h2 className="mt-5 font-display text-3xl font-medium text-ink">Exhibitors</h2>
            <p className="mt-3 text-sm font-light leading-relaxed text-ink-soft">
              A home-grown label with something special to show? Tell us about your brand and we
              will review it for the next curation.
            </p>
            <div className="mt-6">
              <WhatsAppButton
                message="Hi Lavish Events! I'd like to book a stall at your next exhibition. My brand is:"
                label="Enquire about stalls"
                className="!bg-ink !text-cream hover:!bg-brand-700 hover:!text-ink"
              />
            </div>
          </div>

          <div className="border border-brand-200 bg-white p-8">
            <span className="font-display text-3xl text-brand-500">03</span>
            <h2 className="mt-5 font-display text-3xl font-medium text-ink">Instagram</h2>
            <p className="mt-3 text-sm font-light leading-relaxed text-ink-soft">
              Our DMs are open. See the latest exhibition posters, behind-the-scenes and stall
              features first.
            </p>
            <a
              href={settings.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline mt-6"
            >
              @lavish__event_
            </a>
          </div>
        </div>

        <div className="mt-14 grid gap-8 border-t border-brand-200 pt-10 md:grid-cols-2">
          <div>
            <p className="eyebrow">Next stop</p>
            <h2 className="mt-3 font-display text-4xl font-medium">Qubool Hai Exhibition</h2>
            <p className="mt-3 text-sm font-light leading-relaxed text-ink-soft">
              24 November 2026 · Tuesday
              <br />
              12 noon – 9 pm · Free entry
              <br />
              Hotel Clifton, Jogeshwari West, Mumbai
            </p>
          </div>
          <div>
            <p className="eyebrow">For stall enquiries</p>
            <h2 className="mt-3 font-display text-4xl font-medium">Bring your brand</h2>
            <p className="mt-3 text-sm font-light leading-relaxed text-ink-soft">
              We curate every floor, so spaces are limited. Share your label, product category and
              city — our team will get back to you with availability and terms.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

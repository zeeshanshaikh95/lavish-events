/**
 * Idempotent bootstrap logic shared by the seed CLI and the server's
 * AUTO_SEED startup hook. Creates ONLY what the application needs to run:
 *   • the first admin account (from ADMIN_EMAIL / ADMIN_PASSWORD)
 *   • the singleton SiteSettings document with default WhatsApp templates
 *
 * The catalogue is deliberately never touched here — real products,
 * categories, reviews and gallery items come from the client via /admin.
 */
import bcrypt from 'bcryptjs';
import { AdminUser, SiteSettings } from '../models/index.js';
import { config } from '../config/env.js';



export async function bootstrapAdmin(): Promise<void> {
  const existing = await AdminUser.findOne({ email: config.adminEmail });
  if (existing) {
    console.log(`• Admin already exists: ${config.adminEmail}`);
    // Self-heal: if the account still authenticates with the bootstrap password
    // but the first-login flag was cleared (e.g. by an API smoke run), re-arm it.
    if (
      !existing.mustChangePassword &&
      (await bcrypt.compare(config.adminPassword, existing.passwordHash))
    ) {
      existing.mustChangePassword = true;
      await existing.save();
      console.log('  ↻ Bootstrap password still in use — first-login password change re-armed.');
    }
    return;
  }

  if (config.adminPassword === '[CHANGE_ME_BEFORE_PRODUCTION]') {
    console.log(
      '! ADMIN_PASSWORD is still the placeholder from .env.example — set a real password first.'
    );
  }

  const passwordHash = await bcrypt.hash(config.adminPassword, 12);
  await AdminUser.create({
    email: config.adminEmail,
    passwordHash,
    role: 'admin',
    // Bootstrap credentials (ADMIN_PASSWORD) must be rotated on first login.
    mustChangePassword: true,
  });
  console.log(`✓ Admin created: ${config.adminEmail}`);
}

export async function bootstrapSettings(): Promise<void> {
  const existing = await SiteSettings.findOne();
  if (existing) {
    console.log('• Site settings already exist');
    return;
  }

  await SiteSettings.create({
    businessName: 'Lavish Events',
    whatsappNumber: 'https://chat.whatsapp.com/LRdRp3OW7J2B7XOd6pCa3m',
    instagramUrl: 'https://www.instagram.com/lavish__event_/',
    email: '',
    mapsUrl: '',
    hero: {
      headline: 'Where style meets celebration.',
      subheadline:
        'Curated shopping exhibitions, festive edits and pop-ups by Irfaana, Zainab & Shazia — bringing the best home-grown labels to your city.',
      imageUrl: '/images/event-1.jpg',
    },
    about: {
      intro:
        'Lavish Events is a curated exhibition company built by three friends with one shared obsession: discovering labels worth talking about.',
      story:
        'Irfaana, Zainab and Shazia — the trend makers behind Lavish Events — have spent years connecting shoppers with designers, boutiques and beauty brands they genuinely love. Every Lavish exhibition is hand-curated: a considered mix of fashion, festive wear, jewellery, beauty and lifestyle, with a warm, unhurried atmosphere that keeps people coming back.\n\nFrom Mumbai to Bhavnagar, our goal is simple: make great shopping feel like a celebration.',
      founderImageUrl: '/images/event-2.jpg',
    },
    announcements: {
      enabled: true,
      text: 'Next up: Qubool Hai Exhibition · 24 Nov · Hotel Clifton, Jogeshwari West · Free entry',
    },
  });
  console.log('✓ Site settings created with Lavish Events defaults');
}

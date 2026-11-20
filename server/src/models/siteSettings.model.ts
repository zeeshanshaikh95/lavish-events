import mongoose, { Schema, model, type Model } from 'mongoose';

export const WHATSAPP_TEMPLATE_DEFAULT =
  'Hi Lavish Events!\n' +
  'I would like to enquire about:\n' +
  '{{ITEMS}}\n\n' +
  'Please share the date, venue and stall details.';

export const WHATSAPP_TEMPLATE_SINGLE_DEFAULT =
  'Hi Lavish Events!\n' +
  'I would like to enquire about {{PRODUCT}}.\n\n' +
  'Please share the date, venue and stall details.';

export interface ISiteSettings {
  businessName: string;
  whatsappNumber: string;
  instagramUrl: string;
  email: string;
  mapsUrl: string;
  whatsappTemplate: string;
  whatsappSingleProductTemplate: string;
  hero: {
    headline: string;
    subheadline: string;
    imageUrl: string;
    /** Cloudinary public_id for `hero.imageUrl` (derived on save, server-side). */
    imagePublicId: string;
  };
  about: {
    intro: string;
    story: string;
    founderImageUrl: string;
    /** Cloudinary public_id for `about.founderImageUrl` (derived on save, server-side). */
    founderImagePublicId: string;
  };
  announcements: {
    enabled: boolean;
    text: string;
  };
  updatedAt: Date;
}

const siteSettingsSchema = new Schema<ISiteSettings>(
  {
    businessName: { type: String, default: 'Lavish Events' },
    whatsappNumber: { type: String, default: '' },
    instagramUrl: { type: String, default: '' },
    email: { type: String, default: '' },
    mapsUrl: { type: String, default: '' },
    whatsappTemplate: { type: String, default: WHATSAPP_TEMPLATE_DEFAULT },
    whatsappSingleProductTemplate: { type: String, default: WHATSAPP_TEMPLATE_SINGLE_DEFAULT },
    hero: {
      headline: { type: String, default: '' },
      subheadline: { type: String, default: '' },
      imageUrl: { type: String, default: '' },
      imagePublicId: { type: String, default: '' },
    },
    about: {
      intro: { type: String, default: '' },
      story: { type: String, default: '' },
      founderImageUrl: { type: String, default: '' },
      founderImagePublicId: { type: String, default: '' },
    },
    announcements: {
      enabled: { type: Boolean, default: false },
      text: { type: String, default: '' },
    },
  },
  { timestamps: true }
);

export const SiteSettings: Model<ISiteSettings> =
  mongoose.models.SiteSettings ?? model<ISiteSettings>('SiteSettings', siteSettingsSchema);

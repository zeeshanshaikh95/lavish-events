import type { Category, GalleryItem, Product, PublicSettings, Review } from '@/types';

/**
 * Local showcase content for the public site.
 *
 * The production site reads everything from the API/admin panel. When the API
 * is unreachable (for example on the static GitHub Pages preview) these records
 * keep the storefront usable instead of showing empty states. The admin panel
 * remains the source of truth once the backend is connected.
 */
const BASE = import.meta.env.BASE_URL;
const img = (file: string) => `${BASE}images/${file}`;

const now = '2026-11-21T00:00:00.000Z';

function category(
  id: string,
  name: string,
  slug: string,
  description: string,
  image: string,
  order: number
): Category {
  return {
    _id: id,
    name,
    slug,
    description,
    image,
    displayOrder: order,
    createdAt: now,
    updatedAt: now,
  };
}

export const demoCategories: Category[] = [
  category(
    'cat-exhibitions',
    'Shopping Exhibitions',
    'shopping-exhibitions',
    'Curated fashion, jewellery and lifestyle exhibitions with the best home-grown labels under one roof.',
    img('event-1.jpg'),
    1
  ),
  category(
    'cat-bridal',
    'Bridal & Festive',
    'bridal-festive',
    'Bridal edits, festive wear and occasion dressing from hand-picked designers and boutiques.',
    img('event-3.jpg'),
    2
  ),
  category(
    'cat-beauty',
    'Beauty & Lifestyle',
    'beauty-lifestyle',
    'Beauty, skincare, accessories and everyday luxury from independent brands we love.',
    img('event-4.jpg'),
    3
  ),
];

type DemoProductInput = {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  category: Category;
  venue: string;
  date: string;
  time: string;
  highlights: string[];
  reasons: string[];
  notes: string;
  bestseller?: boolean;
  featured?: boolean;
  order: number;
};

function product(input: DemoProductInput): Product {
  return {
    _id: input.id,
    name: input.name,
    slug: input.slug,
    description: input.description,
    price: null,
    compareAtPrice: null,
    size: `${input.date} · ${input.venue}`,
    category: { _id: input.category._id, name: input.category.name, slug: input.category.slug },
    images: [input.image],
    ingredients: input.highlights,
    benefits: input.reasons,
    howToUse: `${input.date}\n${input.time}\n${input.venue}`,
    warnings: input.notes,
    variants: [{ name: 'Free Entry', price: null, stockStatus: 'in_stock' }],
    stockStatus: 'in_stock',
    bestseller: input.bestseller ?? false,
    featured: input.featured ?? false,
    seoTitle: `${input.name} · Lavish Events`,
    seoDescription: input.description.slice(0, 155),
    displayOrder: input.order,
    archived: false,
    createdAt: now,
    updatedAt: now,
  };
}

export const demoProducts: Product[] = [
  product({
    id: 'evt-qubool-hai',
    name: 'Qubool Hai Exhibition',
    slug: 'qubool-hai-exhibition-mumbai',
    description:
      'Our signature shopping exhibition returns to Jogeshwari West with a carefully curated floor of fashion, festive wear, beauty and jewellery labels. Expect new drops, exclusive exhibition pricing and plenty of one-on-one styling.',
    image: img('event-1.jpg'),
    category: demoCategories[0],
    venue: 'Hotel Clifton, Jogeshwari West, Mumbai',
    date: '24 November 2026 · Tuesday',
    time: '12 noon – 9 pm · Free entry',
    highlights: ['Fashion & festive wear', 'Beauty & skincare', 'Jewellery & accessories', 'Home & lifestyle'],
    reasons: [
      'Meet the designers and shop directly from them',
      'Exhibition-only pricing across every stall',
      'New festive drops you will not find on the high street',
    ],
    notes: 'Free entry for everyone. Walk-ins welcome — bring a friend!',
    bestseller: true,
    featured: true,
    order: 1,
  }),
  product({
    id: 'evt-bhavnagar',
    name: 'The Lavish Exhibition · Bhavnagar',
    slug: 'lavish-exhibition-bhavnagar',
    description:
      'Lavish Events travels to Bhavnagar for a full-day exhibition at Kalva Hall, Safiya Heights. A hand-picked mix of clothing, cosmetics, accessories and gifting — all in one place, all day long.',
    image: img('event-2.jpg'),
    category: demoCategories[0],
    venue: 'Kalva Hall, Safiya Heights, Bhavnagar',
    date: '1 December 2026 · Tuesday',
    time: '12 noon – 9 pm · Free entry',
    highlights: ['Clothing & ready-to-wear', 'Makeup & beauty', 'Gifting & accessories', 'Festive edits'],
    reasons: [
      'A curated edit of local and travelling labels',
      'Try, feel and shop in person before you buy',
      'A relaxed day out with your favourite people',
    ],
    notes: 'Free entry. The exhibition runs continuously from 12 noon to 9 pm.',
    featured: true,
    order: 2,
  }),
  product({
    id: 'evt-festive-edit',
    name: 'The Festive Edit',
    slug: 'festive-edit-mumbai',
    description:
      'A beautiful weekend of occasion dressing, thoughtful gifting and easy everyday luxury. Our festive edit brings together boutiques and independent labels chosen for their craftsmanship.',
    image: img('event-3.jpg'),
    category: demoCategories[1],
    venue: 'Hotel Clifton, Jogeshwari West, Mumbai',
    date: 'This Thursday · November 2026',
    time: '12 noon – 9 pm · Free entry',
    highlights: ['Festive silhouettes', 'Occasion wear', 'Gifting', 'Textiles & prints'],
    reasons: ['In-person fittings and styling', 'Small-batch labels', 'Festive-ready edits under one roof'],
    notes: 'Free entry. New stalls added through the day.',
    order: 3,
  }),
  product({
    id: 'evt-beauty-glam',
    name: 'Beauty & Glam Pop-Up',
    slug: 'beauty-glam-pop-up-mumbai',
    description:
      'A focused pop-up for beauty lovers — skincare, makeup, hair, fragrance and accessories from independent brands. Come to swatch, test and discover your next everyday favourite.',
    image: img('event-4.jpg'),
    category: demoCategories[2],
    venue: 'Mumbai · Venue to be announced',
    date: 'Upcoming · 2026',
    time: '12 noon – 9 pm · Free entry',
    highlights: ['Skincare', 'Makeup & tools', 'Hair & fragrance', 'Accessories'],
    reasons: ['Test products before you buy', 'Product specialists on the floor', 'Exclusive pop-up bundles'],
    notes: 'Free entry. Follow @lavish__event_ for the final venue and stall list.',
    order: 4,
  }),
  product({
    id: 'evt-trend-makers',
    name: 'The Trend Makers Bazaar',
    slug: 'trend-makers-bazaar',
    description:
      'Our namesake bazaar: a lively mix of trend-led fashion, accessories, beauty and home labels. If it is having a moment, you will find it here first.',
    image: img('event-5.jpg'),
    category: demoCategories[0],
    venue: 'Mumbai · Venue to be announced',
    date: 'Upcoming · 2026',
    time: '12 noon – 9 pm · Free entry',
    highlights: ['Trend-led fashion', 'Accessories', 'Beauty', 'Home & decor'],
    reasons: ['First look at new labels', 'Content-creator favourites', 'Easy, joyful shopping'],
    notes: 'Free entry. Announcements go live first on Instagram.',
    order: 5,
  }),
  product({
    id: 'evt-bridal-edit',
    name: 'Lavish Bridal Edit',
    slug: 'lavish-bridal-edit',
    description:
      'An intimate bridal and occasion-wear exhibition for brides, bridesmaids and families. Expect considered silhouettes, jewellery, accessories and finishing touches from trusted labels.',
    image: img('event-3.jpg'),
    category: demoCategories[1],
    venue: 'Mumbai · Venue to be announced',
    date: 'Upcoming · 2026',
    time: 'By appointment · Free entry',
    highlights: ['Bridal & occasion wear', 'Jewellery', 'Accessories', 'Trousseau'],
    reasons: ['Private, unhurried shopping', 'Speak directly with designers', 'Complete the look in one visit'],
    notes: 'Free entry. Appointments recommended closer to the date.',
    order: 6,
  }),
];

export const demoReviews: Review[] = [
  {
    _id: 'rev-1',
    customerName: 'Ayesha K.',
    rating: 5,
    text: 'Lavish exhibitions are always so well organised. The stall mix is genuinely curated — I always come home with something special.',
    image: '',
    status: 'approved',
    displayOrder: 1,
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: 'rev-2',
    customerName: 'Sana M.',
    rating: 5,
    text: 'Went for the Qubool Hai exhibition and stayed for hours. Great labels, fair pricing and such a warm team running the floor.',
    image: '',
    status: 'approved',
    displayOrder: 2,
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: 'rev-3',
    customerName: 'Rukhsar A.',
    rating: 5,
    text: 'The Bhavnagar edition was packed with beautiful pieces. Loved that everything was under one roof and entry was free.',
    image: '',
    status: 'approved',
    displayOrder: 3,
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: 'rev-4',
    customerName: 'Farheen S.',
    rating: 5,
    text: 'As an exhibitor, Lavish took care of everything — footfall, setup and promotion. Easily one of the best-run events I have been part of.',
    image: '',
    status: 'approved',
    displayOrder: 4,
    createdAt: now,
    updatedAt: now,
  },
];

export const demoGallery: GalleryItem[] = [
  {
    _id: 'gal-1',
    image: img('event-1.jpg'),
    caption: 'Qubool Hai Exhibition · Jogeshwari West',
    externalUrl: 'https://www.instagram.com/lavish__event_/',
    displayOrder: 1,
    active: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: 'gal-2',
    image: img('event-2.jpg'),
    caption: 'The Lavish Exhibition · Bhavnagar',
    externalUrl: 'https://www.instagram.com/lavish__event_/',
    displayOrder: 2,
    active: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: 'gal-3',
    image: img('event-3.jpg'),
    caption: 'The Festive Edit · Mumbai',
    externalUrl: 'https://www.instagram.com/lavish__event_/',
    displayOrder: 3,
    active: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: 'gal-4',
    image: img('event-4.jpg'),
    caption: 'Beauty & Glam Pop-Up',
    externalUrl: 'https://www.instagram.com/lavish__event_/',
    displayOrder: 4,
    active: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: 'gal-5',
    image: img('event-5.jpg'),
    caption: 'The Trend Makers Bazaar',
    externalUrl: 'https://www.instagram.com/lavish__event_/',
    displayOrder: 5,
    active: true,
    createdAt: now,
    updatedAt: now,
  },
];

export const demoSettings: PublicSettings = {
  businessName: 'Lavish Events',
  whatsappNumber: 'https://chat.whatsapp.com/LRdRp3OW7J2B7XOd6pCa3m',
  instagramUrl: 'https://www.instagram.com/lavish__event_/',
  email: '',
  mapsUrl: '',
  whatsappTemplate:
    'Hi Lavish Events! I would like to enquire about:\n\n{{ITEMS}}\n\nPlease share the details.',
  whatsappSingleProductTemplate:
    'Hi Lavish Events! I would like to enquire about {{PRODUCT}}.\n\nPlease share the date, venue and stall details.',
  hero: {
    headline: 'Where style meets celebration.',
    subheadline:
      'Curated shopping exhibitions, festive edits and pop-ups by Irfaana, Zainab & Shazia — bringing the best home-grown labels to your city.',
    imageUrl: img('event-1.jpg'),
  },
  about: {
    intro:
      'Lavish Events is a curated exhibition company built by three friends with one shared obsession: discovering labels worth talking about.',
    story:
      'Irfaana, Zainab and Shazia — the trend makers behind Lavish Events — have spent years connecting shoppers with designers, boutiques and beauty brands they genuinely love. Every Lavish exhibition is hand-curated: a considered mix of fashion, festive wear, jewellery, beauty and lifestyle, with a warm, unhurried atmosphere that keeps people coming back.\n\nFrom Mumbai to Bhavnagar, our goal is simple: make great shopping feel like a celebration.',
    founderImageUrl: img('event-2.jpg'),
  },
  announcements: {
    enabled: true,
    text: 'Next up: Qubool Hai Exhibition · 24 Nov · Hotel Clifton, Jogeshwari West · Free entry',
  },
};

// ── Filters used by the static preview ─────────────────────────

export function demoListProducts(params: {
  search?: string;
  category?: string;
  sort?: string;
} = {}): Product[] {
  let items = demoProducts.slice();
  const search = params.search?.trim().toLowerCase();
  if (search) {
    items = items.filter(
      (p) =>
        p.name.toLowerCase().includes(search) ||
        p.description.toLowerCase().includes(search) ||
        p.category?.name.toLowerCase().includes(search)
    );
  }
  if (params.category) {
    items = items.filter((p) => p.category?.slug === params.category);
  }
  switch (params.sort) {
    case 'price_asc':
      break;
    case 'price_desc':
      break;
    case 'newest':
      items.sort((a, b) => a.displayOrder - b.displayOrder);
      break;
    case 'bestseller':
      items.sort((a, b) => Number(b.bestseller) - Number(a.bestseller));
      break;
    default:
      items.sort((a, b) => Number(b.featured) - Number(a.featured) || a.displayOrder - b.displayOrder);
  }
  return items;
}

export function demoGetProduct(slug: string): Product {
  const found = demoProducts.find((p) => p.slug === slug);
  if (!found) throw new Error('Exhibition not found');
  return found;
}

export function demoGetCategory(slug: string): { category: Category; products: Product[] } {
  const category = demoCategories.find((c) => c.slug === slug);
  if (!category) throw new Error('Category not found');
  return {
    category,
    products: demoProducts.filter((p) => p.category?.slug === slug),
  };
}

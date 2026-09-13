# Everlast Fragrances

A luxury perfume e-commerce storefront built with Next.js 14 (App Router),
TypeScript, and Tailwind CSS — inspired by the layout and flow of
everlastfragrances.com, with an original visual identity (typography,
palette, and bottle illustrations) rather than copied assets.

## Stack

- **Framework:** Next.js 14 (App Router) + TypeScript
- **Styling:** Tailwind CSS
- **Icons:** lucide-react
- **State:** React Context + localStorage (cart persists across reloads)
- **Backend:** Next.js Route Handler (`/api/orders`) with an in-memory
  order store — swap for a real database before going live (see below)

## Project Structure

```
everlast-fragrances/
├── app/
│   ├── api/
│   │   └── orders/route.ts      # POST /api/orders, GET /api/orders
│   ├── globals.css
│   ├── layout.tsx                # fonts, cart provider, drawer, WhatsApp widget
│   └── page.tsx                  # assembles all homepage sections
├── components/
│   ├── AnnouncementBar.tsx       # scrolling marquee + "Shop now"
│   ├── BottleGraphic.tsx         # original SVG bottle illustration
│   ├── CartDrawer.tsx            # slide-out cart + COD checkout form
│   ├── Features.tsx              # free shipping / support / quality
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── Navbar.tsx                # hamburger, search, account, cart badge
│   ├── ProductCard.tsx
│   ├── ProductGrid.tsx           # "Most Seller" grid with category filter
│   ├── Reviews.tsx               # social proof carousel
│   ├── Spotlight.tsx             # "Top Seller" feature section
│   ├── StarRating.tsx
│   ├── StoryBanner.tsx
│   └── WhatsAppWidget.tsx        # floating WhatsApp chat button
├── context/
│   └── CartContext.tsx           # cart state, add/remove/qty, persistence
├── data/
│   └── products.ts                # seeded product catalog + reviews
├── lib/
│   └── types.ts
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.js
```

## Run locally

Requires Node.js 18.17+.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build

```bash
npm run build
npm run start
```

## Deploy to Vercel

**Option A — GitHub (recommended)**

1. Push this folder to a new GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Everlast Fragrances"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   git push -u origin main
   ```
2. Go to https://vercel.com/new, import the repository.
3. Vercel auto-detects Next.js — leave build settings as default
   (`next build`, output directory auto-managed).
4. Click **Deploy**. You'll have a live URL in ~60 seconds.

**Option B — Vercel CLI**

```bash
npm install -g vercel
vercel login
vercel        # first deploy, follow prompts
vercel --prod # promote to production
```

No environment variables are required for the app to run as-is.

## Customizing

- **Products:** edit `data/products.ts` — each product has `price`,
  `rating`, `reviewCount`, `category`, `accent` (hex used by the bottle
  illustration), and `notes` (top/heart/base).
- **WhatsApp number / email:** update `components/WhatsAppWidget.tsx`
  (`PHONE` constant) and `components/Footer.tsx`.
- **Bottle imagery:** `components/BottleGraphic.tsx` renders an
  original SVG bottle colored per-product via the `accent` field. To use
  real product photography instead, replace it with a Next.js `<Image>`
  component and add photos under `/public/products/`.
- **Orders / database:** `app/api/orders/route.ts` currently stores
  orders in an in-memory array, which resets on every deploy or cold
  start. For production, replace the array with calls to a real
  database (e.g. Vercel Postgres, Supabase, PlanetScale) or forward
  each order to an email/Slack webhook.

## Notes

- Cart state persists in the browser via `localStorage`, so it survives
  page refreshes but is per-device/browser.
- Checkout is Cash-on-Delivery only, matching the reference store; wire
  in a payment gateway (Stripe, JazzCash, Easypaisa) in
  `CartDrawer.tsx`'s `handlePlaceOrder` if you need online payments.
- The bottle illustrations are original vector art (not copies of
  product photography) so you're free to reskin colors, ship real
  photos, or commission product photography without licensing concerns.

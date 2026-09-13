import { Product, Review } from "@/lib/types";

export const products: Product[] = [
  {
    id: "1",
    slug: "office-for-men",
    name: "Office for Men",
    subtitle: "The OG, restocked",
    price: 2300,
    rating: 5.0,
    reviewCount: 120,
    category: "Top Seller / Men",
    size: "55 ML | Parfum",
    accent: "#141414",
    image: "/products/office-for-men.jpg",
    description:
      "The fragrance that started it all. A clean, classy, unmistakably masculine scent built for long days and longer meetings — sharp enough for the boardroom, warm enough to be remembered after you leave it.",
    notes: {
      top: ["Bergamot", "Black Pepper", "Cardamom"],
      heart: ["Sandalwood", "Geranium", "Violet Leaf"],
      base: ["Amberwood", "Vetiver", "Musk"],
    },
    badge: "Restocked",
    featured: true,
    topSeller: true,
  },
  {
    id: "2",
    slug: "louis-vuitton-imagination-premium",
    name: "Louis Vuitton - Imagination (Premium)",
    subtitle: "Premium impression",
    price: 3200,
    rating: 5.0,
    reviewCount: 24,
    category: "Luxury",
    size: "55 ML | Parfum",
    accent: "#e7c467",
    image: "/products/imagination.jpg",
    description:
      "A radiant, citrus-driven composition with a smooth amber trail — our premium interpretation for those who want a designer signature without the designer price tag.",
    notes: {
      top: ["Calabrian Bergamot", "Mandarin"],
      heart: ["Ambroxan", "Ginger"],
      base: ["Tonka Bean", "Musk"],
    },
  },
  {
    id: "3",
    slug: "nishane-hacivat",
    name: "Nishane Hacivat",
    subtitle: "Boozy fruit, quietly loud",
    price: 3200,
    rating: 5.0,
    reviewCount: 12,
    category: "Men / Unisex",
    size: "55 ML | Parfum",
    accent: "#caa233",
    image: "/products/hacivat.jpg",
    description:
      "A rich, boozy-fruit composition that opens sweet and settles into a warm, resinous base. Unisex, distinctive, and impossible to ignore in a room.",
    notes: {
      top: ["Rum", "Blackcurrant"],
      heart: ["Plum", "Cinnamon"],
      base: ["Oud", "Benzoin"],
    },
  },
  {
    id: "4",
    slug: "hawas-ice",
    name: "Hawas - Ice",
    subtitle: "Cold citrus, warm vanilla",
    price: 2200,
    rating: 5.0,
    reviewCount: 6,
    category: "Fresh / Summer",
    size: "55 ML | Parfum",
    accent: "#4fa7d8",
    image: "/products/hawas-ice.jpg",
    description:
      "An icy citrus opening layered over neroli and a soft vanilla-orchid base — built for humid afternoons, made to outlast them.",
    notes: {
      top: ["Lime", "Bergamot", "Orange Blossom"],
      heart: ["Neroli", "Lavender"],
      base: ["Vanilla", "Tonka", "White Musk"],
    },
    featured: true,
  },
  {
    id: "5",
    slug: "imperial-valley-gissah",
    name: "Imperial Valley - Gissah",
    subtitle: "Oriental, unapologetic",
    price: 3200,
    rating: 5.0,
    reviewCount: 7,
    category: "Oriental / Luxury",
    size: "55 ML | Parfum",
    accent: "#6b3a1f",
    image: "/products/imperial-valley.jpg",
    description:
      "Deep saffron and oud wrapped in dark rose — an oriental heavyweight for evenings that call for presence, not subtlety.",
    notes: {
      top: ["Saffron", "Cinnamon"],
      heart: ["Rose", "Oud"],
      base: ["Amber", "Leather"],
    },
  },
  {
    id: "6",
    slug: "angels-share-by-kilian",
    name: "Angels' Share by Kilian",
    subtitle: "Cognac and cinnamon",
    price: 2800,
    rating: 5.0,
    reviewCount: 7,
    category: "Gourmand / Warm",
    size: "55 ML | Parfum",
    accent: "#c98a3e",
    image: "/products/angels-share.jpg",
    description:
      "A gourmand classic — cognac, cinnamon and oak, finished with a whisper of vanilla. Smells expensive because it is meant to.",
    notes: {
      top: ["Cognac", "Cinnamon"],
      heart: ["Tonka Bean", "Oak"],
      base: ["Vanilla", "Praline"],
    },
  },
  {
    id: "7",
    slug: "creed-aventus",
    name: "Creed Aventus",
    subtitle: "The benchmark",
    price: 3200,
    rating: 4.8,
    reviewCount: 3,
    category: "Men / Classic",
    size: "55 ML | Parfum",
    accent: "#3a4a2f",
    image: "/products/creed-aventus.jpg",
    description:
      "Smoky pineapple, birch and oakmoss — the fragrance every 'confident, successful man' scent has been chasing since 2010.",
    notes: {
      top: ["Pineapple", "Bergamot", "Black Currant"],
      heart: ["Birch", "Patchouli", "Jasmine"],
      base: ["Oakmoss", "Musk", "Ambergris"],
    },
  },
  {
    id: "8",
    slug: "bvlgari-tygar",
    name: "Bvlgari Tygar",
    subtitle: "Citrus, sharpened",
    price: 3200,
    rating: 5.0,
    reviewCount: 5,
    category: "Citrus / Woody",
    size: "55 ML | Parfum",
    accent: "#dcdcdc",
    image: "/products/tygar.jpg",
    description:
      "A crisp citrus-woody blend that reads clean from the first spray to the last hour — an everyday signature with a designer edge.",
    notes: {
      top: ["Grapefruit", "Elemi"],
      heart: ["Green Tea Accord", "Cedar"],
      base: ["White Musk", "Ambroxan"],
    },
  },
  {
    id: "9",
    slug: "office-for-women",
    name: "Office for Women",
    subtitle: "Her signature",
    price: 2500,
    rating: 5.0,
    reviewCount: 15,
    category: "Women",
    size: "55 ML | Parfum",
    accent: "#c94f6d",
    image: "/products/office-for-women.jpg",
    description:
      "The women's counterpart to our bestseller — floral, warm and quietly confident. Built to move seamlessly from morning meetings to evening plans.",
    notes: {
      top: ["Pink Pepper", "Mandarin"],
      heart: ["Peony", "Jasmine Sambac"],
      base: ["Sandalwood", "Musk", "Vanilla"],
    },
    featured: true,
  },
];

export const getProductBySlug = (slug: string) =>
  products.find((p) => p.slug === slug);

export const topSellers = products.filter((p) => p.topSeller);
export const featuredProducts = products.filter((p) => p.featured);

export const reviews: Review[] = [
  {
    id: "r1",
    name: "Amjad Ali",
    rating: 5,
    title: "Thank You Zulqarnain Mangi & Thank You Everlast Fragrances",
    body:
      "Thoroughly impressed by 'Office For Men.' An absolute classic — a truly versatile fragrance that works from morning meetings straight through to dinner. Compliments every single day.",
    productName: "Office for Men",
  },
  {
    id: "r2",
    name: "Muhammad Bilal",
    rating: 5,
    title: "Perfect Office Perfume for Men",
    body:
      "Absolutely loved this perfume! It has a clean, classy, and masculine fragrance that works perfectly for the office. The scent is pleasant without being overpowering, and it lasts the whole day.",
    productName: "Office for Men",
  },
  {
    id: "r3",
    name: "Hina Raza",
    rating: 5,
    title: "My new signature scent",
    body:
      "Office for Women is soft and warm without being too sweet. Gets noticed every time I wear it. Packaging is also genuinely gorgeous — feels like a proper gift.",
    productName: "Office for Women",
  },
  {
    id: "r4",
    name: "Fahad Sheikh",
    rating: 5,
    title: "Hawas Ice is unreal for summer",
    body:
      "Ordered on a whim during the heat wave and it's now a daily staple. Cold, citrusy opening that settles into something much warmer. Lasted through a full day outdoors.",
    productName: "Hawas - Ice",
  },
  {
    id: "r5",
    name: "Ayesha Khan",
    rating: 5,
    title: "Delivery was fast, scent is faster to compliment",
    body:
      "Was skeptical about ordering a fragrance online but Everlast delivered in under a week and the Imperial Valley Gissah is exactly as described — deep, warm, long-lasting.",
    productName: "Imperial Valley - Gissah",
  },
  {
    id: "r6",
    name: "Zeeshan Tariq",
    rating: 5,
    title: "Better than the designer version",
    body:
      "Genuinely can't tell the difference between this and the original in a side-by-side. For the price, there's no competition in Pakistan right now.",
    productName: "Louis Vuitton - Imagination (Premium)",
  },
];

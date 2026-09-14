import type { Metadata } from "next";
import Script from "next/script";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import AnnouncementBar from "@/components/AnnouncementBar";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Everlast Fragrances | Leave a Lasting Impression",
  description:
    "Everlast Fragrances — luxury eau de parfum for men and women. Office for Men, Hawas Ice, Imperial Valley and more. Free shipping across Pakistan.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="font-body antialiased">
        <CartProvider>
          <AnnouncementBar />
          {children}
          <CartDrawer />
          <WhatsAppWidget />
        </CartProvider>
        <Script
          src="https://cdn.zanderio.ai/widget/loader.js"
          data-id="wdg_GUNnLhwdHeG6enxNb1f9wShT"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}

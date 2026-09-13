import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Spotlight from "@/components/Spotlight";
import ProductGrid from "@/components/ProductGrid";
import Reviews from "@/components/Reviews";
import Features from "@/components/Features";
import StoryBanner from "@/components/StoryBanner";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-parchment">
      <Navbar />
      <Hero />
      <Spotlight />
      <ProductGrid />
      <Reviews />
      <Features />
      <StoryBanner />
      <Footer />
    </main>
  );
}

import BottleGraphic from "./BottleGraphic";
import { products } from "@/data/products";

export default function StoryBanner() {
  const trio = products.slice(4, 7);

  return (
    <section
      id="story"
      className="relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#3a332a] via-[#2b251e] to-[#181410] py-20"
    >
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 px-6 text-center sm:flex-row sm:justify-center sm:gap-4">
        {trio.map((p, i) => (
          <div
            key={p.id}
            className={i === 1 ? "translate-y-0 sm:-translate-y-4" : ""}
          >
            <BottleGraphic accent={p.accent} label={p.name} size="md" />
          </div>
        ))}
      </div>
    </section>
  );
}

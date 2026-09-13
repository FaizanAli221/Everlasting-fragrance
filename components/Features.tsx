import { Truck, Headphones, ThumbsUp } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    body: "Order today, receive tomorrow",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    body: "We are here for you",
  },
  {
    icon: ThumbsUp,
    title: "Premium Quality",
    body: "Created with premium quality",
  },
];

export default function Features() {
  return (
    <section className="border-y border-ink/10 bg-parchment py-14">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 px-6 sm:grid-cols-3 lg:px-10">
        {features.map(({ icon: Icon, title, body }) => (
          <div key={title} className="flex flex-col items-center text-center">
            <Icon size={28} strokeWidth={1.25} className="text-ink" />
            <h3 className="mt-4 text-sm font-semibold tracking-wide">
              {title}
            </h3>
            <p className="mt-1 text-sm text-ink/60">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

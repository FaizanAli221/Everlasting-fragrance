"use client";

const messages = [
  "DELIVERY WITHIN 5 TO 7 DAYS",
  "OFFICE FOR MEN IS RESTOCKED NOW",
  "CASH ON DELIVERY AVAILABLE NATIONWIDE",
  "FREE SHIPPING ON ALL PREPAID ORDERS",
];

export default function AnnouncementBar() {
  const track = [...messages, ...messages];

  return (
    <div className="sticky top-0 z-40 flex items-stretch bg-ink text-parchment">
      <div className="relative flex-1 overflow-hidden">
        <div className="flex w-max animate-marquee whitespace-nowrap py-2.5">
          {track.map((msg, i) => (
            <span
              key={i}
              className="mx-6 text-[11px] font-medium tracking-widest2 text-parchment/90"
            >
              {msg}
            </span>
          ))}
        </div>
      </div>
      <a
        href="#shop"
        className="flex shrink-0 items-center bg-gold px-5 text-[11px] font-semibold tracking-widest2 text-ink hover:bg-goldLight transition-colors"
      >
        SHOP NOW
      </a>
    </div>
  );
}

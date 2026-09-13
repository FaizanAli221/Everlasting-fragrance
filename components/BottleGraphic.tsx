export default function BottleGraphic({
  accent,
  label,
  size = "md",
}: {
  accent: string;
  label: string;
  size?: "sm" | "md" | "lg";
}) {
  const dims = { sm: 120, md: 180, lg: 260 }[size];

  return (
    <svg
      viewBox="0 0 160 260"
      width={dims}
      height={(dims * 260) / 160}
      role="img"
      aria-label={label}
    >
      {/* cap */}
      <rect x="55" y="8" width="50" height="34" rx="4" fill="#111111" />
      <rect x="60" y="0" width="40" height="14" rx="3" fill="#1c1c1c" />
      {/* neck */}
      <rect x="68" y="40" width="24" height="18" fill="#d8d3c4" opacity="0.7" />
      {/* body */}
      <rect
        x="28"
        y="58"
        width="104"
        height="180"
        rx="10"
        fill={accent}
        stroke="#111111"
        strokeWidth="2"
        fillOpacity="0.92"
      />
      {/* glass highlight */}
      <rect x="36" y="66" width="10" height="160" rx="5" fill="#ffffff" opacity="0.18" />
      {/* label plate */}
      <rect x="42" y="128" width="76" height="52" rx="2" fill="#111111" />
      <line x1="50" y1="142" x2="110" y2="142" stroke="#d8c08a" strokeWidth="1" opacity="0.7" />
      <line x1="50" y1="166" x2="110" y2="166" stroke="#d8c08a" strokeWidth="1" opacity="0.7" />
    </svg>
  );
}

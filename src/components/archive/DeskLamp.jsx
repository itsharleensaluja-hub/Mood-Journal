export function DeskLamp({ className = '' }) {
  return (
    <div className={`absolute top-0 right-0 w-48 h-48 pointer-events-none overflow-hidden opacity-60 dark:opacity-40 ${className}`} aria-hidden="true">
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <ellipse cx="160" cy="180" rx="40" ry="8" fill="#5C3A24" opacity="0.3" />
        <rect x="155" y="80" width="10" height="100" rx="3" fill="#7A4E30" />
        <path d="M130 35 L190 35 L175 80 L145 80 Z" fill="#C9A84C" />
        <path d="M130 35 Q160 25 190 35" fill="#E8D48B" />
        <ellipse cx="160" cy="80" rx="20" ry="4" fill="#E8D48B" opacity="0.5" />
        <path d="M130 35 Q100 10 120 5 Q140 0 145 15 Q130 20 130 35" fill="#B8943E" />
      </svg>
    </div>
  );
}

export function DeskLampGlow({ className = '' }) {
  return (
    <div className={`pointer-events-none ${className}`} aria-hidden="true">
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-radial from-brass-400/6 to-transparent rounded-full blur-3xl" />
    </div>
  );
}

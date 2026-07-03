export function FountainPen({ className = '' }) {
  return (
    <div className={`pointer-events-none ${className}`} aria-hidden="true">
      <svg viewBox="0 0 120 16" className="w-28 h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="60" cy="13" rx="52" ry="2.5" fill="rgba(0,0,0,0.06)" />
        <rect x="52" y="3" width="58" height="10" rx="5" fill="#C9A84C" />
        <rect x="36" y="3" width="18" height="10" rx="2" fill="#4A4640" />
        <path d="M36 4.5 L36 11.5 L18 13 L24 9.5 L18 6 L24 3.5 Z" fill="#E3E0DA" />
        <line x1="36" y1="8" x2="21" y2="10" stroke="#302D29" strokeWidth="0.5" />
        <circle cx="20" cy="8.5" r="1.2" fill="#302D29" />
        <rect x="56" y="2" width="46" height="12" rx="5" fill="#B8943E" opacity="0.2" />
      </svg>
    </div>
  );
}

// Ana sayfa için özgün bulut altyapısı illüstrasyonu (Cloud2Biz renkleri).
export function HeroCloud({className}) {
  return (
    <svg className={className} viewBox="0 0 440 340" role="img" aria-hidden="true">
      <defs>
        <linearGradient id="c2b-cloud" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffb08f" />
          <stop offset="1" stopColor="#f26b3a" />
        </linearGradient>
        <linearGradient id="c2b-rack" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a3a5c" />
          <stop offset="1" stopColor="#0d1529" />
        </linearGradient>
        <linearGradient id="c2b-glow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f26b3a" stopOpacity="0.9" />
          <stop offset="1" stopColor="#f26b3a" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* arka daire */}
      <circle cx="230" cy="175" r="150" fill="#ffffff" opacity="0.45" />
      <circle cx="230" cy="175" r="118" fill="none" stroke="#1d6fb8" strokeOpacity="0.18" strokeWidth="2" strokeDasharray="4 8" />

      {/* bağlantı çizgileri */}
      <g stroke="#1d6fb8" strokeOpacity="0.55" strokeWidth="2.5" fill="none" strokeLinecap="round">
        <path d="M150 170 C150 200 110 205 110 232" />
        <path d="M230 178 L230 232" />
        <path d="M310 170 C310 200 350 205 350 232" />
      </g>
      <g fill="#f26b3a">
        <circle cx="130" cy="203" r="4"><animate attributeName="opacity" values="1;0.2;1" dur="2.4s" repeatCount="indefinite" /></circle>
        <circle cx="230" cy="205" r="4"><animate attributeName="opacity" values="0.2;1;0.2" dur="2.4s" repeatCount="indefinite" /></circle>
        <circle cx="330" cy="203" r="4"><animate attributeName="opacity" values="1;0.2;1" dur="2.4s" begin="0.8s" repeatCount="indefinite" /></circle>
      </g>

      {/* bulut */}
      <g>
        <ellipse cx="232" cy="176" rx="118" ry="10" fill="#0d1529" opacity="0.08" />
        <path
          d="M140 168 a42 42 0 0 1 16-80 a58 58 0 0 1 108-22 a46 46 0 0 1 74 34 a38 38 0 0 1 -4 68 Z"
          fill="url(#c2b-cloud)"
        />
        <path
          d="M156 88 a58 58 0 0 1 108-22 a46 46 0 0 1 30 10"
          fill="none" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="5" strokeLinecap="round"
        />
        {/* bulut üzerindeki çip */}
        <rect x="206" y="104" width="52" height="40" rx="7" fill="#ffffff" opacity="0.95" />
        <rect x="216" y="113" width="32" height="22" rx="4" fill="#f26b3a" opacity="0.85" />
        <g stroke="#ffffff" strokeWidth="3" strokeLinecap="round">
          <path d="M214 98 v6 M232 98 v6 M250 98 v6 M214 144 v6 M232 144 v6 M250 144 v6" />
          <path d="M200 114 h6 M200 124 h6 M200 134 h6 M258 114 h6 M258 124 h6 M258 134 h6" />
        </g>
      </g>

      {/* sunucu kabinleri */}
      {[
        {x: 82, h: 74},
        {x: 202, h: 88},
        {x: 322, h: 74},
      ].map(({x, h}, i) => (
        <g key={x}>
          <ellipse cx={x + 28} cy={232 + h + 6} rx="40" ry="6" fill="#0d1529" opacity="0.12" />
          <rect x={x} y="232" width="56" height={h} rx="6" fill="url(#c2b-rack)" />
          {Array.from({length: Math.floor((h - 8) / 18)}).map((_, j) => (
            <g key={j}>
              <rect x={x + 7} y={240 + j * 18} width="42" height="12" rx="2.5" fill="#1d2a47" />
              <circle cx={x + 14} cy={246 + j * 18} r="2.2" fill={j % 2 ? '#3ad29f' : '#f26b3a'}>
                <animate attributeName="opacity" values="1;0.35;1" dur={`${1.4 + ((i + j) % 3) * 0.5}s`} repeatCount="indefinite" />
              </circle>
              <rect x={x + 22} y={244.5 + j * 18} width="22" height="3" rx="1.5" fill="#53648a" />
            </g>
          ))}
        </g>
      ))}

      {/* küçük süs bulutlar */}
      <path d="M48 96 a14 14 0 0 1 22-14 a18 18 0 0 1 33 7 a12 12 0 0 1 -2 24 h-50 a11 11 0 0 1 -3 -17 z" fill="#ffffff" opacity="0.9" />
      <path d="M356 50 a10 10 0 0 1 16-10 a13 13 0 0 1 24 5 a9 9 0 0 1 -2 17 h-36 a8 8 0 0 1 -2 -12 z" fill="#ffffff" opacity="0.85" />
    </svg>
  );
}

export function HeroDocs({className}) {
  return (
    <svg className={className} viewBox="0 0 160 160" role="img" aria-hidden="true">
      <g transform="rotate(-14 80 80)">
        <rect x="30" y="34" width="84" height="104" rx="8" fill="#1d6fb8" />
        <rect x="40" y="26" width="84" height="104" rx="8" fill="#ffffff" />
        <g fill="#c9d6ea">
          <rect x="52" y="44" width="58" height="7" rx="3.5" />
          <rect x="52" y="60" width="48" height="5" rx="2.5" />
          <rect x="52" y="72" width="54" height="5" rx="2.5" />
          <rect x="52" y="84" width="40" height="5" rx="2.5" />
          <rect x="52" y="96" width="50" height="5" rx="2.5" />
        </g>
        <rect x="52" y="44" width="30" height="7" rx="3.5" fill="#f26b3a" />
      </g>
      <circle cx="132" cy="30" r="9" fill="#f26b3a" opacity="0.8" />
      <circle cx="20" cy="132" r="6" fill="#1d6fb8" opacity="0.5" />
    </svg>
  );
}

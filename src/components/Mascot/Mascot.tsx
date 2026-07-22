import React, { useEffect, useState } from 'react';
import './Mascot.css';

interface MascotProps {
  message: string;
}

export const Mascot: React.FC<MascotProps> = ({ message }) => {
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 160);
    }, 3200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="mascot">
      {message && (
        <div className="mascot__bubble" key={message}>
          {message}
        </div>
      )}
      <svg
        className="mascot__figure"
        viewBox="0 0 160 160"
        width="120"
        height="120"
        role="img"
        aria-label="Space fox mascot"
      >
        {/* helmet glass */}
        <circle cx="80" cy="72" r="52" fill="#0e1440" opacity="0.35" />
        {/* ears */}
        <polygon points="42,42 58,20 66,52" fill="#ff8a4c" />
        <polygon points="118,42 102,20 94,52" fill="#ff8a4c" />
        <polygon points="46,44 56,30 60,50" fill="#ffd3a8" />
        <polygon points="114,44 104,30 100,50" fill="#ffd3a8" />
        {/* head */}
        <circle cx="80" cy="76" r="44" fill="#ff8a4c" />
        <path d="M55 88 Q80 108 105 88 Q100 106 80 110 Q60 106 55 88 Z" fill="#fff4ea" />
        {/* eyes */}
        {blink ? (
          <>
            <line x1="62" y1="76" x2="72" y2="76" stroke="#22233a" strokeWidth="3" strokeLinecap="round" />
            <line x1="88" y1="76" x2="98" y2="76" stroke="#22233a" strokeWidth="3" strokeLinecap="round" />
          </>
        ) : (
          <>
            <circle cx="67" cy="76" r="5.5" fill="#22233a" />
            <circle cx="93" cy="76" r="5.5" fill="#22233a" />
            <circle cx="69" cy="74" r="1.6" fill="#fff" />
            <circle cx="95" cy="74" r="1.6" fill="#fff" />
          </>
        )}
        {/* nose */}
        <circle cx="80" cy="90" r="4" fill="#22233a" />
        {/* blush */}
        <ellipse cx="58" cy="88" rx="6" ry="3.5" fill="#ffb6c9" opacity="0.7" />
        <ellipse cx="102" cy="88" rx="6" ry="3.5" fill="#ffb6c9" opacity="0.7" />
        {/* helmet ring */}
        <circle cx="80" cy="76" r="52" fill="none" stroke="var(--accent-cyan)" strokeWidth="4" opacity="0.9" />
        <circle cx="80" cy="76" r="52" fill="url(#glassShine)" opacity="0.25" />
        <defs>
          <linearGradient id="glassShine" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.6" />
            <stop offset="60%" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* helmet collar */}
        <rect x="52" y="122" width="56" height="18" rx="9" fill="#dfe6ff" />
        <rect x="60" y="118" width="40" height="12" rx="6" fill="var(--accent-cyan)" />
      </svg>
    </div>
  );
};

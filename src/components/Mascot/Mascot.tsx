import React, { useEffect, useState } from 'react';
import './Mascot.css';
import type { MascotId } from '../../types';

interface MascotProps {
  message: string;
  species?: MascotId;
}

interface MascotVisual {
  bodyColor: string;
  innerColor: string;
  earShape: 'pointed' | 'round' | 'triangle' | 'none';
  noseColor: string;
  beak?: boolean;
}

const VISUALS: Record<MascotId, MascotVisual> = {
  fox: { bodyColor: '#ff8a4c', innerColor: '#ffd3a8', earShape: 'pointed', noseColor: '#22233a' },
  rabbit: { bodyColor: '#f6f0ff', innerColor: '#ffd1e6', earShape: 'pointed', noseColor: '#d97a9c' },
  bear: { bodyColor: '#a97155', innerColor: '#e2b896', earShape: 'round', noseColor: '#2b1a12' },
  cat: { bodyColor: '#c9c9d9', innerColor: '#ffd1e6', earShape: 'triangle', noseColor: '#d97a9c' },
  penguin: { bodyColor: '#2b2f42', innerColor: '#ffffff', earShape: 'none', noseColor: '#ff9a3c', beak: true },
  frog: { bodyColor: '#7ee787', innerColor: '#c8f7c5', earShape: 'none', noseColor: '#22233a' },
};

function renderEars(shape: MascotVisual['earShape'], body: string, inner: string) {
  if (shape === 'none') return null;
  if (shape === 'pointed') {
    return (
      <>
        <polygon points="42,42 58,20 66,52" fill={body} />
        <polygon points="118,42 102,20 94,52" fill={body} />
        <polygon points="46,44 56,30 60,50" fill={inner} />
        <polygon points="114,44 104,30 100,50" fill={inner} />
      </>
    );
  }
  if (shape === 'round') {
    return (
      <>
        <circle cx="46" cy="36" r="16" fill={body} />
        <circle cx="114" cy="36" r="16" fill={body} />
        <circle cx="46" cy="36" r="8" fill={inner} />
        <circle cx="114" cy="36" r="8" fill={inner} />
      </>
    );
  }
  // triangle (cat)
  return (
    <>
      <polygon points="44,46 52,16 68,44" fill={body} />
      <polygon points="116,46 108,16 92,44" fill={body} />
      <polygon points="49,42 55,26 63,42" fill={inner} />
      <polygon points="111,42 105,26 97,42" fill={inner} />
    </>
  );
}

export const Mascot: React.FC<MascotProps> = ({ message, species = 'fox' }) => {
  const [blink, setBlink] = useState(false);
  const visual = VISUALS[species] ?? VISUALS.fox;

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
        aria-label={`${species} mascot`}
      >
        <circle cx="80" cy="72" r="52" fill="#0e1440" opacity="0.35" />
        {renderEars(visual.earShape, visual.bodyColor, visual.innerColor)}
        <circle cx="80" cy="76" r="44" fill={visual.bodyColor} />
        {!visual.beak && (
          <path d="M55 88 Q80 108 105 88 Q100 106 80 110 Q60 106 55 88 Z" fill="#fff4ea" />
        )}
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
        {visual.beak ? (
          <polygon points="72,88 88,88 80,102" fill={visual.noseColor} />
        ) : (
          <circle cx="80" cy="90" r="4" fill={visual.noseColor} />
        )}
        <ellipse cx="58" cy="88" rx="6" ry="3.5" fill="#ffb6c9" opacity="0.7" />
        <ellipse cx="102" cy="88" rx="6" ry="3.5" fill="#ffb6c9" opacity="0.7" />
        <circle cx="80" cy="76" r="52" fill="none" stroke="var(--accent-cyan)" strokeWidth="4" opacity="0.9" />
        <circle cx="80" cy="76" r="52" fill="url(#glassShine)" opacity="0.25" />
        <defs>
          <linearGradient id="glassShine" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.6" />
            <stop offset="60%" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect x="52" y="122" width="56" height="18" rx="9" fill="#dfe6ff" />
        <rect x="60" y="118" width="40" height="12" rx="6" fill="var(--accent-cyan)" />
      </svg>
    </div>
  );
};

import React from 'react';
import './GachaMachine.css';
import type { CapsuleRarity } from '../../types';

const RARITY_COLORS: Record<CapsuleRarity, string> = {
  white: '#e9ecff',
  blue: '#4cd9e8',
  purple: '#a06cff',
  gold: '#ffd86b',
  rainbow: 'url(#rainbowGradient)',
};

interface GachaMachineProps {
  spinning: boolean;
  rarity: CapsuleRarity;
  skinColors?: string[];
}

const IDLE_POSITIONS = [
  { cx: 78, cy: 92, r: 9 },
  { cx: 100, cy: 82, r: 8 },
  { cx: 118, cy: 96, r: 9 },
  { cx: 90, cy: 108, r: 8 },
  { cx: 110, cy: 114, r: 7 },
];

const DEFAULT_SKIN_COLORS = ['#ff6fa8', '#4cd9e8', '#ffd86b', '#a06cff', '#7ee787'];

export const GachaMachine: React.FC<GachaMachineProps> = ({
  spinning,
  rarity,
  skinColors = DEFAULT_SKIN_COLORS,
}) => {
  const idleCapsules = IDLE_POSITIONS.map((pos, i) => ({
    ...pos,
    fill: skinColors[i % skinColors.length],
  }));
  return (
    <div className={`gacha-machine ${spinning ? 'gacha-machine--spinning' : ''}`}>
      <svg viewBox="0 0 200 260" width="240" height="312" role="img" aria-label="Gacha dispenser">
        <defs>
          <radialGradient id="domeGlass" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
            <stop offset="60%" stopColor="#bcd6ff" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#bcd6ff" stopOpacity="0.04" />
          </radialGradient>
          <linearGradient id="rainbowGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ff6fa8" />
            <stop offset="30%" stopColor="#ffd86b" />
            <stop offset="60%" stopColor="#7ee787" />
            <stop offset="100%" stopColor="#4cd9e8" />
          </linearGradient>
          <linearGradient id="bodyGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3d4a99" />
            <stop offset="100%" stopColor="#232a63" />
          </linearGradient>
        </defs>

        {/* legs */}
        <rect x="60" y="228" width="14" height="20" rx="4" fill="#232a63" />
        <rect x="126" y="228" width="14" height="20" rx="4" fill="#232a63" />

        {/* base body */}
        <rect x="40" y="150" width="120" height="80" rx="24" fill="url(#bodyGradient)" />
        <rect x="40" y="150" width="120" height="80" rx="24" fill="none" stroke="var(--accent-cyan)" strokeWidth="2" opacity="0.5" />

        {/* chute where capsule pops out */}
        <rect x="86" y="192" width="28" height="18" rx="8" fill="#0e1440" />
        <g className="gacha-machine__capsule-out">
          <circle
            cx="100"
            cy="200"
            r="10"
            fill={RARITY_COLORS[rarity]}
            stroke="#fff"
            strokeWidth="1.5"
          />
        </g>

        {/* knob / handle */}
        <g className="gacha-machine__knob" style={{ transformOrigin: '155px 195px' }}>
          <circle cx="155" cy="195" r="14" fill="#ff6fa8" stroke="#fff" strokeWidth="2" />
          <rect x="152" y="181" width="6" height="14" rx="3" fill="#fff" />
        </g>

        {/* dome */}
        <g className="gacha-machine__dome">
          <ellipse cx="100" cy="110" rx="62" ry="66" fill="#141a3d" />
          {idleCapsules.map((c, i) => (
            <circle
              key={i}
              cx={c.cx}
              cy={c.cy}
              r={c.r}
              fill={c.fill}
              className="gacha-machine__idle-capsule"
              style={{ animationDelay: `${i * 0.3}s` }}
            />
          ))}
          <ellipse cx="100" cy="110" rx="62" ry="66" fill="url(#domeGlass)" />
          <ellipse cx="100" cy="110" rx="62" ry="66" fill="none" stroke="var(--accent-cyan)" strokeWidth="3" />
        </g>

        {/* antenna lights */}
        <circle className="gacha-machine__light" cx="66" cy="46" r="6" fill="var(--star-yellow)" />
        <circle className="gacha-machine__light gacha-machine__light--delay" cx="134" cy="46" r="6" fill="var(--nebula-pink)" />
        <line x1="66" y1="52" x2="66" y2="46" stroke="var(--star-yellow)" strokeWidth="3" />
        <line x1="134" y1="52" x2="134" y2="46" stroke="var(--nebula-pink)" strokeWidth="3" />
      </svg>
    </div>
  );
};

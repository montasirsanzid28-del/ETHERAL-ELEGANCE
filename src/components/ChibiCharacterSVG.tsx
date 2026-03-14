import React from 'react';

export const ChibiCharacterSVG = ({ state, SKIN_TONES, EYE_COLORS, HAIR_COLORS, DRESS_COLORS, isActive }: any) => {
  const skinColor = SKIN_TONES.find((s: any) => s.id === state.skinTone)?.color || '#fdf6f5';
  const eyeColor = EYE_COLORS.find((s: any) => s.id === state.eyeColor)?.color || '#a855f7';
  const hairColor = HAIR_COLORS.find((s: any) => s.id === state.hairColor)?.color || '#e2e8f0';
  const dressColor = DRESS_COLORS.find((s: any) => s.id === state.dressColor)?.color || 'url(#iridescent)';

  const getBodyScale = () => {
    if (state.bodyProportion === 'slender') return 'scale(0.85, 1)';
    if (state.bodyProportion === 'curvy') return 'scale(1.2, 1)';
    if (state.bodyProportion === 'athletic') return 'scale(1.1, 1)';
    if (state.bodyProportion === 'plus-size') return 'scale(1.4, 1)';
    return 'scale(1, 1)';
  };

  const hasDress = (id: string) => Array.isArray(state.dress) ? state.dress.includes(id) : state.dress === id;

  return (
    <svg viewBox="0 0 400 900" className="w-full h-full drop-shadow-xl">
      <defs>
        <radialGradient id="chibiBlush" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff9999" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#ff9999" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Back Accessories */}
      <g className={isActive ? "animate-pulse" : ""}>
        {state.accessory === 'halo' && (
          <g className="animate-pulse-slow">
            <circle cx="200" cy="160" r="120" fill="none" stroke="#fbbf24" strokeWidth="4" opacity="0.8" />
            <circle cx="200" cy="160" r="135" fill="none" stroke="#fbbf24" strokeWidth="1" opacity="0.4" />
          </g>
        )}
      </g>

      {/* Back Hair */}
      {state.hairStyle === 'flowing' && (
        <path d="M 100 250 C 50 400, 80 600, 150 650 L 250 650 C 320 600, 350 400, 300 250 Z" fill={hairColor} />
      )}
      {state.hairStyle === 'updo' && (
        <circle cx="200" cy="120" r="60" fill={hairColor} />
      )}
      {state.hairStyle === 'braid' && (
        <path d="M 250 300 C 300 400, 280 550, 250 600 C 220 550, 260 400, 250 300 Z" fill={hairColor} />
      )}

      {/* Wings */}
      {state.wings === 'angelic' && (
        <g fill="#fff" opacity="0.8">
          <path d="M 180 450 C 100 400, 20 300, 50 200 C 100 250, 150 350, 180 450 Z" />
          <path d="M 220 450 C 300 400, 380 300, 350 200 C 300 250, 250 350, 220 450 Z" />
        </g>
      )}

      {/* Body Group */}
      <g transform={`translate(200, 550) ${getBodyScale()} translate(-200, -550)`}>
        {/* Legs */}
        <path d="M 170 600 L 160 750 C 160 770, 180 770, 180 750 L 190 600 Z" fill={skinColor} />
        <path d="M 230 600 L 240 750 C 240 770, 220 770, 220 750 L 210 600 Z" fill={skinColor} />

        {/* Torso */}
        <path d="M 160 420 C 150 500, 160 600, 200 620 C 240 600, 250 500, 240 420 Z" fill={skinColor} />

        {/* Dress */}
        {hasDress('casual-hoodie') && (
          <g>
            <path d="M 150 420 C 130 500, 140 600, 200 600 C 260 600, 270 500, 250 420 Z" fill={dressColor} />
            <path d="M 150 420 L 130 550 L 160 550 Z" fill={dressColor} />
            <path d="M 250 420 L 270 550 L 240 550 Z" fill={dressColor} />
            <line x1="200" y1="420" x2="200" y2="600" stroke="#fff" strokeWidth="4" opacity="0.5" />
          </g>
        )}
        {hasDress('layered-gown') && (
          <path d="M 150 420 C 100 550, 80 700, 200 720 C 320 700, 300 550, 250 420 Z" fill={dressColor} />
        )}
        {hasDress('celestial') && (
          <path d="M 150 420 C 120 550, 100 700, 200 750 C 300 700, 280 550, 250 420 Z" fill={dressColor} opacity="0.9" />
        )}
        {hasDress('corset') && (
          <g>
            <path d="M 160 420 C 150 480, 170 520, 200 530 C 230 520, 250 480, 240 420 Z" fill={dressColor} />
            <path d="M 150 500 C 100 600, 120 700, 200 700 C 280 700, 300 600, 250 500 Z" fill={dressColor} opacity="0.8" />
          </g>
        )}
        {hasDress('flowing') && (
          <path d="M 150 420 C 120 550, 130 700, 200 700 C 270 700, 280 550, 250 420 Z" fill={dressColor} />
        )}
        {hasDress('slip') && (
          <path d="M 160 420 C 150 550, 160 650, 200 650 C 240 650, 250 550, 240 420 Z" fill={dressColor} />
        )}
        {hasDress('business-suit') && (
          <g>
            <path d="M 160 420 L 150 550 L 250 550 L 240 420 Z" fill={dressColor} />
            <path d="M 150 550 L 160 700 L 190 700 L 200 550 Z" fill={dressColor} />
            <path d="M 250 550 L 240 700 L 210 700 L 200 550 Z" fill={dressColor} />
            <path d="M 190 420 L 200 480 L 210 420 Z" fill="#fff" />
          </g>
        )}
        {hasDress('cyberpunk') && (
          <g>
            <path d="M 150 420 L 140 520 L 260 520 L 250 420 Z" fill={dressColor} />
            <path d="M 160 520 L 150 650 L 190 650 L 200 520 Z" fill="#0f172a" />
            <path d="M 240 520 L 250 650 L 210 650 L 200 520 Z" fill="#0f172a" />
            <line x1="160" y1="450" x2="240" y2="450" stroke="#06b6d4" strokeWidth="4" />
          </g>
        )}
        {hasDress('summer-dress') && (
          <path d="M 150 420 C 120 500, 100 600, 200 620 C 300 600, 280 500, 250 420 Z" fill={dressColor} />
        )}
        {hasDress('ninja') && (
          <g>
            <path d="M 160 420 C 150 500, 160 600, 200 620 C 240 600, 250 500, 240 420 Z" fill="#111827" />
            <path d="M 150 550 L 140 700 L 190 700 L 200 550 Z" fill="#111827" />
            <path d="M 250 550 L 260 700 L 210 700 L 200 550 Z" fill="#111827" />
            <path d="M 150 500 L 250 520 L 240 550 L 160 530 Z" fill={dressColor} />
          </g>
        )}

        {/* Arms */}
        {state.pose === 'neutral' && (
          <>
            <path d="M 150 430 C 120 480, 130 550, 140 580 C 150 590, 160 580, 150 550 C 140 500, 160 450, 160 450 Z" fill={skinColor} />
            <path d="M 250 430 C 280 480, 270 550, 260 580 C 250 590, 240 580, 250 550 C 260 500, 240 450, 240 450 Z" fill={skinColor} />
          </>
        )}
        {state.pose === 'praying' && (
          <>
            <path d="M 150 430 C 120 480, 160 520, 190 500 C 200 490, 190 480, 180 490 C 160 500, 140 480, 160 450 Z" fill={skinColor} />
            <path d="M 250 430 C 280 480, 240 520, 210 500 C 200 490, 210 480, 220 490 C 240 500, 260 480, 240 450 Z" fill={skinColor} />
          </>
        )}
        {state.pose === 'reaching' && (
          <>
            <path d="M 150 430 C 120 480, 130 550, 140 580 C 150 590, 160 580, 150 550 C 140 500, 160 450, 160 450 Z" fill={skinColor} />
            <path d="M 250 430 C 280 380, 320 350, 350 330 C 360 320, 350 310, 340 320 C 310 340, 270 380, 240 450 Z" fill={skinColor} />
          </>
        )}
      </g>

      {/* Head Group */}
      <g transform="translate(0, 0)">
        {/* Face Base */}
        {(() => {
          switch(state.faceShape) {
            case 'round':
              return <circle cx="200" cy="280" r="130" fill={skinColor} />;
            case 'sharp':
              return <path d="M 70 250 C 70 150, 330 150, 330 250 C 330 350, 250 420, 200 420 C 150 420, 70 350, 70 250 Z" fill={skinColor} />;
            case 'square':
              return <rect x="80" y="150" width="240" height="240" rx="60" fill={skinColor} />;
            case 'oval':
            default:
              return <ellipse cx="200" cy="280" rx="110" ry="130" fill={skinColor} />;
          }
        })()}

        {/* Blush */}
        {state.makeup === 'blush' && (
          <>
            <circle cx="130" cy="320" r="25" fill="url(#chibiBlush)" />
            <circle cx="270" cy="320" r="25" fill="url(#chibiBlush)" />
          </>
        )}

        {/* Eyes */}
        {state.eyes === 'soft' && (
          <g>
            <ellipse cx="140" cy="290" rx="15" ry="25" fill={eyeColor} />
            <circle cx="145" cy="280" r="6" fill="#fff" />
            <ellipse cx="260" cy="290" rx="15" ry="25" fill={eyeColor} />
            <circle cx="265" cy="280" r="6" fill="#fff" />
          </g>
        )}
        {state.eyes === 'sharp' && (
          <g>
            <path d="M 110 280 Q 140 260 160 290 Q 140 300 110 280 Z" fill={eyeColor} />
            <circle cx="140" cy="285" r="4" fill="#fff" />
            <path d="M 290 280 Q 260 260 240 290 Q 260 300 290 280 Z" fill={eyeColor} />
            <circle cx="260" cy="285" r="4" fill="#fff" />
          </g>
        )}
        {state.eyes === 'mystic' && (
          <g>
            <circle cx="140" cy="290" r="20" fill={eyeColor} />
            <circle cx="140" cy="290" r="10" fill="#fff" opacity="0.5" />
            <circle cx="260" cy="290" r="20" fill={eyeColor} />
            <circle cx="260" cy="290" r="10" fill="#fff" opacity="0.5" />
          </g>
        )}
        {state.eyes === 'closed' && (
          <g stroke={eyeColor} strokeWidth="4" fill="none" strokeLinecap="round">
            <path d="M 120 290 Q 140 310 160 290" />
            <path d="M 240 290 Q 260 310 280 290" />
          </g>
        )}

        {/* Mouth */}
        {state.mouth === 'neutral' && (
          <path d="M 190 350 Q 200 355 210 350" stroke="#000" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.6" />
        )}
        {state.mouth === 'smile' && (
          <path d="M 185 345 Q 200 365 215 345" stroke="#000" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.6" />
        )}
        {state.mouth === 'pout' && (
          <path d="M 195 355 Q 200 345 205 355" stroke="#000" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.6" />
        )}
        {state.mouth === 'smirk' && (
          <path d="M 185 350 Q 200 355 215 340" stroke="#000" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.6" />
        )}

        {/* Front Hair */}
        {state.hairStyle === 'flowing' && (
          <path d="M 200 150 C 100 150, 70 250, 60 350 C 80 250, 150 200, 200 200 C 250 200, 320 250, 340 350 C 330 250, 300 150, 200 150 Z" fill={hairColor} />
        )}
        {state.hairStyle === 'updo' && (
          <path d="M 200 150 C 120 150, 90 220, 80 300 C 100 220, 150 180, 200 180 C 250 180, 300 220, 320 300 C 310 220, 280 150, 200 150 Z" fill={hairColor} />
        )}
        {state.hairStyle === 'braid' && (
          <path d="M 200 150 C 120 150, 90 220, 80 300 C 100 220, 150 180, 200 180 C 250 180, 300 220, 320 300 C 310 220, 280 150, 200 150 Z" fill={hairColor} />
        )}
        {state.hairStyle === 'short' && (
          <path d="M 200 150 C 100 150, 70 250, 60 300 C 80 200, 150 180, 200 180 C 250 180, 320 200, 340 300 C 330 250, 300 150, 200 150 Z" fill={hairColor} />
        )}

        {/* Front Accessories */}
        <g className={isActive ? "animate-pulse" : ""}>
          {state.accessory === 'star-crown' && (
            <g transform="translate(0, 100)">
              <path d="M170,90 L180,60 L190,90 Z" fill="#fbbf24" />
              <path d="M190,95 L200,50 L210,95 Z" fill="#fbbf24" />
              <path d="M210,90 L220,60 L230,90 Z" fill="#fbbf24" />
              <circle cx="180" cy="55" r="3" fill="#fff" />
              <circle cx="200" cy="45" r="4" fill="#fff" />
              <circle cx="220" cy="55" r="3" fill="#fff" />
            </g>
          )}
          {state.accessory === 'floating-orbs' && (
            <g className="animate-float" transform="translate(0, 100)">
              <circle cx="120" cy="150" r="12" fill="#a7f3d0" />
              <circle cx="280" cy="180" r="10" fill="#a7f3d0" />
              <circle cx="140" cy="250" r="8" fill="#a7f3d0" />
            </g>
          )}
        </g>
      </g>
    </svg>
  );
};

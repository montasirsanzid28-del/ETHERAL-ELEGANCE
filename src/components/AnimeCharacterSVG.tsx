import React from 'react';

export const AnimeCharacterSVG = ({ state, SKIN_TONES, EYE_COLORS, HAIR_COLORS, DRESS_COLORS, isActive }: any) => {
  const skinColor = SKIN_TONES.find((s: any) => s.id === state.skinTone)?.color || '#fdf6f5';
  const eyeColor = EYE_COLORS.find((s: any) => s.id === state.eyeColor)?.color || '#a855f7';
  const hairColor = HAIR_COLORS.find((s: any) => s.id === state.hairColor)?.color || '#e2e8f0';
  const dressColor = DRESS_COLORS.find((s: any) => s.id === state.dressColor)?.color || 'url(#iridescent)';

  const getBodyScale = () => {
    if (state.bodyProportion === 'slender') return 'scale(0.85, 1.1)';
    if (state.bodyProportion === 'curvy') return 'scale(1.1, 1)';
    if (state.bodyProportion === 'athletic') return 'scale(1.05, 1.05)';
    if (state.bodyProportion === 'plus-size') return 'scale(1.25, 1)';
    return 'scale(0.95, 1.05)';
  };

  const hasDress = (id: string) => Array.isArray(state.dress) ? state.dress.includes(id) : state.dress === id;

  return (
    <svg viewBox="0 0 400 900" className="w-full h-full drop-shadow-2xl">
      <defs>
        <linearGradient id="animeEyeGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={eyeColor} />
          <stop offset="100%" stopColor="#fff" />
        </linearGradient>
        <filter id="animeGlow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Back Accessories */}
      <g className={isActive ? "animate-pulse" : ""}>
        {state.accessory === 'halo' && (
          <g className="animate-pulse-slow">
            <circle cx="200" cy="160" r="120" fill="none" stroke="#fbbf24" strokeWidth="4" opacity="0.8" filter="url(#animeGlow)" />
            <circle cx="200" cy="160" r="135" fill="none" stroke="#fbbf24" strokeWidth="1" opacity="0.4" />
          </g>
        )}
      </g>

      {/* Back Hair (Spiky/Angular) */}
      {state.hairStyle === 'flowing' && (
        <path d="M 150 150 L 50 400 L 100 450 L 80 600 L 180 500 L 220 500 L 320 600 L 300 450 L 350 400 Z" fill={hairColor} />
      )}
      {state.hairStyle === 'updo' && (
        <path d="M 150 100 L 200 50 L 250 100 L 280 150 L 200 200 L 120 150 Z" fill={hairColor} />
      )}
      {state.hairStyle === 'braid' && (
        <path d="M 250 250 L 300 350 L 260 400 L 320 500 L 280 550 L 300 650 L 250 600 Z" fill={hairColor} />
      )}

      {/* Body Group */}
      <g transform={`translate(200, 500) ${getBodyScale()} translate(-200, -500)`}>
        {/* Legs (Long and slender) */}
        <path d="M 170 500 L 160 800 L 180 800 L 190 500 Z" fill={skinColor} />
        <path d="M 230 500 L 240 800 L 220 800 L 210 500 Z" fill={skinColor} />

        {/* Torso */}
        <path d="M 160 350 L 150 500 L 250 500 L 240 350 Z" fill={skinColor} />

        {/* Dress */}
        {hasDress('casual-hoodie') && (
          <g>
            <path d="M 140 350 L 120 550 L 280 550 L 260 350 Z" fill={dressColor} />
            <path d="M 120 550 L 140 600 L 260 600 L 280 550 Z" fill="#fff" opacity="0.2" />
            <line x1="200" y1="350" x2="200" y2="550" stroke="#fff" strokeWidth="2" />
          </g>
        )}
        {hasDress('layered-gown') && (
          <g>
            <path d="M 150 350 L 100 550 L 300 550 L 250 350 Z" fill={dressColor} />
            <path d="M 100 550 L 50 850 L 350 850 L 300 550 Z" fill={dressColor} />
            <path d="M 120 550 L 80 850 L 320 850 L 280 550 Z" fill="#fff" opacity="0.1" />
          </g>
        )}
        {hasDress('celestial') && (
          <path d="M 150 350 L 80 600 L 150 850 L 250 850 L 320 600 L 250 350 Z" fill={dressColor} opacity="0.9" />
        )}
        {hasDress('corset') && (
          <g>
            <path d="M 160 350 L 150 450 L 250 450 L 240 350 Z" fill={dressColor} />
            <path d="M 150 450 L 100 650 L 300 650 L 250 450 Z" fill={dressColor} opacity="0.8" />
          </g>
        )}
        {hasDress('flowing') && (
          <path d="M 150 350 L 120 600 L 80 800 L 320 800 L 280 600 L 250 350 Z" fill={dressColor} />
        )}
        {hasDress('slip') && (
          <path d="M 160 350 L 150 650 L 250 650 L 240 350 Z" fill={dressColor} />
        )}
        {hasDress('business-suit') && (
          <g>
            <path d="M 160 350 L 150 550 L 250 550 L 240 350 Z" fill={dressColor} />
            <path d="M 150 550 L 160 800 L 190 800 L 200 550 Z" fill={dressColor} />
            <path d="M 250 550 L 240 800 L 210 800 L 200 550 Z" fill={dressColor} />
            <path d="M 190 350 L 200 420 L 210 350 Z" fill="#fff" />
          </g>
        )}
        {hasDress('cyberpunk') && (
          <g>
            <path d="M 150 350 L 140 500 L 260 500 L 250 350 Z" fill={dressColor} />
            <path d="M 160 500 L 150 750 L 190 750 L 200 500 Z" fill="#0f172a" />
            <path d="M 240 500 L 250 750 L 210 750 L 200 500 Z" fill="#0f172a" />
            <path d="M 140 400 L 260 400" stroke="#06b6d4" strokeWidth="3" filter="url(#animeGlow)" />
          </g>
        )}
        {hasDress('summer-dress') && (
          <path d="M 150 350 L 120 500 L 80 650 L 320 650 L 280 500 L 250 350 Z" fill={dressColor} />
        )}
        {hasDress('ninja') && (
          <g>
            <path d="M 160 350 L 150 500 L 250 500 L 240 350 Z" fill="#111827" />
            <path d="M 150 500 L 140 800 L 190 800 L 200 500 Z" fill="#111827" />
            <path d="M 250 500 L 260 800 L 210 800 L 200 500 Z" fill="#111827" />
            <path d="M 150 450 L 250 470 L 240 500 L 160 480 Z" fill={dressColor} />
          </g>
        )}

        {/* Arms */}
        {state.pose === 'neutral' && (
          <>
            <path d="M 150 360 L 120 450 L 130 550 L 150 550 L 140 450 Z" fill={skinColor} />
            <path d="M 250 360 L 280 450 L 270 550 L 250 550 L 260 450 Z" fill={skinColor} />
          </>
        )}
        {state.pose === 'praying' && (
          <>
            <path d="M 150 360 L 120 420 L 190 450 L 200 440 L 140 410 Z" fill={skinColor} />
            <path d="M 250 360 L 280 420 L 210 450 L 200 440 L 260 410 Z" fill={skinColor} />
          </>
        )}
        {state.pose === 'reaching' && (
          <>
            <path d="M 150 360 L 120 450 L 130 550 L 150 550 L 140 450 Z" fill={skinColor} />
            <path d="M 250 360 L 300 300 L 350 250 L 340 240 L 290 290 Z" fill={skinColor} />
          </>
        )}
      </g>

      {/* Head Group */}
      <g transform="translate(0, -20)">
        {/* Face Base (Pointy chin) */}
        {(() => {
          switch(state.faceShape) {
            case 'round':
              return <path d="M 140 150 C 140 100, 260 100, 260 150 C 260 220, 240 260, 200 260 C 160 260, 140 220, 140 150 Z" fill={skinColor} />;
            case 'sharp':
              return <path d="M 140 150 C 140 100, 260 100, 260 150 C 260 220, 220 280, 200 290 C 180 280, 140 220, 140 150 Z" fill={skinColor} />;
            case 'square':
              return <path d="M 140 150 C 140 100, 260 100, 260 150 C 260 220, 250 250, 200 250 C 150 250, 140 220, 140 150 Z" fill={skinColor} />;
            case 'oval':
            default:
              return <path d="M 140 150 C 140 100, 260 100, 260 150 C 260 220, 230 270, 200 280 C 170 270, 140 220, 140 150 Z" fill={skinColor} />;
          }
        })()}

        {/* Blush */}
        {state.makeup === 'blush' && (
          <>
            <ellipse cx="155" cy="220" rx="15" ry="8" fill="#ff9999" opacity="0.6" transform="rotate(-10 155 220)" />
            <ellipse cx="245" cy="220" rx="15" ry="8" fill="#ff9999" opacity="0.6" transform="rotate(10 245 220)" />
          </>
        )}

        {/* Anime Eyes (Large, expressive) */}
        {state.eyes === 'soft' && (
          <g>
            {/* Left Eye */}
            <path d="M 140 190 Q 160 170 180 190" stroke="#000" strokeWidth="4" fill="none" strokeLinecap="round" />
            <ellipse cx="160" cy="205" rx="12" ry="18" fill="url(#animeEyeGradient)" />
            <circle cx="155" cy="195" r="5" fill="#fff" />
            <circle cx="165" cy="215" r="3" fill="#fff" opacity="0.8" />
            {/* Right Eye */}
            <path d="M 220 190 Q 240 170 260 190" stroke="#000" strokeWidth="4" fill="none" strokeLinecap="round" />
            <ellipse cx="240" cy="205" rx="12" ry="18" fill="url(#animeEyeGradient)" />
            <circle cx="235" cy="195" r="5" fill="#fff" />
            <circle cx="245" cy="215" r="3" fill="#fff" opacity="0.8" />
          </g>
        )}
        {state.eyes === 'sharp' && (
          <g>
            <path d="M 140 195 L 160 180 L 180 195" stroke="#000" strokeWidth="4" fill="none" strokeLinejoin="round" />
            <ellipse cx="160" cy="200" rx="10" ry="12" fill="url(#animeEyeGradient)" />
            <circle cx="158" cy="195" r="3" fill="#fff" />
            <path d="M 220 195 L 240 180 L 260 195" stroke="#000" strokeWidth="4" fill="none" strokeLinejoin="round" />
            <ellipse cx="240" cy="200" rx="10" ry="12" fill="url(#animeEyeGradient)" />
            <circle cx="238" cy="195" r="3" fill="#fff" />
          </g>
        )}
        {state.eyes === 'mystic' && (
          <g>
            <path d="M 140 190 Q 160 170 180 190" stroke="#000" strokeWidth="3" fill="none" strokeLinecap="round" />
            <circle cx="160" cy="205" r="14" fill="url(#animeEyeGradient)" />
            <path d="M 155 195 L 165 215 M 165 195 L 155 215" stroke="#fff" strokeWidth="2" opacity="0.8" />
            <path d="M 220 190 Q 240 170 260 190" stroke="#000" strokeWidth="3" fill="none" strokeLinecap="round" />
            <circle cx="240" cy="205" r="14" fill="url(#animeEyeGradient)" />
            <path d="M 235 195 L 245 215 M 245 195 L 235 215" stroke="#fff" strokeWidth="2" opacity="0.8" />
          </g>
        )}
        {state.eyes === 'closed' && (
          <g stroke="#000" strokeWidth="3" fill="none" strokeLinecap="round">
            <path d="M 140 205 Q 160 215 180 205" />
            <path d="M 220 205 Q 240 215 260 205" />
          </g>
        )}

        {/* Mouth (Tiny) */}
        {state.mouth === 'neutral' && (
          <path d="M 195 245 L 205 245" stroke="#000" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" />
        )}
        {state.mouth === 'smile' && (
          <path d="M 190 240 Q 200 255 210 240" stroke="#000" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" />
        )}
        {state.mouth === 'pout' && (
          <path d="M 195 245 L 200 240 L 205 245" stroke="#000" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" />
        )}
        {state.mouth === 'smirk' && (
          <path d="M 190 245 Q 200 250 210 240" stroke="#000" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" />
        )}

        {/* Front Hair (Spiky/Angular bangs) */}
        {state.hairStyle === 'flowing' && (
          <path d="M 200 100 L 140 160 L 160 140 L 120 200 L 150 150 L 180 180 L 200 140 L 220 180 L 250 150 L 280 200 L 240 140 L 260 160 Z" fill={hairColor} />
        )}
        {state.hairStyle === 'updo' && (
          <path d="M 200 100 L 150 150 L 170 140 L 130 190 L 160 150 L 200 160 L 240 150 L 270 190 L 230 140 L 250 150 Z" fill={hairColor} />
        )}
        {state.hairStyle === 'braid' && (
          <path d="M 200 100 L 140 160 L 160 140 L 120 200 L 150 150 L 180 180 L 200 140 L 220 180 L 250 150 L 280 200 L 240 140 L 260 160 Z" fill={hairColor} />
        )}
        {state.hairStyle === 'short' && (
          <path d="M 200 100 L 130 170 L 150 150 L 110 220 L 140 160 L 180 190 L 200 150 L 220 190 L 260 160 L 290 220 L 250 150 L 270 170 Z" fill={hairColor} />
        )}

        {/* Front Accessories */}
        <g className={isActive ? "animate-pulse" : ""}>
          {state.accessory === 'star-crown' && (
            <g transform="translate(0, 50)">
              <path d="M170,90 L180,60 L190,90 Z" fill="#fbbf24" />
              <path d="M190,95 L200,50 L210,95 Z" fill="#fbbf24" />
              <path d="M210,90 L220,60 L230,90 Z" fill="#fbbf24" />
              <circle cx="180" cy="55" r="3" fill="#fff" filter="url(#animeGlow)" />
              <circle cx="200" cy="45" r="4" fill="#fff" filter="url(#animeGlow)" />
              <circle cx="220" cy="55" r="3" fill="#fff" filter="url(#animeGlow)" />
            </g>
          )}
          {state.accessory === 'floating-orbs' && (
            <g className="animate-float" transform="translate(0, 50)">
              <circle cx="120" cy="150" r="8" fill="#a7f3d0" filter="url(#animeGlow)" />
              <circle cx="280" cy="180" r="6" fill="#a7f3d0" filter="url(#animeGlow)" />
              <circle cx="140" cy="250" r="4" fill="#a7f3d0" filter="url(#animeGlow)" />
            </g>
          )}
        </g>
      </g>
    </svg>
  );
};

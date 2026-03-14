import React from 'react';

export const PixelCharacterSVG = ({ state, SKIN_TONES, EYE_COLORS, HAIR_COLORS, DRESS_COLORS, isActive }: any) => {
  const skinColor = SKIN_TONES.find((s: any) => s.id === state.skinTone)?.color || '#fdf6f5';
  const eyeColor = EYE_COLORS.find((s: any) => s.id === state.eyeColor)?.color || '#a855f7';
  const hairColor = HAIR_COLORS.find((s: any) => s.id === state.hairColor)?.color || '#e2e8f0';
  const dressColor = DRESS_COLORS.find((s: any) => s.id === state.dressColor)?.color || 'url(#iridescent)';

  const getBodyScale = () => {
    if (state.bodyProportion === 'slender') return 'scale(0.8, 1)';
    if (state.bodyProportion === 'curvy') return 'scale(1.2, 1)';
    if (state.bodyProportion === 'athletic') return 'scale(1.1, 1)';
    if (state.bodyProportion === 'plus-size') return 'scale(1.4, 1)';
    return 'scale(1, 1)';
  };

  const hasDress = (id: string) => Array.isArray(state.dress) ? state.dress.includes(id) : state.dress === id;

  // Pixel art style uses sharp rectangles
  return (
    <svg viewBox="0 0 400 900" className="w-full h-full drop-shadow-2xl" style={{ shapeRendering: 'crispEdges' }}>
      {/* Back Accessories */}
      <g className={isActive ? "animate-pulse" : ""}>
        {state.accessory === 'halo' && (
          <g className="animate-pulse-slow">
            <rect x="80" y="40" width="240" height="240" fill="none" stroke="#fbbf24" strokeWidth="4" opacity="0.8" />
            <rect x="65" y="25" width="270" height="270" fill="none" stroke="#fbbf24" strokeWidth="1" opacity="0.4" />
          </g>
        )}
      </g>

      {/* Back Hair */}
      {state.hairStyle === 'flowing' && (
        <rect x="100" y="150" width="200" height="400" fill={hairColor} />
      )}
      {state.hairStyle === 'updo' && (
        <rect x="150" y="50" width="100" height="100" fill={hairColor} />
      )}
      {state.hairStyle === 'braid' && (
        <rect x="250" y="250" width="40" height="300" fill={hairColor} />
      )}

      {/* Body Group */}
      <g transform={`translate(200, 500) ${getBodyScale()} translate(-200, -500)`}>
        {/* Legs */}
        <rect x="160" y="500" width="30" height="300" fill={skinColor} />
        <rect x="210" y="500" width="30" height="300" fill={skinColor} />

        {/* Torso */}
        <rect x="150" y="350" width="100" height="150" fill={skinColor} />

        {/* Dress */}
        {hasDress('casual-hoodie') && (
          <g>
            <rect x="140" y="350" width="120" height="200" fill={dressColor} />
            <rect x="190" y="350" width="20" height="200" fill="#fff" opacity="0.2" />
          </g>
        )}
        {hasDress('layered-gown') && (
          <g>
            <rect x="140" y="350" width="120" height="200" fill={dressColor} />
            <rect x="100" y="550" width="200" height="300" fill={dressColor} />
            <rect x="120" y="550" width="160" height="300" fill="#fff" opacity="0.1" />
          </g>
        )}
        {hasDress('celestial') && (
          <rect x="120" y="350" width="160" height="500" fill={dressColor} opacity="0.9" />
        )}
        {hasDress('corset') && (
          <g>
            <rect x="150" y="350" width="100" height="100" fill={dressColor} />
            <rect x="120" y="450" width="160" height="200" fill={dressColor} opacity="0.8" />
          </g>
        )}
        {hasDress('flowing') && (
          <rect x="130" y="350" width="140" height="450" fill={dressColor} />
        )}
        {hasDress('slip') && (
          <rect x="150" y="350" width="100" height="300" fill={dressColor} />
        )}
        {hasDress('business-suit') && (
          <g>
            <rect x="150" y="350" width="100" height="200" fill={dressColor} />
            <rect x="150" y="550" width="40" height="250" fill={dressColor} />
            <rect x="210" y="550" width="40" height="250" fill={dressColor} />
            <rect x="190" y="350" width="20" height="50" fill="#fff" />
          </g>
        )}
        {hasDress('cyberpunk') && (
          <g>
            <rect x="140" y="350" width="120" height="150" fill={dressColor} />
            <rect x="150" y="500" width="40" height="250" fill="#0f172a" />
            <rect x="210" y="500" width="40" height="250" fill="#0f172a" />
            <rect x="140" y="400" width="120" height="10" fill="#06b6d4" />
          </g>
        )}
        {hasDress('summer-dress') && (
          <rect x="130" y="350" width="140" height="300" fill={dressColor} />
        )}
        {hasDress('ninja') && (
          <g>
            <rect x="150" y="350" width="100" height="150" fill="#111827" />
            <rect x="150" y="500" width="40" height="300" fill="#111827" />
            <rect x="210" y="500" width="40" height="300" fill="#111827" />
            <rect x="150" y="450" width="100" height="30" fill={dressColor} />
          </g>
        )}

        {/* Arms */}
        {state.pose === 'neutral' && (
          <>
            <rect x="120" y="360" width="30" height="180" fill={skinColor} />
            <rect x="250" y="360" width="30" height="180" fill={skinColor} />
          </>
        )}
        {state.pose === 'praying' && (
          <>
            <rect x="120" y="360" width="30" height="100" fill={skinColor} />
            <rect x="150" y="430" width="50" height="30" fill={skinColor} />
            <rect x="250" y="360" width="30" height="100" fill={skinColor} />
            <rect x="200" y="430" width="50" height="30" fill={skinColor} />
          </>
        )}
        {state.pose === 'reaching' && (
          <>
            <rect x="120" y="360" width="30" height="180" fill={skinColor} />
            <rect x="250" y="360" width="30" height="100" fill={skinColor} />
            <rect x="280" y="260" width="30" height="100" fill={skinColor} />
          </>
        )}
      </g>

      {/* Head Group */}
      <g transform="translate(0, -20)">
        {/* Face Base */}
        {(() => {
          switch(state.faceShape) {
            case 'round':
              return <rect x="140" y="150" width="120" height="120" rx="40" fill={skinColor} />;
            case 'sharp':
              return <polygon points="140,150 260,150 260,240 200,280 140,240" fill={skinColor} />;
            case 'square':
              return <rect x="140" y="150" width="120" height="120" fill={skinColor} />;
            case 'oval':
            default:
              return <rect x="140" y="150" width="120" height="140" rx="20" fill={skinColor} />;
          }
        })()}

        {/* Blush */}
        {state.makeup === 'blush' && (
          <>
            <rect x="150" y="220" width="20" height="10" fill="#ff9999" opacity="0.6" />
            <rect x="230" y="220" width="20" height="10" fill="#ff9999" opacity="0.6" />
          </>
        )}

        {/* Pixel Eyes */}
        {state.eyes === 'soft' && (
          <g>
            <rect x="160" y="190" width="20" height="30" fill={eyeColor} />
            <rect x="165" y="195" width="10" height="10" fill="#fff" />
            <rect x="220" y="190" width="20" height="30" fill={eyeColor} />
            <rect x="225" y="195" width="10" height="10" fill="#fff" />
          </g>
        )}
        {state.eyes === 'sharp' && (
          <g>
            <rect x="150" y="190" width="30" height="10" fill="#000" />
            <rect x="160" y="200" width="20" height="20" fill={eyeColor} />
            <rect x="165" y="205" width="10" height="10" fill="#fff" />
            <rect x="220" y="190" width="30" height="10" fill="#000" />
            <rect x="220" y="200" width="20" height="20" fill={eyeColor} />
            <rect x="225" y="205" width="10" height="10" fill="#fff" />
          </g>
        )}
        {state.eyes === 'mystic' && (
          <g>
            <rect x="150" y="190" width="30" height="30" fill={eyeColor} />
            <rect x="160" y="200" width="10" height="10" fill="#fff" opacity="0.8" />
            <rect x="220" y="190" width="30" height="30" fill={eyeColor} />
            <rect x="230" y="200" width="10" height="10" fill="#fff" opacity="0.8" />
          </g>
        )}
        {state.eyes === 'closed' && (
          <g fill="#000">
            <rect x="150" y="200" width="30" height="10" />
            <rect x="220" y="200" width="30" height="10" />
          </g>
        )}

        {/* Mouth */}
        {state.mouth === 'neutral' && (
          <rect x="190" y="240" width="20" height="10" fill="#000" opacity="0.6" />
        )}
        {state.mouth === 'smile' && (
          <g fill="#000" opacity="0.6">
            <rect x="190" y="240" width="20" height="10" />
            <rect x="180" y="230" width="10" height="10" />
            <rect x="210" y="230" width="10" height="10" />
          </g>
        )}
        {state.mouth === 'pout' && (
          <rect x="195" y="240" width="10" height="10" fill="#000" opacity="0.6" />
        )}
        {state.mouth === 'smirk' && (
          <g fill="#000" opacity="0.6">
            <rect x="190" y="240" width="20" height="10" />
            <rect x="210" y="230" width="10" height="10" />
          </g>
        )}

        {/* Front Hair */}
        {state.hairStyle === 'flowing' && (
          <g fill={hairColor}>
            <rect x="130" y="140" width="140" height="40" />
            <rect x="120" y="180" width="30" height="60" />
            <rect x="250" y="180" width="30" height="60" />
          </g>
        )}
        {state.hairStyle === 'updo' && (
          <g fill={hairColor}>
            <rect x="140" y="140" width="120" height="40" />
            <rect x="130" y="180" width="20" height="40" />
            <rect x="250" y="180" width="20" height="40" />
          </g>
        )}
        {state.hairStyle === 'braid' && (
          <g fill={hairColor}>
            <rect x="130" y="140" width="140" height="40" />
            <rect x="120" y="180" width="30" height="60" />
            <rect x="250" y="180" width="30" height="60" />
          </g>
        )}
        {state.hairStyle === 'short' && (
          <g fill={hairColor}>
            <rect x="130" y="140" width="140" height="40" />
            <rect x="120" y="180" width="40" height="40" />
            <rect x="240" y="180" width="40" height="40" />
          </g>
        )}

        {/* Front Accessories */}
        <g className={isActive ? "animate-pulse" : ""}>
          {state.accessory === 'star-crown' && (
            <g transform="translate(0, 50)">
              <rect x="170" y="60" width="10" height="30" fill="#fbbf24" />
              <rect x="190" y="50" width="20" height="40" fill="#fbbf24" />
              <rect x="220" y="60" width="10" height="30" fill="#fbbf24" />
              <rect x="170" y="50" width="10" height="10" fill="#fff" />
              <rect x="195" y="40" width="10" height="10" fill="#fff" />
              <rect x="220" y="50" width="10" height="10" fill="#fff" />
            </g>
          )}
          {state.accessory === 'floating-orbs' && (
            <g className="animate-float" transform="translate(0, 50)">
              <rect x="110" y="140" width="20" height="20" fill="#a7f3d0" />
              <rect x="270" y="170" width="15" height="15" fill="#a7f3d0" />
              <rect x="135" y="245" width="10" height="10" fill="#a7f3d0" />
            </g>
          )}
        </g>
      </g>
    </svg>
  );
};

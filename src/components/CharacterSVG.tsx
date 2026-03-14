import React from 'react';

export const CharacterSVG = ({ state, SKIN_TONES, EYE_COLORS, HAIR_COLORS, DRESS_COLORS, isActive }: any) => {
  const skinColor = SKIN_TONES.find((s: any) => s.id === state.skinTone)?.color || '#fdf6f5';
  const eyeColor = EYE_COLORS.find((s: any) => s.id === state.eyeColor)?.color || '#a855f7';
  const hairColor = HAIR_COLORS.find((s: any) => s.id === state.hairColor)?.color || '#e2e8f0';
  const dressColor = DRESS_COLORS.find((s: any) => s.id === state.dressColor)?.color || 'url(#iridescent)';

  const getBodyScale = () => {
    if (state.bodyProportion === 'slender') return 'scale(0.9, 1)';
    if (state.bodyProportion === 'curvy') return 'scale(1.15, 1)';
    if (state.bodyProportion === 'athletic') return 'scale(1.05, 1)';
    if (state.bodyProportion === 'plus-size') return 'scale(1.3, 1)';
    return 'scale(1, 1)';
  };

  const hasDress = (id: string) => Array.isArray(state.dress) ? state.dress.includes(id) : state.dress === id;

  return (
    <svg viewBox="0 0 400 900" className="w-full h-full drop-shadow-2xl">
      <defs>
        <linearGradient id="neckShadow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#000" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="iridescent" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e8d4ff" />
          <stop offset="50%" stopColor="#d4e4ff" />
          <stop offset="100%" stopColor="#fbcfe8" />
        </linearGradient>
        <linearGradient id="goldGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="50%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#a16207" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <filter id="softBlur">
          <feGaussianBlur stdDeviation="2" />
        </filter>
        <filter id="strongBlur">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>

      {/* Wings (Backmost Layer) */}
      <g id="wings">
        {state.wings === 'angelic' && (
          <g fill="#ffffff" opacity="0.95" stroke="#e2e8f0" strokeWidth="2" filter="url(#glow)">
            {/* Left Wing */}
            <path d="M200,220 C100,120 -20,50 -40,150 C-20,350 40,550 140,650 Z" />
            <path d="M180,240 C80,180 0,150 -10,250 C10,400 60,600 130,700 Z" />
            <path d="M160,260 C60,220 20,220 10,320 C30,450 80,650 120,750 Z" />
            {/* Right Wing */}
            <path d="M200,220 C300,120 420,50 440,150 C420,350 360,550 260,650 Z" />
            <path d="M220,240 C320,180 400,150 410,250 C390,400 340,600 270,700 Z" />
            <path d="M240,260 C340,220 380,220 390,320 C370,450 320,650 280,750 Z" />
          </g>
        )}
        {state.wings === 'faerie' && (
          <g fill="url(#iridescent)" opacity="0.8" stroke="#fff" strokeWidth="1.5" filter="url(#glow)">
            {/* Left Wing */}
            <path d="M200,250 C100,50 -50,100 0,350 C30,500 100,550 180,450 Z" />
            <path d="M180,300 C80,350 0,600 50,700 C100,800 150,650 190,500 Z" />
            {/* Right Wing */}
            <path d="M200,250 C300,50 450,100 400,350 C370,500 300,550 220,450 Z" />
            <path d="M220,300 C320,350 400,600 350,700 C300,800 250,650 210,500 Z" />
          </g>
        )}
        {state.wings === 'crystal' && (
          <g fill="url(#iridescent)" opacity="0.9" stroke="#fff" strokeWidth="2" filter="url(#glow)">
            {/* Left Wing */}
            <polygon points="200,250 100,50 60,120 120,200 0,350 140,450" />
            <polygon points="180,280 80,450 40,600 120,550 60,750 160,600" />
            {/* Right Wing */}
            <polygon points="200,250 300,50 340,120 280,200 400,350 260,450" />
            <polygon points="220,280 320,450 360,600 280,550 340,750 240,600" />
          </g>
        )}
      </g>

      {/* Back Cloak */}
      <g id="cloak-back">
        {state.cloak === 'starlight' && (
          <path d="M150,250 C100,300 80,600 90,850 L310,850 C320,600 300,300 250,250 Z" fill="#1e1b4b" opacity="0.9" />
        )}
        {state.cloak === 'velvet' && (
          <path d="M140,250 C80,300 60,600 70,850 L330,850 C340,600 320,300 260,250 Z" fill="#881337" opacity="0.9" />
        )}
      </g>

      {/* Back Accessories */}
      <g className={isActive ? "animate-pulse" : ""}>
        {state.accessory === 'halo' && (
          <g className="animate-pulse-slow">
            <circle cx="200" cy="160" r="120" fill="none" stroke="url(#goldGradient)" strokeWidth="4" opacity="0.8" filter="url(#glow)" />
            <circle cx="200" cy="160" r="135" fill="none" stroke="url(#goldGradient)" strokeWidth="1" opacity="0.4" />
          </g>
        )}
      </g>

      {/* Back Hair */}
      <g className="animate-hair-flow">
        {state.hairStyle === 'flowing' && (
          <path d="M 200 50 C 100 50, 80 150, 80 250 C 80 350, 90 450, 70 600 L 140 600 C 150 400, 140 300, 140 250 C 140 150, 160 100, 200 100 C 240 100, 260 150, 260 250 C 260 300, 250 400, 260 600 L 330 600 C 310 450, 320 350, 320 250 C 320 150, 300 50, 200 50 Z" fill={hairColor} />
        )}
        {state.hairStyle === 'braided' && (
          <path d="M150,100 C100,150 120,250 140,300 C160,350 120,450 130,600 L270,600 C280,450 240,350 260,300 C280,250 300,150 250,100 Z" fill={hairColor} />
        )}
        {state.hairStyle === 'updo' && (
          <circle cx="200" cy="60" r="60" fill={hairColor} />
        )}
        {state.hairStyle === 'short' && (
          <path d="M130,100 C100,150 110,250 130,280 L270,280 C290,250 300,150 270,100 Z" fill={hairColor} />
        )}
      </g>

      {/* Scaled Body Group (Torso, Legs, Dress, Arms) */}
      <g style={{ transform: getBodyScale(), transformOrigin: '200px 450px' }} className="animate-breathe">
        
        {/* Legs & Feet */}
        <g id="legs" fill={skinColor}>
          {/* Left Leg */}
          <path d="M 140 480 C 120 600, 130 750, 135 850 C 130 870, 120 880, 120 890 L 160 890 C 160 880, 155 870, 165 850 C 170 750, 170 600, 190 480 Z" />
          {/* Right Leg */}
          <path d="M 260 480 C 280 600, 270 750, 265 850 C 270 870, 280 880, 280 890 L 240 890 C 240 880, 245 870, 235 850 C 230 750, 230 600, 210 480 Z" />
        </g>

        {/* Realistic Torso and Shoulders */}
        <path d="M 180 240 L 180 280 C 160 290, 115 300, 85 330 C 65 350, 55 380, 55 500 L 345 500 C 345 380, 335 350, 315 330 C 285 300, 240 290, 220 280 L 220 240 Z" fill={skinColor} />
        
        {/* Collarbones */}
        <path d="M 180 280 C 160 290, 140 295, 120 290" stroke="#000" strokeWidth="1" strokeOpacity="0.15" fill="none" />
        <path d="M 220 280 C 240 290, 260 295, 280 290" stroke="#000" strokeWidth="1" strokeOpacity="0.15" fill="none" />
        
        {/* Neck Shadow */}
        <path d="M 180 240 L 220 240 L 220 280 C 200 290, 180 280, 180 280 Z" fill="url(#neckShadow)" />
        
        {/* Dress */}
        {hasDress('casual-hoodie') && (
          <g>
            {/* Inner white shirt */}
            <path d="M150,280 L250,280 L270,500 L130,500 Z" fill="#f8fafc" />
            <path d="M130,500 L270,500 L280,850 L120,850 Z" fill="#f8fafc" />
            {/* Zipper line */}
            <line x1="200" y1="280" x2="200" y2="850" stroke="#cbd5e1" strokeWidth="3" />
            <rect x="198" y="320" width="4" height="15" fill="#94a3b8" rx="2" />
            
            {/* Outer Hoodie Jacket */}
            {/* Left side */}
            <path d="M130,280 C110,320 100,400 110,500 L160,500 C150,400 160,320 180,280 Z" fill={dressColor} />
            <path d="M110,500 L160,500 L170,850 L80,850 Z" fill={dressColor} />
            {/* Right side */}
            <path d="M270,280 C290,320 300,400 290,500 L240,500 C250,400 240,320 220,280 Z" fill={dressColor} />
            <path d="M290,500 L240,500 L230,850 L320,850 Z" fill={dressColor} />
            
            {/* Hood around neck */}
            <path d="M130,280 C130,230 160,220 200,220 C240,220 270,230 270,280 C240,310 220,330 200,330 C180,330 160,310 130,280 Z" fill={dressColor} opacity="0.95" />
            <path d="M130,280 C160,310 180,330 200,330 C220,330 240,310 270,280 C250,320 220,340 200,340 C180,340 150,320 130,280 Z" fill="#fff" opacity="0.3" />
            
            {/* Jacket folds/details */}
            <path d="M130,280 C120,350 130,450 140,500 M270,280 C280,350 270,450 260,500" stroke="#000" strokeWidth="2" opacity="0.15" fill="none" />
            <path d="M160,500 L170,850 M240,500 L230,850" stroke="#000" strokeWidth="2" opacity="0.1" fill="none" />
          </g>
        )}
        {hasDress('celestial') && (
          <g>
            <path d="M130,330 C160,320 175,300 175,270 L225,270 C225,300 240,320 270,330 C280,350 290,400 290,500 L110,500 C110,400 120,350 130,330 Z" fill={dressColor} />
            <path d="M110,500 L290,500 C300,600 320,800 340,880 L60,880 C80,800 100,600 110,500 Z" fill={dressColor} />
            <path d="M150,325 C175,360 225,360 250,325 C240,380 160,380 150,325 Z" fill="#fff" opacity="0.2" />
            <path d="M175,270 C185,320 215,320 225,270" fill="none" stroke="#fff" strokeWidth="2" opacity="0.3" />
          </g>
        )}
        {hasDress('corset') && (
          <g>
            <path d="M140,325 L175,350 L200,380 L225,350 L260,325 L280,500 L120,500 Z" fill={dressColor} />
            <path d="M120,500 L280,500 L300,850 L100,850 Z" fill={dressColor} />
            <path d="M175,350 L200,500 M225,350 L200,500 M140,325 L170,500 M260,325 L230,500" stroke="#fff" strokeWidth="2" opacity="0.4" />
            <path d="M140,325 L175,350 L200,380 L225,350 L260,325" fill="none" stroke="#fff" strokeWidth="3" opacity="0.6" />
          </g>
        )}
        {hasDress('flowing') && (
          <g>
            <path d="M130,330 L175,270 L200,350 L225,270 L270,330 L290,500 L110,500 Z" fill={dressColor} />
            <path d="M110,500 L290,500 L330,880 L70,880 Z" fill={dressColor} />
            <path d="M200,350 L180,500 M200,350 L220,500 M175,270 L150,500 M225,270 L250,500" stroke="#fff" strokeWidth="1" opacity="0.3" />
          </g>
        )}
        {hasDress('slip') && (
          <g>
            <path d="M150,325 C175,350 225,350 250,325 L270,500 L130,500 Z" fill={dressColor} />
            <path d="M130,500 L270,500 L290,850 L110,850 Z" fill={dressColor} />
            <path d="M150,325 L160,270 M250,325 L240,270" stroke={dressColor} strokeWidth="3" />
            <path d="M150,325 C175,350 225,350 250,325" fill="none" stroke="#fff" strokeWidth="2" opacity="0.4" />
          </g>
        )}
        {hasDress('layered-gown') && (
          <g>
            <path d="M120,330 L175,270 L225,270 L280,330 L310,500 L90,500 Z" fill={dressColor} />
            <path d="M90,500 L310,500 L360,880 L40,880 Z" fill={dressColor} />
            <path d="M130,350 L175,290 L225,290 L270,350 L290,500 L110,500 Z" fill="#fff" opacity="0.2" />
            <path d="M140,370 L175,310 L225,310 L260,370 L270,500 L130,500 Z" fill="#fff" opacity="0.4" />
          </g>
        )}
        {hasDress('business-suit') && (
          <g>
            {/* White Shirt */}
            <path d="M160,280 L240,280 L250,500 L150,500 Z" fill="#ffffff" />
            {/* Tie */}
            <path d="M195,280 L205,280 L205,380 L200,400 L195,380 Z" fill="#1e293b" />
            {/* Jacket */}
            <path d="M130,280 L160,280 L180,400 L150,500 L110,500 Z" fill={dressColor} />
            <path d="M270,280 L240,280 L220,400 L250,500 L290,500 Z" fill={dressColor} />
            <path d="M110,500 L290,500 L300,850 L100,850 Z" fill={dressColor} />
            {/* Lapels */}
            <path d="M160,280 L180,350 L150,380 Z" fill="#000" opacity="0.2" />
            <path d="M240,280 L220,350 L250,380 Z" fill="#000" opacity="0.2" />
          </g>
        )}
        {hasDress('cyberpunk') && (
          <g>
            {/* Inner Top */}
            <path d="M150,280 L250,280 L260,400 L140,400 Z" fill="#0f172a" />
            {/* Jacket */}
            <path d="M120,270 C150,270 160,300 160,350 L140,500 L100,500 Z" fill={dressColor} />
            <path d="M280,270 C250,270 240,300 240,350 L260,500 L300,500 Z" fill={dressColor} />
            <path d="M100,500 L300,500 L310,700 L90,700 Z" fill={dressColor} />
            {/* Neon Accents */}
            <path d="M120,270 L160,350 M280,270 L240,350" stroke="#06b6d4" strokeWidth="4" fill="none" />
            <path d="M140,500 L260,500" stroke="#06b6d4" strokeWidth="3" fill="none" />
          </g>
        )}
        {hasDress('summer-dress') && (
          <g>
            {/* Straps */}
            <path d="M150,260 L160,290 M250,260 L240,290" stroke={dressColor} strokeWidth="6" />
            {/* Bodice */}
            <path d="M140,290 C170,310 230,310 260,290 L270,450 L130,450 Z" fill={dressColor} />
            {/* Skirt */}
            <path d="M130,450 L270,450 C290,600 320,750 340,800 C250,820 150,820 60,800 C80,750 110,600 130,450 Z" fill={dressColor} />
            {/* Floral pattern approximation */}
            <circle cx="200" cy="350" r="15" fill="#fff" opacity="0.3" />
            <circle cx="160" cy="400" r="10" fill="#fff" opacity="0.3" />
            <circle cx="240" cy="420" r="12" fill="#fff" opacity="0.3" />
            <circle cx="180" cy="550" r="20" fill="#fff" opacity="0.3" />
            <circle cx="250" cy="650" r="18" fill="#fff" opacity="0.3" />
            <circle cx="140" cy="680" r="15" fill="#fff" opacity="0.3" />
          </g>
        )}
        {hasDress('ninja') && (
          <g>
            {/* Base Suit */}
            <path d="M140,280 L260,280 L280,500 L120,500 Z" fill="#111827" />
            <path d="M120,500 L280,500 L290,850 L110,850 Z" fill="#111827" />
            {/* Wrapped Belt */}
            <path d="M130,450 L270,450 L275,480 L125,480 Z" fill={dressColor} />
            <path d="M125,480 L275,480 L280,510 L120,510 Z" fill={dressColor} opacity="0.8" />
            {/* Cross body wrap */}
            <path d="M140,280 L270,450 L250,450 L120,280 Z" fill={dressColor} opacity="0.6" />
            <path d="M260,280 L130,450 L150,450 L280,280 Z" fill={dressColor} opacity="0.4" />
          </g>
        )}

        {/* Arms & Hands (Pose) */}
        <g id="arms">
          {state.pose === 'neutral' && (
            <>
              {/* Left Arm & Hand */}
              <path d="M 115 300 C 85 360, 95 440, 105 500 L 135 500 C 125 440, 115 360, 155 300 Z" fill={hasDress('casual-hoodie') ? dressColor : skinColor} />
              <path d="M 105 500 C 100 530, 110 550, 115 570 C 120 580, 130 580, 135 570 C 140 550, 140 530, 135 500 Z" fill={skinColor} />
              {/* Right Arm & Hand */}
              <path d="M 285 300 C 315 360, 305 440, 295 500 L 265 500 C 275 440, 285 360, 245 300 Z" fill={hasDress('casual-hoodie') ? dressColor : skinColor} />
              <path d="M 295 500 C 300 530, 290 550, 285 570 C 280 580, 270 580, 265 570 C 260 550, 260 530, 265 500 Z" fill={skinColor} />
            </>
          )}
          {state.pose === 'praying' && (
            <>
              {/* Left Arm & Hand */}
              <path d="M 115 300 C 100 360, 150 400, 180 380 L 190 400 C 150 430, 80 380, 115 300 Z" fill={hasDress('casual-hoodie') ? dressColor : skinColor} />
              <path d="M 180 380 C 190 370, 200 360, 200 350 C 205 360, 200 380, 190 400 Z" fill={skinColor} />
              {/* Right Arm & Hand */}
              <path d="M 285 300 C 300 360, 250 400, 220 380 L 210 400 C 250 430, 320 380, 285 300 Z" fill={hasDress('casual-hoodie') ? dressColor : skinColor} />
              <path d="M 220 380 C 210 370, 200 360, 200 350 C 195 360, 200 380, 210 400 Z" fill={skinColor} />
            </>
          )}
          {state.pose === 'reaching' && (
            <>
              {/* Left Arm & Hand */}
              <path d="M 115 300 C 85 360, 95 440, 105 500 L 135 500 C 125 440, 115 360, 155 300 Z" fill={hasDress('casual-hoodie') ? dressColor : skinColor} />
              <path d="M 105 500 C 100 530, 110 550, 115 570 C 120 580, 130 580, 135 570 C 140 550, 140 530, 135 500 Z" fill={skinColor} />
              {/* Right Arm & Hand */}
              <path d="M 285 300 C 315 220, 335 170, 365 120 L 345 100 C 315 150, 295 220, 245 300 Z" fill={hasDress('casual-hoodie') ? dressColor : skinColor} />
              <path d="M 365 120 C 380 100, 390 90, 385 80 C 380 70, 370 75, 360 85 C 350 95, 345 100, 345 100 Z" fill={skinColor} />
            </>
          )}
        </g>
      </g>

      {/* Realistic Head */}
      {(() => {
        switch(state.faceShape) {
          case 'round':
            return <path d="M 155 140 C 155 90, 170 65, 200 65 C 230 65, 245 90, 245 140 C 245 180, 240 210, 235 230 C 225 260, 215 270, 200 270 C 185 270, 175 260, 165 230 C 160 210, 155 180, 155 140 Z" fill={skinColor} />;
          case 'sharp':
            return <path d="M 155 140 C 155 90, 170 65, 200 65 C 230 65, 245 90, 245 140 C 245 170, 240 190, 235 210 C 225 230, 215 260, 200 265 C 185 260, 175 230, 165 210 C 160 190, 155 170, 155 140 Z" fill={skinColor} />;
          case 'square':
            return <path d="M 155 140 C 155 90, 170 65, 200 65 C 230 65, 245 90, 245 140 C 245 180, 240 220, 235 240 C 230 255, 215 260, 200 260 C 185 260, 170 255, 165 240 C 160 220, 155 180, 155 140 Z" fill={skinColor} />;
          case 'oval':
          default:
            return (
              <g>
                <path d="M 155 140 C 155 90, 168 65, 200 65 C 232 65, 245 90, 245 140 C 245 175, 242 200, 235 220 C 228 240, 215 255, 205 260 C 202 263, 198 263, 195 260 C 185 255, 172 240, 165 220 C 158 200, 155 175, 155 140 Z" fill={skinColor} />
                {/* Subtle jawline shadow for realism */}
                <path d="M 165 220 C 172 240, 185 255, 195 260 C 198 263, 202 263, 205 260 C 215 255, 228 240, 235 220 C 228 235, 215 250, 205 255 C 202 258, 198 258, 195 255 C 185 250, 172 235, 165 220 Z" fill="#000" opacity="0.06" filter="url(#softBlur)" />
              </g>
            );
        }
      })()}
      
      {/* Cheekbone Shading */}
      <path d="M 155 180 C 165 190, 170 210, 165 220 C 160 210, 155 190, 155 180 Z" fill="#000" opacity="0.05" filter="url(#softBlur)" />
      <path d="M 245 180 C 235 190, 230 210, 235 220 C 240 210, 245 190, 245 180 Z" fill="#000" opacity="0.05" filter="url(#softBlur)" />

      {/* Model Type Features (Ears/Horns) */}
      {state.modelType === 'elf' && (
        <g fill={skinColor}>
          <path d="M155,160 C125,140, 85,110, 75,100 C95,130, 135,170, 155,180 Z" />
          <path d="M245,160 C275,140, 315,110, 325,100 C305,130, 265,170, 245,180 Z" />
        </g>
      )}
      {state.modelType === 'demon' && (
        <g fill="#1f2937" stroke="#0f172a" strokeWidth="2">
          <path d="M170,110 C150,60 100,40 80,30 C110,50 140,80 160,110 Z" />
          <path d="M230,110 C250,60 300,40 320,30 C290,50 260,80 240,110 Z" />
        </g>
      )}
      {state.modelType === 'nymph' && (
        <g fill="url(#iridescent)" opacity="0.8">
          <path d="M155,150 C135,140 115,160 105,190 C125,170 145,170 155,180 Z" />
          <path d="M245,150 C265,140 285,160 295,190 C275,170 255,170 245,180 Z" />
          {/* Vine markings on face */}
          <path d="M160,220 C150,230 155,240 165,250" stroke="#10b981" fill="none" strokeWidth="2" opacity="0.5"/>
          <path d="M240,220 C250,230 245,240 235,250" stroke="#10b981" fill="none" strokeWidth="2" opacity="0.5"/>
        </g>
      )}

      {/* Makeup */}
      <g id="makeup">
        {state.makeup === 'blush' && (
          <>
            <ellipse cx="170" cy="205" rx="12" ry="8" fill="#ff9999" opacity="0.5" filter="url(#strongBlur)" />
            <ellipse cx="230" cy="205" rx="12" ry="8" fill="#ff9999" opacity="0.5" filter="url(#strongBlur)" />
          </>
        )}
        {state.makeup === 'ethereal-glow' && (
          <>
            <ellipse cx="170" cy="200" rx="15" ry="10" fill="#ffffff" opacity="0.6" filter="url(#strongBlur)" />
            <ellipse cx="230" cy="200" rx="15" ry="10" fill="#ffffff" opacity="0.6" filter="url(#strongBlur)" />
            <circle cx="200" cy="180" r="5" fill="#ffffff" opacity="0.5" filter="url(#softBlur)" />
          </>
        )}
        {state.makeup === 'stardust' && (
          <g fill="#fde047" opacity="0.8">
            <circle cx="165" cy="205" r="2" filter="url(#glow)" />
            <circle cx="175" cy="200" r="1.5" />
            <circle cx="160" cy="198" r="1" />
            <circle cx="235" cy="205" r="2" filter="url(#glow)" />
            <circle cx="225" cy="200" r="1.5" />
            <circle cx="240" cy="198" r="1" />
          </g>
        )}
      </g>

      {/* Realistic Eyes */}
      <g className="animate-blink" style={{ transformOrigin: '200px 175px' }}>
        {state.eyes === 'soft' && (
          <g>
            {/* Left Eye */}
            <path d="M 165 175 C 170 168, 180 168, 185 175 C 180 180, 170 180, 165 175 Z" fill="#fff" />
            <path d="M 165 175 C 170 168, 180 168, 185 175 C 180 180, 170 180, 165 175 Z" fill={eyeColor} opacity="0.8" />
            <circle cx="175" cy="174" r="3.5" fill="#1a1a1a" />
            <circle cx="173" cy="172" r="1" fill="#fff" />
            <path d="M 163 175 C 170 166, 182 166, 187 175" stroke="#1a1a1a" strokeWidth="2" fill="none" strokeLinecap="round" />
            
            {/* Right Eye */}
            <path d="M 215 175 C 220 168, 230 168, 235 175 C 230 180, 220 180, 215 175 Z" fill="#fff" />
            <path d="M 215 175 C 220 168, 230 168, 235 175 C 230 180, 220 180, 215 175 Z" fill={eyeColor} opacity="0.8" />
            <circle cx="225" cy="174" r="3.5" fill="#1a1a1a" />
            <circle cx="223" cy="172" r="1" fill="#fff" />
            <path d="M 213 175 C 220 166, 232 166, 237 175" stroke="#1a1a1a" strokeWidth="2" fill="none" strokeLinecap="round" />
          </g>
        )}
        {state.eyes === 'fierce' && (
          <g>
            {/* Left Eye */}
            <path d="M 165 175 L 175 170 L 185 175 L 175 178 Z" fill="#fff" />
            <path d="M 165 175 L 175 170 L 185 175 L 175 178 Z" fill={eyeColor} opacity="0.8" />
            <circle cx="175" cy="174" r="2.5" fill="#1a1a1a" />
            <circle cx="174" cy="173" r="0.8" fill="#fff" />
            <path d="M 163 175 L 175 168 L 187 175" stroke="#1a1a1a" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            
            {/* Right Eye */}
            <path d="M 215 175 L 225 170 L 235 175 L 225 178 Z" fill="#fff" />
            <path d="M 215 175 L 225 170 L 235 175 L 225 178 Z" fill={eyeColor} opacity="0.8" />
            <circle cx="225" cy="174" r="2.5" fill="#1a1a1a" />
            <circle cx="224" cy="173" r="0.8" fill="#fff" />
            <path d="M 213 175 L 225 168 L 237 175" stroke="#1a1a1a" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        )}
        {state.eyes === 'closed' && (
          <g stroke="#1a1a1a" strokeWidth="2" fill="none" strokeLinecap="round">
            <path d="M 165 175 C 170 180, 180 180, 185 175" />
            <path d="M 170 178 L 168 182 M 175 179 L 175 183 M 180 178 L 182 182" strokeWidth="1.5"/>
            <path d="M 215 175 C 220 180, 230 180, 235 175" />
            <path d="M 220 178 L 218 182 M 225 179 L 225 183 M 230 178 L 232 182" strokeWidth="1.5"/>
          </g>
        )}
      </g>

      {/* Realistic Eyebrows */}
      <path d="M 160 160 C 170 155, 180 155, 190 160" stroke="#2a1b18" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M 210 160 C 220 155, 230 155, 240 160" stroke="#2a1b18" strokeWidth="3" fill="none" strokeLinecap="round" />

      {/* Realistic Nose */}
      <path d="M 200 175 L 200 215 C 195 220, 205 220, 200 215" stroke="#000" strokeOpacity="0.15" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 195 215 C 195 220, 205 220, 205 215" stroke="#000" strokeOpacity="0.15" strokeWidth="1" fill="none" strokeLinecap="round" />

      {/* Realistic Mouth */}
      {state.mouth === 'neutral' && (
        <g>
          <path d="M 188 238 C 195 238, 205 238, 212 238 C 205 243, 195 243, 188 238 Z" fill="#d07a7a" />
          <path d="M 188 238 C 195 234, 205 234, 212 238 C 205 238, 195 238, 188 238 Z" fill="#e08a8a" />
          <path d="M 185 238 C 195 238, 205 238, 215 238" stroke="#a05a5a" strokeWidth="1" fill="none" />
        </g>
      )}
      {state.mouth === 'smile' && (
        <g>
          <path d="M 185 236 C 195 242, 205 242, 215 236 C 205 246, 195 246, 185 236 Z" fill="#d07a7a" />
          <path d="M 185 236 C 195 234, 205 234, 215 236 C 205 238, 195 238, 185 236 Z" fill="#e08a8a" />
          <path d="M 182 234 C 195 242, 205 242, 218 234" stroke="#a05a5a" strokeWidth="1" fill="none" />
        </g>
      )}
      {state.mouth === 'pout' && (
        <g>
          <path d="M 190 238 C 195 238, 205 238, 210 238 C 205 245, 195 245, 190 238 Z" fill="#d07a7a" />
          <path d="M 190 238 C 195 232, 205 232, 210 238 C 205 238, 195 238, 190 238 Z" fill="#e08a8a" />
          <path d="M 188 238 C 195 238, 205 238, 212 238" stroke="#a05a5a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </g>
      )}

      {/* Front Cloak (Shoulders) */}
      <g id="cloak-front">
        {state.cloak === 'starlight' && (
          <path d="M130,330 C150,300 175,270 200,270 C225,270 250,300 270,330 C260,350 240,340 200,340 C160,340 140,350 130,330 Z" fill="#1e1b4b" opacity="0.9" />
        )}
        {state.cloak === 'velvet' && (
          <path d="M120,330 C150,290 175,270 200,270 C225,270 250,290 280,330 C260,360 240,350 200,350 C160,350 140,360 120,330 Z" fill="#881337" opacity="0.9" />
        )}
      </g>

      {/* Front Hair */}
      <g className="animate-hair-flow">
        {state.hairStyle === 'flowing' && (
          <path d="M 200 60 C 150 60, 140 110, 140 170 C 140 210, 150 250, 130 290 C 150 190, 170 90, 200 90 C 230 90, 250 190, 270 290 C 250 250, 260 210, 260 170 C 260 110, 250 60, 200 60 Z" fill={hairColor} opacity="0.95" />
        )}
        {state.hairStyle === 'braided' && (
          <path d="M200,60 C150,60 140,110 140,170 C140,200 150,220 140,250 C160,200 170,90 200,90 C230,90 240,200 260,250 C250,220 260,200 260,170 C260,110 250,60 200,60 Z" fill={hairColor} opacity="0.95" />
        )}
        {state.hairStyle === 'updo' && (
          <path d="M200,60 C150,60 140,110 140,150 C160,120 170,90 200,90 C230,90 240,120 260,150 C260,110 250,60 200,60 Z" fill={hairColor} opacity="0.95" />
        )}
        {state.hairStyle === 'short' && (
          <path d="M200,60 C150,60 140,110 140,170 C160,140 170,90 200,90 C230,90 240,140 260,170 C260,110 250,60 200,60 Z" fill={hairColor} opacity="0.95" />
        )}
      </g>

      {/* Front Accessories */}
      <g className={isActive ? "animate-pulse" : ""}>
        {state.accessory === 'star-crown' && (
          <g>
            <path d="M170,90 L180,60 L190,90 Z" fill="#fbbf24" />
            <path d="M190,95 L200,50 L210,95 Z" fill="#fbbf24" />
            <path d="M210,90 L220,60 L230,90 Z" fill="#fbbf24" />
            <circle cx="180" cy="55" r="3" fill="#fff" filter="url(#glow)" />
            <circle cx="200" cy="45" r="4" fill="#fff" filter="url(#glow)" />
            <circle cx="220" cy="55" r="3" fill="#fff" filter="url(#glow)" />
          </g>
        )}
        {state.accessory === 'floating-orbs' && (
          <g className="animate-float">
            <circle cx="120" cy="150" r="8" fill="#a7f3d0" filter="url(#glow)" />
            <circle cx="280" cy="180" r="6" fill="#a7f3d0" filter="url(#glow)" />
            <circle cx="140" cy="250" r="4" fill="#a7f3d0" filter="url(#glow)" />
          </g>
        )}
      </g>
    </svg>
  );
};

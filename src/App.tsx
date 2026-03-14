import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Moon, Wind, Crown, Shirt, User, Volume2, VolumeX, Plus, Trash2, Copy, Play, Square, Box, Dices, Download, RotateCcw } from 'lucide-react';
import { CharacterSVG } from './components/CharacterSVG';
import { ChibiCharacterSVG } from './components/ChibiCharacterSVG';
import { AnimeCharacterSVG } from './components/AnimeCharacterSVG';
import { PixelCharacterSVG } from './components/PixelCharacterSVG';
import { AudioEngine } from './utils/audio';

const MODEL_TYPES = [
  { id: 'human', name: 'Human' },
  { id: 'elf', name: 'High Elf' },
  { id: 'demon', name: 'Abyssal' },
  { id: 'nymph', name: 'Sylvan Nymph' },
];

const SKIN_TONES = [
  { id: 'ivory', color: '#fdf6f5', name: 'Ivory' },
  { id: 'beige', color: '#f4dcd6', name: 'Beige' },
  { id: 'olive', color: '#d1bfae', name: 'Olive' },
  { id: 'golden', color: '#eac0a6', name: 'Golden' },
  { id: 'warm-brown', color: '#8d5524', name: 'Warm Brown' },
  { id: 'bronze', color: '#b47c5e', name: 'Bronze' },
  { id: 'deep-brown', color: '#3d2314', name: 'Deep Brown' },
  { id: 'obsidian', color: '#2b1d16', name: 'Obsidian' },
  { id: 'celestial', color: '#d4e4ff', name: 'Celestial' },
];

const EYE_COLORS = [
  { id: 'brown', color: '#4a3018', name: 'Brown' },
  { id: 'hazel', color: '#8e7618', name: 'Hazel' },
  { id: 'blue', color: '#2563eb', name: 'Blue' },
  { id: 'green', color: '#15803d', name: 'Green' },
  { id: 'amethyst', color: '#a855f7', name: 'Amethyst' },
  { id: 'obsidian', color: '#1e293b', name: 'Obsidian' },
];

const HAIR_COLORS = [
  { id: 'black', color: '#1a1a1a', name: 'Black' },
  { id: 'brunette', color: '#4a3018', name: 'Brunette' },
  { id: 'chestnut', color: '#7b3f00', name: 'Chestnut' },
  { id: 'copper', color: '#b45309', name: 'Copper' },
  { id: 'blonde', color: '#e8c37d', name: 'Blonde' },
  { id: 'silver', color: '#e2e8f0', name: 'Silver' },
  { id: 'white', color: '#ffffff', name: 'Pure White' },
];

const DRESS_COLORS = [
  { id: 'coral', color: '#fb7185', name: 'Coral Pink' },
  { id: 'iridescent', color: 'url(#iridescent)', name: 'Iridescent' },
  { id: 'dawn-pink', color: '#f472b6', name: 'Dawn Pink' },
  { id: 'twilight', color: '#312e81', name: 'Twilight Blue' },
  { id: 'starlight', color: '#f8fafc', name: 'Starlight' },
  { id: 'emerald', color: '#064e3b', name: 'Deep Emerald' },
  { id: 'crimson', color: '#881337', name: 'Divine Crimson' },
];

const EYE_STYLES = [
  { id: 'soft', name: 'Soft' },
  { id: 'fierce', name: 'Fierce' },
  { id: 'closed', name: 'Peaceful' },
];

const MOUTH_STYLES = [
  { id: 'neutral', name: 'Neutral' },
  { id: 'smile', name: 'Gentle Smile' },
  { id: 'pout', name: 'Pout' },
];

const MAKEUP_STYLES = [
  { id: 'none', name: 'None' },
  { id: 'blush', name: 'Soft Blush' },
  { id: 'ethereal-glow', name: 'Ethereal Glow' },
  { id: 'stardust', name: 'Stardust' },
];

const HAIR_STYLES = [
  { id: 'flowing', name: 'Flowing Waves' },
  { id: 'braided', name: 'Crown Braid' },
  { id: 'updo', name: 'Elegant Updo' },
  { id: 'short', name: 'Celestial Bob' },
];

const BODY_PROPORTIONS = [
  { id: 'slender', name: 'Slender' },
  { id: 'standard', name: 'Standard' },
  { id: 'athletic', name: 'Athletic' },
  { id: 'curvy', name: 'Curvy' },
  { id: 'plus-size', name: 'Plus Size' },
];

const FACE_SHAPES = [
  { id: 'oval', name: 'Oval' },
  { id: 'round', name: 'Round' },
  { id: 'sharp', name: 'Sharp / V-Line' },
  { id: 'square', name: 'Square' },
];

const POSES = [
  { id: 'neutral', name: 'Neutral' },
  { id: 'praying', name: 'Praying' },
  { id: 'reaching', name: 'Reaching' },
];

const DRESS_STYLES = [
  { id: 'casual-hoodie', name: 'Casual Hoodie' },
  { id: 'layered-gown', name: 'Layered Gown' },
  { id: 'celestial', name: 'Celestial Robe' },
  { id: 'corset', name: 'Crystal Corset' },
  { id: 'flowing', name: 'Flowing Gown' },
  { id: 'slip', name: 'Silk Slip' },
  { id: 'business-suit', name: 'Business Suit' },
  { id: 'cyberpunk', name: 'Cyberpunk Jacket' },
  { id: 'summer-dress', name: 'Summer Dress' },
  { id: 'ninja', name: 'Ninja Suit' },
];

const CLOAKS = [
  { id: 'none', name: 'None' },
  { id: 'starlight', name: 'Starlight Cloak' },
  { id: 'velvet', name: 'Velvet Mantle' },
];

const WINGS = [
  { id: 'none', name: 'None' },
  { id: 'angelic', name: 'Angelic' },
  { id: 'faerie', name: 'Faerie' },
  { id: 'crystal', name: 'Crystal' },
];

const ACCESSORY_STYLES = [
  { id: 'none', name: 'None' },
  { id: 'halo', name: 'Divine Halo' },
  { id: 'star-crown', name: 'Star Crown' },
  { id: 'necklace', name: 'Crystal Drop' },
  { id: 'floating-orbs', name: 'Floating Orbs' },
];

const ANIMATED_ACCESSORIES = [
  { id: 'none', name: 'None' },
  { id: 'ribbons', name: 'Fluttering Ribbons' },
  { id: 'veil', name: 'Glowing Veil' },
];

const BACKGROUNDS = [
  {
    id: 'aurora-temple',
    name: 'Aurora Temple',
    className: 'bg-[linear-gradient(45deg,#0f172a,#064e3b,#1e1b4b,#312e81)] animate-aurora',
    overlay: (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute left-[10%] top-0 bottom-0 w-16 bg-gradient-to-r from-white/5 to-transparent border-l border-white/10" />
        <div className="absolute right-[10%] top-0 bottom-0 w-16 bg-gradient-to-l from-white/5 to-transparent border-r border-white/10" />
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-emerald-500/20 via-indigo-500/10 to-transparent blur-3xl animate-pulse-slow" />
        {[...Array(30)].map((_, i) => (
          <div key={i} className="absolute bg-white rounded-full animate-pulse" style={{
            top: `${Math.random() * 50}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 3}px`,
            height: `${Math.random() * 3}px`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`
          }} />
        ))}
        {/* Glowing Floor / Stage */}
        <div className="absolute bottom-0 left-0 right-0 h-[35%] bg-gradient-to-t from-emerald-900/60 to-transparent" style={{ transform: 'perspective(1000px) rotateX(70deg)', transformOrigin: 'bottom' }}>
           <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_49%,rgba(255,255,255,0.05)_50%,transparent_51%)] bg-[length:100px_100%]" />
           <div className="absolute inset-0 bg-[linear-gradient(transparent_49%,rgba(255,255,255,0.05)_50%,transparent_51%)] bg-[length:100%_40px]" />
        </div>
      </div>
    )
  },
  {
    id: 'crystal-courtyard',
    name: 'Crystal Courtyard',
    className: 'bg-gradient-to-br from-fuchsia-900 via-indigo-950 to-black',
    overlay: (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <div key={i} className="absolute bg-fuchsia-200 rounded-full animate-pulse" style={{
            top: `${Math.random() * 60}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 3}px`,
            height: `${Math.random() * 3}px`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`
          }} />
        ))}
        {/* Crystal Floor */}
        <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-fuchsia-900/50 to-transparent backdrop-blur-sm border-t border-fuchsia-500/20" style={{ transform: 'perspective(800px) rotateX(60deg)', transformOrigin: 'bottom' }}>
           <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_49%,rgba(255,255,255,0.1)_49%,rgba(255,255,255,0.1)_51%,transparent_51%)] bg-[length:60px_60px]" />
           <div className="absolute inset-0 bg-[linear-gradient(-45deg,transparent_49%,rgba(255,255,255,0.1)_49%,rgba(255,255,255,0.1)_51%,transparent_51%)] bg-[length:60px_60px]" />
        </div>
      </div>
    )
  },
  {
    id: 'glowing-meadow',
    name: 'Glowing Meadow',
    className: 'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-teal-900 via-emerald-950 to-black',
    overlay: (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div key={i} className="absolute bg-emerald-400/60 rounded-full blur-[1px] animate-float" style={{
            top: `${40 + Math.random() * 60}%`,
            left: `${Math.random() * 100}%`,
            width: `${4 + Math.random() * 6}px`,
            height: `${4 + Math.random() * 6}px`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${5 + Math.random() * 10}s`
          }} />
        ))}
        {/* Meadow Floor */}
        <div className="absolute bottom-0 left-0 right-0 h-[30%] bg-gradient-to-t from-emerald-950 to-transparent">
           <div className="absolute bottom-0 left-0 right-0 h-full bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.2),transparent_70%)]" />
        </div>
      </div>
    )
  },
  {
    id: 'blossom',
    name: 'Blossom',
    className: 'bg-gradient-to-b from-pink-200 via-pink-100 to-white',
    overlay: (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <div key={i} className="absolute bg-pink-300/60 rounded-full animate-float" style={{
            top: `${-10 + Math.random() * 110}%`,
            left: `${Math.random() * 100}%`,
            width: `${8 + Math.random() * 10}px`,
            height: `${8 + Math.random() * 10}px`,
            borderRadius: '50% 0 50% 50%',
            transform: `rotate(${Math.random() * 360}deg)`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${5 + Math.random() * 10}s`
          }} />
        ))}
        <div className="absolute bottom-0 left-0 right-0 h-[30%] bg-gradient-to-t from-pink-300/30 to-transparent" />
      </div>
    )
  },
  {
    id: 'ocean',
    name: 'Ocean',
    className: 'bg-gradient-to-b from-cyan-600 via-blue-800 to-blue-950',
    overlay: (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-cyan-300/20 to-transparent" />
        {[...Array(50)].map((_, i) => (
          <div key={i} className="absolute border border-cyan-200/40 rounded-full animate-float" style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${4 + Math.random() * 12}px`,
            height: `${4 + Math.random() * 12}px`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 6}s`
          }} />
        ))}
        <div className="absolute bottom-0 left-0 right-0 h-[20%] bg-gradient-to-t from-blue-950 to-transparent" />
      </div>
    )
  },
  {
    id: 'space',
    name: 'Space',
    className: 'bg-black',
    overlay: (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(120,80,200,0.2)_0%,transparent_70%)]" />
        {[...Array(100)].map((_, i) => (
          <div key={i} className="absolute bg-white rounded-full animate-pulse" style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 2.5}px`,
            height: `${Math.random() * 2.5}px`,
            opacity: Math.random(),
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${1 + Math.random() * 3}s`
          }} />
        ))}
        <div className="absolute bottom-0 left-0 right-0 h-[20%] bg-gradient-to-t from-purple-900/30 to-transparent" />
      </div>
    )
  },
  {
    id: 'maryland',
    name: 'Maryland',
    className: 'bg-gradient-to-br from-red-600 via-yellow-500 to-black',
    overlay: (
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000)',
          backgroundSize: '60px 60px',
          backgroundPosition: '0 0, 30px 30px'
        }} />
        <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-black to-transparent" />
      </div>
    )
  },
  {
    id: 'disney-land',
    name: 'Disney Land',
    className: 'bg-gradient-to-b from-indigo-900 via-purple-800 to-pink-900',
    overlay: (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Fireworks */}
        {[...Array(15)].map((_, i) => (
          <div key={i} className="absolute bg-yellow-200 rounded-full animate-pulse" style={{
            top: `${10 + Math.random() * 40}%`,
            left: `${Math.random() * 100}%`,
            width: `${3 + Math.random() * 4}px`,
            height: `${3 + Math.random() * 4}px`,
            boxShadow: '0 0 15px 5px rgba(253, 224, 71, 0.4)',
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${0.5 + Math.random() * 1.5}s`
          }} />
        ))}
        {/* Castle silhouette approximation */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] max-w-md h-64 flex items-end justify-center opacity-20">
          <div className="w-12 h-32 bg-white rounded-t-full mx-1" />
          <div className="w-16 h-48 bg-white rounded-t-full mx-1" />
          <div className="w-24 h-64 bg-white rounded-t-full mx-1" />
          <div className="w-16 h-48 bg-white rounded-t-full mx-1" />
          <div className="w-12 h-32 bg-white rounded-t-full mx-1" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-[30%] bg-gradient-to-t from-indigo-950 to-transparent" />
      </div>
    )
  },
  {
    id: 'barbie-land',
    name: 'Barbie Land',
    className: 'bg-gradient-to-br from-pink-400 via-pink-300 to-fuchsia-400',
    overlay: (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)] bg-[length:40px_40px] opacity-30" />
        {[...Array(20)].map((_, i) => (
          <div key={i} className="absolute text-white/40 text-4xl animate-float" style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${4 + Math.random() * 6}s`
          }}>
            ✨
          </div>
        ))}
        <div className="absolute bottom-0 left-0 right-0 h-[20%] bg-gradient-to-t from-pink-500/50 to-transparent" />
      </div>
    )
  }
];

const TABS = [
  { id: 'face', label: 'Face', icon: <User size={18} /> },
  { id: 'hair', label: 'Hair', icon: <Wind size={18} /> },
  { id: 'body', label: 'Body & Pose', icon: <User size={18} /> },
  { id: 'attire', label: 'Attire', icon: <Shirt size={18} /> },
  { id: 'effects', label: 'Effects', icon: <Crown size={18} /> },
  { id: 'presets', label: 'Presets', icon: <Box size={18} /> },
];

const SelectionGrid = ({ title, options, selectedId, onSelect, type = 'color' }) => {
  const isSelected = (id) => Array.isArray(selectedId) ? selectedId.includes(id) : selectedId === id;
  return (
    <div className="mb-6">
      <h3 className="text-xs uppercase tracking-[0.2em] mb-4 text-white/60 font-medium">{title}</h3>
      <div className="flex flex-wrap gap-3">
        {options.map(opt => (
          <button
            key={opt.id}
            onClick={() => onSelect(opt.id)}
            className={`relative rounded-full transition-all duration-300 ${isSelected(opt.id) ? 'ring-2 ring-white ring-offset-2 ring-offset-transparent scale-110' : 'hover:scale-105 opacity-80 hover:opacity-100'}`}
            title={opt.name}
          >
            {type === 'color' ? (
              <div 
                className="w-8 h-8 rounded-full shadow-inner border border-white/20"
                style={{ background: opt.color.startsWith('url') ? 'linear-gradient(135deg, #e8d4ff, #d4e4ff, #fbcfe8)' : opt.color }}
              />
            ) : (
              <div className={`px-4 py-2 rounded-full text-sm border backdrop-blur-sm ${isSelected(opt.id) ? 'bg-white/20 border-white/50 text-white' : 'bg-black/20 border-white/10 text-white/70'}`}>
                {opt.name}
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

const generateId = () => Math.random().toString(36).substr(2, 9);

const createDefaultCharacter = (zIndex = 1) => ({
  id: generateId(),
  zIndex,
  designStyle: 'ethereal' as 'ethereal' | 'chibi' | 'anime' | 'pixel',
  modelType: 'human',
  showcaseMode: false,
  skinTone: 'ivory',
  faceShape: 'oval',
  eyes: 'soft',
  eyeColor: 'blue',
  mouth: 'neutral',
  makeup: 'none',
  hairStyle: 'flowing',
  hairColor: 'blonde',
  bodyProportion: 'standard',
  pose: 'neutral',
  dress: ['casual-hoodie'],
  dressColor: 'coral',
  cloak: 'none',
  wings: 'none',
  accessory: 'none',
  animatedAccessory: 'none',
});

export default function App() {
  const [activeTab, setActiveTab] = useState('face');
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<AudioEngine | null>(null);
  const constraintsRef = useRef(null);

  const [characters, setCharacters] = useState([createDefaultCharacter(1)]);
  const [activeId, setActiveId] = useState(characters[0].id);
  const [background, setBackground] = useState('blossom');
  const [presets, setPresets] = useState(() => {
    try {
      const saved = localStorage.getItem('character-presets');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const activeCharacter = characters.find(c => c.id === activeId) || characters[0];

  useEffect(() => {
    audioRef.current = new AudioEngine();
    return () => {
      if (audioRef.current && isPlaying) {
        audioRef.current.toggle();
      }
    };
  }, []);

  const toggleAudio = () => {
    if (audioRef.current) {
      const playing = audioRef.current.toggle();
      setIsPlaying(playing);
    }
  };

  const updateActiveCharacter = (key, value) => {
    setCharacters(chars => chars.map(c => c.id === activeId ? { ...c, [key]: value } : c));
  };

  const bringToFront = (id) => {
    setCharacters(chars => {
      const maxZ = Math.max(...chars.map(c => c.zIndex), 0);
      return chars.map(c => c.id === id ? { ...c, zIndex: maxZ + 1 } : c);
    });
    setActiveId(id);
  };

  const addCharacter = () => {
    const maxZ = Math.max(...characters.map(c => c.zIndex), 0);
    const newChar = createDefaultCharacter(maxZ + 1);
    setCharacters([...characters, newChar]);
    setActiveId(newChar.id);
  };

  const duplicateCharacter = () => {
    const maxZ = Math.max(...characters.map(c => c.zIndex), 0);
    const newChar = { ...activeCharacter, id: generateId(), zIndex: maxZ + 1 };
    setCharacters([...characters, newChar]);
    setActiveId(newChar.id);
  };

  const deleteCharacter = (id) => {
    if (characters.length <= 1) return;
    const newChars = characters.filter(c => c.id !== id);
    setCharacters(newChars);
    if (activeId === id) {
      setActiveId(newChars[newChars.length - 1].id);
    }
  };

  const savePreset = () => {
    const name = prompt('Enter preset name:');
    if (name) {
      const newPreset = { id: generateId(), name, data: activeCharacter };
      const newPresets = [...presets, newPreset];
      setPresets(newPresets);
      localStorage.setItem('character-presets', JSON.stringify(newPresets));
    }
  };

  const loadPreset = (preset) => {
    setCharacters(chars => chars.map(c => c.id === activeId ? { ...preset.data, id: activeId, zIndex: c.zIndex } : c));
  };

  const deletePreset = (id) => {
    const newPresets = presets.filter(p => p.id !== id);
    setPresets(newPresets);
    localStorage.setItem('character-presets', JSON.stringify(newPresets));
  };

  const getRandom = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)].id;

  const randomizeCharacter = () => {
    const randomChar = {
      ...activeCharacter,
      skinTone: getRandom(SKIN_TONES),
      faceShape: getRandom(FACE_SHAPES),
      eyes: getRandom(EYE_STYLES),
      eyeColor: getRandom(EYE_COLORS),
      mouth: getRandom(MOUTH_STYLES),
      makeup: getRandom(MAKEUP_STYLES),
      hairStyle: getRandom(HAIR_STYLES),
      hairColor: getRandom(HAIR_COLORS),
      modelType: getRandom(MODEL_TYPES),
      bodyProportion: getRandom(BODY_PROPORTIONS),
      pose: getRandom(POSES),
      dress: [getRandom(DRESS_STYLES)],
      dressColor: getRandom(DRESS_COLORS),
      cloak: getRandom(CLOAKS),
      wings: getRandom(WINGS),
      accessory: getRandom(ACCESSORY_STYLES),
      animatedAccessory: getRandom(ANIMATED_ACCESSORIES),
    };
    setCharacters(chars => chars.map(c => c.id === activeId ? randomChar : c));
  };

  const resetCharacter = () => {
    const defaultChar = createDefaultCharacter(activeCharacter.zIndex);
    setCharacters(chars => chars.map(c => c.id === activeId ? { ...defaultChar, id: activeId } : c));
  };

  const downloadCharacter = () => {
    const svgElement = document.getElementById(`character-svg-${activeId}`);
    if (!svgElement) return;
    
    // Clone the SVG to not modify the DOM one
    const clone = svgElement.cloneNode(true) as HTMLElement;
    const svg = clone.querySelector('svg');
    if (!svg) return;
    
    // Add xmlns if missing
    if (!svg.getAttribute('xmlns')) {
      svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    }
    
    const svgData = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ethereal-character-${activeId}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const bg = BACKGROUNDS.find(b => b.id === background);

  return (
    <div className={`h-[100dvh] w-full flex flex-col md:flex-row overflow-hidden transition-colors duration-1000 ${bg?.className || ''}`}>
      {bg?.overlay}
      
      {/* Interactive Stage Area */}
      <div className="relative flex-1 p-8 min-h-[40vh] md:min-h-0 overflow-hidden" ref={constraintsRef} style={{ perspective: '1200px' }}>
        <AnimatePresence>
          {characters.map((char, index) => (
            <motion.div 
              key={char.id}
              drag
              dragConstraints={constraintsRef}
              dragElastic={0.1}
              dragMomentum={false}
              onPointerDown={() => bringToFront(char.id)}
              initial={{ opacity: 0, scale: 0.8, x: index * 40 - 20, y: index * 20 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                rotateY: char.showcaseMode ? [0, 25, -25, 0] : 0
              }}
              exit={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
              transition={{ 
                rotateY: { repeat: Infinity, duration: 8, ease: "easeInOut" },
                default: { duration: 0.5 }
              }}
              style={{ zIndex: char.zIndex, transformStyle: 'preserve-3d' }}
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing w-48 md:w-64 lg:w-72 aspect-[4/9] ${activeId === char.id ? 'drop-shadow-[0_0_30px_rgba(255,255,255,0.4)]' : 'drop-shadow-2xl opacity-90 hover:opacity-100'}`}
            >
              <div id={`character-svg-${char.id}`} className="w-full h-full">
                {char.designStyle === 'ethereal' && (
                  <CharacterSVG 
                    state={char} 
                    SKIN_TONES={SKIN_TONES}
                    EYE_COLORS={EYE_COLORS}
                    HAIR_COLORS={HAIR_COLORS}
                    DRESS_COLORS={DRESS_COLORS}
                    isActive={activeId === char.id}
                  />
                )}
                {char.designStyle === 'chibi' && (
                  <ChibiCharacterSVG 
                    state={char} 
                    SKIN_TONES={SKIN_TONES}
                    EYE_COLORS={EYE_COLORS}
                    HAIR_COLORS={HAIR_COLORS}
                    DRESS_COLORS={DRESS_COLORS}
                    isActive={activeId === char.id}
                  />
                )}
                {char.designStyle === 'anime' && (
                  <AnimeCharacterSVG 
                    state={char} 
                    SKIN_TONES={SKIN_TONES}
                    EYE_COLORS={EYE_COLORS}
                    HAIR_COLORS={HAIR_COLORS}
                    DRESS_COLORS={DRESS_COLORS}
                    isActive={activeId === char.id}
                  />
                )}
                {char.designStyle === 'pixel' && (
                  <PixelCharacterSVG 
                    state={char} 
                    SKIN_TONES={SKIN_TONES}
                    EYE_COLORS={EYE_COLORS}
                    HAIR_COLORS={HAIR_COLORS}
                    DRESS_COLORS={DRESS_COLORS}
                    isActive={activeId === char.id}
                  />
                )}
              </div>
              {/* Selection Indicator */}
              {activeId === char.id && (
                <motion.div 
                  layoutId="selection-ring"
                  className="absolute -inset-4 border border-white/30 rounded-full pointer-events-none"
                  style={{ borderStyle: 'dashed' }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Controls Panel */}
      <div className="w-full md:w-[400px] lg:w-[480px] flex-[1.2] md:flex-none bg-black/40 backdrop-blur-2xl border-t md:border-t-0 md:border-l border-white/10 flex flex-col z-20 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex justify-between items-center gap-4">
          <div>
            <h1 className="font-serif text-2xl lg:text-3xl text-white tracking-wide mb-1 whitespace-nowrap">Ethereal Elegance</h1>
            <p className="text-white/60 text-[10px] tracking-[0.2em] uppercase">Divine Character Creator</p>
            <button
              onClick={() => {
                const designs: ('ethereal' | 'chibi' | 'anime' | 'pixel')[] = ['ethereal', 'chibi', 'anime', 'pixel'];
                updateActiveCharacter('designStyle', designs[(designs.indexOf(activeCharacter.designStyle) + 1) % designs.length]);
              }}
              className="mt-3 px-4 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-xs text-white uppercase tracking-wider transition-colors flex items-center gap-2"
            >
              <User size={14} />
              STYLE: {activeCharacter.designStyle.toUpperCase()}
            </button>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={background}
              onChange={(e) => setBackground(e.target.value)}
              className="bg-white/5 hover:bg-white/10 text-white/90 text-xs font-medium rounded-full border border-white/10 px-3 py-2 outline-none focus:border-white/30 appearance-none cursor-pointer transition-colors max-w-[130px] truncate"
              style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23FFFFFF%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px top 50%', backgroundSize: '8px auto', paddingRight: '24px' }}
              title="Change Scene"
            >
              {BACKGROUNDS.map(bg => (
                <option key={bg.id} value={bg.id} className="bg-gray-900 text-white">{bg.name}</option>
              ))}
            </select>
            <button 
              onClick={toggleAudio}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-colors flex-shrink-0"
              title={isPlaying ? "Mute Ambient Music" : "Play Ambient Music"}
            >
              {isPlaying ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>
          </div>
        </div>

        {/* Character Management Bar */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-black/20">
          <div className="flex gap-2 overflow-x-auto hide-scrollbar flex-1 pr-4">
            {characters.map((c, i) => (
              <button 
                key={c.id}
                onClick={() => bringToFront(c.id)} 
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${activeId === c.id ? 'bg-white/20 text-white border border-white/50 shadow-[0_0_10px_rgba(255,255,255,0.2)]' : 'bg-black/40 text-white/50 border border-white/10 hover:text-white hover:bg-white/10'}`}
              >
                Model {i + 1}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1 pl-2 border-l border-white/10">
            <button onClick={downloadCharacter} className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors" title="Download SVG">
              <Download size={16} />
            </button>
            <button onClick={randomizeCharacter} className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors" title="Randomize">
              <Dices size={16} />
            </button>
            <button onClick={resetCharacter} className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors" title="Reset">
              <RotateCcw size={16} />
            </button>
            <div className="w-px h-4 bg-white/10 mx-1" />
            <button 
              onClick={() => updateActiveCharacter('showcaseMode', !activeCharacter.showcaseMode)} 
              className={`p-2 rounded-full transition-colors ${activeCharacter.showcaseMode ? 'text-emerald-400 bg-emerald-400/10' : 'text-white/70 hover:text-white hover:bg-white/10'}`} 
              title="Toggle 3D Showcase Animation"
            >
              {activeCharacter.showcaseMode ? <Square size={16} /> : <Play size={16} />}
            </button>
            <button onClick={addCharacter} className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors" title="Add New Model">
              <Plus size={16} />
            </button>
            <button onClick={duplicateCharacter} className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors" title="Duplicate Model">
              <Copy size={16} />
            </button>
            <button 
              onClick={() => deleteCharacter(activeId)} 
              disabled={characters.length <= 1}
              className={`p-2 rounded-full transition-colors ${characters.length <= 1 ? 'text-white/20 cursor-not-allowed' : 'text-white/70 hover:text-red-400 hover:bg-red-400/10'}`} 
              title="Remove Model"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto border-b border-white/10 hide-scrollbar">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 text-xs font-medium transition-colors whitespace-nowrap ${activeTab === tab.id ? 'text-white border-b-2 border-white bg-white/5' : 'text-white/50 hover:text-white/80 hover:bg-white/5'}`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'face' && (
                <>
                  <SelectionGrid title="Skin Tone" options={SKIN_TONES} selectedId={activeCharacter.skinTone} onSelect={(v) => updateActiveCharacter('skinTone', v)} type="color" />
                  <SelectionGrid title="Face Shape" options={FACE_SHAPES} selectedId={activeCharacter.faceShape} onSelect={(v) => updateActiveCharacter('faceShape', v)} type="pill" />
                  <SelectionGrid title="Eye Style" options={EYE_STYLES} selectedId={activeCharacter.eyes} onSelect={(v) => updateActiveCharacter('eyes', v)} type="pill" />
                  <SelectionGrid title="Eye Color" options={EYE_COLORS} selectedId={activeCharacter.eyeColor} onSelect={(v) => updateActiveCharacter('eyeColor', v)} type="color" />
                  <SelectionGrid title="Mouth" options={MOUTH_STYLES} selectedId={activeCharacter.mouth} onSelect={(v) => updateActiveCharacter('mouth', v)} type="pill" />
                  <SelectionGrid title="Makeup" options={MAKEUP_STYLES} selectedId={activeCharacter.makeup} onSelect={(v) => updateActiveCharacter('makeup', v)} type="pill" />
                </>
              )}
              {activeTab === 'hair' && (
                <>
                  <SelectionGrid title="Hair Style" options={HAIR_STYLES} selectedId={activeCharacter.hairStyle} onSelect={(v) => updateActiveCharacter('hairStyle', v)} type="pill" />
                  <SelectionGrid title="Hair Color" options={HAIR_COLORS} selectedId={activeCharacter.hairColor} onSelect={(v) => updateActiveCharacter('hairColor', v)} type="color" />
                </>
              )}
              {activeTab === 'body' && (
                <>
                  <SelectionGrid title="Model Type" options={MODEL_TYPES} selectedId={activeCharacter.modelType} onSelect={(v) => updateActiveCharacter('modelType', v)} type="pill" />
                  <SelectionGrid title="Body Proportion" options={BODY_PROPORTIONS} selectedId={activeCharacter.bodyProportion} onSelect={(v) => updateActiveCharacter('bodyProportion', v)} type="pill" />
                  <SelectionGrid title="Pose" options={POSES} selectedId={activeCharacter.pose} onSelect={(v) => updateActiveCharacter('pose', v)} type="pill" />
                </>
              )}
              {activeTab === 'attire' && (
                <>
                  <SelectionGrid 
                    title="Dress Style (Layerable)" 
                    options={DRESS_STYLES} 
                    selectedId={activeCharacter.dress} 
                    onSelect={(v) => {
                      const current = activeCharacter.dress;
                      if (Array.isArray(current)) {
                        if (current.includes(v)) {
                          updateActiveCharacter('dress', current.filter(id => id !== v));
                        } else {
                          updateActiveCharacter('dress', [...current, v]);
                        }
                      } else {
                        updateActiveCharacter('dress', [current, v]);
                      }
                    }} 
                    type="pill" 
                  />
                  <SelectionGrid title="Dress Color" options={DRESS_COLORS} selectedId={activeCharacter.dressColor} onSelect={(v) => updateActiveCharacter('dressColor', v)} type="color" />
                  <SelectionGrid title="Cloak" options={CLOAKS} selectedId={activeCharacter.cloak} onSelect={(v) => updateActiveCharacter('cloak', v)} type="pill" />
                </>
              )}
              {activeTab === 'effects' && (
                <>
                  <SelectionGrid title="Wings" options={WINGS} selectedId={activeCharacter.wings} onSelect={(v) => updateActiveCharacter('wings', v)} type="pill" />
                  <SelectionGrid title="Headpiece" options={ACCESSORY_STYLES} selectedId={activeCharacter.accessory} onSelect={(v) => updateActiveCharacter('accessory', v)} type="pill" />
                  <SelectionGrid title="Animated Effects" options={ANIMATED_ACCESSORIES} selectedId={activeCharacter.animatedAccessory} onSelect={(v) => updateActiveCharacter('animatedAccessory', v)} type="pill" />
                </>
              )}
              {activeTab === 'presets' && (
                <div className="space-y-4">
                  <button
                    onClick={savePreset}
                    className="w-full py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-sm text-white font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <Plus size={16} />
                    Save Current Character as Preset
                  </button>
                  
                  <div className="space-y-2 mt-6">
                    <h3 className="text-xs uppercase tracking-[0.2em] mb-4 text-white/60 font-medium">Saved Presets</h3>
                    {presets.length === 0 ? (
                      <p className="text-white/40 text-sm text-center py-4">No presets saved yet.</p>
                    ) : (
                      presets.map((preset: any) => (
                        <div key={preset.id} className="flex items-center justify-between p-3 bg-black/20 border border-white/10 rounded-xl hover:bg-white/5 transition-colors">
                          <span className="text-white text-sm font-medium">{preset.name}</span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => loadPreset(preset)}
                              className="px-3 py-1.5 bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 rounded-lg text-xs font-medium transition-colors"
                            >
                              Load
                            </button>
                            <button
                              onClick={() => deletePreset(preset.id)}
                              className="p-1.5 text-white/40 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

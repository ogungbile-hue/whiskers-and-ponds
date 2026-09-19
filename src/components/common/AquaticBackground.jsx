import React from 'react';

/* 
  Animated catfish swimming across the background.
  Uses the real catfish photo at varying sizes, speeds, and vertical positions.
*/
const FISH_CONFIG = [
  { id: 1, size: 120, top: '12%',  duration: 22, delay: 0,    dir: 'right' },
  { id: 2, size: 80,  top: '35%',  duration: 28, delay: 6,    dir: 'left'  },
  { id: 3, size: 150, top: '58%',  duration: 18, delay: 3,    dir: 'right' },
  { id: 4, size: 65,  top: '75%',  duration: 32, delay: 12,   dir: 'left'  },
  { id: 5, size: 100, top: '20%',  duration: 25, delay: 9,    dir: 'right' },
  { id: 6, size: 90,  top: '85%',  duration: 20, delay: 15,   dir: 'right' },
  { id: 7, size: 55,  top: '48%',  duration: 35, delay: 4,    dir: 'left'  },
];

const BUBBLES = [
  { id: 1, left: '8%',  size: 8,  duration: 8,  delay: 0 },
  { id: 2, left: '22%', size: 5,  duration: 11, delay: 3 },
  { id: 3, left: '40%', size: 10, duration: 9,  delay: 1 },
  { id: 4, left: '55%', size: 6,  duration: 13, delay: 5 },
  { id: 5, left: '70%', size: 8,  duration: 7,  delay: 2 },
  { id: 6, left: '85%', size: 12, duration: 10, delay: 7 },
  { id: 7, left: '95%', size: 5,  duration: 12, delay: 4 },
];

export default function AquaticBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Ocean gradient layers */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(160deg, #0e8fa0 0%, #0a7080 25%, #085f70 55%, #064f60 80%, #053d4d 100%)',
        }}
      />

      {/* Deep water shimmer */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: `repeating-linear-gradient(
            90deg,
            transparent,
            transparent 80px,
            rgba(255,255,255,0.03) 80px,
            rgba(255,255,255,0.03) 160px
          )`,
        }}
      />

      {/* Light caustics on top */}
      <div
        className="absolute top-0 left-0 right-0 h-64 opacity-15"
        style={{
          background: 'radial-gradient(ellipse at 30% 0%, rgba(150,240,255,0.4) 0%, transparent 60%), radial-gradient(ellipse at 70% 0%, rgba(100,220,240,0.3) 0%, transparent 50%)',
        }}
      />

      {/* Bottom darker depth */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 opacity-60"
        style={{
          background: 'linear-gradient(to top, rgba(3,25,35,0.5) 0%, transparent 100%)',
        }}
      />

      {/* Swimming catfish */}
      {FISH_CONFIG.map((fish) => (
        <img
          key={fish.id}
          src="/catfish.png"
          alt=""
          className={fish.dir === 'right' ? 'fish-swim-right' : 'fish-swim-left'}
          style={{
            width: fish.size,
            top: fish.top,
            animationDuration: `${fish.duration}s`,
            animationDelay: `${fish.delay}s`,
            opacity: 0,
            filter: 'brightness(0.7) saturate(0.8)',
            mixBlendMode: 'screen',
          }}
        />
      ))}

      {/* Bubbles */}
      {BUBBLES.map((b) => (
        <div
          key={b.id}
          className="bubble"
          style={{
            left: b.left,
            bottom: '-20px',
            width: b.size,
            height: b.size,
            background: 'rgba(255,255,255,0.2)',
            border: '1px solid rgba(255,255,255,0.3)',
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

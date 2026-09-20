import React from 'react';
import { ShieldCheck, Clock, Flame, ArrowRight, Sparkles, Fish } from 'lucide-react';

export default function HeroSection({ onOrder, onViewProducts }) {
  return (
    <section className="relative z-10 flex flex-col justify-center px-4 sm:px-8 md:px-10 py-8 sm:py-14 min-h-[calc(100vh-100px)]">
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

        {/* Left: Text Content & High-Impact Order CTA */}
        <div className="animate-fade-up text-left">
          {/* Freshness Badge */}
          <div className="inline-flex items-center gap-2 glass rounded-full px-3.5 py-1.5 text-white/90 text-xs font-semibold mb-5 sm:mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Zero-Mud Spring-Raised Catfish</span>
          </div>

          <h1 className="text-3xl sm:text-5xl xl:text-6xl font-black text-white leading-[1.1] tracking-tight">
            Committed to<br />
            <span className="text-white/90">the freshest</span><br />
            <span
              style={{
                background: 'linear-gradient(90deg, #a8f4ff, #e0fffa, #ffffff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              catfish ever.
            </span>
          </h1>

          <p className="mt-4 sm:mt-5 text-white/80 text-sm sm:text-base lg:text-lg leading-relaxed max-w-lg">
            Pond-raised African catfish sold live or kiln-smoked. Clean spring water, zero mud flavour — delivered fresh to your kitchen or venue.
          </p>

          {/* Guarantees Row */}
          <div className="mt-5 sm:mt-7 flex flex-wrap gap-2 sm:gap-3">
            {[
              { icon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />, text: 'Spring Purged' },
              { icon: <Clock className="w-3.5 h-3.5 text-cyan-300" />, text: 'Point & Kill' },
              { icon: <Flame className="w-3.5 h-3.5 text-amber-300" />, text: '18-Hr Kiln Smoked' },
            ].map((b) => (
              <div key={b.text} className="flex items-center gap-1.5 glass rounded-full px-3 py-1.5 text-white/90 text-xs font-medium">
                {b.icon}
                {b.text}
              </div>
            ))}
          </div>

          {/* Call-to-Action with Calling Vibrating Button */}
          <div className="mt-8 sm:mt-10">
            {/* Urgency hint right above button */}
            <div className="inline-flex items-center gap-1.5 text-amber-200 text-xs font-bold tracking-wide uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              <span>Direct Pond Dispatch · Fresh Harvest Today</span>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4">
              <button
                onClick={onOrder}
                id="hero-order-now-btn"
                className="btn-calling-order px-8 sm:px-10 py-4 sm:py-4.5 text-base sm:text-lg flex items-center justify-center gap-3 group shadow-2xl"
              >
                {/* Live ping beacon */}
                <span className="relative flex h-3 w-3 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-85"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                </span>

                <span className="tracking-wide">ORDER NOW</span>

                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform shrink-0" />
              </button>

              <button
                onClick={onViewProducts}
                className="btn-outline px-6 py-3.5 text-sm sm:text-base flex items-center justify-center gap-2 hover:bg-white/10 text-center"
              >
                <span>View Products</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Hero catfish with ambient glow & badges */}
        <div className="relative flex items-center justify-center animate-fade-up-2 py-4 sm:py-8">
          {/* Ambient radial glow */}
          <div
            className="absolute w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full opacity-35 pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(150,240,255,0.6) 0%, transparent 70%)',
              filter: 'blur(24px)',
            }}
          />
          {/* Concentric rings */}
          <div
            className="absolute w-52 h-52 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full pointer-events-none"
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.18)',
            }}
          />
          <div
            className="absolute w-36 h-36 sm:w-48 sm:h-48 md:w-60 md:h-60 rounded-full pointer-events-none"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.12)',
            }}
          />

          {/* The catfish */}
          <img
            src="/catfish.png"
            alt="Fresh African Catfish"
            className="animate-hero-float relative z-10 drop-shadow-2xl max-w-full h-auto select-none"
            style={{
              width: 'clamp(260px, 45vw, 480px)',
              filter: 'drop-shadow(0 20px 60px rgba(0,0,0,0.5)) brightness(1.05)',
            }}
          />

          {/* Floating starting price chip */}
          <div className="absolute -bottom-2 sm:bottom-4 left-1 sm:left-0 glass rounded-2xl px-3.5 py-2.5 sm:px-4 sm:py-3 text-white animate-fade-up-3 shadow-xl backdrop-blur-md border border-white/25">
            <div className="text-[9px] sm:text-[10px] text-white/70 font-medium uppercase tracking-wider">Starting from</div>
            <div className="text-lg sm:text-2xl font-black text-white">₦19,500</div>
            <div className="text-[10px] sm:text-[11px] text-white/70">5kg family basket</div>
          </div>

          {/* Availability chip */}
          <div className="absolute -top-2 sm:top-4 right-1 sm:right-0 glass rounded-2xl px-3 py-2 sm:px-3.5 sm:py-2.5 text-white shadow-xl backdrop-blur-md border border-white/25">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs sm:text-sm font-bold">Harvest Ready</span>
            </div>
            <div className="text-[10px] sm:text-[11px] text-white/70 mt-0.5">Daily pond pickup &amp; delivery</div>
          </div>
        </div>
      </div>

      {/* Stats bar in regular document flow — fully responsive on all screens */}
      <div className="w-full max-w-3xl mx-auto mt-10 sm:mt-14">
        <div className="glass rounded-2xl p-4 sm:p-5 grid grid-cols-3 divide-x divide-white/15 shadow-xl border border-white/20">
          {[
            { number: '500+', label: 'Orders Monthly' },
            { number: '4 Ponds', label: 'Spring-Fed' },
            { number: '6 min', label: 'Avg. Callback' },
          ].map((s) => (
            <div key={s.label} className="text-center px-2 sm:px-4">
              <div className="text-xl sm:text-2xl lg:text-3xl font-black text-white">{s.number}</div>
              <div className="text-[10px] sm:text-xs text-white/70 font-medium mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { Sparkles, Terminal, Code, Cpu } from 'lucide-react';
import { BIO } from '@/data';
import { useApp } from '@/context/AppContext';

export default function Hero() {
  const { messages, hoveredIcon } = useApp();

  return (
    <section 
      id="hero-banner" 
      className="py-12 px-6 md:px-12 border-b border-border-subtle/20 bg-gradient-to-b from-surface-slate/20 to-transparent relative overflow-hidden"
    >
      <div className="max-w-5xl">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="font-serif text-xs font-bold tracking-widest text-primary-container uppercase bg-primary-container/10 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-primary-container animate-pulse" />
            {messages.hero.heroSubtitle || "Fullstack Developer"}
          </span>

          {/* Dynamic Interactive Icon Tag hovered state indicator */}
          {hoveredIcon && (
            <span className="font-mono text-[10px] uppercase tracking-widest text-primary-container bg-primary-container/20 border border-primary-container/40 px-2.5 py-1 rounded-lg animate-fade-in flex items-center gap-1">
              {hoveredIcon === 'database' && <Cpu className="w-3.5 h-3.5" />}
              {hoveredIcon === 'code' && <Code className="w-3.5 h-3.5" />}
              {hoveredIcon === 'server' && <Terminal className="w-3.5 h-3.5" />}
              Foco activo: {hoveredIcon}
            </span>
          )}
        </div>

        <h2 className="font-serif text-4xl sm:text-5xl font-bold text-on-surface mt-4 tracking-tight leading-tight">
          Codificar con <span className="text-primary-container">Precisión</span>.<br/>
          Diseñar con <span className="text-primary-container">Estructura</span>.
        </h2>

        <p className="font-sans text-sm md:text-base text-on-surface-variant max-w-2xl mt-4 leading-relaxed">
          {messages.hero.heroDescription ? `${messages.hero.heroDescription}. ${BIO.tagline}` : `${BIO.tagline} ${BIO.about}`}
        </p>
      </div>
    </section>
  );
}

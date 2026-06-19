"use client";

import { motion } from 'motion/react';
import { Database, Wind, Leaf, Atom, Hexagon } from 'lucide-react';
import { useApp } from '@/context/AppContext';

interface TechItem {
  id: string;
  name: string;
  matchFn: (tags: string[]) => boolean;
  colorClass: string;
  bgClass: string;
  borderClass: string;
  glowColor: string;
  renderIcon: (isActive: boolean) => React.ReactNode;
}

const TECH_ITEMS: TechItem[] = [
  {
    id: 'postgresql',
    name: 'PostgreSQL / Prisma',
    matchFn: (tags) => tags.some(t => {
      const l = t.toLowerCase();
      return l.includes('sql') || l.includes('prisma') || l.includes('postgres') || l.includes('db');
    }),
    colorClass: 'text-indigo-400',
    bgClass: 'bg-indigo-400/15',
    borderClass: 'border-indigo-400/40',
    glowColor: '0 0 15px rgba(129, 140, 248, 0.45)',
    renderIcon: (active) => <Database className={`w-[18px] h-[18px] transition-transform duration-300 ${active ? 'scale-110' : 'scale-100'}`} />
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    matchFn: (tags) => tags.some(t => {
      const l = t.toLowerCase();
      return l.includes('tailwind') || l.includes('css3');
    }),
    colorClass: 'text-cyan-400',
    bgClass: 'bg-cyan-400/15',
    borderClass: 'border-cyan-400/40',
    glowColor: '0 0 15px rgba(34, 211, 238, 0.45)',
    renderIcon: (active) => <Wind className={`w-[18px] h-[18px] transition-all duration-300 ${active ? 'scale-110 rotate-12' : 'scale-100'}`} />
  },
  {
    id: 'bootstrap',
    name: 'Bootstrap',
    matchFn: (tags) => tags.some(t => t.toLowerCase().includes('bootstrap')),
    colorClass: 'text-purple-400',
    bgClass: 'bg-purple-950/40',
    borderClass: 'border-purple-500/40',
    glowColor: '0 0 15px rgba(168, 85, 247, 0.45)',
    renderIcon: (active) => (
      <span className={`font-mono font-extrabold text-[13px] tracking-tight transition-transform duration-300 select-none ${active ? 'scale-115' : 'scale-100 opacity-60'}`}>
        B
      </span>
    )
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    matchFn: (tags) => tags.some(t => {
      const l = t.toLowerCase();
      return l.includes('next.js') || l.includes('nextjs');
    }),
    colorClass: 'text-white border-white/20',
    bgClass: 'bg-black/90',
    borderClass: 'border-neutral-700',
    glowColor: '0 0 15px rgba(255, 255, 255, 0.25)',
    renderIcon: (active) => (
      <span className={`font-sans font-black text-[13px] tracking-tighter transition-transform duration-300 select-none ${active ? 'scale-115' : 'scale-100 opacity-70'}`}>
        N
      </span>
    )
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    matchFn: (tags) => tags.some(t => t.toLowerCase().includes('mongo')),
    colorClass: 'text-emerald-400',
    bgClass: 'bg-emerald-400/15',
    borderClass: 'border-emerald-400/40',
    glowColor: '0 0 15px rgba(52, 211, 153, 0.45)',
    renderIcon: (active) => <Leaf className={`w-[18px] h-[18px] transition-transform duration-300 ${active ? 'scale-110' : 'scale-100'}`} />
  },
  {
    id: 'react',
    name: 'React.js',
    matchFn: (tags) => tags.some(t => {
      const l = t.toLowerCase();
      return l.includes('react') || l.includes('reactjs');
    }),
    colorClass: 'text-sky-400',
    bgClass: 'bg-sky-400/15',
    borderClass: 'border-sky-400/40',
    glowColor: '0 0 15px rgba(56, 189, 248, 0.45)',
    renderIcon: (active) => <Atom className={`w-[18px] h-[18px] transition-transform duration-300 ${active ? 'scale-110' : 'scale-100'}`} />
  },
  {
    id: 'html5',
    name: 'HTML5',
    matchFn: (tags) => tags.some(t => t.toLowerCase().includes('html')),
    colorClass: 'text-amber-500',
    bgClass: 'bg-amber-500/15',
    borderClass: 'border-amber-500/40',
    glowColor: '0 0 15px rgba(245, 158, 11, 0.45)',
    renderIcon: (active) => (
      <span className={`font-sans font-extrabold text-[12px] transition-transform duration-300 select-none ${active ? 'scale-110' : 'scale-100 opacity-60'}`}>
        5
      </span>
    )
  },
  {
    id: 'css3',
    name: 'CSS3',
    matchFn: (tags) => tags.some(t => t.toLowerCase().includes('css')),
    colorClass: 'text-blue-500',
    bgClass: 'bg-blue-500/15',
    borderClass: 'border-blue-500/40',
    glowColor: '0 0 15px rgba(59, 130, 246, 0.45)',
    renderIcon: (active) => (
      <span className={`font-sans font-extrabold text-[12px] transition-transform duration-300 select-none ${active ? 'scale-110' : 'scale-100 opacity-60'}`}>
        3
      </span>
    )
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    matchFn: (tags) => tags.some(t => {
      const l = t.toLowerCase();
      return l.includes('js') || l.includes('javascript') || l.includes('react') || l.includes('node');
    }),
    colorClass: 'text-yellow-400',
    bgClass: 'bg-yellow-400/15',
    borderClass: 'border-yellow-400/40',
    glowColor: '0 0 15px rgba(250, 204, 21, 0.45)',
    renderIcon: (active) => (
      <span className={`font-mono font-bold text-[10px] tracking-tighter transition-transform duration-300 select-none ${active ? 'scale-110' : 'scale-100'}`}>
        JS
      </span>
    )
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    matchFn: (tags) => tags.some(t => {
      const l = t.toLowerCase();
      return l.includes('ts') || l.includes('typescript');
    }),
    colorClass: 'text-sky-500',
    bgClass: 'bg-sky-500/15',
    borderClass: 'border-sky-500/40',
    glowColor: '0 0 15px rgba(14, 165, 233, 0.45)',
    renderIcon: (active) => (
      <span className={`font-sans font-extrabold text-[10px] tracking-tighter transition-transform duration-300 select-none ${active ? 'scale-110' : 'scale-100'}`}>
        TS
      </span>
    )
  },
  {
    id: 'nodejs',
    name: 'Node.js / Express',
    matchFn: (tags) => tags.some(t => {
      const l = t.toLowerCase();
      return l.includes('node') || l.includes('express') || l.includes('api');
    }),
    colorClass: 'text-green-400',
    bgClass: 'bg-green-400/15',
    borderClass: 'border-green-400/40',
    glowColor: '0 0 15px rgba(74, 222, 128, 0.45)',
    renderIcon: (active) => <Hexagon className={`w-[18px] h-[18px] transition-transform duration-300 ${active ? 'scale-110' : 'scale-100'}`} />
  }
];

export default function TechToolbar() {
  const { hoveredTags } = useApp();

  const scrollItems = [...TECH_ITEMS, ...TECH_ITEMS];

  return (
    <div 
      className="hidden lg:flex flex-col items-center justify-start bg-neutral-950 border border-neutral-800 rounded-2xl py-6 px-3 shadow-2xl h-full w-16 overflow-hidden select-none relative"
      id="tech-vertical-toolbar"
    >
      {/* Dynamic continuous scroll styles */}
      <style>{`
        @keyframes techToolbarScrollUp {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-594px);
          }
        }
        .tech-scroll-anim {
          animation: techToolbarScrollUp 25s linear infinite;
        }
        .tech-scroll-anim:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Premium ambient top & bottom visual edge fades */}
      <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-neutral-950 via-neutral-950/90 to-transparent z-25 pointer-events-none rounded-t-2xl" />
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-neutral-950 via-neutral-950/90 to-transparent z-25 pointer-events-none rounded-b-2xl" />

      {/* Infinite scrolling items wrapper */}
      <div className="tech-scroll-anim flex flex-col gap-3.5 pt-4">
        {scrollItems.map((item, index) => {
          const isHoverStateActive = hoveredTags !== null;
          const isUsedInProject = hoveredTags !== null && item.matchFn(hoveredTags);
          const isActive = isHoverStateActive && isUsedInProject;
          const isDimmed = isHoverStateActive && !isUsedInProject;

          return (
            <div 
              key={`${item.id}-${index}`} 
              className="group relative"
              id={`tech-toolbar-item-${item.id}-${index}`}
            >
              {/* Elegant Tooltip */}
              <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 translate-x-2 group-hover:translate-x-0 z-30">
                <div className="bg-zinc-900 text-white border border-zinc-800 text-[10px] font-mono tracking-wide px-2.5 py-1.5 rounded-lg shadow-xl whitespace-nowrap">
                  {item.name}
                </div>
              </div>

              {/* Glowing Icon Container */}
              <motion.div
                style={{
                  boxShadow: isActive ? item.glowColor : 'none'
                }}
                className={`
                  w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-400 border
                  ${isActive 
                    ? `${item.bgClass} ${item.colorClass} ${item.borderClass} scale-105 border-opacity-100` 
                    : isDimmed
                      ? 'bg-neutral-900/10 text-neutral-600/40 border-transparent scale-95 opacity-20' 
                      : 'bg-zinc-950/40 text-neutral-500 border-zinc-800/40 hover:text-neutral-300 hover:border-zinc-700'
                  }
                `}
              >
                {item.renderIcon(isActive)}
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

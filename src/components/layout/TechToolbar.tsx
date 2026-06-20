"use client";

import { useRef, useState } from "react";
import type { IconType } from "react-icons";
import {
  FaBootstrap,
  FaCss3Alt,
  FaHtml5,
  FaJs,
  FaNodeJs,
  FaReact,
} from "react-icons/fa";
import { DiGit, DiMysql, DiPostgresql } from "react-icons/di";
import {
  SiDbeaver,
  SiDocker,
  SiFirebase,
  SiMongodb,
  SiNextdotjs,
  SiReactrouter,
  SiTailwindcss,
  SiTypescript,
  SiVite,
} from "react-icons/si";
import { motion } from "motion/react";
import { useApp } from "@/context/AppContext";

interface HoveredTechLabel {
  name: string;
  top: number;
}

type BrowserWindowWithWebkitAudio = Window & {
  webkitAudioContext?: typeof AudioContext;
};

interface TechItem {
  id: string;
  name: string;
  matchFn: (tags: string[]) => boolean;
  Icon: IconType;
  activeClass: string;
}

const TECH_ITEMS: TechItem[] = [
  {
    id: "bootstrap",
    name: "Bootstrap",
    matchFn: (tags) => tags.some((t) => t.toLowerCase().includes("bootstrap")),
    Icon: FaBootstrap,
    activeClass: "text-purple-500",
  },
  {
    id: "nextjs",
    name: "Next.js",
    matchFn: (tags) =>
      tags.some((t) => {
        const l = t.toLowerCase();
        return l.includes("next.js") || l.includes("nextjs");
      }),
    Icon: SiNextdotjs,
    activeClass: "text-white",
  },
  {
    id: "mongodb",
    name: "MongoDB",
    matchFn: (tags) => tags.some((t) => t.toLowerCase().includes("mongo")),
    Icon: SiMongodb,
    activeClass: "text-emerald-500",
  },
  {
    id: "react",
    name: "React.js",
    matchFn: (tags) =>
      tags.some((t) => {
        const l = t.toLowerCase();
        return l.includes("react") || l.includes("reactjs");
      }),
    Icon: FaReact,
    activeClass: "text-cyan-400",
  },
  {
    id: "html5",
    name: "HTML5",
    matchFn: (tags) => tags.some((t) => t.toLowerCase().includes("html")),
    Icon: FaHtml5,
    activeClass: "text-orange-500",
  },
  {
    id: "css3",
    name: "CSS3",
    matchFn: (tags) => tags.some((t) => t.toLowerCase().includes("css")),
    Icon: FaCss3Alt,
    activeClass: "text-blue-500",
  },
  {
    id: "javascript",
    name: "JavaScript",
    matchFn: (tags) =>
      tags.some((t) => {
        const l = t.toLowerCase();
        return (
          l.includes("js") ||
          l.includes("javascript") ||
          l.includes("react") ||
          l.includes("node")
        );
      }),
    Icon: FaJs,
    activeClass: "text-yellow-400",
  },
  {
    id: "typescript",
    name: "TypeScript",
    matchFn: (tags) =>
      tags.some((t) => {
        const l = t.toLowerCase();
        return l.includes("ts") || l.includes("typescript");
      }),
    Icon: SiTypescript,
    activeClass: "text-sky-500",
  },
  {
    id: "nodejs",
    name: "Node.js / Express",
    matchFn: (tags) =>
      tags.some((t) => {
        const l = t.toLowerCase();
        return l.includes("node") || l.includes("express") || l.includes("api");
      }),
    Icon: FaNodeJs,
    activeClass: "text-green-500",
  },
  {
    id: "git",
    name: "Git",
    matchFn: (tags) => tags.some((t) => t.toLowerCase().includes("git")),
    Icon: DiGit,
    activeClass: "text-orange-600",
  },
  {
    id: "postgresql",
    name: "PostgreSQL / Prisma",
    matchFn: (tags) =>
      tags.some((t) => {
        const l = t.toLowerCase();
        return (
          l.includes("sql") ||
          l.includes("prisma") ||
          l.includes("postgres") ||
          l.includes("db")
        );
      }),
    Icon: DiPostgresql,
    activeClass: "text-blue-400",
  },
  {
    id: "mysql",
    name: "MySQL",
    matchFn: (tags) =>
      tags.some((t) => {
        const l = t.toLowerCase();
        return l.includes("mysql") || l === "sql";
      }),
    Icon: DiMysql,
    activeClass: "text-blue-600",
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    matchFn: (tags) =>
      tags.some((t) => {
        const l = t.toLowerCase();
        return l.includes("tailwind") || l.includes("css3");
      }),
    Icon: SiTailwindcss,
    activeClass: "text-cyan-300",
  },
  {
    id: "vite",
    name: "Vite",
    matchFn: (tags) => tags.some((t) => t.toLowerCase().includes("vite")),
    Icon: SiVite,
    activeClass: "text-purple-400",
  },
  {
    id: "react-router",
    name: "React Router",
    matchFn: (tags) => tags.some((t) => t.toLowerCase().includes("router")),
    Icon: SiReactrouter,
    activeClass: "text-pink-400",
  },
  {
    id: "firebase",
    name: "Firebase",
    matchFn: (tags) =>
      tags.some((t) => {
        const l = t.toLowerCase();
        return l.includes("firebase") || l.includes("firestore");
      }),
    Icon: SiFirebase,
    activeClass: "text-yellow-500",
  },
  {
    id: "docker",
    name: "Docker",
    matchFn: (tags) => tags.some((t) => t.toLowerCase().includes("docker")),
    Icon: SiDocker,
    activeClass: "text-blue-400",
  },
  {
    id: "dbeaver",
    name: "DBeaver",
    matchFn: (tags) => tags.some((t) => t.toLowerCase().includes("dbeaver")),
    Icon: SiDbeaver,
    activeClass: "text-amber-900",
  },
];

export default function TechToolbar() {
  const { hoveredTags } = useApp();
  const [hoveredTechId, setHoveredTechId] = useState<string | null>(null);
  const [hoveredTechLabel, setHoveredTechLabel] =
    useState<HoveredTechLabel | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const lastSoundAtRef = useRef(0);

  const scrollItems = [...TECH_ITEMS, ...TECH_ITEMS];

  const playKeyHoverSound = () => {
    if (typeof window === "undefined") return;

    const now = performance.now();
    if (now - lastSoundAtRef.current < 45) return;
    lastSoundAtRef.current = now;

    const browserWindow = window as BrowserWindowWithWebkitAudio;
    const AudioContextConstructor =
      window.AudioContext ?? browserWindow.webkitAudioContext;

    if (!AudioContextConstructor) return;

    const audioContext =
      audioContextRef.current ?? new AudioContextConstructor();
    audioContextRef.current = audioContext;

    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    const startTime = audioContext.currentTime;

    oscillator.type = "triangle";
    oscillator.frequency.setValueAtTime(820, startTime);
    oscillator.frequency.exponentialRampToValueAtTime(520, startTime + 0.045);

    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.exponentialRampToValueAtTime(0.035, startTime + 0.006);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.055);

    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.start(startTime);
    oscillator.stop(startTime + 0.06);
  };

  return (
    <div
      className="hidden lg:flex flex-col items-center justify-start bg-neutral-950/95 border border-neutral-900 rounded-lg py-6 px-3 shadow-2xl h-full w-20 overflow-visible select-none relative"
      id="tech-vertical-toolbar"
    >
      {/* Dynamic continuous scroll styles */}
      <style>{`
        @keyframes techToolbarScrollUp {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-972px);
          }
        }
        .tech-scroll-anim {
          animation: techToolbarScrollUp 25s linear infinite;
        }
        .tech-scroll-anim:hover {
          animation-play-state: paused;
        }
      `}</style>

      {hoveredTechLabel && (
        <div
          className="absolute right-full mr-2 z-50 -translate-y-1/2 pointer-events-none"
          style={{ top: hoveredTechLabel.top }}
        >
          <div className="bg-neutral-950/95 text-on-surface border border-neutral-800 text-[11px] font-mono font-bold tracking-[0.25em] uppercase px-4 py-2 rounded-l-lg rounded-r-sm shadow-2xl whitespace-nowrap">
            {hoveredTechLabel.name}
          </div>
        </div>
      )}

      <div className="absolute inset-0 overflow-hidden rounded-md">
        {/* Premium ambient top & bottom visual edge fades */}
        <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-neutral-950 via-neutral-950/90 to-transparent z-25 pointer-events-none rounded-t-md" />
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-neutral-950 via-neutral-950/90 to-transparent z-25 pointer-events-none rounded-b-md" />

        {/* Infinite scrolling items wrapper */}
        <div className="tech-scroll-anim flex flex-col items-center gap-3.5 pt-10">
          {scrollItems.map((item, index) => {
            const Icon = item.Icon;
            const isHoverStateActive = hoveredTags !== null;
            const isUsedInProject =
              hoveredTags !== null && item.matchFn(hoveredTags);
            const isActive = isHoverStateActive && isUsedInProject;
            const isDimmed = isHoverStateActive && !isUsedInProject;
            const isIconHovered = hoveredTechId === item.id;
            const isHighlighted = isActive || isIconHovered;

            return (
              <div
                key={`${item.id}-${index}`}
                className="group relative"
                id={`tech-toolbar-item-${item.id}-${index}`}
                onMouseEnter={(event) => {
                  setHoveredTechId(item.id);
                  playKeyHoverSound();
                  const toolbarRect = event.currentTarget
                    .closest("#tech-vertical-toolbar")
                    ?.getBoundingClientRect();
                  const itemRect = event.currentTarget.getBoundingClientRect();
                  if (toolbarRect) {
                    setHoveredTechLabel({
                      name: item.name,
                      top: itemRect.top - toolbarRect.top + itemRect.height / 2,
                    });
                  }
                }}
                onMouseLeave={() => {
                  setHoveredTechId(null);
                  setHoveredTechLabel(null);
                }}
              >
                {/* Glowing Icon Container */}
                <motion.div
                  className={`
                  w-10 h-10 flex items-center justify-center transition-all duration-400 rounded-lg
                  ${
                    isHighlighted
                      ? item.activeClass
                      : isDimmed
                        ? "text-neutral-700/35 opacity-25"
                        : "text-neutral-700 hover:text-neutral-400"
                  }
                `}
                >
                  <Icon className="text-[28px]" />
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

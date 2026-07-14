"use client";

import {
  ExternalLink,
  ChevronRight,
  /*   Sparkles, */
  Database,
  Layers,
  Award,
  Info,
} from "lucide-react";
import { Project } from "@/types";
import { useApp } from "@/context/AppContext";

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  const { setHoveredIcon, setHoveredTags, messages } = useApp();
  const roleFlags = (project.roles ?? []).map((role) => role.toLowerCase());
  const roleSummary =
    roleFlags.length > 0
      ? messages.Projects.roleSummary.replace("{roles}", roleFlags.join(" / "))
      : null;

  const handleMouseEnter = () => {
    setHoveredTags(project.tags);
    if (project.icon) {
      setHoveredIcon(project.icon);
    } else if (
      project.tags.some(
        (t) =>
          t.toLowerCase().includes("sql") ||
          t.toLowerCase().includes("database") ||
          t.toLowerCase().includes("prisma"),
      )
    ) {
      setHoveredIcon("database");
    } else if (
      project.tags.some(
        (t) =>
          t.toLowerCase().includes("node") ||
          t.toLowerCase().includes("express") ||
          t.toLowerCase().includes("api"),
      )
    ) {
      setHoveredIcon("server");
    } else {
      setHoveredIcon("code");
    }
  };

  const handleMouseLeave = () => {
    setHoveredIcon(null);
    setHoveredTags(null);
  };

  if (project.category === "recent") {
    return (
      <div
        id={`project-card-${project.id}`}
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="
      relative
      h-115
      w-full

      rounded-lg
      border-2
      border-white/10
      bg-black/50
   
      cursor-pointer
      flex
      flex-col
      group
      transition-all
      duration-300
      hover:-translate-y-1
    "
      >
        {/* Borde superior */}
        <div className="absolute top-0 left-10 right-10 h-[2px] bg-gradient-to-r from-transparent via-primary-container/90 to-transparent opacity-10 transition-opacity group-hover:opacity-100" />

        {/* Borde inferior */}
        <div className="absolute bottom-0 left-10 right-10 h-[2px] bg-gradient-to-r from-transparent via-primary-container/90 to-transparent opacity-10 transition-opacity group-hover:opacity-100" />

        {/* IMAGE */}
        <div className="relative flex-[2.8] ">
          {roleSummary && (
            <div className="absolute -left-2 -top-2 z-30 pointer-events-none opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:-translate-y-1">
              <span className="rounded-sm border border-yellow-400 bg-yellow-300 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.16em] whitespace-nowrap text-slate-900">
                {roleSummary}
              </span>
            </div>
          )}
          <img
            src={project.image}
            alt={project.title}
            referrerPolicy="no-referrer"
            className="
            overflow-hidden
            rounded-t-lg
          w-full
          h-full
          object-cover
        "
          />
        </div>

        {/* CONTENT */}
        <div className="flex flex-col flex-2 p-4">
          {/* TAGS */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="
              bg-surface-charcoal/90
              border
              border-border-subtle
              px-2
              py-1
              rounded
              text-[10px]
              font-semibold
              text-text-muted
              whitespace-nowrap
            "
              >
                {tag}
              </span>
            ))}
          </div>

          {/* TITLE + DESCRIPTION */}
          <div className="flex-1">
            <h4
              className="
            font-serif
            text-[26px]
            leading-none
            font-bold
            text-on-surface
            mb-3
          "
            >
              {project.title}
            </h4>

            <p
              className="
            text-sm
            text-text-muted
            line-clamp-2
            leading-relaxed
          "
            >
              {project.description}
            </p>
          </div>

          {/* FOOTER */}
          <div className="flex justify-between items-center pt-4">
            <span
              className="
            flex
            items-center
            gap-1
            text-xs
            font-bold
            text-primary-container
            uppercase
          "
            >
              {messages.Projects["cardDescription"]}
              <ChevronRight className="w-3.5 h-3.5" />
            </span>

            {project.demoUrl && project.demoUrl !== "#" && (
              <span
                className="
              text-text-muted
              transition-colors
              group-hover:text-primary-container
            "
                title="Visitar Aplicación"
              >
                <ExternalLink className="w-4 h-4" />
              </span>
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div
        id={`prev-card-${project.id}`}
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative overflow-hidden rounded-lg border border-white/10 bg-surface-slate p-2  transition-all duration-300 hover:-translate-y-1 group cursor-pointer flex flex-col aspect-square w-full"
      >
        <div className="relative z-10 flex h-full flex-col">
          {/* Glow */}
          <div className="pointer-events-none absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100 shadow-[0_0_40px_rgba(234,179,8,0.08)]" />

          {/* Borde superior */}
          <div className="absolute top-0 left-10 right-10 h-[2px] bg-gradient-to-r from-transparent via-primary-container/90 to-transparent opacity-70 transition-opacity group-hover:opacity-100" />

          {/* Borde inferior */}
          <div className="absolute bottom-0 left-10 right-10 h-[2px] bg-gradient-to-r from-transparent via-primary-container/90 to-transparent opacity-50 transition-opacity group-hover:opacity-100" />

          <div className="aspect-square w-full overflow-hidden relative rounded-lg border-b border-white/10">
            {roleSummary && (
              <div className="absolute -left-3 -top-3 z-30 pointer-events-none opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:-translate-y-1">
                <span className="rounded-lg border border-yellow-400 bg-yellow-300 px-2 py-0.5 text-[8px] font-black uppercase tracking-[0.16em] whitespace-nowrap text-slate-900 shadow-[0_0_0_2px_rgba(255,255,255,0.35),0_8px_20px_rgba(0,0,0,0.35)] backdrop-blur-sm">
                  {roleSummary}
                </span>
              </div>
            )}
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-all duration-500 rounded-lg"
              referrerPolicy="no-referrer"
            />
          </div>
          <h4 className="font-serif text-base font-bold text-on-surface group-hover:text-primary-container transition-colors line-clamp-1 mb-1">
            {project.title}
          </h4>
          <p className="text-text-muted font-sans text-xs line-clamp-2 leading-relaxed">
            {project.description}
          </p>
        </div>
        <div className="flex items-center gap-1 text-[10px] text-text-muted uppercase tracking-widest font-bold">
          {project.icon === "database" && (
            <Database className="w-3.5 h-3.5 text-primary-container" />
          )}
          {project.icon === "shopping_cart" && (
            <Layers className="text-primary-container w-3.5 h-3.5" />
          )}
          {project.icon === "verified" && (
            <Award className="w-3.5 h-3.5 text-primary-container" />
          )}

          <span>{project.tags[0]}</span>
        </div>
        <ChevronRight className="w-4 h-4 text-text-muted group-hover:text-primary-container group-hover:translate-x-1 transition-all" />
      </div>
    );
  }
}

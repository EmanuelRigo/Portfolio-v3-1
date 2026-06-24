"use client";

import {
  ExternalLink,
  ChevronRight,
  Sparkles,
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
  const { setHoveredIcon, setHoveredTags } = useApp();

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
        className="relative aspect-square w-full overflow-hidden rounded-2xl border border-border-subtle bg-surface-slate group hover:border-primary-container hover:shadow-[0_0_30px_rgba(250,204,21,0.05)] cursor-pointer flex flex-col"
      >
        <div className="relative flex-1 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-all duration-500"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="flex flex-col p-2">
          <div className="flex flex-wrap gap-1.5 mb-1">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="bg-surface-charcoal border border-border-subtle px-2.5 py-0.5 rounded font-sans text-[10px] font-semibold text-text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
          <h4 className="font-serif text-lg font-bold text-on-surface">
            {project.title}
          </h4>
          <p className="text-sm line-clamp-2 text-text-muted">
            {project.description}
          </p>
          <div className="flex justify-between items-center pt-1 border-t border-border-subtle mt-1">
            <span className="flex items-center gap-1 text-xs font-bold text-on-surface">
              VER DETALLES COMPLETO <ChevronRight className="w-3.5 h-3.5" />
            </span>
            {project.demoUrl && project.demoUrl !== "#" && (
              <span
                className="text-text-muted hover:text-primary-container"
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
        className="bg-surface-slate border border-border-subtle rounded-2xl p-2 hover:bg-surface-slate/80 hover:border-primary-container/60 transition-all group cursor-pointer flex flex-col aspect-square w-full"
      >
        <div>
          <div className="aspect-square w-full overflow-hidden relative border-b border-border-subtle">
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
          {project.icon === "bolt" && (
            <Sparkles className="w-3.5 h-3.5 text-primary-container" />
          )}
          <span>{project.tags[0]}</span>
        </div>
        <ChevronRight className="w-4 h-4 text-text-muted group-hover:text-primary-container group-hover:translate-x-1 transition-all" />
      </div>
    );
  }
}

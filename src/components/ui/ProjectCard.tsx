"use client";

import { ExternalLink, ChevronRight, Sparkles, Database, Layers, Award, Info } from 'lucide-react';
import { Project } from '@/types';
import { useApp } from '@/context/AppContext';

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
    } else if (project.tags.some(t => t.toLowerCase().includes('sql') || t.toLowerCase().includes('database') || t.toLowerCase().includes('prisma'))) {
      setHoveredIcon('database');
    } else if (project.tags.some(t => t.toLowerCase().includes('node') || t.toLowerCase().includes('express') || t.toLowerCase().includes('api'))) {
      setHoveredIcon('server');
    } else {
      setHoveredIcon('code');
    }
  };

  const handleMouseLeave = () => {
    setHoveredIcon(null);
    setHoveredTags(null);
  };

  if (project.category === 'recent') {
    return (
      <div 
        id={`project-card-${project.id}`}
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="project-card group bg-surface-slate rounded-2xl border border-border-subtle overflow-hidden transition-all duration-500 hover:border-primary-container hover:shadow-[0_0_30px_rgba(250,204,21,0.05)] cursor-pointer flex flex-col h-full"
      >
        {/* Grayscale to color dynamic image container */}
        <div className="aspect-video w-full overflow-hidden relative border-b border-border-subtle">
          <img 
            src={project.image} 
            alt={project.title} 
            className="project-image w-full h-full object-cover transition-all duration-500" 
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-3 right-3 bg-surface-charcoal/80 backdrop-blur-md border border-border-subtle p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Info className="w-4 h-4 text-primary-container" />
          </div>
        </div>

        <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between">
          <div className="space-y-4">
            {/* Tags list */}
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map(tag => (
                <span 
                   key={tag}
                   className="bg-surface-charcoal border border-border-subtle px-2.5 py-0.5 rounded font-sans text-[10px] font-semibold text-text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h4 className="font-serif text-xl font-bold text-on-surface group-hover:text-primary-container transition-colors">
              {project.title}
            </h4>
            <p className="text-on-surface-variant font-sans text-xs sm:text-sm leading-relaxed line-clamp-2">
              {project.description}
            </p>
          </div>

          <div className="pt-6 border-t border-border-subtle/40 mt-6 flex items-center justify-between">
            <span className="text-primary-container font-sans text-xs font-bold tracking-wider flex items-center gap-1 group-hover:gap-2 transition-all">
              VER DETALLES COMPLETO <ChevronRight className="w-3.5 h-3.5" />
            </span>
            
            {project.demoUrl && project.demoUrl !== '#' && (
              <span className="text-text-muted hover:text-primary-container z-10" title="Visitar Aplicación">
                <ExternalLink className="w-4 h-4" />
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Previous category (Compact representation)
  return (
    <div 
      id={`prev-card-${project.id}`}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="bg-surface-slate border border-border-subtle rounded-2xl p-4 hover:bg-surface-slate/80 hover:border-primary-container/60 transition-all group cursor-pointer flex flex-col justify-between h-full"
    >
      <div>
        {/* Image Thumbnail */}
        <div className="w-full aspect-video rounded-lg mb-4 overflow-hidden relative bg-surface-charcoal/60 border border-border-subtle/60">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
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

      <div className="flex justify-between items-center mt-4 pt-3 border-t border-border-subtle/20">
        <div className="flex items-center gap-1 text-[10px] text-text-muted uppercase tracking-widest font-bold">
          {project.icon === 'database' && <Database className="w-3.5 h-3.5 text-primary-container" />}
          {project.icon === 'shopping_cart' && <Layers className="text-primary-container w-3.5 h-3.5" />}
          {project.icon === 'verified' && <Award className="w-3.5 h-3.5 text-primary-container" />}
          {project.icon === 'bolt' && <Sparkles className="w-3.5 h-3.5 text-primary-container" />}
          <span>{project.tags[0]}</span>
        </div>
        <ChevronRight className="w-4 h-4 text-text-muted group-hover:text-primary-container group-hover:translate-x-1 transition-all" />
      </div>
    </div>
  );
}

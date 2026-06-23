"use client";

import { Project } from "@/types";
import projectDataEs from "../../data/dataProjects/projectData.json";
import projectDataEn from "../../data/dataProjects/projectData_en.json";
import { useApp } from "@/context/AppContext";
import ProjectCard from "@/components/ui/ProjectCard";

interface ProjectsSectionProps {
  onProjectClick: (project: Project) => void;
}

export default function ProjectsSection({
  onProjectClick,
}: ProjectsSectionProps) {
  const { lang, messages } = useApp();
  const projectData = lang === "ENG" ? projectDataEn : projectDataEs;
  const PROJECTS: Project[] = Object.values(projectData) as Project[];

  return (
    <>
      {/* SECTION 1: PROYECTOS RECIENTES */}
      <section id="recent" className="py-16 px-6 lg:px-16">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <h3 className="font-serif text-2xl font-bold tracking-tight">
              {messages.Projects?.["Recent Projects"] || "Proyectos Recientes"}
            </h3>
            <div className="h-px flex-grow bg-border-subtle/70" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PROJECTS.filter((p) => p.category === "recent").map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => onProjectClick(project)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: PROYECTOS ANTERIORES */}
      <section
        id="previous"
        className="py-16 px-6 lg:px-16 border-t border-border-subtle/30 bg-surface-slate/10"
      >
        <div className="max-w-5xl mx-auto font-sans">
          <div className="mb-12">
            <h3 className="font-serif text-2xl font-bold tracking-tight mb-2">
              {messages.Projects?.["Old Projects"] || "Proyectos Antiguos"}
            </h3>
            <p className="text-on-surface-variant text-sm max-w-xl">
              {messages.Projects.previousDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROJECTS.filter((p) => p.category === "previous").map(
              (project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={() => onProjectClick(project)}
                />
              ),
            )}
          </div>
        </div>
      </section>
    </>
  );
}

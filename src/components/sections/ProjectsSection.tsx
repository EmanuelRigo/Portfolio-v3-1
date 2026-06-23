"use client";

import React from "react";
import { Project } from "@/types";
import { useApp } from "@/context/AppContext";
import ProjectCard from "@/components/ui/ProjectCard";

interface ProjectsSectionProps {
  onProjectClick: (project: Project) => void;
}

export default function ProjectsSection({
  onProjectClick,
}: ProjectsSectionProps) {
  const { lang, messages } = useApp();
  const langCode = lang === "ENG" ? "en" : "es";

  const [recentProjects, setRecentProjects] = React.useState<Project[]>([]);
  const [previousProjects, setPreviousProjects] = React.useState<Project[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const [recentRes, oldRes] = await Promise.all([
        fetch('/data/dataProjects/projectData_bilingual.json'),
        fetch('/data/dataProjects/oldProjectData_bilingual.json')
      ]);
      const [recentJson, oldJson] = await Promise.all([recentRes.json(), oldRes.json()]);
      setRecentProjects(processBilingualData(recentJson, "recent"));
      setPreviousProjects(processBilingualData(oldJson, "previous"));
    };
    fetchData();
  }, [langCode]);

  // Process bilingual data to match Project interface
const processBilingualData = (data: unknown, category: "recent" | "previous"): Project[] => {
    const entries = Object.entries(data as Record<string, any>);
    return entries.map(([key, project]) => {
      const proj = project as any;
      const langData = proj.languages[langCode];
      // Determine icon based on techStack
      let icon: string | undefined;
      const techStackLower = proj.techStack.map((t: string) => t.toLowerCase());
      if (techStackLower.some(t => t.includes("sql") || t.includes("database") || t.includes("mysql") || t.includes("postgres"))) {
        icon = "database";
      } else if (techStackLower.some(t => t.includes("node") || t.includes("express") || t.includes("api") || t.includes("backend"))) {
        icon = "server";
      } else if (techStackLower.some(t => t.includes("react") || t.includes("next") || t.includes("vue") || t.includes("frontend"))) {
        icon = "code";
      } else if (techStackLower.some(t => t.includes("design") || t.includes("figma") || t.includes("photoshop") || t.includes("ui") || t.includes("ux"))) {
        icon = "palette";
      } else {
        icon = "code"; // default icon
      }

      const demoUrl = proj.liveLinks && proj.liveLinks.length > 0 ? proj.liveLinks[0].url : proj.repoLink;
      return {
        id: key,
        title: proj.title,
        description: langData.description,
        detailedDescription: langData.modal,
        image: proj.image,
        tags: proj.techStack,
        demoUrl: demoUrl,
        githubUrl: proj.repoLink,
        category: category,
        icon: icon,
        features: langData.features,
        architecture: proj.techStack.join(", ")
      };
    });
  };



  const PROJECTS: Project[] = [...recentProjects, ...previousProjects];

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

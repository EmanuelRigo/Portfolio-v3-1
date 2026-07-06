
"use client";

import {
  Briefcase,
  GraduationCap,
  MessageSquare,
} from "lucide-react";

import {
  FaGitAlt,
  FaGithub,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaBootstrap,
  FaNodeJs,
  FaDocker,
  FaLinux,
} from "react-icons/fa";

import {
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiPostman,
  SiDbeaver,
} from "react-icons/si";

import { EXPERIENCES, EDUCATION } from "@/data/workExperience";
import { useApp } from "@/context/AppContext";
import InfoColumn from "@/components/ui/InfoColumn";

interface ResumeSectionProps {
  onLaunchChat: () => void;
}

export default function ResumeSection({
  onLaunchChat,
}: ResumeSectionProps) {
  const { messages, lang } = useApp();

  const locale = (lang === "ENG" ? "en" : "es") as "en" | "es";

  const experienceData = EXPERIENCES[locale] || EXPERIENCES.en;
  const educationData = EDUCATION[locale] || EDUCATION.en;

  const experienceItems = experienceData.map((exp) => ({
    title: exp.role,
    subtitle: exp.company,
    badge: exp.period,
    highlights: exp.highlights,
  }));

  const educationItems = educationData.map((edu) => ({
    title: edu.degree,
    subtitle: edu.institution,
    badge: edu.status,
    highlights: edu.highlights,
  }));

  const toolsTech = [
    { name: "Git", icon: <FaGitAlt className="text-orange-500" /> },
    { name: "GitHub", icon: <FaGithub /> },
    { name: "Responsive", icon: <span>📱</span> },
    { name: "Linux", icon: <FaLinux /> },
    { name: "DBeaver", icon: <SiDbeaver className="text-orange-500" /> },
    { name: "Postman", icon: <SiPostman className="text-orange-500" /> },
    { name: "Docker", icon: <FaDocker className="text-blue-500" /> },
    { name: "English B1", icon: <span>🇬🇧</span> },
  ];

  const backendTech = [
    { name: "Node.js", icon: <FaNodeJs className="text-green-500" /> },
    { name: "Express", icon: <SiExpress /> },
    { name: "MongoDB", icon: <SiMongodb className="text-green-500" /> },
    { name: "MySQL", icon: <SiMysql className="text-blue-500" /> },
  ];

  const frontendTech = [
    { name: "HTML", icon: <FaHtml5 className="text-orange-500" /> },
    { name: "CSS", icon: <FaCss3Alt className="text-blue-500" /> },
    { name: "JavaScript", icon: <FaJs className="text-yellow-400" /> },
    { name: "TypeScript", icon: <SiTypescript className="text-blue-500" /> },
    { name: "React", icon: <FaReact className="text-cyan-400" /> },
    { name: "Next.js", icon: <SiNextdotjs /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss className="text-cyan-400" /> },
    { name: "Bootstrap", icon: <FaBootstrap className="text-purple-500" /> },
  ];

  return (
    <section
      id="resume"
      className="py-16 px-6 lg:px-0 border-t border-border-subtle/30 bg-surface-slate/10"
    >
      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="flex items-center gap-4 mb-12 ">
          <h3 className="font-serif text-2xl font-bold tracking-tight">
            {messages.Header?.resume || "Currículum y Perfil Técnico"}
          </h3>
          <div className="h-px flex-grow bg-border-subtle/70" />
        </div>

        {/* GRID PRINCIPAL */}
       <div className="grid grid-cols-1 lg:grid-cols-[1.45fr_1.15fr] gap-14 items-start">

          {/* EXPERIENCIA + EDUCACIÓN */}
         <div className="space-y-12 min-w-0">
            <InfoColumn
              title={messages.Resume?.title || "Experiencia Laboral"}
              icon={<Briefcase className="w-5 h-5 text-primary-container" />}
              items={experienceItems}
            />

            <InfoColumn
              title={messages.Resume?.educationTitle || "Educación y Formación"}
              icon={<GraduationCap className="w-5 h-5 text-primary-container" />}
              items={educationItems}
              isSubtleBadge
            />
          </div>

          {/* SKILLS */}
       <div className="w-full font-sans rounded-2xl ">
  <div className="w-full rounded-2xl border border-border-subtle bg-surface-slate px-5 py-5">
    <div className="grid grid-cols-3 gap-0">
      
      {/* Tools */}
      <div className="border-r border-border-subtle ">
        <h4 className="mb-4 border-b border-border-subtle pb-2 text-base font-bold text-on-surface">
          Tools
        </h4>

        <div className="space-y-3">
          {toolsTech.map((tech) => (
            <div
              key={tech.name}
              className="flex items-center gap-3 text-sm text-on-surface-variant"
            >
              <span className="flex w-5 shrink-0 justify-center text-lg">
                {tech.icon}
              </span>
              <span>{tech.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Backend */}
      <div className="border-r border-border-subtle px-4">
        <h4 className="mb-4 border-b border-border-subtle pb-2 text-base font-bold text-on-surface">
          Backend
        </h4>

        <div className="space-y-3">
          {backendTech.map((tech) => (
            <div
              key={tech.name}
              className="flex items-center gap-3 text-sm text-on-surface-variant"
            >
              <span className="flex w-5 shrink-0 justify-center text-lg">
                {tech.icon}
              </span>
              <span>{tech.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Frontend */}
      <div className="pl-4">
        <h4 className="mb-4 border-b border-border-subtle pb-2 text-base  font-bold text-on-surface">
          Frontend
        </h4>

        <div className="space-y-3">
          {frontendTech.map((tech) => (
            <div
              key={tech.name}
              className="flex items-center gap-3 text-sm text-on-surface-variant"
            >
              <span className="flex w-5 shrink-0 justify-center text-lg">
                {tech.icon}
              </span>
              <span>{tech.name}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  </div>
</div>
        </div>

      </div>
    </section>
  );
}
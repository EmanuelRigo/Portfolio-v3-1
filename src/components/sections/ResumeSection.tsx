"use client";

import { Briefcase, GraduationCap, Cpu } from "lucide-react";

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
import MasteredTechnologies from "@/components/sections/MasteredTechnologies";
import IntegratedAIAssistant from "@/components/sections/IntegratedAIAssistant";

interface ResumeSectionProps {
  onLaunchChat: () => void;
}

export default function ResumeSection({ onLaunchChat }: ResumeSectionProps) {
  const { messages, lang } = useApp();

  // Get experience data for the current language
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
        <div className="flex flex-col mb-8">
          <div className="flex items-center gap-4 mb-12">
            <h3 className="font-serif text-2xl font-bold tracking-tight">
              {messages.Header?.resume || "Currículum y Perfil Técnico"}
            </h3>
            <div className="h-px grow bg-border-subtle/70" />
          </div>
          <MasteredTechnologies
            title={
              messages.Resume?.masteredTechnologies || "Tecnologías Dominadas"
            }
            toolsTech={toolsTech}
            backendTech={backendTech}
            frontendTech={frontendTech}
            backendCategory={
              messages.Resume?.backendCategory || "Backend y Storage"
            }
            frontendCategory={messages.Resume?.frontendCategory || "Frontend"}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.45fr_1.15fr] gap-14 items-start">
          {/* Timeline Columns (Experience & Education) */}
          <div className="space-y-12 min-w-0">
            <InfoColumn
              title={messages.Resume?.title || "Experiencia Laboral"}
              icon={<Briefcase className="w-5 h-5 text-primary-container" />}
              items={experienceItems}
            />

            <InfoColumn
              title={messages.Resume?.educationTitle || "Educación y Formación"}
              icon={
                <GraduationCap className="w-5 h-5 text-primary-container" />
              }
              items={educationItems}
              isSubtleBadge={true}
            />
          </div>

          {/* Right Column: Stack & AI chatbot launcher card */}
          <div className="space-y-8 font-sans w-full">
            <IntegratedAIAssistant
              onLaunchChat={onLaunchChat}
              label={messages.Resume?.aiAssistantLabel || "IA INTEGRADA"}
              title={
                messages.Resume?.aiAssistantTitle || "¿Dudas sobre mi perfil?"
              }
              description={
                messages.Resume?.aiAssistantDescription ||
                "Chateá con mi avatar virtual potenciado por **AI Assistant** para repasar mi stack u horarios académicos en tiempo real."
              }
              buttonLabel={
                messages.Resume?.launchChatButton || "INICIAR CHAT DE CONSULTAS"
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}

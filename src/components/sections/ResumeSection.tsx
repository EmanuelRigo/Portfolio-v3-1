"use client";

import {
  Briefcase,
  GraduationCap,
  Cpu,
  /*   Sparkles, */
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
        <div className="flex items-center gap-4 mb-12">
          <h3 className="font-serif text-2xl font-bold tracking-tight">
            {messages.Header?.resume || "Currículum y Perfil Técnico"}
          </h3>
          <div className="h-px grow bg-border-subtle/70" />
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
            {/* Mastered Technologies — categorized grid */}
            <div className="rounded-2xl border border-border-subtle bg-surface-slate p-6 space-y-4">
              <h4 className="font-serif text-base font-bold text-on-surface flex items-center gap-2">
                <Cpu className="w-5 h-5 text-primary-container" />
                <span>
                  {messages.Resume?.masteredTechnologies ||
                    "Tecnologías Dominadas"}
                </span>
              </h4>

              <div className="grid grid-cols-3 gap-0">
                {/* Tools */}
                <div className="border-r border-border-subtle pr-4">
                  <span className="text-[10px] text-text-muted uppercase tracking-wider block mb-3 font-bold font-mono">
                    Tools
                  </span>
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
                  <span className="text-[10px] text-text-muted uppercase tracking-wider block mb-3 font-bold font-mono">
                    {messages.Resume?.backendCategory || "Backend y Storage"}
                  </span>
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
                  <span className="text-[10px] text-text-muted uppercase tracking-wider block mb-3 font-bold font-mono">
                    {messages.Resume?.frontendCategory || "Frontend"}
                  </span>
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

            {/* Integrated AI Assistant Box */}
            <div className="bg-gradient-to-br from-surface-slate to-surface-charcoal border border-primary-container/30 p-6 rounded-2xl relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 -mr-6 -mt-6 w-24 h-24 bg-primary-container/5 rounded-full blur-2xl" />

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  {/*            <Sparkles className="w-5 h-5 text-primary-container animate-bounce" /> */}
                  <span className="text-xs font-bold text-primary-container uppercase tracking-widest font-mono">
                    {messages.Resume?.aiAssistantLabel || "IA INTEGRADA"}
                  </span>
                </div>
                <h4 className="font-serif text-lg font-bold text-on-surface">
                  {messages.Resume?.aiAssistantTitle ||
                    "¿Dudas sobre mi perfil?"}
                </h4>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  {messages.Resume?.aiAssistantDescription ||
                    "Chateá con mi avatar virtual potenciado por **AI Assistant** para repasar mi stack u horarios académicos en tiempo real."}
                </p>
              </div>

              <button
                id="launch-chat-widget-btn"
                onClick={onLaunchChat}
                className="mt-6 flex items-center justify-center gap-2 w-full py-3 bg-surface-slate border border-primary-container hover:bg-primary-container hover:text-on-primary rounded-xl text-xs font-bold transition-all text-primary-container cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                {messages.Resume?.launchChatButton ||
                  "INICIAR CHAT DE CONSULTAS"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

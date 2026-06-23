"use client";

import {
  Briefcase,
  GraduationCap,
  Cpu,
  Sparkles,
  MessageSquare,
} from "lucide-react";
import { EXPERIENCES, EDUCATION } from "@/data/workExperience";
import { useApp } from "@/context/AppContext";
import InfoColumn from "@/components/ui/InfoColumn";

interface ResumeSectionProps {
  onLaunchChat: () => void;
}

export default function ResumeSection({ onLaunchChat }: ResumeSectionProps) {
  const { messages, lang } = useApp();

  // Get experience data for the current language
  const experienceData =
    EXPERIENCES[lang === "ENG" ? "en" : "es"] || EXPERIENCES.en;

  const experienceItems = experienceData.map((exp) => ({
    title: exp.role,
    subtitle: exp.company,
    badge: exp.period,
    highlights: exp.highlights,
  }));

  const educationItems = EDUCATION.map((edu) => ({
    title: edu.degree,
    subtitle: edu.institution,
    badge: edu.status,
    highlights: edu.highlights,
  }));

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
          <div className="h-px flex-grow bg-border-subtle/70" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Timeline Columns (Experience & Education) */}
          <div className="lg:col-span-2 space-y-12">
            <InfoColumn
              title={messages.Resume?.title || "Experiencia Laboral"}
              icon={<Briefcase className="w-5 h-5 text-primary-container" />}
              items={experienceItems}
            />

            <InfoColumn
              title="Educación y Formación"
              icon={
                <GraduationCap className="w-5 h-5 text-primary-container" />
              }
              items={educationItems}
              isSubtleBadge={true}
            />
          </div>

          {/* Right Column: Stack & AI chatbot launcher card */}
          <div className="space-y-8 font-sans">
            <div className="bg-surface-slate border border-border-subtle p-6 rounded-2xl space-y-4">
              <h4 className="font-serif text-base font-bold text-on-surface flex items-center gap-2">
                <Cpu className="w-5 h-5 text-primary-container" />
                <span>Tecnologías Dominadas</span>
              </h4>

              <div className="space-y-4">
                <div>
                  <span className="text-[10px] text-text-muted uppercase tracking-wider block mb-1.5 font-bold font-mono">
                    Frontend
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      "React",
                      "Next.js",
                      "TypeScript",
                      "Tailwind v4",
                      "Motion",
                      "Zustand",
                      "Context API",
                    ].map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 rounded bg-surface-charcoal border border-border-subtle text-xs text-on-surface-variant font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] text-text-muted uppercase tracking-wider block mb-1.5 font-bold font-mono">
                    Backend y Storage
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      "Node.js",
                      "Express",
                      "Prisma ORM",
                      "PostgreSQL",
                      "Firebase Firestore",
                      "REST APIs",
                    ].map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 rounded bg-surface-charcoal border border-border-subtle text-xs text-on-surface-variant font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] text-text-muted uppercase tracking-wider block mb-1.5 font-bold font-mono">
                    Entorno
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      "Git / GitHub",
                      "Docker",
                      "Vite",
                      "npm / bun",
                      "Criptografía firma",
                    ].map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 rounded bg-surface-charcoal border border-border-subtle text-xs text-on-surface-variant font-medium"
                      >
                        {tag}
                      </span>
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
                  <Sparkles className="w-5 h-5 text-primary-container animate-bounce" />
                  <span className="text-xs font-bold text-primary-container uppercase tracking-widest font-mono">
                    IA INTEGRADA
                  </span>
                </div>
                <h4 className="font-serif text-lg font-bold text-on-surface">
                  ¿Dudas sobre mi perfil?
                </h4>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Chateá con mi avatar virtual potenciado por **AI Assistant** para repasar mi stack u horarios académicos en tiempo real.
                </p>
              </div>

              <button
                id="launch-chat-widget-btn"
                onClick={onLaunchChat}
                className="mt-6 flex items-center justify-center gap-2 w-full py-3 bg-surface-slate border border-primary-container hover:bg-primary-container hover:text-on-primary rounded-xl text-xs font-bold transition-all text-primary-container cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                INICIAR CHAT DE CONSULTAS
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

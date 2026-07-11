import type { ReactNode } from "react";
import { Cpu } from "lucide-react";

interface TechItem {
  name: string;
  icon: ReactNode;
}

interface MasteredTechnologiesProps {
  title: string;
  toolsTech: TechItem[];
  backendTech: TechItem[];
  frontendTech: TechItem[];
  backendCategory: string;
  frontendCategory: string;
}

export default function MasteredTechnologies({
  title,
  toolsTech,
  backendTech,
  frontendTech,
  backendCategory,
  frontendCategory,
}: MasteredTechnologiesProps) {
  return (
    <div className="rounded-lg border border-border-subtle bg-black/50 p-4 space-y-4">
      <h4 className="font-serif text-base font-bold text-on-surface flex items-center gap-2">
        <Cpu className="w-5 h-5 text-primary-container" />
        <span>{title}</span>
      </h4>

      <div className="grid grid-cols-3 gap-0">
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

        <div className="border-r border-border-subtle px-4">
          <span className="text-[10px] text-text-muted uppercase tracking-wider block mb-3 font-bold font-mono">
            {backendCategory}
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

        <div className="pl-4">
          <span className="text-[10px] text-text-muted uppercase tracking-wider block mb-3 font-bold font-mono">
            {frontendCategory}
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
  );
}

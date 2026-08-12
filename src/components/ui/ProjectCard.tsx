"use client";

import { ExternalLink, ChevronRight } from "lucide-react";

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
      project.tags.some((t) => {
        const tag = t.toLowerCase();

        return (
          tag.includes("sql") ||
          tag.includes("database") ||
          tag.includes("prisma")
        );
      })
    ) {
      setHoveredIcon("database");
    } else if (
      project.tags.some((t) => {
        const tag = t.toLowerCase();

        return (
          tag.includes("node") || tag.includes("express") || tag.includes("api")
        );
      })
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

  const cardId =
    project.category === "recent"
      ? `project-card-${project.id}`
      : `prev-card-${project.id}`;

  if (project.category === "recent") {
    return (
      <div
        id={cardId}
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="
          group
          relative
          flex
          h-[500px]
          w-full
          cursor-pointer
          flex-col
          overflow-hidden
          rounded-lg
          border-2
          border-white/10
          bg-black/50
          transition-all
          duration-300
          hover:-translate-y-1
        "
      >
        {/* BORDE SUPERIOR */}
        <div
          className="
            absolute
            left-10
            right-10
            top-0
            z-30
            h-[2px]
            bg-gradient-to-r
            from-transparent
            via-primary-container/90
            to-transparent
            opacity-10
            transition-opacity
            group-hover:opacity-100
          "
        />

        {/* BORDE INFERIOR */}
        <div
          className="
            absolute
            bottom-0
            left-10
            right-10
            z-30
            h-[2px]
            bg-gradient-to-r
            from-transparent
            via-primary-container/90
            to-transparent
            opacity-10
            transition-opacity
            group-hover:opacity-100
          "
        />

        <div className="relative h-[220px] w-full shrink-0 overflow-hidden">
          {roleSummary && (
            <div
              className="
                pointer-events-none
                absolute
                left-3
                top-3
                z-40
                opacity-0
                transition-all
                duration-300
                group-hover:-translate-y-1
                group-hover:opacity-100
              "
            >
              <span
                className="
                  rounded-sm
                  border
                  border-yellow-400
                  bg-yellow-300
                  px-2.5
                  py-1
                  text-[9px]
                  font-black
                  uppercase
                  tracking-[0.16em]
                  whitespace-nowrap
                  text-slate-900
                "
              >
                {roleSummary}
              </span>
            </div>
          )}

          <img
            src={project.image}
            alt={project.title}
            referrerPolicy="no-referrer"
            className="block h-full w-full object-cover object-center"
          />

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              bg-gradient-to-t
              from-black/40
              via-transparent
              to-transparent
            "
          />
        </div>

        <div className="flex flex-1 flex-col px-4 pb-4 pt-3">
          <div className="h-[76px] shrink-0 overflow-hidden">
            <div className="flex flex-wrap content-start gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="
                    inline-flex
                    h-[28px]
                    items-center
                    rounded
                    border
                    border-border-subtle
                    bg-surface-charcoal/90
                    px-2
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
          </div>

          <div className="h-[58px] shrink-0 overflow-hidden">
            <h4
              className="
                m-0
                line-clamp-2
                font-serif
                text-[25px]
                font-bold
                leading-[1.05]
                text-on-surface
              "
            >
              {project.title}
            </h4>
          </div>

          <div className="h-[72px] shrink-0 overflow-hidden">
            <p
              className="
                m-0
                line-clamp-3
                text-sm
                leading-6
                text-text-muted
              "
            >
              {project.description}
            </p>
          </div>

          <div
            className="
              mt-auto
              flex
              h-[42px]
              shrink-0
              items-end
              justify-between
              pt-3
            "
          >
            <span
              className="
                flex
                items-center
                gap-1
                whitespace-nowrap
                text-xs
                font-bold
                uppercase
                text-primary-container
              "
            >
              {messages.Projects["cardDescription"]}

              <ChevronRight
                className="
                  h-3.5
                  w-3.5
                  shrink-0
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />
            </span>

            {project.demoUrl && project.demoUrl !== "#" && (
              <span
                className="
                  shrink-0
                  text-text-muted
                  transition-colors
                  duration-300
                  group-hover:text-primary-container
                "
                title="Visitar Aplicación"
              >
                <ExternalLink className="h-4 w-4" />
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      id={cardId}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="
        group
        relative
        flex
        w-full
        cursor-pointer
        flex-col
        overflow-hidden
        rounded-lg
        border-2
        border-white/10
        bg-black/50
        transition-all
        duration-300
        hover:-translate-y-1
      "
    >
      {/* ChevronRight esquina superior derecha */}
      <ChevronRight
        className="
          absolute
          right-2
          top-2
          z-40
          h-3.5
          w-3.5
          shrink-0
          text-primary-container
          opacity-0
          transition-all
          duration-300
          group-hover:translate-x-0.5
          group-hover:opacity-100
        "
      />

      {/* BORDE SUPERIOR */}
      <div
        className="
          absolute
          left-10
          right-10
          top-0
          z-30
          h-[2px]
          bg-gradient-to-r
          from-transparent
          via-primary-container/90
          to-transparent
          opacity-10
          transition-opacity
          group-hover:opacity-100
        "
      />

      {/* BORDE INFERIOR */}
      <div
        className="
          absolute
          bottom-0
          left-10
          right-10
          z-30
          h-[2px]
          bg-gradient-to-r
          from-transparent
          via-primary-container/90
          to-transparent
          opacity-10
          transition-opacity
          group-hover:opacity-100
        "
      />

      {/* =========================
          IMAGEN
      ========================== */}
      <div className="relative h-[160px] w-full shrink-0 overflow-hidden">
        {roleSummary && (
          <div
            className="
              pointer-events-none
              absolute
              left-3
              top-3
              z-40
              opacity-0
              transition-all
              duration-300
              group-hover:-translate-y-1
              group-hover:opacity-100
            "
          >
            <span
              className="
                rounded-sm
                border
                border-yellow-400
                bg-yellow-300
                px-2.5
                py-1
                text-[9px]
                font-black
                uppercase
                tracking-[0.16em]
                whitespace-nowrap
                text-slate-900
              "
            >
              {roleSummary}
            </span>
          </div>
        )}

        <img
          src={project.image}
          alt={project.title}
          referrerPolicy="no-referrer"
          className="
            block
            h-full
            w-full
            object-cover
            object-center
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-gradient-to-t
            from-black/40
            via-transparent
            to-transparent
          "
        />
      </div>

      {/* =========================
          CONTENIDO
      ========================== */}
      <div className="flex flex-col px-3 pb-3 pt-2.5">
        <div className="overflow-hidden">
          <div className="flex flex-wrap content-start gap-1.5">
            {project.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="
                  inline-flex
                  h-[22px]
                  items-center
                  rounded
                  border
                  border-border-subtle
                  bg-surface-charcoal/90
                  px-2
                  text-[10px]
                  font-semibold
                  text-text-muted
                  whitespace-nowrap
                "
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 4 && (
              <span className="inline-flex h-[22px] items-center rounded border border-border-subtle bg-surface-charcoal/90 px-2 text-[10px] font-semibold text-text-muted whitespace-nowrap">
                ...
              </span>
            )}
          </div>
        </div>

        <div className="mt-2 overflow-hidden">
          <h4
            className="
              m-0
              line-clamp-2
              font-serif
              text-[20px]
              font-bold
              leading-[1.05]
              text-on-surface
            "
          >
            {project.title}
          </h4>
        </div>

        <div className="mt-1.5 overflow-hidden">
          <p
            className="
              m-0
              line-clamp-4
              text-sm
              leading-5
              text-text-muted
            "
          >
            {project.description}
          </p>
        </div>

        {project.demoUrl && project.demoUrl !== "#" && (
          <span
            className="
              absolute
              bottom-2
              right-2
              z-40
              shrink-0
              text-text-muted
              transition-colors
              duration-300
              group-hover:text-primary-container
            "
            title="Visitar Aplicación"
          >
            <ExternalLink className="h-4 w-4" />
          </span>
        )}
      </div>
    </div>
  );
}

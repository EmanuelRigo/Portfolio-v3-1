"use client";

import { useState, useRef, useEffect } from "react";
import {
  Database,
  Code,
  Server,
  Award,
  ArrowUpRight,
  ChevronRight,
} from "lucide-react";
import { Certificate } from "@/types";

interface CertificateCardProps {
  cert: Certificate;
  onVerifyClick: () => void;
}

export function getCertificateIcon(
  iconName: string,
  className = "text-primary-container w-7 h-7",
) {
  switch (iconName) {
    case "database":
      return <Database className={className} />;
    case "code":
      return <Code className={className} />;
    case "server":
      return <Server className={className} />;
    default:
      return <Award className={className} />;
  }
}

export default function CertificateCard({
  cert,
  onVerifyClick,
}: CertificateCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [overflowDist, setOverflowDist] = useState(0);

  const checkOverflow = () => {
    if (titleRef.current && containerRef.current) {
      const scrollW = titleRef.current.scrollWidth;
      const clientW = containerRef.current.clientWidth;
      if (scrollW > clientW) {
        setOverflowDist(scrollW - clientW + 16);
      } else {
        setOverflowDist(0);
      }
    }
  };

  useEffect(() => {
    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [cert.title]);

  const handleMouseEnter = () => {
    checkOverflow();
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      id={`cert-card-${cert.id}`}
      onClick={onVerifyClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="
        group
        relative
        overflow-hidden
        flex
        flex-col
        justify-between
        max-md:aspect-square
        h-auto
        md:h-[230px]
        rounded-lg
        border
        border-white/10
        bg-black/50
        p-3
        sm:p-4
        md:p-5
        cursor-pointer
        transition-all
        duration-300
        hover:-translate-y-1
      "
    >
      {/* Glow */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          rounded-lg
          opacity-0
          transition-opacity
          duration-300
          group-hover:opacity-100
          shadow-[0_0_40px_rgba(234,179,8,0.08)]
        "
      />

      {/* Borde inferior */}
      <div
        className="
          absolute
          bottom-0
          left-10
          right-10
          h-[2px]
          bg-gradient-to-r
          from-transparent
          via-primary-container/90
          to-transparent
          opacity-10
          group-hover:opacity-100
          transition-opacity
        "
      />

      {/* Flecha */}
      <ChevronRight
        className="
          absolute
          top-3
          right-3
          md:top-5
          md:right-5
          w-4
          h-4
          md:w-5
          md:h-5
          text-text-muted
          transition-all
          duration-300
          group-hover:text-primary-container
          group-hover:translate-x-1
        "
      />

      <div className="relative z-10 flex flex-col items-start w-full">
        {/* Icono + Título al lado */}
        <div className="flex items-center gap-2 sm:gap-3 w-full min-w-0">
          <div
            className="
              inline-flex
              shrink-0
              items-center
              justify-center
              w-10
              h-10
              sm:w-12
              sm:h-12
              md:w-14
              md:h-14
              rounded-lg
              border
              border-primary-container/40
              bg-surface-charcoal
              transition-all
              duration-300
              group-hover:border-primary-container
            "
          >
            {getCertificateIcon(
              cert.icon,
              "text-primary-container w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7",
            )}
          </div>

          <div ref={containerRef} className="overflow-hidden min-w-0 flex-1">
            <h4
              ref={titleRef}
              style={{
                transform:
                  isHovered && overflowDist > 0
                    ? `translateX(-${overflowDist}px)`
                    : "translateX(0px)",
                transitionDuration:
                  isHovered && overflowDist > 0 ? "1200ms" : "400ms",
              }}
              className="
                text-sm
                sm:text-lg
                md:text-xl
                font-bold
                text-on-surface
                leading-snug
                whitespace-nowrap
                transition-all
                ease-out
                group-hover:text-white
              "
              title={cert.title}
            >
              {cert.title}
            </h4>
          </div>
        </div>

        {/* Badge */}
        <span
          className="
            inline-flex
            items-center
            mt-2
            sm:mt-2.5
            md:mt-3
            px-2
            sm:px-2.5
            md:px-3
            py-0.5
            md:py-1
            rounded
            md:rounded-lg
            border
            border-primary-container/40
            bg-primary-container/10
            text-primary-container
            text-[9px]
            sm:text-[10px]
            md:text-[10px]
            font-bold
            tracking-wider
            uppercase
          "
        >
          {cert.issuer}
        </span>

        {/* Línea */}
        <div className="hidden sm:block my-2 sm:my-3 md:my-4 border-t border-white/10 w-full" />

        {/* Descripción */}
        <p className="hidden sm:block text-xs sm:text-xs md:text-sm text-text-muted line-clamp-2 leading-snug md:leading-normal">
          {cert.description}
        </p>
      </div>

      {/* Footer */}
      <div className="relative z-10 flex items-center justify-between mt-auto pt-2 md:mt-5">
        <span className="text-[10px] sm:text-xs text-text-muted">
          {cert.date}
        </span>

        <div
          className="
            flex
            items-center
            gap-1
            sm:gap-1.5
            md:gap-2
            text-primary-container
            font-semibold
            text-[10px]
            sm:text-xs
            md:text-xs
            transition-all
            duration-300
            group-hover:gap-3
          "
        >
          <span>Verificar</span>

          <ArrowUpRight
            className="
              w-3
              h-3
              sm:w-3.5
              sm:h-3.5
              md:w-4
              md:h-4
              transition-transform
              duration-300
              group-hover:-translate-y-0.5
              group-hover:translate-x-0.5
            "
          />
        </div>
      </div>
    </div>
  );
}

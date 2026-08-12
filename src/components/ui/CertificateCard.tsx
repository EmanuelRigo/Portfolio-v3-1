"use client";

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
  return (
    <div
      id={`cert-card-${cert.id}`}
      onClick={onVerifyClick}
      className="
        group
        relative
        overflow-hidden
        flex
        flex-col
        justify-between
        h-[200px]
        md:h-[230px]
        rounded-lg
        border
        border-white/10
        bg-black/50
        p-3
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

      {/* Borde superior */}
      {/* <div
        className="
          absolute
          top-0
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
      /> */}

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

      <div className="relative z-10">
        {/* Icono */}
        <div
          className="
            inline-flex
            items-center
            justify-center
            w-10
            h-10
            md:w-14
            md:h-14
            rounded-lg
            border
            border-primary-container/40
            bg-surface-charcoal
            mb-2
            md:mb-4
            transition-all
            duration-300
            group-hover:border-primary-container
          "
        >
          {getCertificateIcon(
            cert.icon,
            "text-primary-container w-5 h-5 md:w-7 md:h-7",
          )}
        </div>

        {/* Título */}
        <h4
          className="
            text-sm
            md:text-xl
            font-semibold
            text-on-surface
            leading-tight
            md:leading-none
            transition-colors
            duration-300
            group-hover:text-white
          "
        >
          {cert.title}
        </h4>

        {/* Badge */}
        <span
          className="
            inline-flex
            items-center
            mt-2
            md:mt-3
            px-2
            md:px-3
            py-0.5
            md:py-1
            rounded-lg
            border
            border-primary-container/40
            bg-primary-container/10
            text-primary-container
            text-[8px]
            md:text-[10px]
            font-bold
            tracking-wider
            uppercase
          "
        >
          {cert.issuer}
        </span>

        {/* Línea */}
        <div className="my-2 md:my-4 border-t border-white/10" />

        {/* Descripción */}
        <p className="text-[10px] md:text-sm text-text-muted line-clamp-2 leading-snug md:leading-normal">
          {cert.description}
        </p>
      </div>

      {/* Footer */}
      <div className="relative z-10 flex items-center justify-between mt-3 md:mt-5">
        <span className="text-xs text-text-muted">{cert.date}</span>

        <div
          className="
            flex
            items-center
            gap-1
            md:gap-2
            text-primary-container
            font-semibold
            text-[10px]
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

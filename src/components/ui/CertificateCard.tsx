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
        h-[230px]
        rounded-lg
        border
        border-white/10
        bg-black/50
        p-5
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
          rounded-3xl
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
          top-5
          right-5
          w-5
          h-5
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
            w-14
            h-14
            rounded-2xl
            border
            border-primary-container/40
            bg-surface-charcoal
            mb-4
            transition-all
            duration-300
            group-hover:border-primary-container
          "
        >
          {getCertificateIcon(cert.icon)}
        </div>

        {/* Título */}
        <h4
          className="
            text-xl
            font-semibold
            text-on-surface
            leading-none
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
            mt-3
            px-3
            py-1
            rounded-full
            border
            border-primary-container/40
            bg-primary-container/10
            text-primary-container
            text-[10px]
            font-bold
            tracking-wider
            uppercase
          "
        >
          {cert.issuer}
        </span>

        {/* Línea */}
        <div className="my-4 border-t border-white/10" />

        {/* Descripción */}
        <p className="text-sm text-text-muted line-clamp-2">
          {cert.description}
        </p>
      </div>

      {/* Footer */}
      <div className="relative z-10 flex items-center justify-between mt-5">
        <span className="text-xs text-text-muted">{cert.date}</span>

        <div
          className="
            flex
            items-center
            gap-2
            text-primary-container
            font-semibold
            transition-all
            duration-300
            group-hover:gap-3
          "
        >
          <span>Verificar</span>

          <ArrowUpRight
            className="
              w-4
              h-4
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

"use client";

import { Database, Code, Server, Award } from 'lucide-react';
import { Certificate } from '@/types';

interface CertificateCardProps {
  cert: Certificate;
  onVerifyClick: () => void;
}

export function getCertificateIcon(iconName: string, className = "text-primary-container w-10 h-10") {
  switch (iconName) {
    case 'database': return <Database className={className} />;
    case 'code': return <Code className={className} />;
    case 'server': return <Server className={className} />;
    default: return <Award className={className} />;
  }
}

export default function CertificateCard({ cert, onVerifyClick }: CertificateCardProps) {
  return (
    <div 
      id={`cert-card-${cert.id}`}
      onClick={onVerifyClick}
      className="p-6 border border-border-subtle rounded-2xl bg-surface-slate hover:bg-surface-slate/80 hover:border-primary-container/80 transition-all group cursor-pointer flex flex-col justify-between"
    >
      <div>
        <div className="bg-surface-charcoal inline-flex p-3 rounded-xl border border-border-subtle group-hover:border-primary-container/30 transition-colors mb-4">
          {getCertificateIcon(cert.icon)}
        </div>
        <h4 className="font-serif text-lg font-semibold text-on-surface group-hover:text-primary-container transition-colors mb-1 shadow-sm">
          {cert.title}
        </h4>
        <p className="text-primary-container font-sans text-[10px] font-bold tracking-widest uppercase mb-2">
          {cert.issuer}
        </p>
        <p className="text-text-muted font-sans text-xs leading-relaxed line-clamp-2">
          {cert.description}
        </p>
      </div>
      
      <div className="mt-8 pt-4 border-t border-border-subtle/30 flex items-center justify-between text-xs text-text-muted">
        <span>{cert.date}</span>
        <span className="text-[10px] font-mono text-primary-container/70 group-hover:text-primary-container font-bold tracking-wider">
          VERIFICAR
        </span>
      </div>
    </div>
  );
}

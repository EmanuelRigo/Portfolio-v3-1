"use client";

import { CERTIFICATES } from '@/data';
import { Certificate } from '@/types';
import { useApp } from '@/context/AppContext';
import CertificateCard from '@/components/ui/CertificateCard';

interface CertificatesSectionProps {
  onCertificateClick: (cert: Certificate) => void;
}

export default function CertificatesSection({ onCertificateClick }: CertificatesSectionProps) {
  const { messages } = useApp();

  return (
    <section id="certificates" className="py-16 px-6 lg:px-16">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <span className="text-xs font-bold tracking-widest text-primary-container uppercase block mb-1">
            {messages.Certificates.recognition}
          </span>
          <h3 className="font-serif text-2xl font-bold tracking-tight">
            {messages.Certificates?.title || "Especialidades Certificadas"}
          </h3>
          <p className="text-on-surface-variant text-sm max-w-xl mt-1">
            {messages.Certificates?.description || "Hacé clic en cualquier certificado para iniciar el proceso de verificación de firmas criptográficas."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CERTIFICATES.map((cert) => (
            <CertificateCard 
              key={cert.id} 
              cert={cert} 
              onVerifyClick={() => onCertificateClick(cert)} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}

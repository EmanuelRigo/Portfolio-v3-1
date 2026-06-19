"use client";

import { X, Sparkles, Check, CheckCircle2, ExternalLink, Terminal, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Project, Certificate } from '@/types';
import { getCertificateIcon } from '@/components/ui/CertificateCard';

interface InfoModalProps {
  project: Project | null;
  certificate: Certificate | null;
  onCloseProject: () => void;
  onCloseCertificate: () => void;
  isValidating: boolean;
  validationSuccess: boolean;
  onVerifyCertificate: () => void;
}

export default function InfoModal({
  project,
  certificate,
  onCloseProject,
  onCloseCertificate,
  isValidating,
  validationSuccess,
  onVerifyCertificate
}: InfoModalProps) {
  return (
    <>
      {/* PREMIUM INTERACTIVE PROJECT DETAIL MODAL */}
      <AnimatePresence>
        {project && (
          <motion.div 
            id="project-detail-modal-wrapper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-surface-charcoal/90 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
            onClick={onCloseProject}
          >
            <motion.div 
              id="project-detail-modal"
              initial={{ scale: 0.95, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 30 }}
              className="bg-surface-slate border border-border-subtle w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row focus:outline-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Left Column: Cover Image (Takes full height on md+) */}
              <div className="relative w-full md:w-5/12 min-h-[200px] md:min-h-none aspect-video md:aspect-auto bg-surface-charcoal border-b md:border-b-0 md:border-r border-border-subtle">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover absolute inset-0" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent md:bg-linear-to-r md:from-transparent md:via-transparent" />
                
                <div className="absolute bottom-4 left-4 bg-surface-charcoal/80 backdrop-blur-md border border-primary-container/20 px-3 py-1 rounded-lg text-primary-container text-[10px] font-bold tracking-widest uppercase">
                  {project.category === 'recent' ? 'Proyecto Reciente' : 'Proyecto Anterior'}
                </div>
              </div>

              {/* Right Column: Scrollable Content Info */}
              <div className="w-full md:w-7/12 flex flex-col justify-between p-6 sm:p-8 space-y-6 max-h-[70vh] md:max-h-[500px] lg:max-h-[600px] overflow-y-auto custom-scrollbar relative">
                {/* Floating close button on top right of text panel */}
                <button 
                  onClick={onCloseProject}
                  className="absolute top-4 right-4 bg-surface-charcoal/80 hover:bg-surface-charcoal backdrop-blur-md border border-border-subtle hover:border-primary-container p-2 rounded-xl transition-all text-on-surface cursor-pointer z-10"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Content section */}
                <div className="space-y-6">
                  {/* Title & Tags */}
                  <div className="space-y-3 pt-2">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map(t => (
                        <span key={t} className="bg-surface-charcoal border border-border-subtle px-2.5 py-0.5 rounded font-sans text-[10px] font-semibold text-text-muted">
                          {t}
                        </span>
                      ))}
                    </div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-on-surface leading-tight pr-6">
                      {project.title}
                    </h3>
                  </div>

                  {/* Main Description */}
                  <div className="space-y-4 text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                    <p>{project.detailedDescription || project.description}</p>
                    
                    {project.architecture && (
                      <div className="p-4 rounded-xl bg-surface-charcoal border border-border-subtle/70 space-y-1">
                        <span className="text-[10px] text-primary-container font-mono uppercase tracking-widest font-bold">Arquitectura de Servidor</span>
                        <p className="font-sans text-xs text-on-surface">{project.architecture}</p>
                      </div>
                    )}
                  </div>

                  {/* Features list if available */}
                  {project.features && project.features.length > 0 && (
                    <div className="space-y-3 pt-2">
                      <h5 className="font-serif text-sm font-bold text-on-surface flex items-center gap-1.5">
                        <Check className="w-4 h-4 text-primary-container" />
                        <span>Características Claves</span>
                      </h5>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-on-surface-variant font-sans">
                        {project.features.map((feat, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-primary-container flex-shrink-0" />
                            <span className="line-clamp-2">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Buttons block at the bottom */}
                <div className="pt-6 border-t border-border-subtle/30 flex flex-wrap gap-3 mt-auto">
                  {project.demoUrl && project.demoUrl !== '#' && (
                    <a 
                      id={`modal-btn-demo-${project.id}`}
                      href={project.demoUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 bg-primary-container text-on-primary px-5 py-3 rounded-xl font-sans text-xs font-bold hover:shadow-[0_0_15px_rgba(250,204,21,0.25)] transition-all cursor-pointer"
                    >
                      <span>VISITAR APLICACIÓN</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a 
                      id={`modal-btn-code-${project.id}`}
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 bg-surface-charcoal border border-border-subtle hover:border-primary-container/50 px-5 py-3 rounded-xl font-sans text-xs font-bold transition-all cursor-pointer"
                    >
                      <Terminal className="w-3.5 h-3.5 text-primary-container" />
                      <span>CÓDIGO GITHUB</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CERTIFICATE VERIFIER DETAIL MODAL */}
      <AnimatePresence>
        {certificate && (
          <motion.div 
            id="certificate-modal-wrapper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-surface-charcoal/90 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
            onClick={onCloseCertificate}
          >
            <motion.div 
              id="certificate-modal"
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-surface-slate border border-border-subtle w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8 space-y-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-start justify-between border-b border-border-subtle/50 pb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-surface-charcoal/80 p-3.5 rounded-xl border border-border-subtle">
                    {getCertificateIcon(certificate.icon)}
                  </div>
                  <div>
                    <span className="text-[10px] text-primary-container uppercase font-mono tracking-wider font-bold block">
                      Certificación verificada por Criptografía
                    </span>
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-on-surface">
                      {certificate.title}
                    </h3>
                  </div>
                </div>
                <button 
                  onClick={onCloseCertificate}
                  className="p-1 px-1.5 border border-border-subtle hover:border-primary-container/50 rounded-lg text-text-muted transition-colors text-xs"
                >
                  <X className="w-4.5 h-4.5" />
                </button>
              </div>

              {/* Main Desc & verified credentials */}
              <div className="space-y-4">
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed font-sans">
                  {certificate.description}
                </p>

                <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-surface-charcoal border border-border-subtle text-xs">
                  <div>
                    <span className="text-[9px] text-text-muted block uppercase font-bold mb-0.5">Emisor Académico</span>
                    <span className="text-on-surface font-semibold">{certificate.issuer}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-text-muted block uppercase font-bold mb-0.5">Fecha de Emisión</span>
                    <span className="text-on-surface font-semibold">{certificate.date}</span>
                  </div>
                  <div className="col-span-2 border-t border-border-subtle/40 pt-2 font-mono">
                    <span className="text-[9px] text-text-muted block uppercase font-bold mb-0.5 font-sans">ID Identificación de Credencial</span>
                    <span className="text-primary-container text-xs font-bold">{certificate.credentialId}</span>
                  </div>
                </div>
              </div>

              {/* Skills matrix certified list */}
              <div className="space-y-2">
                <span className="text-[10px] text-text-muted uppercase font-bold tracking-wider block">Competencias de Rendimiento Evaluadas</span>
                <div className="flex flex-wrap gap-1.5">
                  {certificate.skillsEarned.map(tag => (
                    <span key={tag} className="bg-surface-charcoal border border-border-subtle/80 px-2.5 py-1 rounded text-xs text-on-surface-variant flex items-center gap-1">
                      <Check className="w-3.5 h-3.5 text-primary-container" />
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* VERIFICATION SIGNATURE ANIMATED ACTIONS */}
              <div className="pt-4 border-t border-border-subtle/30 space-y-4">
                <AnimatePresence mode="wait">
                  {isValidating ? (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="p-4 rounded-xl bg-primary-container/5 border border-primary-container/30 text-center space-y-2"
                    >
                      <div className="w-5 h-5 border-2 border-primary-container border-t-transparent rounded-full animate-spin mx-auto" />
                      <p className="text-xs font-semibold text-primary-container animate-pulse">
                        Sincronizando con nodo escolar & verificando cadena de firmas digitales...
                      </p>
                    </motion.div>
                  ) : validationSuccess ? (
                    <motion.div 
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/30 flex items-center gap-3"
                    >
                      <ShieldCheck className="w-7 h-7 text-emerald-400 flex-shrink-0 animate-pulse" />
                      <div>
                        <p className="text-xs font-bold text-emerald-400">✓ CREDENCIAL VÁLIDA Y FIRMADA</p>
                        <p className="text-[11px] text-text-muted">La firma MD5/SHA-256 coincide rigurosamente con los archivos públicos del emisor.</p>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>

                {!validationSuccess && !isValidating && (
                  <button 
                    onClick={onVerifyCertificate}
                    className="w-full py-3 bg-primary-container text-on-primary hover:shadow-[0_0_15px_rgba(250,204,21,0.25)] rounded-xl font-sans text-xs font-bold tracking-wider transition-all cursor-pointer"
                  >
                    VALIDAR AUTENTICIDAD DE CREDENCIAL
                  </button>
                )}
                
                <button 
                  onClick={onCloseCertificate}
                  className="w-full py-3 bg-surface-charcoal text-text-muted hover:text-white rounded-xl font-sans text-xs transition-all border border-border-subtle cursor-pointer"
                >
                  Volver a Certificados
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

"use client";

import { MouseEvent } from "react";
import { Menu, Download, Share2, ChevronRight, Home } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useApp } from "@/context/AppContext";

interface HeaderProps {
  activeSection: string;
  scrollToSection: (id: string) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  handleDownloadCV: (e: MouseEvent<HTMLButtonElement>) => void;
  handleSharePortfolio: () => void;
}

export default function Header({
  activeSection,
  scrollToSection,
  mobileMenuOpen,
  setMobileMenuOpen,
  handleDownloadCV,
  handleSharePortfolio,
}: HeaderProps) {
  const { lang, setLang, messages } = useApp();

  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* TOP NAV HEADER */}
      <header className="h-20 border-b border-border-subtle/30 px-6 md:px-12 flex items-center justify-between z-20 flex-shrink-0">
        {/* Mobile hamburger & Name summary */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 border border-border-subtle rounded-lg text-on-surface hover:border-primary-container/60 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex flex-col">
            <span className="font-serif font-bold text-on-surface leading-tight text-lg">
              Emanuel Rigo
            </span>
            <span className="text-[10px] text-primary-container tracking-wider font-semibold font-sans uppercase">
              {messages.hero.heroSubtitle || "Desarrollador Fullstack"}
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 font-sans text-xs font-semibold tracking-wider">
          <button
            id="nav-link-hero"
            onClick={() => scrollToSection("hero-banner")}
            title="Ir al inicio"
            aria-label="Ir al inicio"
            className={`relative py-3 bg-transparent font-mono scroll-py-2 cursor-pointer transition-all duration-300 ease-out ${
              activeSection === "hero-banner"
                ? "text-primary-container"
                : "text-on-surface-variant hover:text-primary-container"
            }`}
          >
            <span
              className={`absolute bottom-0 left-0 right-0 h-[2px] origin-center bg-gradient-to-r from-transparent via-primary-container/90 to-transparent transition-all duration-300 ease-out ${
                activeSection === "hero-banner"
                  ? "opacity-100 scale-x-100"
                  : "opacity-0 scale-x-0"
              }`}
            />
            <Home className="w-4 h-4" />
          </button>
          <button
            id="nav-link-projects"
            onClick={() => scrollToSection("recent")}
            className={`relative py-3 bg-transparent font-mono scroll-py-2 cursor-pointer transition-all duration-300 ease-out ${
              activeSection === "recent"
                ? "text-primary-container font-bold"
                : "text-on-surface-variant hover:text-primary-container"
            }`}
          >
            <span
              className={`absolute bottom-0 left-0 right-0 h-[2px] origin-center bg-gradient-to-r from-transparent via-primary-container/90 to-transparent transition-all duration-300 ease-out ${
                activeSection === "recent"
                  ? "opacity-100 scale-x-100"
                  : "opacity-0 scale-x-0"
              }`}
            />
            {messages.Header.projects.toUpperCase()}
          </button>
          <button
            id="nav-link-certificates"
            onClick={() => scrollToSection("certificates")}
            className={`relative py-3 bg-transparent font-mono scroll-py-2 cursor-pointer transition-all duration-300 ease-out ${
              activeSection === "certificates"
                ? "text-primary-container font-bold"
                : "text-on-surface-variant hover:text-primary-container"
            }`}
          >
            <span
              className={`absolute bottom-0 left-0 right-0 h-[2px] origin-center bg-gradient-to-r from-transparent via-primary-container/90 to-transparent transition-all duration-300 ease-out ${
                activeSection === "certificates"
                  ? "opacity-100 scale-x-100"
                  : "opacity-0 scale-x-0"
              }`}
            />
            {messages.Header.certificates.toUpperCase()}
          </button>
          <button
            id="nav-link-resume"
            onClick={() => scrollToSection("resume")}
            className={`relative py-3 bg-transparent font-mono scroll-py-2 cursor-pointer transition-all duration-300 ease-out ${
              activeSection === "resume"
                ? "text-primary-container font-bold"
                : "text-on-surface-variant hover:text-primary-container"
            }`}
          >
            <span
              className={`absolute bottom-0 left-0 right-0 h-[2px] origin-center bg-gradient-to-r from-transparent via-primary-container/90 to-transparent transition-all duration-300 ease-out ${
                activeSection === "resume"
                  ? "opacity-100 scale-x-100"
                  : "opacity-0 scale-x-0"
              }`}
            />
            {messages.Header.resume.toUpperCase()}
          </button>
          <button
            id="nav-link-contact"
            onClick={() => scrollToSection("contact-footer")}
            className={`relative py-3 bg-transparent font-mono scroll-py-2 cursor-pointer transition-all duration-300 ease-out ${
              activeSection === "contact-footer"
                ? "text-primary-container font-bold"
                : "text-on-surface-variant hover:text-primary-container"
            }`}
          >
            <span
              className={`absolute bottom-0 left-0 right-0 h-[2px] origin-center bg-gradient-to-r from-transparent via-primary-container/90 to-transparent transition-all duration-300 ease-out ${
                activeSection === "contact-footer"
                  ? "opacity-100 scale-x-100"
                  : "opacity-0 scale-x-0"
              }`}
            />
            {messages.Header.contactMe.toUpperCase()}
          </button>
        </nav>

        {/* Action pills (Resume file download, Share, Language Toggle, version index) */}
        <div className="flex items-center gap-3">
          <button
            id="lang-toggle-btn"
            onClick={() => setLang(lang === "ESP" ? "ENG" : "ESP")}
            title="Cambiar idioma / Toggle Language"
            className="px-2.5 py-1.5 border border-primary-container text-primary-container bg-primary-container/10 hover:bg-primary-container hover:text-neutral-950 rounded-lg text-[10px] font-bold font-mono tracking-widest transition-all cursor-pointer uppercase flex items-center justify-center"
          >
            {lang}
          </button>
          <button
            id="header-btn-download-pdf"
            onClick={handleDownloadCV}
            title={messages.Header.downloadCvTitle}
            className="px-3 py-1.5 border border-border-subtle rounded-lg hover:border-primary-container/60 hover:text-primary-container hover:bg-surface-slate text-xs font-semibold flex items-center gap-1.5 text-text-muted transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">CV PDF</span>
          </button>
          <button
            id="header-btn-share"
            onClick={handleSharePortfolio}
            title={messages.Header.sharePortfolioTitle}
            className="p-1.5 border border-border-subtle rounded-lg hover:border-primary-container/60 hover:text-primary-container text-text-muted transition-all cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <span className="hidden md:inline font-mono text-[10px] text-text-muted tracking-widest bg-surface-slate border border-border-subtle px-2 py-1 rounded">
            v2.0.24
          </span>
        </div>
      </header>

      {/* MOBILE MENU NAV DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-drawer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden w-full bg-surface-charcoal border-b border-border-subtle overflow-hidden z-20 absolute top-20 left-0 shadow-2xl"
          >
            <div className="p-6 space-y-4 flex flex-col font-sans text-sm font-semibold tracking-wide">
              <button
                onClick={() => handleNavClick("hero-banner")}
                className="flex items-center justify-between text-left py-2 border-b border-border-subtle/40 text-on-surface hover:text-primary-container"
              >
                <span className="flex items-center gap-2">
                  <Home className="w-4 h-4" />
                  Inicio
                </span>
                <ChevronRight className="w-4 h-4 text-text-muted" />
              </button>
              <button
                onClick={() => handleNavClick("recent")}
                className="flex items-center justify-between text-left py-2 border-b border-border-subtle/40 text-on-surface hover:text-primary-container"
              >
                <span>{messages.Header.projects || "PROYECTOS"}</span>
                <ChevronRight className="w-4 h-4 text-text-muted" />
              </button>
              <button
                onClick={() => handleNavClick("certificates")}
                className="flex items-center justify-between text-left py-2 border-b border-border-subtle/40 text-on-surface hover:text-primary-container"
              >
                <span>{messages.Header.certificates || "CERTIFICADOS"}</span>
                <ChevronRight className="w-4 h-4 text-text-muted" />
              </button>
              <button
                onClick={() => handleNavClick("resume")}
                className="flex items-center justify-between text-left py-2 border-b border-border-subtle/40 text-on-surface hover:text-primary-container"
              >
                <span>{messages.Header.resume || "EXPERIENCIA Y RESUME"}</span>
                <ChevronRight className="w-4 h-4 text-text-muted" />
              </button>
              <button
                onClick={() => handleNavClick("contact-footer")}
                className="flex items-center justify-between text-left py-2 border-b border-border-subtle/40 text-on-surface hover:text-primary-container"
              >
                <span>{messages.Header.contactMe || "CONTÁCTAME"}</span>
                <ChevronRight className="w-4 h-4 text-text-muted" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

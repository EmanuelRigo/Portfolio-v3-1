"use client";

import { useState, useEffect, MouseEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { jsPDF } from "jspdf";
import { Project, Certificate } from "@/types";
import { BIO } from "@/data";
import { AppProvider, useApp } from "@/context/AppContext";

// Layout layer components
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import TechToolbar from "@/components/layout/TechToolbar";

// Content sections
import Hero from "@/components/sections/Hero";
import ProjectsSection from "@/components/sections/ProjectsSection";
import CertificatesSection from "@/components/sections/CertificatesSection";
import ResumeSection from "@/components/sections/ResumeSection";
import ContactSection from "@/components/sections/ContactSection";

// Modals
import InfoModal from "@/components/modals/InfoModal";
import ChatWidget from "@/components/modals/ChatWidget";

function PortfolioContent() {
  const { messages } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedCertificate, setSelectedCertificate] =
    useState<Certificate | null>(null);
  const [activeSection, setActiveSection] = useState<
    "recent" | "certificates" | "contact-footer" | "resume"
  >("recent");

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [chatOpen, setChatOpen] = useState(false);

  // Animated credential validation simulation state
  const [isValidating, setIsValidating] = useState(false);
  const [validationSuccess, setValidationSuccess] = useState(false);

  // Active section tracker on scroll container
  useEffect(() => {
    const handleScroll = () => {
      const scrollContainer = document.getElementById("scrollable-content");
      if (!scrollContainer) return;

      const scrollTop = scrollContainer.scrollTop;
      const scrollHeight = scrollContainer.scrollHeight;
      const clientHeight = scrollContainer.clientHeight;

      // If reached near bottom, activate contact-footer automatically
      if (scrollHeight - scrollTop - clientHeight < 50) {
        setActiveSection("contact-footer");
        return;
      }

      const recentSec = document.getElementById("recent");
      const certsSec = document.getElementById("certificates");
      const resumeSec = document.getElementById("resume");
      const contactSec = document.getElementById("contact-footer");

      if (recentSec && certsSec && resumeSec && contactSec) {
        const offsetRecent = recentSec.offsetTop;
        const offsetCerts = certsSec.offsetTop;
        const offsetResume = resumeSec.offsetTop;
        const offsetContact = contactSec.offsetTop;

        const currentPos = scrollTop + 150;

        if (currentPos >= offsetContact) {
          setActiveSection("contact-footer");
        } else if (currentPos >= offsetResume) {
          setActiveSection("resume");
        } else if (currentPos >= offsetCerts) {
          setActiveSection("certificates");
        } else {
          setActiveSection("recent");
        }
      }
    };

    const scrollContainer = document.getElementById("scrollable-content");
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const showToast = (rawText: string) => {
    setToastMessage(rawText);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleDownloadCV = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      showToast("Iniciando descarga de CV...");

      const link = document.createElement("a");

      // archivo dentro de /public
      link.href = "/C.V. Emanuel Rigo Frontend Backend Fullstack.pdf";

      // nombre con el que se descarga
      link.download = "C.V. Emanuel Rigo Frontend Backend Fullstack.pdf";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      showToast("✓ ¡CV descargado exitosamente!");
    } catch (err) {
      console.error(err);
      showToast("Error al descargar el CV.");
    }
  };

  const handleSharePortfolio = () => {
    if (typeof window !== "undefined") {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href);
        showToast("¡Link del Portfolio copiado al portapapeles! 📋");
      } else {
        showToast(`Link de Portfolio: ${window.location.href}`);
      }
    }
  };

  const verifyCredential = () => {
    setIsValidating(true);
    setTimeout(() => {
      setIsValidating(false);
      setValidationSuccess(true);
      showToast("✓ Credencial validada exitosamente en el servidor educativo.");
    }, 2200);
  };

  const scrollToSection = (id: string) => {
    const container = document.getElementById("scrollable-content");
    const el = document.getElementById(id);
    if (container && el) {
      const containerRect = container.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      const targetScrollTop =
        container.scrollTop + (elRect.top - containerRect.top);
      container.scrollTo({
        top: targetScrollTop,
        behavior: "smooth",
      });
      // Anticipate highlight transition instantly
      if (id === "contact-footer") setActiveSection("contact-footer");
      else if (id === "resume") setActiveSection("resume");
      else if (id === "certificates") setActiveSection("certificates");
      else if (id === "recent") setActiveSection("recent");
    } else if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div
      id="portfolio-root"
      className="w-screen h-svh bg-background flex justify-center items-center relative overflow-hidden antialiased"
    >
      {/* Background Image backdrop cover */}
      <img
        src="/images/background.jpg"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover opacity-40 select-none pointer-events-none filter blur-[3px]"
        referrerPolicy="no-referrer"
        onError={(e) => {
          e.currentTarget.src =
            "https://images.unsplash.com/photo-1547036967-23d11aacaee0?auto=format&fit=crop&w=2000&q=80";
        }}
      />

      {/* Toast Alert floating */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-6 right-6 z-50 bg-surface-slate border border-primary-container/60 text-on-surface px-5 py-4 rounded-xl shadow-2xl flex items-center gap-3"
            id="toast-alert"
          >
            <div className="w-2 h-2 rounded-full bg-primary-container animate-ping" />
            <span className="font-sans text-sm font-medium">
              {toastMessage}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Grid Wrapper */}
      <div className="bg-neutral-900/60 backdrop-blur-md rounded-2xl h-full 2xl:h-[800px] 2xl:container w-full flex flex-col md:flex-row p-4 md:p-6 border border-border-subtle z-10 overflow-hidden shadow-2xl relative">
        {/* Persistent left Brand identifier sidebar */}
        <Sidebar onContactClick={() => scrollToSection("contact-footer")} />

        {/* Scrollable Layout Context Area */}
        <div
          id="main-content-layout"
          className="flex-grow h-full flex flex-col overflow-hidden relative bg-linear-to-b from-neutral-900 to-surface"
        >
          {/* Header navigation bar */}
          <Header
            activeSection={activeSection}
            scrollToSection={scrollToSection}
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
            handleDownloadCV={handleDownloadCV}
            handleSharePortfolio={handleSharePortfolio}
          />

          <main
            id="scrollable-content"
            className="flex-grow overflow-y-auto custom-scrollbar scroll-smooth"
          >
            {/* Introductory presentation deck */}
            <Hero />

            {/* SECTIONS GRID */}
            <ProjectsSection onProjectClick={setSelectedProject} />

            <CertificatesSection
              onCertificateClick={(cert) => {
                setSelectedCertificate(cert);
                setValidationSuccess(false);
                setIsValidating(false);
              }}
            />

            <ResumeSection onLaunchChat={() => setChatOpen(true)} />

            <ContactSection onShowToast={showToast} />
          </main>
        </div>

        {/* Vertical technology indicator toolbar */}
        <div className="hidden lg:flex items-stretch h-full px-1.5 flex-shrink-0 z-30">
          <TechToolbar />
        </div>
      </div>

      {/* DETAILED CARDS VIEW MODALS */}
      <InfoModal
        project={selectedProject}
        certificate={selectedCertificate}
        onCloseProject={() => setSelectedProject(null)}
        onCloseCertificate={() => setSelectedCertificate(null)}
        isValidating={isValidating}
        validationSuccess={validationSuccess}
        onVerifyCertificate={verifyCredential}
      />

      {/* AI TERMINAL CHAT WINDOW MODAL */}
      <ChatWidget isOpen={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  );
}

export default function Home() {
  return (
    <AppProvider>
      <PortfolioContent />
    </AppProvider>
  );
}

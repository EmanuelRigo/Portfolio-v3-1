"use client";

import { useState, useEffect, useRef, MouseEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { jsPDF } from "jspdf";
import { Project, Certificate } from "@/types";
import BIO_EN from "@/../public/data/workExperience_en.json";
import BIO_ES from "@/../public/data/workExperience_es.json";
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

const SECTION_IDS = [
  "hero-banner",
  "recent",
  "certificates",
  "resume",
  "contact-footer",
] as const;

type ActiveSection = (typeof SECTION_IDS)[number];

function isActiveSection(id: string): id is ActiveSection {
  return SECTION_IDS.includes(id as ActiveSection);
}

function PortfolioContent() {
  const { messages } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedCertificate, setSelectedCertificate] =
    useState<Certificate | null>(null);
  const [activeSection, setActiveSection] =
    useState<ActiveSection>("hero-banner");
  const activeSectionRef = useRef<ActiveSection>("hero-banner");
  const isProgrammaticScrollRef = useRef(false);
  const programmaticTargetRef = useRef<ActiveSection | null>(null);
  const programmaticScrollTimeoutRef = useRef<ReturnType<
    typeof setTimeout
  > | null>(null);
  const scrollStopTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const pendingSectionRef = useRef<ActiveSection | null>(null);
  const pendingSectionCountRef = useRef(0);

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [chatOpen, setChatOpen] = useState(false);

  // Animated credential validation simulation state
  const [isValidating, setIsValidating] = useState(false);
  const [validationSuccess, setValidationSuccess] = useState(false);

  useEffect(() => {
    activeSectionRef.current = activeSection;
  }, [activeSection]);

  const finishProgrammaticScroll = () => {
    if (programmaticTargetRef.current) {
      const target = programmaticTargetRef.current;
      if (activeSectionRef.current !== target) {
        setActiveSection(target);
        activeSectionRef.current = target;
      }
    }

    isProgrammaticScrollRef.current = false;
    programmaticTargetRef.current = null;

    if (programmaticScrollTimeoutRef.current !== null) {
      clearTimeout(programmaticScrollTimeoutRef.current);
      programmaticScrollTimeoutRef.current = null;
    }

    if (scrollStopTimeoutRef.current !== null) {
      clearTimeout(scrollStopTimeoutRef.current);
      scrollStopTimeoutRef.current = null;
    }
  };

  const enableProgrammaticScrollGuard = (target: ActiveSection) => {
    if (programmaticScrollTimeoutRef.current !== null) {
      clearTimeout(programmaticScrollTimeoutRef.current);
    }
    if (scrollStopTimeoutRef.current !== null) {
      clearTimeout(scrollStopTimeoutRef.current);
    }

    programmaticTargetRef.current = target;
    isProgrammaticScrollRef.current = true;
    pendingSectionRef.current = null;
    pendingSectionCountRef.current = 0;
    setActiveSection(target);
    activeSectionRef.current = target;

    programmaticScrollTimeoutRef.current = setTimeout(() => {
      finishProgrammaticScroll();
    }, 5000);
  };

  // Active section tracker on scroll container
  useEffect(() => {
    const scrollContainer = document.getElementById("scrollable-content");
    if (!scrollContainer) return;

    const updateActiveSection = (sectionId: ActiveSection) => {
      if (isProgrammaticScrollRef.current) return;
      if (activeSectionRef.current === sectionId) {
        pendingSectionRef.current = null;
        pendingSectionCountRef.current = 0;
        return;
      }

      if (pendingSectionRef.current !== sectionId) {
        pendingSectionRef.current = sectionId;
        pendingSectionCountRef.current = 1;
        return;
      }

      pendingSectionCountRef.current += 1;
      if (pendingSectionCountRef.current < 2) return;

      pendingSectionRef.current = null;
      pendingSectionCountRef.current = 0;
      activeSectionRef.current = sectionId;
      setActiveSection(sectionId);
    };

    const detectActiveSection = () => {
      if (isProgrammaticScrollRef.current) return;

      const scrollTop = scrollContainer.scrollTop;
      const scrollHeight = scrollContainer.scrollHeight;
      const clientHeight = scrollContainer.clientHeight;

      if (scrollHeight - scrollTop - clientHeight < 50) {
        updateActiveSection("contact-footer");
        return;
      }

      const containerRect = scrollContainer.getBoundingClientRect();
      const activationLine = 120;

      for (let i = SECTION_IDS.length - 1; i >= 0; i--) {
        const sectionId = SECTION_IDS[i];
        const el = document.getElementById(sectionId);
        if (!el) continue;

        const top = el.getBoundingClientRect().top - containerRect.top;
        if (top <= activationLine) {
          updateActiveSection(sectionId);
          return;
        }
      }
    };

    const handleScroll = () => {
      if (isProgrammaticScrollRef.current) {
        if (scrollStopTimeoutRef.current !== null) {
          clearTimeout(scrollStopTimeoutRef.current);
        }

        scrollStopTimeoutRef.current = setTimeout(() => {
          finishProgrammaticScroll();
        }, 120);
        return;
      }

      detectActiveSection();
    };

    scrollContainer.addEventListener("scroll", handleScroll, { passive: true });
    detectActiveSection();

    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll);
      finishProgrammaticScroll();
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
      showToast(messages.alert.cvDownloadStart);

      const link = document.createElement("a");

      // archivo dentro de /public
      link.href = "/C.V. Emanuel Rigo Frontend Backend Fullstack.pdf";

      // nombre con el que se descarga
      link.download = "C.V. Emanuel Rigo Frontend Backend Fullstack.pdf";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      showToast(messages.alert.cvDownloadSuccess);
    } catch (err) {
      console.error(err);
      showToast(messages.alert.cvDownloadError);
    }
  };

  const handleSharePortfolio = () => {
    if (typeof window !== "undefined") {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href);
        showToast(messages.alert.portfolioLinkCopied);
      } else {
        showToast(
          `${messages.alert.portfolioLinkLabel}: ${window.location.href}`,
        );
      }
    }
  };

  const verifyCredential = () => {
    setIsValidating(true);
    setTimeout(() => {
      setIsValidating(false);
      setValidationSuccess(true);
      showToast(messages.alert.credentialValidated);
    }, 2200);
  };

  const scrollToSection = (id: string) => {
    const container = document.getElementById("scrollable-content");
    const el = document.getElementById(id);
    if (container && el) {
      if (isActiveSection(id)) {
        enableProgrammaticScrollGuard(id);
      }

      const containerRect = container.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      const targetScrollTop =
        container.scrollTop + (elRect.top - containerRect.top);
      container.scrollTo({
        top: targetScrollTop,
        behavior: "smooth",
      });
    } else if (el) {
      if (isActiveSection(id)) {
        enableProgrammaticScrollGuard(id);
      }
      el.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div
      id="portfolio-root"
      className="w-screen h-svh flex justify-center items-center relative overflow-hidden antialiased"
    >
      {/* Background Image backdrop cover */}
      <img
        src="/images/background.jpg"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none "
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
      <div className="bg-neutral-950/50 backdrop-blur-md rounded-2xl h-full 2xl:h-[800px] 2xl:container w-full flex flex-col md:flex-row p-4 md:p-6 border border-border-subtle z-10 overflow-hidden shadow-2xl relative">
        {/* Persistent left Brand identifier sidebar */}
        <Sidebar onContactClick={() => scrollToSection("contact-footer")} />

        {/* Scrollable Layout Context Area */}
        <div
          id="main-content-layout"
          className="flex-grow h-full flex flex-col overflow-hidden relative bg-linear-to-b "
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

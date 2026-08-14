"use client";

import { Link as LinkIcon /* , Terminal */, Mail, MapPin } from "lucide-react";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import BIO_EN from "@/../public/data/workExperience_en.json";
import BIO_ES from "@/../public/data/workExperience_es.json";
import { useApp } from "@/context/AppContext";

interface SidebarProps {
  onContactClick: () => void;
}

export default function Sidebar({ onContactClick }: SidebarProps) {
  const { messages, lang } = useApp();
  const BIO = lang === "ENG" ? BIO_EN : BIO_ES;

  const subtitle = messages?.hero?.heroSubtitle ?? "Desarrollador Fullstack";

  const contactText =
    messages?.Header?.contactMe?.toUpperCase() ?? "CONTÁCTAME";

  return (
    <aside
      id="desktop-sidebar"
      className="hidden md:flex w-48 xl:w-56 2xl:w-72 h-full bg-black/50 rounded-s-md flex-shrink-0 flex-col items-center py-6 2xl:py-10 px-3 2xl:px-6 overflow-y-auto custom-scrollbar"
    >
      {/* Avatar */}
      <div className="relative mb-4 2xl:mb-8 group">
        <div className="w-24 h-24 xl:w-28 xl:h-28 2xl:w-48 2xl:h-48 rounded-lg overflow-hidden border-2 border-primary-container/20 group-hover:border-primary-container transition-colors duration-500 shadow-2xl">
          <img
            src="/images/profile.jpg"
            alt="Emanuel Rigo Portrait"
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
            referrerPolicy="no-referrer"
          />
        </div>

        <div
          className="absolute bottom-1 right-1 2xl:bottom-2 2xl:right-2 w-3 h-3 2xl:w-5 2xl:h-5 bg-green-500 border-2 2xl:border-4 border-surface-charcoal rounded-lg animate-pulse shadow-md"
          title={messages?.Sidebar?.statusTitle || "Disponible para trabajar"}
        />
      </div>

      {/* Nombre */}
      <div className="text-center space-y-1 2xl:space-y-2 mb-4 2xl:mb-8">
        <h1 className="font-serif text-xl 2xl:text-3xl font-bold text-on-surface tracking-tight">
          {messages?.Sidebar?.name || "Emanuel Rigo"}
        </h1>

        <p className="font-sans text-[10px] 2xl:text-xs font-semibold uppercase tracking-widest text-primary-container">
          {subtitle}
        </p>
      </div>

      {/* Links */}
      <div className="w-full space-y-1.5 2xl:space-y-3">
        <a
          id="sidebar-link-linkedin"
          href={BIO.linkedin}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 2xl:gap-3 w-full p-2 2xl:p-3.5 rounded-lg bg-surface-slate border border-border-subtle hover:border-primary-container/50 hover:bg-surface-container-low transition-all group"
        >
          <FaLinkedin className="text-primary-container w-4 h-4 2xl:w-5 2xl:h-5  transition-transform" />

          <span className="text-on-surface-variant group-hover:text-on-surface font-sans text-xs 2xl:text-sm font-medium">
            {messages?.Sidebar?.linkedinLabel || "LinkedIn"}
          </span>
        </a>

        <a
          id="sidebar-link-github"
          href={BIO.github}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 2xl:gap-3 w-full p-2 2xl:p-3.5 rounded-lg bg-surface-slate border border-border-subtle hover:border-primary-container/50 hover:bg-surface-container-low transition-all group"
        >
          <FaGithub className="text-primary-container w-4 h-4 2xl:w-5 2xl:h-5  transition-transform" />

          <span className="text-on-surface-variant group-hover:text-on-surface font-sans text-xs 2xl:text-sm font-medium">
            {messages?.Sidebar?.githubLabel || "GitHub"}
          </span>
        </a>

        <a
          id="sidebar-link-email"
          href={`mailto:${BIO.email}`}
          className="flex items-center gap-2 2xl:gap-3 w-full p-2 2xl:p-3.5 rounded-lg bg-surface-slate border border-border-subtle hover:border-primary-container/50 hover:bg-surface-container-low transition-all group"
        >
          <FaEnvelope className="text-primary-container w-4 h-4 2xl:w-5 2xl:h-5 " />

          <span
            title={BIO.email}
            className="text-on-surface-variant group-hover:text-on-surface font-sans text-xs 2xl:text-sm font-semibold max-w-[160px] truncate"
          >
            {messages?.Sidebar?.emailLabel || "Email"}
          </span>
        </a>
      </div>

      {/* Footer */}
      <div className="mt-auto pt-4 2xl:pt-8 w-full border-t border-border-subtle/30 space-y-2 2xl:space-y-4 text-center">
        <div className="flex items-center justify-center gap-2 text-text-muted text-[10px] 2xl:text-xs font-medium">
          <FaMapMarkerAlt className="w-3 h-3 2xl:w-4 2xl:h-4 text-primary-container" />

          <span>
            {messages?.Sidebar?.location || "Buenos Aires, Argentina"}
          </span>
        </div>

        <button
          id="sidebar-get-in-touch"
          onClick={onContactClick}
          className="flex items-center justify-center gap-2 w-full py-2.5 2xl:py-4 bg-primary-container text-on-primary rounded-lg font-sans text-[10px] 2xl:text-xs font-bold tracking-wider hover:shadow-[0_0_24px_rgba(250,204,21,0.25)] transition-all cursor-pointer"
        >
          {contactText}
        </button>
      </div>
    </aside>
  );
}

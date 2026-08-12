"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useApp } from "@/context/AppContext";

export default function NotFound() {
  const { messages, lang } = useApp();
  const t = messages.NotFound;

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-6 py-16 bg-background text-on-background antialiased">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-xl flex flex-col items-center text-center"
      >
        {/* 404 code badge */}
        <motion.span
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 160, damping: 18 }}
          className="font-serif text-7xl md:text-8xl font-bold tracking-tight text-primary-container drop-shadow-[0_0_25px_rgba(250,204,21,0.25)]"
        >
          {t.code}
        </motion.span>

        {/* Decorative divider */}
        <div className="my-6 flex items-center gap-3 w-full max-w-xs">
          <div className="h-px grow bg-border-subtle" />
          <span className="w-1.5 h-1.5 rounded-full bg-primary-container" />
          <div className="h-px grow bg-border-subtle" />
        </div>

        {/* Title */}
        <h1 className="font-serif text-2xl md:text-3xl font-bold tracking-tight text-on-surface">
          {t.title}
        </h1>

        {/* Description */}
        <p className="font-sans mt-4 text-on-surface-variant text-sm md:text-base max-w-md leading-relaxed">
          {t.description}
        </p>

        {/* Action button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.4 }}
          className="mt-10"
        >
          <Link
            href="/"
            lang={lang === "ENG" ? "en" : "es"}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-container text-on-primary-container font-sans font-semibold text-sm tracking-wide hover:brightness-110 transition-all shadow-lg shadow-primary-container/20 focus:outline-none focus:ring-2 focus:ring-primary-container/60"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M9.293 14.707a1 1 0 0 1 0-1.414L12.586 10 9.293 6.707a1 1 0 1 1 1.414-1.414l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414 0Z"
                clipRule="evenodd"
              />
              <path
                fillRule="evenodd"
                d="M3 10a1 1 0 0 1 1-1h10a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1Z"
                clipRule="evenodd"
              />
            </svg>
            {t.homeButton}
          </Link>
        </motion.div>

        {/* Footer hint */}
        <p className="mt-12 text-xs text-text-muted font-sans">
          {typeof window !== "undefined" ? window.location.pathname : ""}
        </p>
      </motion.div>
    </div>
  );
}

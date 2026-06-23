"use client";

import { Sparkles } from "lucide-react";
import { BIO } from "@/data/workExperience.es";
import { useApp } from "@/context/AppContext";

export default function Hero() {
  const { messages } = useApp();

  return (
    <section
      id="hero-banner"
      className="py-12 px-6 md:px-12 border-b border-border-subtle/20 bg-gradient-to-b from-surface-slate/20 to-transparent relative overflow-hidden"
    >
      <div className="max-w-5xl">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="font-serif text-xs font-bold tracking-widest text-primary-container uppercase bg-primary-container/10 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-primary-container animate-pulse" />
            {messages.hero.heroSubtitle || "Fullstack Developer"}
          </span>
        </div>

        <h2 className="font-serif text-4xl sm:text-5xl font-bold text-on-surface mt-4 tracking-tight leading-tight">
          {messages.hero.codeAction}{" "}
          <span className="text-primary-container">
            {messages.hero.precision}
          </span>
          .
          <br />
          {messages.hero.designAction}{" "}
          <span className="text-primary-container">
            {messages.hero.structure}
          </span>
          .
        </h2>

        <p className="font-sans text-sm md:text-base text-on-surface-variant max-w-2xl mt-4 leading-relaxed">
          {messages.hero.heroDescription
            ? `${messages.hero.heroDescription}. ${BIO.tagline}`
            : `${BIO.tagline} ${BIO.about}`}
        </p>
      </div>
    </section>
  );
}

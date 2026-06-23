/* src/data/workExperience.ts */

// Re-export bilingual work experience data from public folder.
// Using alias '@' for consistency with project conventions.

import BIO_EN from "@/../public/data/workExperience_en.json";
import BIO_ES from "@/../public/data/workExperience_es.json";

// Define a type that matches the JSON structure.
export type WorkExperience = typeof BIO_EN;

// Export the raw data for each locale.
export const BIO_EN_DATA: WorkExperience = BIO_EN;
export const BIO_ES_DATA: WorkExperience = BIO_ES;

// Helper to get the appropriate data based on language code.
export const getWorkExperience = (lang: string): WorkExperience =>
  lang === "ENG" ? BIO_EN_DATA : BIO_ES_DATA;

// Transform the JSON data into the format expected by resume components
// Experience format: { role, company, period, highlights[] }
// Education format: { degree, institution, status, highlights[] }

export type Experience = {
  role: string;
  company: string;
  period: string;
  highlights: string[];
};

export type Education = {
  degree: string;
  institution: string;
  status: string;
  highlights: string[];
};

// Experience data from JSON files (transformed to expected format)
export const EXPERIENCES_EN: Experience[] = [
  {
    role: BIO_EN.role,
    company: BIO_EN.title, // Using title as company name
    period: BIO_EN.year,
    highlights: BIO_EN.highlights,
  },
];

export const EXPERIENCES_ES: Experience[] = [
  {
    role: BIO_ES.role,
    company: BIO_ES.title, // Using title as company name
    period: BIO_ES.year,
    highlights: BIO_ES.highlights,
  },
];

// Education data (preserved from original file since not in JSON)
export const EDUCATION: Education[] = [
  {
    degree: "Curso de Especialización Backend 1 / Backend 2 / Backend 3",
    institution: "Coderhouse",
    status: "Completado 2025",
    highlights: [
      "Profundización exhaustiva en Node.js, Express, arquitecturas de bases de datos relacionales y no relacionales, APIs REST robustas y seguridad.",
    ],
  },
  {
    degree: "Curso de JavaScript, ReactJs y MySQL",
    institution: "Coderhouse",
    status: "Certificado 2023 - 2024",
    highlights: [
      "Especialización en interfaces reactivas e interactivas complejas, renderizado eficiente y diseño y estructuración de bases de datos.",
    ],
  },
  {
    degree: "Analista de Sistemas de Computación",
    institution: "Instituto de Formación Técnica Superior (IFTS)",
    status: "En curso / Finalizando",
    highlights: [
      "Foco académico en Metodologías Ágiles (Scrum), Análisis de Requerimientos, Patrones de Arquitectura de Software y Gobernanza de Datos.",
    ],
  },
];

// Export language-specific experience arrays for backward compatibility
export const EXPERIENCES = {
  en: EXPERIENCES_EN,
  es: EXPERIENCES_ES,
};

// Extend the type with optional contact fields to satisfy component expectations.
export type WorkExperienceWithContact = WorkExperience & {
  linkedin?: string;
  github?: string;
  email?: string;
};

// Note: The current JSON files do not contain contact information.
// Components that use BIO should handle missing fields gracefully.
import { Project, Certificate } from "@/types";

export const PROJECTS: Project[] = [
  {
    id: "movielist",
    title: "MovieList App",
    description:
      "MovieList is a complete app to easily manage movies, with dynamic searches and user system.",
    detailedDescription:
      "An all-in-one platform for movie lovers that allows cataloging watched films, saving favorites, and reading enriched details thanks to native integration with cinematic APIs. Designed with a sophisticated debounced search bar, multidimensional filters by genre and year, responsive carousels, and temporary offline saving.",
    image: "images/projects/movielist1.png",
    tags: ["NextJS", "Tailwind", "TypeScript", "Context API"],
    demoUrl: "https://movie-list-jade-kappa.vercel.app/",
    githubUrl: "https://github.com/EmanuelRigo/movie-list",
    category: "recent",
    features: [
      "Smart search optimized with debouncer",
      "Advanced fluid filters by year, genre, and ratings",
      "Customizable Favorites section with local persistence",
      "High-performance responsive design optimized for mobile and desktop",
    ],
    architecture:
      "Modern SPA architecture built with NextJS partial Server-Side Pre-rendering and hybrid static rendering (ISR).",
  },
  {
    id: "cliniclab",
    title: "Clinic Lab",
    description:
      "Clinical application for appointments and lab results. Comprehensive patient and medical report management.",
    detailedDescription:
      "A powerful clinical CRM and ERP system optimized for medical labs and private clinics. Synchronizes internal appointment management for medical staff with a secure patient portal, allowing private downloads of complementary analyses in PDF format with automatic signature.",
    image: "images/projects/lab 00.png",
    tags: ["NextJS", "NodeJS", "ReactJS", "Tailwind CSS"],
    demoUrl: "https://labclinico.vercel.app/",
    githubUrl: "https://github.com/EmanuelRigo/clinic-lab",
    category: "recent",
    features: [
      "Integrated real-time appointment booking system",
      "Interactive viewer for results and lab history",
      "Interactive generator of electronic medical analysis prescriptions in PDF",
      "High-security medical administration control panel",
    ],
    architecture:
      "NextJS Frontend + Node/Express API Gateway for secure processing and optimized Cloud SQL database.",
  },
  {
    id: "masterquiz",
    title: "MasterQuiz",
    description: "Dynamic trivia with React and Vite.",
    detailedDescription:
      "Playful Q&A app with timers, interactive categories, and detailed performance statistics. Implements sound effects via Web Audio API and smooth interface transitions.",
    image: "/projects/masterquiz.jpg",
    tags: ["React", "Vite", "Tailwind CSS", "Web Audio API"],
    icon: "verified",
    category: "previous",
    demoUrl: "#",
    githubUrl: "https://github.com/EmanuelRigo/MasterQuiz",
  },
  {
    id: "todolist",
    title: "ToDoList",
    description: "Fullstack Next.js + Prisma.",
    detailedDescription:
      "High-performance daily organizer with relational SQL persistence. Allows project creation, urgency tagging, and visual performance statistics to evaluate productivity.",
    image: "/projects/todolist.jpg",
    tags: ["Next.js", "Prisma", "PostgreSQL", "Tailwind"],
    icon: "database",
    category: "previous",
    demoUrl: "#",
    githubUrl: "https://github.com/EmanuelRigo/ToDoList",
  },
  {
    id: "etechstore",
    title: "E-TechStore",
    description: "E-commerce with Firebase.",
    detailedDescription:
      "Interactive store dedicated to high-tech products with user authentication via Firebase Auth, flexible cart persistence, and reactive inventory synchronized in Firestore.",
    image: "/projects/etechstore.jpg",
    tags: ["React", "Firebase", "Context API", "Stripe Proxy"],
    icon: "shopping_cart",
    category: "previous",
    demoUrl: "#",
    githubUrl: "https://github.com/EmanuelRigo/E-TechStore",
  },
  {
    id: "tesloshop",
    title: "Teslo-Shop",
    description: "Shop built with Next.js + Zustand.",
    detailedDescription:
      "Premium online store inspired by Tesla’s UX/UI. Implements payment gateway, server-side pre-rendering for improved SEO, size and color management, and ultra-fast shared state with Zustand.",
    image: "/projects/tesloshop.jpg",
    tags: ["Next.js", "Zustand", "Stripe", "Docker"],
    icon: "bolt",
    category: "previous",
    demoUrl: "#",
    githubUrl: "https://github.com/EmanuelRigo/Teslo-Shop",
  },
];

export const CERTIFICATES: Certificate[] = [
  {
    id: "sqlmaster",
    title: "SQL Master",
    issuer: "CODERHOUSE",
    date: "November 2023",
    credentialId: "CH-SQL-98124",
    skillsEarned: [
      "SQL Query Optimization",
      "Relational Design (ERD)",
      "Triggers and Procedures",
      "Indexes & Tuning",
    ],
    icon: "database",
    description:
      "Intensive professional certification focused on relational database structuring, advanced correlated queries, and optimization for large query volumes.",
  },
  {
    id: "reactexpert",
    title: "React Expert",
    issuer: "UDEMY",
    date: "February 2024",
    credentialId: "UDEMY-RX-7729",
    skillsEarned: [
      "Advanced React Hooks",
      "Zustand / Redux Toolkit",
      "Clean Component Patterns",
      "Efficient Rendering & Memoization",
    ],
    icon: "code",
    description:
      "Specialization in corporate frontend development using React. Adoption of clean component architectures, optimization with Profilers, and static deployments with Vite.",
  },
  {
    id: "fullstackdev",
    title: "Fullstack Dev",
    issuer: "BOOTCAMP CÓDIGO",
    date: "May 2024",
    credentialId: "BC-FS-5590",
    skillsEarned: [
      "Backend with Node.js & Express",
      "NoSQL with MongoDB / Firestore",
      "JWT Authentication",
      "Docker Containers for Development",
    ],
    icon: "server",
    description:
      "Immersive training covering full MERN/PERN stack integration, robust REST API creation with security middlewares, automated testing, and cloud integrations.",
  },
];

export const EXPERIENCES = [
  {
    role: "Frontend Web Developer",
    company: "SwaplyAr",
    period: "2025 - 2026",
    highlights: [
      "Developed interfaces for a virtual wallet using Next.js and TypeScript, ensuring modular components and scalable architecture.",
      "Improved UX/UI and backend flows, identifying optimization opportunities in business logic and user experience.",
      "Optimized global state management with Zustand, ensuring data consistency in critical processes and transactional flows.",
      "Collaborated on endpoint definition, documentation, and validation via Swagger, facilitating frontend-backend integration.",
      "Implemented responsive and dynamic interfaces with Tailwind CSS, prioritizing performance and user experience.",
    ],
  },
  {
    role: "Logistics Operator",
    company: "MSA",
    period: "2017 - 2023",
    highlights: [
      "Stock control and coordination with purchasing.",
      "Customer service and order management.",
      "Route and delivery time optimization.",
    ],
  },
  {
    role: "Operations Assistant",
    company: "La Casa de Audio",
    period: "2014 - 2017",
    highlights: [
      "Product transfer and management between branches.",
      "Reception and dispatch to central technical service.",
    ],
  },
];

export const EDUCATION = [
  {
    degree: "Backend Specialization Course 1 / 2 / 3",
    institution: "Coderhouse",
    status: "Completed 2025",
    highlights: [
      "In-depth training in Node.js, Express, relational and non-relational database architectures, robust REST APIs, and security.",
    ],
  },
  {
    degree: "JavaScript, ReactJs and MySQL Course",
    institution: "Coderhouse",
    status: "Certified 2023 - 2024",
    highlights: [
      "Specialization in complex reactive and interactive interfaces, efficient rendering, and database design and structuring.",
    ],
  },
  {
    degree: "Computer Systems Analyst",
    institution: "Instituto de Formación Técnica Superior (IFTS)",
    status: "In progress / Finalizing",
    highlights: [
      "Academic focus on Agile Methodologies (Scrum), Requirements Analysis, Software Architecture Patterns, and Data Governance.",
    ],
  },
];

export const BIO = {
  name: "Emanuel Antonio Rigo",
  title: "Full Stack Developer",
  location: "Buenos Aires, Argentina",
  tagline:
    "Frontend developer specialized in React, Next.js and TypeScript, with a solid backend foundation using Node.js and REST APIs.",
  email: "emanuel.r-dev@outlook.com",
  phone: "+54 9 11 6269 9719",
  github: "https://github.com/EmanuelRigo",
  linkedin: "https://www.linkedin.com/in/emanuelrigo/",
  portfolio: "https://portfolio-dusky-rho-64.vercel.app/es",
  about:
    "Frontend developer specialized in React, Next.js and TypeScript, with a strong backend foundation using Node.js and REST APIs. Experienced in developing critical applications such as virtual wallets (SwaplyAr), implementing scalable architectures, global state management with Zustand, and modern interfaces with Tailwind CSS. Focused on creating efficient, maintainable solutions aligned with business goals.",
};

import { Project, Certificate } from "@/types";

export const PROJECTS: Project[] = [
  {
    id: "movielist",
    title: "MovieList App",
    description:
      "MovieList es una app completa para gestionar películas fácilmente, con búsquedas dinámicas y sistema de usuarios.",
    detailedDescription:
      "Una plataforma integral para amantes del cine que permite catalogar películas vistas, guardar favoritos, y leer detalles enriquecidos gracias a la integración nativa de APIs cinematográficas. Diseñada con una sofisticada barra de búsqueda con debounce, filtrados multidimensionales de géneros y años, carruseles responsivos y guardado temporal offline.",
    image: "images/projects/movielist1.png",
    tags: ["NextJS", "Tailwind", "TypeScript", "Context API"],
    demoUrl: "https://movie-list-jade-kappa.vercel.app/",
    githubUrl: "https://github.com/EmanuelRigo/movie-list",
    category: "recent",
    features: [
      "Búsqueda inteligente optimizada con debouncer",
      "Filtros fluidos avanzados por año, género y puntajes",
      "Sección personalizable de Favoritos con persistencia local",
      "Diseño responsivo de alto rendimiento optimizado para móviles y desktop",
    ],
    architecture:
      "Arquitectura SPA moderna construida con NextJS Server-Side Pre-rendering parcial y renderizado estático híbrido (ISR).",
  },
  {
    id: "cliniclab",
    title: "Clinic Lab",
    description:
      "Aplicación clínica para turnos y resultados de laboratorio. Gestión integral de pacientes y reportes médicos.",
    detailedDescription:
      "Un potente sistema CRM y ERP clínico optimizado para laboratorios de análisis médicos y clínicas privadas. Sincroniza la gestión interna de turnos para el staff médico con un portal seguro para pacientes, permitiendo descargar análisis complementarios de forma privada en formato PDF con firma automática.",
    image: "images/projects/lab 00.png",
    tags: ["NextJS", "NodeJS", "ReactJS", "Tailwind CSS"],
    demoUrl: "https://labclinico.vercel.app/",
    githubUrl: "https://github.com/EmanuelRigo/clinic-lab",
    category: "recent",
    features: [
      "Sistema integrado de agendamiento y reserva de turnos en tiempo real",
      "Visualizador interactivo de resultados e historial de laboratorio",
      "Generador interactivo de recetas electrónicas de análisis médicos en PDF",
      "Panel de control de administración médica de alta seguridad",
    ],
    architecture:
      "NextJS Frontend + Node/Express API Gateway para procesamiento seguro y base de datos optimizada en Cloud SQL.",
  },
  {
    id: "masterquiz",
    title: "MasterQuiz",
    description: "Trivia dinámica con React y Vite.",
    detailedDescription:
      "Aplicación lúdica de preguntas y respuestas con temporizadores, categorías interactivas y estadísticas detalladas del rendimiento. Implementa efectos de sonido mediante Web Audio API y transiciones fluidas de interfaz.",
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
      "Organizador diario de alto rendimiento con persistencia relacional SQL. Permite crear proyectos, asignar etiquetas de urgencia y registrar estadísticas visuales de rendimiento diario para evaluar productividad.",
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
    description: "E-commerce con Firebase.",
    detailedDescription:
      "Tienda interactiva dedicada a productos de alta tecnología con autenticación de usuarios por Firebase Auth, persistencia flexible de canasta e inventario reactivo sincronizado en Firestore.",
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
    description: "Shop Next.js + Zustand.",
    detailedDescription:
      "Tienda online premium inspirada en la UX/UI de Tesla. Implementa pasarela de pagos, pre-renderizado del lado del servidor para SEO mejorado, gestión de tallas y colores, y estado compartido ultrarrápido con Zustand.",
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
    date: "Noviembre 2023",
    credentialId: "CH-SQL-98124",
    skillsEarned: [
      "Optimización de Consultas SQL",
      "Diseño Relacional (MER)",
      "Triggers y Procedimientos",
      "Índices & Tuning",
    ],
    icon: "database",
    description:
      "Certificación profesional intensiva enfocada en la estructuración de bases de datos relacionales, armado de consultas correlacionadas avanzadas y optimización para grandes volúmenes de consultas.",
  },
  {
    id: "reactexpert",
    title: "React Expert",
    issuer: "UDEMY",
    date: "Febrero 2024",
    credentialId: "UDEMY-RX-7729",
    skillsEarned: [
      "React Hooks avanzados",
      "Zustand / Redux Toolkit",
      "Patrones de Componentes limpios",
      "Renderizado eficiente & Memo",
    ],
    icon: "code",
    description:
      "Especialización en desarrollo Frontend corporativo empleando React. Adopción de arquitecturas de componentes limpios, optimización con Profilers y despliegues estáticos con Vite.",
  },
  {
    id: "fullstackdev",
    title: "Fullstack Dev",
    issuer: "BOOTCAMP CÓDIGO",
    date: "Mayo 2024",
    credentialId: "BC-FS-5590",
    skillsEarned: [
      "Backend con Node.js & Express",
      "NoSQL con MongoDB / Firestore",
      "Autenticación mediante JWT",
      "Docker Containers para Desarrollo",
    ],
    icon: "server",
    description:
      "Esquema de entrenamiento inmersivo cubriendo la integración completa del stack MERN/PERN, creación de APIs REST robustas con middlewares de seguridad, pruebas automatizadas e integraciones en la nube.",
  },
];

export const EXPERIENCES = [
  {
    role: "Desarrollador Web Front-End",
    company: "SwaplyAr",
    period: "2025 - 2026",
    highlights: [
      "Desarrollo de interfaces para una billetera virtual utilizando Next.js y TypeScript, garantizando componentes modulares y una arquitectura escalable.",
      "Impulso de mejoras en los flujos de UX/UI y Backend, identificando oportunidades de optimización en la lógica de negocio y la experiencia de usuario.",
      "Optimización de la gestión de estados globales con Zustand, asegurando la consistencia de los datos en procesos críticos y flujos transaccionales.",
      "Colaboración en la definición, documentación y validación de endpoints mediante Swagger, facilitando la integración entre Frontend y Backend.",
      "Implementación de interfaces responsivas y dinámicas con Tailwind CSS, priorizando el rendimiento y la experiencia del usuario.",
    ],
  },
  {
    role: "Operario Logístico",
    company: "MSA",
    period: "2017 - 2023",
    highlights: [
      "Control de stock y coordinación con compras.",
      "Atención al cliente y gestión de pedidos.",
      "Optimización de rutas y tiempos de entrega.",
    ],
  },
  {
    role: "Asistente Operativo",
    company: "La Casa de Audio",
    period: "2014 - 2017",
    highlights: [
      "Traslado y gestión de productos entre sucursales.",
      "Recepcionado y envío al servicio técnico central.",
    ],
  },
];

export const EDUCATION = [
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

export const BIO = {
  name: "Emanuel Antonio Rigo",
  title: "Full Stack Developer",
  location: "Buenos Aires, Argentina",
  tagline:
    "Desarrollador Frontend especializado en React, Next.js y TypeScript, con sólida base en Backend utilizando Node.js y APIs REST.",
  email: "emanuel.r-dev@outlook.com",
  phone: "+54 9 11 6269 9719",
  github: "https://github.com/EmanuelRigo",
  linkedin: "https://www.linkedin.com/in/emanuelrigo/",
  portfolio: "https://portfolio-dusky-rho-64.vercel.app/es",
  about:
    "Desarrollador Frontend especializado en React, Next.js y TypeScript, con sólida base en Backend utilizando Node.js y APIs REST. Experiencia en el desarrollo de aplicaciones críticas como billeteras virtuales (SwaplyAr), implementando arquitecturas escalables, gestión de estados globales con Zustand e interfaces modernas con Tailwind CSS. Orientado a la creación de soluciones eficientes, mantenibles y alineadas con los objetivos del negocio.",
};

export const CHATBOT_KNOWLEDGE = `
Información sobre Emanuel Antonio Rigo:
- Nombre completo: Emanuel Antonio Rigo
- Rol principal: Full Stack Developer / Desarrollador Frontend
- Ubicación: Buenos Aires, Argentina
- Email de contacto: emanuel.r-dev@outlook.com
- Teléfono de contacto: +54 9 11 6269 9719
- Perfil GitHub: https://github.com/EmanuelRigo
- Perfil LinkedIn: https://www.linkedin.com/in/emanuelrigo/
- Tecnologías principales: TypeScript, React, Next.js, NodeJS, Express, Tailwind CSS, Bootstrap, Zustand, MySQL, MongoDB, PostgreSQL, Firebase, Prisma, Docker, Swagger, Git, GitHub.
- Experiencia Profesional:
  1) Desarrollador Web Front-End en SwaplyAr (2025 - 2026): Creación de interfaces para billeteras virtuales con Next.js y TypeScript, optimización de estados globales con Zustand, integración de endpoints validados con Swagger, y estilos dinámicos/responsivos con Tailwind CSS.
  2) Operario Logístico en MSA (2017 - 2023): Stock, logística y coordinación con compras.
  3) Asistente Operativo en La Casa de Audio (2014 - 2017): Enlace operativo técnico/logístico inter-sucursales.
- Certificaciones y Educación:
  - Estudiante de Análisis de Sistemas en IFTS (En curso/Finalizando).
  - Cursos Coderhouse: Backend 1 / Backend 2 / Backend 3 (Graduado 2025), MySQL (2024), JavaScript (2024), ReactJs (2023).
  - Certificaciones: SQL Master (Coderhouse), React Expert (Udemy) y Fullstack Developer.
- Proyectos Destacados:
  1) MovieList App: Lista interactiva de películas usando NextJS, Tailwind, TypeScript y Context API, carruseles fluidos y optimizaciones de búsqueda inteligente.
  2) Clinic Lab: Sistema ERP/CRM médico interactivo donde pacientes y médicos administran turnos y descargan análisis médicos en PDF de forma segura.
  3) MasterQuiz: Trivia interactiva de alto rendimiento en React.
  4) ToDoList: Gestor avanzado de tareas fullstack Prisma + Postgres.
  5) E-TechStore: Plataforma de hardware inteligente con Firebase Auth y firestore.
  6) Teslo-Shop: Tienda premium inspirada en TESLA con NextJS y Zustand.
- Idiomas: Español (Nativo), Inglés (B2 / Técnico fluido).
- Aptitudes y Habilidades Blandas: Trabajo en equipo, adaptabilidad al cambio, resolución de problemas proactiva, autonomía, proactividad y comunicación clara.
- Pasiones: Clean code, rendimiento de carga web, interacción pulida, bases de datos bien estructuradas, diseño visual moderno.
`;

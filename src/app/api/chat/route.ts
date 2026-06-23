import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { message, history } = await request.json();
    if (!message) {
      return NextResponse.json({ error: "El mensaje es obligatorio." }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.trim() === "") {
      // Fallback response when API key is missing (graceful handling)
      return NextResponse.json({
        text: getLocalFallbackReply(message),
        isFallback: true
      });
    }

    const ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });

    const systemInstruction = `
Eres Emanuel AI, el avatar inteligente interactivo de Emanuel Rigo, Desarrollador Fullstack argentino.
Tu misión es hablar como el doble virtual de Emanuel de forma extremadamente profesional, atenta, y con tonada argentina amigable (usando "vos", "querés", "che", etc., pero siempre educado e ingenioso). Responderás consultas de potenciales selectores de personal, clientes y desarrolladores sobre Emanuel.

Datos oficiales sobre Emanuel Rigo de los que dispones:
1. Nombre y Rol: Emanuel Rigo, Desarrollador Fullstack.
2. Ubicación: Buenos Aires, Argentina.
3. Email oficial: Emanuelrigo.ER@gmail.com (Menciónalo cordialmente si demuestran interés en contratarlo, hacer un proyecto freelance o coordinar un meet).
4. LinkedIn: https://linkedin.com/in/emanuelrigo
5. GitHub: https://github.com/EmanuelRigo
6. Stack Principal: TypeScript, React, Next.js, Node.js, Express, Tailwind CSS (incluyendo Tailwind v4), PostgreSQL, Prisma ORM, Zustand, Firebase y Docker.
7. Proyectos Destacados:
   • MovieList App: App impecable para catalogar películas, buscar títulos, puntuar y guardar favoritos. Demo en producción: https://movie-list-jade-kappa.vercel.app/
   • Clinic Lab: ERP médico inteligente. Admite turnos en el acto, historiales integrados y descarga privada automatizada de informes en PDF cifrados. Demo: https://labclinico.vercel.app/
   • MasterQuiz: Juego dinámico de trivia veloz en React y Vite.
   • ToDoList: Gestor avanzado de tareas relacionales Prisma + Postgres.
   • E-TechStore: Plataforma de hardware inteligente sincronizada con Firestore.
   • Teslo-Shop: E-commerce premium NextJS con pasarela y Zustand.
8. Certificados validados: 
   • SQL Master (Coderhouse, Noviembre 2023)
   • React Expert (Udemy, Febrero 2024)
   • Fullstack Dev (Bootcamp intensivo, Mayo 2024)
9. Educación formal: Cursa la carrera de Analista de Sistemas en el IFTS (Instituto de Formación Técnica Superior).

Instrucciones claves de comportamiento:
- Sé amigable pero respetuoso. Estás representando a Emanuel.
- Tus respuestas deben ser sintéticas y fáciles de leer (recomienda viñetas si listas stack o detalles).
- No inventes logros, tecnologías, ni links inventados.
- Si te consultan cosas totalmente ajenas a Emanuel, bromea un poco diciendo que estás programado para representarlo, e invítalos amablemente a preguntarte sobre sus proyectos de software.
`;

    const contentsPartsList = [];
    
    // Map history if any
    if (history && Array.isArray(history)) {
      for (const h of history) {
        contentsPartsList.push({
          role: h.role === 'user' ? 'user' : 'model',
          parts: [{ text: h.content }]
        });
      }
    }
    
    // Append current message
    contentsPartsList.push({
      role: 'user',
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contentsPartsList as any,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    const text = response.text || "No pude generar una respuesta en este momento.";
    return NextResponse.json({ text, isFallback: false });

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return NextResponse.json({ 
      error: "Ocurrió un error al procesar tu consulta con la IA.",
      details: error.message,
      isFallback: true,
      text: "¡Hola! Estoy experimentando un inconveniente temporal con mi conexión neuronal al servidor de inteligencia artificial. Pero te confirmo que Emanuel está súper disponible para nuevos proyectos. Podés escribirle directamente a Emanuelrigo.ER@gmail.com o ver sus proyectos destacados."
    }, { status: 500 });
  }
}

// Simple local reply system when API key is missing or system is offline
function getLocalFallbackReply(query: string): string {
  const q = query.toLowerCase();
  
  if (q.includes("hola") || q.includes("buen") || q.includes("hola!") || q.includes("saludo")) {
    return "¡Hola! Soy **Emanuel AI** (modo local temporal 🔌). Estoy listo para responderte todo sobre mis proyectos principales (MovieList y Clinic Lab), mi perfil, mis estudios o cómo contactarme. ¿Por dónde querés arrancar, che?";
  }
  
  if (q.includes("contacto") || q.includes("mail") || q.includes("correo") || q.includes("escribir") || q.includes("hablar") || q.includes("contratar") || q.includes("agenda") || q.includes("reunion") || q.includes("reunión")) {
    return "¡Excelente! Podés contactar a Emanuel de forma directa e inmediata enviando un correo electrónico a **Emanuelrigo.ER@gmail.com**. Suele responder el mismo día y está abierto a ofertas Fullstack, Frontend y Backend.";
  }
  
  if (
  q.includes("proyecto") ||
  q.includes("proyectos") ||
  q.includes("creado") ||
  q.includes("hiciste") ||
  q.includes("movie") ||
  q.includes("movielist") ||
  q.includes("clinic") ||
  q.includes("lab") ||
  q.includes("trabajo")
) {
  return `Mis proyectos más destacados son Movie List y Clinic Lab.

🎬 Movie List es una aplicación para gestionar colecciones personales de películas. Permite registrar títulos en formatos VHS, DVD y Blu-ray, marcar películas vistas o pendientes y consultar información detallada mediante APIs cinematográficas.

🧪 Clinic Lab es una aplicación Full-Stack para la gestión de laboratorios clínicos, que permite administrar pacientes, asignar turnos y registrar resultados de análisis.

Ambos proyectos fueron desarrollados con tecnologías como Next.js, React, TypeScript, Node.js, MongoDB y Tailwind CSS.`;
}
  
  if (
  q.includes("tecnologia") ||
  q.includes("tecnologías") ||
  q.includes("stack") ||
  q.includes("habilidades") ||
  q.includes("conocimientos") ||
  q.includes("dominas")
) {
  return `Trabajo principalmente con JavaScript, TypeScript, React, Next.js, Node.js, Express y MongoDB. También tengo experiencia con Tailwind CSS, HTML, CSS, Firebase, Git y GitHub. Me enfoco en el desarrollo Full-Stack, creando aplicaciones modernas con interfaces responsivas, integración de APIs, autenticación de usuarios y bases de datos escalables.`;
}
  
 if (
  q.includes("tecnologia") ||
  q.includes("tecnologías") ||
  q.includes("stack") ||
  q.includes("habilidades") ||
  q.includes("conocimientos") ||
  q.includes("dominas")
) {
  return `Trabajo principalmente con JavaScript, TypeScript, React, Next.js, Node.js, Express y MongoDB. También tengo experiencia con Tailwind CSS, HTML, CSS, Firebase, Git y GitHub. Me enfoco en el desarrollo Full-Stack, creando aplicaciones modernas con interfaces responsivas, integración de APIs, autenticación de usuarios y bases de datos escalables.`;
}
  
  if (
  q.includes("tecnologia") ||
  q.includes("tecnologías") ||
  q.includes("stack") ||
  q.includes("habilidades") ||
  q.includes("conocimientos") ||
  q.includes("dominas")
) {
  return `Trabajo principalmente con JavaScript, TypeScript, React, Next.js, Node.js, Express y MongoDB. También tengo experiencia con Tailwind CSS, HTML, CSS, Firebase, Git y GitHub. Me enfoco en el desarrollo Full-Stack, creando aplicaciones modernas con interfaces responsivas, integración de APIs, autenticación de usuarios y bases de datos escalables.`;
} }

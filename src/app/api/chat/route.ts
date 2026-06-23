

import { GoogleGenAI } from "@google/genai"
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { message, history } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: "El mensaje es obligatorio." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.trim() === "") {
      return NextResponse.json({
        text: getLocalFallbackReply(message),
        isFallback: true,
      });
    }

    const ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });

    const systemInstruction = `
Eres Emanuel AI, el avatar inteligente interactivo de Emanuel Rigo, Desarrollador Fullstack argentino.

Tu misión es hablar como el doble virtual de Emanuel de forma extremadamente profesional, atenta, y con tonada argentina amigable.

Datos oficiales:
- Nombre: Emanuel Rigo
- Ubicación: Buenos Aires, Argentina
- Email: emanuel.r-dev@outlook.com
- LinkedIn: https://linkedin.com/in/emanuelrigo
- GitHub: https://github.com/EmanuelRigo

Stack: TypeScript, React, Next.js, Node.js, Express, Tailwind, PostgreSQL, Prisma, Firebase, Docker.

Proyectos:
- MovieList
- Clinic Lab
- MasterQuiz
- ToDoList
- E-TechStore
- Teslo-Shop

Reglas:
- No inventes datos
- Sé breve y claro
- Si preguntan fuera del perfil, redirigí a sus proyectos
`;

    const contentsPartsList = [];

    if (history && Array.isArray(history)) {
      for (const h of history) {
        contentsPartsList.push({
          role: h.role === "user" ? "user" : "model",
          parts: [{ text: h.content }],
        });
      }
    }

    contentsPartsList.push({
      role: "user",
      parts: [{ text: message }],
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contentsPartsList as any,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const text = response.text || "No pude generar una respuesta en este momento.";

    return NextResponse.json({ text, isFallback: false });
  } catch (error: any) {
    console.error("Gemini API Error:", error);

    return NextResponse.json(
      {
        error: "Ocurrió un error al procesar tu consulta con la IA.",
        details: error.message,
        isFallback: true,
        text:
          "¡Hola! Estoy teniendo problemas técnicos momentáneos, pero podés contactar a Emanuel en emanuel.r-dev@outlook.com",
      },
      { status: 500 }
    );
  }
}

/* =========================
   FALLBACK LOCAL
========================= */

function getLocalFallbackReply(query: string): string {
  const q = query.toLowerCase();

  if (q.includes("hola") || q.includes("buen")) {
    return "¡Hola! Soy Emanuel AI 🤖. ¿En qué te puedo ayudar?";
  }

  if (
    q.includes("contacto") ||
    q.includes("mail") ||
    q.includes("contratar")
  ) {
    return "Podés contactar a Emanuel en: emanuel.r-dev@outlook.com";
  }

  if (
    q.includes("proyecto") ||
    q.includes("movie") ||
    q.includes("clinic")
  ) {
    return `Proyectos destacados: MovieList, Clinic Lab y Swaply.`;
  }

 
  if (
  q.includes("tecnologia") ||
  q.includes("tecnologías") ||
  q.includes("stack") ||
  q.includes("habilidades") ||
  q.includes("conocimientos") ||
  q.includes("dominas") ||
  q.includes("dominás")
) {
  return `Trabajo principalmente con:

• TypeScript
• React
• Next.js
• Node.js
• Express
• Tailwind CSS
• PostgreSQL
• Prisma ORM
• Firebase
• Docker

Además tengo experiencia construyendo aplicaciones Full Stack modernas, integración de APIs, autenticación, bases de datos y despliegues en producción.`;
}
if (
  q.includes("trabajo") ||
  q.includes("empleo") ||
  q.includes("buscas trabajo") ||
  q.includes("buscas empleo") ||
  q.includes("buscando trabajo")
) {
  return `Sí, actualmente estoy abierto a nuevas oportunidades laborales como Desarrollador Full Stack. Me interesan tanto posiciones remotas como híbridas, y también proyectos freelance donde pueda aportar experiencia en React, Next.js, Node.js, TypeScript y tecnologías modernas del ecosistema JavaScript.`;
}
if (
  q.includes("contacto") ||
  q.includes("mail") ||
  q.includes("correo") ||
  q.includes("linkedin") ||
  q.includes("github") ||
  q.includes("contactar")
) {
  return `Podés contactarme a través de cualquiera de estos medios:

📧 Email: emanuel.r-dev@outlook.com
💼 LinkedIn: https://linkedin.com/in/emanuelrigo
💻 GitHub: https://github.com/EmanuelRigo

Estoy disponible para oportunidades laborales, proyectos freelance y colaboraciones tecnológicas. ¡Será un gusto conversar con vos!`;
}

  /* ✅ NUEVO BLOQUE AGREGADO (ESTO ES LO QUE PEDISTE) */
  if (
    q.includes("estudiando") ||
    q.includes("estudias") ||
    q.includes("aprendiendo") ||
    q.includes("formación") ||
    q.includes("actualmente")
  ) {
    return `Actualmente estoy profundizando mis conocimientos en React Native para el desarrollo de aplicaciones móviles multiplataforma. Mi objetivo es ampliar mi experiencia más allá del desarrollo web y crear aplicaciones nativas para Android e iOS utilizando tecnologías modernas del ecosistema JavaScript.`;
  }

  if (
    q.includes("estud") ||
    q.includes("universidad") ||
    q.includes("ifts")
  ) {
    return `Emanuel estudia Analista de Sistemas en el IFTS.`;
  }

  return "Emanuel AI listo para responder sobre proyectos y experiencia.";
}
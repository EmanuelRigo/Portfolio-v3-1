# AGENTS

## Propósito

Este archivo describe la atomización del código en el proyecto `portfolio`, cómo están organizadas las responsabilidades y cómo los agentes deberían comprender la arquitectura del repositorio.

## Estructura principal

- `src/app/[locale]/layout.tsx`
  - Contiene el layout raíz por locale.
  - Envuelve la app con `ContextProvider`, `NextIntlClientProvider` y la estructura visual principal.
  - Define el background global, el contenedor principal y los componentes persistentes: `Sidebar` y `Header`.

- `src/app/[locale]/page.tsx`
  - Página principal de proyectos.
  - Carga datos locales de proyectos (`projectData_en.json`, `projectData.json`) y renderiza `ProjectCard`.

- Rutas adicionales dentro de `src/app/[locale]/`:
  - `certificates/page.tsx`: página de certificados.
  - `contact-me/page.tsx`: página de contacto que renderiza `Contact`.
  - `resume/page.tsx`: página de currículum con la sección de habilidades y experiencia.

## Componentes reutilizables

- `src/components/Sidebar.tsx`
  - Sidebar persistente con perfil, enlaces sociales y CTA a contacto.
  - Usa `next-intl` para traducciones y `next/link` para navegación local.

- `src/components/Header.tsx`
  - Barra superior de navegación con rutas a páginas internas.
  - Incluye animación tipo "typewriter" y cambio de idioma.

- `src/components/Hero.tsx`
  - Componente de presentación con texto principal y alternancia de idioma.
  - Consume `AppContext` para mostrar información relacionada a iconos sobrevolados.
  - Usa `useLocale` y `useRouter` para cambiar entre `/en` y `/es` conservando la ruta actual.

- `src/components/Contact.tsx`
  - Formulario de contacto completamente encapsulado.
  - Maneja estado local, envío y notificaciones.

- `src/components/ProjectCard.tsx`
  - Tarjeta de proyecto reutilizable con imagen, enlaces y modal de información.
  - Usa contexto para actualizar `hoveredIcons` al entrar y salir del mouse.

- `src/components/CertificateCard.tsx`
  - Renderiza un certificado individual dentro de la lista de `certificates`.

- `src/components/InfoModal.tsx`
  - Modal de detalle de proyecto usado por `ProjectCard`.

- `src/components/InfoColumn.tsx`
  - Componentes de columnas de información reutilizables en secciones de página.

## Contexto y estado global

- `src/app/[locale]/context/AppContext.tsx`
  - Define el contexto `AppContext` con estado compartido para iconos sobrevolados.

- `src/app/[locale]/context/contextProvider.tsx`
  - Componente proveedor que expone `AppProvider`.

- `src/app/[locale]/context/context.types.ts`
  - Tipado de la forma del contexto.

## Datos y localización

- `src/data/` contiene JSON estático de proyectos y datos antiguos.
  - `projectData_en.json`, `projectData.json`, `oldProjectData_en.json`, `oldProjectData.json`

- `src/i18n/routing.ts`
  - Configuración de locales soportados (`en`, `es`) para `next-intl`.

## Convención de Imports

### Alias del proyecto

- El alias `@` apunta a `src/`.
- Priorizar imports absolutos usando `@` para mantener consistencia y evitar rutas relativas largas.
- Evitar imports como `../../../components/...` cuando exista una ruta equivalente usando alias.

Ejemplos:

```ts
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { AppProvider } from "@/app/[locale]/context/contextProvider";
import projectData from "@/data/projectData_en.json";
```

Evitar:

```ts
import Header from "../../../components/Header";
import Hero from "../../components/Hero";
```

### Cuándo usar rutas relativas

- Permitidas únicamente para archivos del mismo directorio o vecinos inmediatos.
- Para componentes compartidos, datos, hooks, contextos o utilidades, preferir `@`.

## Principios de atomización

1. Componentes UI separados de páginas.
   - Cada página es responsable de cargar datos y componer componentes.
   - La lógica de presentación vive en componentes reutilizables.

2. Rutas por locale.
   - La carpeta `[locale]` maneja rutas localizadas con `next-intl`.
   - El `layout.tsx` es común a todas las páginas de un locale.

3. Contexto minimalista.
   - El `AppContext` solo gestiona estado necesario para la experiencia compartida entre `ProjectCard`, `Hero` y otros componentes.

4. Datos estáticos fuera de componentes.
   - Los datos de proyectos y certificados se mantienen como JSON independientes en `src/data`.

5. Separación de responsabilidades.
   - `Sidebar` y `Header` solo se encargan de navegación y presentación.
   - `Contact` gestiona formulario y lógica de envío internamente.

## Reglas de Tipado (TypeScript)

1. **Evitar el uso de `any`**
   - Está estrictamente prohibido usar el tipo `any`.

2. **Tipos de eventos en React**
   - Usar siempre tipos oficiales.

Ejemplo:

```ts
React.MouseEvent<HTMLButtonElement>;
FormEvent<HTMLFormElement>;
```

3. **Alternativas seguras**
   - Usar `unknown`.
   - Usar `Record<string, unknown>` cuando corresponda.

## Cómo debería usar este archivo un agente

- Para cambios visuales o navegación → `layout.tsx`, `Header.tsx`, `Sidebar.tsx`.
- Para nuevas páginas → crear nuevo directorio en `src/app/[locale]/`.
- Para proyectos → actualizar `src/data`.
- Para estilos globales → revisar `globals.css`.
- Mantener consistencia con alias `@`.
- Respetar tipado estricto y evitar `any`.

## Recomendaciones de atomización futura

- Mantener componentes pequeños.
- Extraer hooks personalizados (`useLocaleSwitch`, `useHoverState`).
- Separar animaciones si crecen.
- Centralizar interfaces compartidas (`Project`, `Certificate`, etc.).

## Estilo visual

- Usar `rounded-lg` o menores para bordes redondeados.
- Nunca usar `rounded-xl`, `rounded-2xl` o valores mayores salvo que sea estrictamente necesario y se justifique.

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

1. **Evitar el uso de `any`**: Está estrictamente prohibido usar el tipo `any` en el codebase del portfolio. En su lugar, se deben usar tipos fuertemente declarados, interfaces compartidas u otros recursos seguros.
2. **Tipos de eventos en React**: Si un parámetro representa un evento o callback de React, se deben usar tipos nativos provistos por React o por las librerías oficiales de tipado (por ejemplo, `React.MouseEvent<HTMLButtonElement>` o `FormEvent`).
3. **Alternativas seguras a `any`**: Si el tipo de una variable es verdaderamente impredecible o dinámico, prefiere usar `unknown` u objetos genéricos estricto-seguros (`Record<string, unknown>`).

## Cómo debería usar este archivo un agente

- Para cambios visuales o de navegación, modifica `layout.tsx`, `Header.tsx` o `Sidebar.tsx`.
- Para nueva página de contenido, agrega un nuevo subdirectorio bajo `src/app/[locale]/` con `page.tsx` y componentes pequeños.
- Para datos de proyectos, actualiza los JSON en `src/data/` y mantén `ProjectCard` libre de lógica de datos.
- Para temas o estilos globales, revisa `src/app/[locale]/globals.css`.

## Recomendaciones de atomización futura

- Mantener componentes pequeños, con una sola responsabilidad.
- Extraer hooks personalizados si la lógica crece (`useLocaleSwitch`, `useHoverState`, etc.).
- Separar los componentes de animación en archivos propios si la complejidad aumenta.
- Usar más interfaces y tipos compartidos para `Project`, `Certificate` y otras entidades.

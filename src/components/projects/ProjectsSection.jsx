
import React, { useState, useRef, useCallback } from "react";
import { useInView } from "framer-motion";

import { LayoutGrid }     from "./LayoutGrid";
import ProjectSidebar      from "./ProjectSidebar";
import { PROJECTS }        from "./projectsData";
import {
  ProjectsWrapper,
  Inner,
  SectionHeader,
  SectionLabel,
  SectionTitle,
  SectionSub,
} from "./projects.styles";

/* ─────────────────────────────────────────────────────────
   Mapeia os projetos para o formato esperado pelo LayoutGrid
   (o Aceternity usa "content" e "thumbnail";
    aqui enriquecemos com os campos extras de PROJECTS)
───────────────────────────────────────────────────────── */
const CARDS = PROJECTS.map((p) => ({
  id:        p.id,
  thumbnail: p.thumbnail,
  span:      p.span,
  /* Campos extras passados para o grid */
  title:     p.title,
  category:  p.category,
  summary:   p.summary,
  /* referência ao projeto completo (para sidebar) */
  _project:  p,
}));

/* ─────────────────────────────────────────────────────────
   Variantes de scroll reveal
───────────────────────────────────────────────────────── */
const headerVariants = {
  hidden:  { opacity: 0, y: 30 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ─────────────────────────────────────────────────────────
   ProjectsSection
───────────────────────────────────────────────────────── */
function ProjectsSection() {
  const [sidebarProject, setSidebarProject] = useState(null);

  const headerRef    = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  const openSidebar  = useCallback((card) => setSidebarProject(card._project), []);
  const closeSidebar = useCallback(() => setSidebarProject(null), []);

  return (
    <>
      <ProjectsWrapper id="projetos">
        <Inner>
          {/* ── Cabeçalho com scroll reveal ── */}
          <SectionHeader
            ref={headerRef}
            variants={headerVariants}
            initial="hidden"
            animate={headerInView ? "visible" : "hidden"}
          >
            <SectionLabel>Portfólio</SectionLabel>
            <SectionTitle>
              Meus <em>projetos</em>
            </SectionTitle>
            <SectionSub>
              Seleção de trabalhos entregues — clique em qualquer projeto
              para expandir e ver mais detalhes.
            </SectionSub>
          </SectionHeader>

          {/* ── Layout Grid (Aceternity UI) ── */}
          <LayoutGrid
            cards={CARDS}
            onSelectProject={openSidebar}
          />
        </Inner>
      </ProjectsWrapper>

      {/* ── Sidebar de detalhes (drawer lateral) ── */}
      <ProjectSidebar
        project={sidebarProject}
        onClose={closeSidebar}
      />
    </>
  );
}

export default ProjectsSection;
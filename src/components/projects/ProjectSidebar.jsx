
import React, { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";

/* ─────────────────────────────────────────────────────────
   ProjectSidebar
   Drawer deslizante da direita com detalhes completos
   do projeto: descrição, galeria de imagens, stack e links.

   Props:
     project → objeto de PROJECTS | null
     onClose → () => void
───────────────────────────────────────────────────────── */

/* ── Styled ────────────────────────────────────────────── */
const Backdrop = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 300;
  background: rgba(0,0,0,0.45);
  backdrop-filter: blur(3px);
  cursor: pointer;
`;

const Drawer = styled(motion.aside)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 310;
  width: min(520px, 94vw);
  background: var(--bg);
  border-left: 1px solid var(--card-border);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: -12px 0 48px rgba(0,0,0,0.22);
`;

/* Hero image no topo */
const HeroImg = styled.div`
  position: relative;
  height: 220px;
  flex-shrink: 0;
  overflow: hidden;
  background: #111;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
    display: block;
  }

  /* Gradiente para fundir com o conteúdo abaixo */
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50%;
    background: linear-gradient(to bottom, transparent, var(--bg));
  }
`;

/* Badge de categoria sobre a imagem */
const CategoryBadge = styled.span`
  position: absolute;
  top: 1rem;
  left: 1rem;
  z-index: 2;
  font-family: 'Roboto', sans-serif;
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  background: rgba(0,0,0,0.55);
  color: var(--accent2, #c77630);
  border: 1px solid rgba(199,118,48,0.35);
  border-radius: 4px;
  padding: 0.28rem 0.65rem;
  backdrop-filter: blur(4px);
`;

/* Botão fechar */
const CloseBtn = styled.button`
  position: absolute;
  top: 0.8rem;
  right: 0.8rem;
  z-index: 2;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: rgba(0,0,0,0.5);
  border: 1px solid rgba(255,255,255,0.12);
  color: rgba(255,255,255,0.85);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease;

  &:hover { background: rgba(0,0,0,0.8); }
  svg { display: block; }
`;

/* Corpo com scroll */
const Body = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0 1.8rem 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-track { background: transparent; }
  &::-webkit-scrollbar-thumb {
    background: var(--card-border);
    border-radius: 4px;
  }
`;

const Title = styled.h2`
  font-family: 'Poppins', sans-serif;
  font-weight: 800;
  font-size: clamp(1.3rem, 3vw, 1.7rem);
  color: var(--text-primary);
  line-height: 1.2;
  margin: 0;
`;

const Meta = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
`;

const MetaItem = styled.span`
  font-family: 'Roboto', sans-serif;
  font-size: 0.72rem;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Divider = styled.div`
  height: 1px;
  background: var(--card-border);
`;

const SectionLabel = styled.h4`
  font-family: 'Roboto', sans-serif;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--accent);
  margin: 0 0 0.6rem;
`;

const Description = styled.div`
  p {
    font-family: 'Roboto', sans-serif;
    font-size: 0.88rem;
    color: var(--text-secondary);
    line-height: 1.78;
    margin: 0 0 0.85rem;
  }
  p:last-child { margin: 0; }
`;

/* Galeria de screenshots */
const Gallery = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.65rem;

  @media (max-width: 400px) {
    grid-template-columns: 1fr;
  }
`;

const GalleryImg = styled.img`
  width: 100%;
  height: 130px;
  object-fit: cover;
  border-radius: 10px;
  display: block;
  border: 1px solid var(--card-border);
  cursor: zoom-in;
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: scale(1.03);
    box-shadow: 0 8px 24px rgba(0,0,0,0.2);
  }
`;

/* Stack tags */
const StackRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
`;

const StackTag = styled.span`
  font-family: 'Roboto', sans-serif;
  font-size: 0.72rem;
  font-weight: 500;
  padding: 0.3rem 0.7rem;
  border-radius: 6px;
  background: rgba(171,64,10,0.08);
  color: var(--accent);
  border: 1px solid rgba(171,64,10,0.2);

  [data-theme="dark"] & {
    background: rgba(0,232,240,0.06);
    color: var(--neon-ice);
    border-color: rgba(0,232,240,0.15);
  }
`;

/* Botões de ação */
const Actions = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

const ActionBtn = styled.a`
  font-family: 'Poppins', sans-serif;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 0.7rem 1.4rem;
  border-radius: 7px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  text-decoration: none;
  cursor: pointer;
  transition: opacity 0.2s ease, transform 0.15s ease;

  &:hover { opacity: 0.82; transform: translateY(-1px); }

  &.primary {
    background: linear-gradient(135deg, var(--accent3, #852121), var(--accent, #ab400a));
    color: #fff;
    border: none;
  }
  &.outline {
    background: transparent;
    border: 1.5px solid var(--card-border);
    color: var(--text-primary);
  }
`;

/* ── Componente ────────────────────────────────────────── */
function ProjectSidebar({ project, onClose }) {
  /* Fecha com Escape */
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  /* Bloqueia scroll do body enquanto aberto */
  useEffect(() => {
    if (project) document.body.style.overflow = "hidden";
    else         document.body.style.overflow = "";
    return ()  => { document.body.style.overflow = ""; };
  }, [project]);

  /* Formata descrição em parágrafos */
  const paragraphs = project?.description?.split("\n\n").filter(Boolean) ?? [];

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <Backdrop
            key="sb-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            onClick={onClose}
          />

          {/* Drawer */}
          <Drawer
            key="sb-drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0, transition: { type: "spring", stiffness: 300, damping: 32 } }}
            exit={{ x: "100%", transition: { duration: 0.25, ease: "easeIn" } }}
            role="complementary"
            aria-label={`Detalhes do projeto: ${project.title}`}
          >
            {/* ── Hero image ── */}
            <HeroImg>
              <CategoryBadge>{project.category}</CategoryBadge>
              <CloseBtn onClick={onClose} aria-label="Fechar sidebar">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6"  y1="6" x2="18" y2="18"/>
                </svg>
              </CloseBtn>
              <img src={project.thumbnail} alt={project.title} />
            </HeroImg>

            {/* ── Corpo ── */}
            <Body>
              <Title>{project.title}</Title>

              <Meta>
                <MetaItem>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  {project.year}
                </MetaItem>
                <MetaItem>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>
                  </svg>
                  {project.stack.length} tecnologias
                </MetaItem>
              </Meta>

              <Divider />

              {/* Descrição */}
              <div>
                <SectionLabel>Sobre o projeto</SectionLabel>
                <Description>
                  {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
                </Description>
              </div>

              {/* Galeria */}
              {project.images?.length > 0 && (
                <div>
                  <SectionLabel>Screenshots</SectionLabel>
                  <Gallery>
                    {project.images.map((src, i) => (
                      <GalleryImg
                        key={i}
                        src={src}
                        alt={`${project.title} screenshot ${i + 1}`}
                        loading="lazy"
                      />
                    ))}
                  </Gallery>
                </div>
              )}

              {/* Stack */}
              <div>
                <SectionLabel>Stack utilizada</SectionLabel>
                <StackRow>
                  {project.stack.map((t) => (
                    <StackTag key={t}>{t}</StackTag>
                  ))}
                </StackRow>
              </div>

              <Divider />

              {/* Ações */}
              <Actions>
                {project.link && (
                  <ActionBtn
                    className="primary"
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                    Ver ao vivo
                  </ActionBtn>
                )}
                {project.github && (
                  <ActionBtn
                    className="outline"
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                    </svg>
                    Código fonte
                  </ActionBtn>
                )}
                {!project.link && !project.github && (
                  <ActionBtn
                    as="button"
                    className="primary"
                    onClick={onClose}
                    style={{ cursor: "pointer" }}
                    href="#contato"
                  >
                    Solicitar projeto similar →
                  </ActionBtn>
                )}
              </Actions>
            </Body>
          </Drawer>
        </>
      )}
    </AnimatePresence>
  );
}

export default ProjectSidebar;
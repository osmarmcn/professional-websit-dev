
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";

/* ─────────────────────────────────────────────────────────
   HoverEffect  — Aceternity UI "Card Hover Effect"
   Implementação React pura, sem Tailwind CSS.

   O efeito: ao hover, um fundo animado desliza para o
   card atual usando framer-motion layoutId (shared layout).

   Props:
     items     → array de { title, description, icon, link, tags }
     className → string (opcional)
───────────────────────────────────────────────────────── */

/* ── Styled components ─────────────────────────────────── */
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 2.5rem 0;
  gap: 0;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 580px) {
    grid-template-columns: 1fr;
  }
`;

const CardLink = styled.a`
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  padding: 0.5rem;
  text-decoration: none;
  cursor: ${({ $hasLink }) => ($hasLink ? "pointer" : "default")};

  /* Bloco interno visível */
  & .card-body {
    position: relative;
    z-index: 10;
    border-radius: 18px;
    border: 1px solid var(--card-border);
    background: var(--bg);
    padding: 1.8rem 1.6rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    transition: border-color 0.25s ease;
  }

  &:hover .card-body {
    border-color: transparent;
  }
`;

/* Background que desliza entre os cards */
const HoverBg = styled(motion.span)`
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  background: var(--bg2);

  [data-theme="dark"] & {
    background: rgba(70, 14, 100, 0.25);
  }
`;

/* Ícone do card */
const CardIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--accent3), var(--accent));
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: transform 0.3s ease;

  svg {
    color: #fff;
    display: block;
  }

  ${CardLink}:hover & {
    transform: scale(1.08) rotate(-4deg);
  }
`;

const CardTitle = styled.h3`
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-size: 1rem;
  color: var(--text-primary);
  line-height: 1.3;
  margin: 0;
  transition: color 0.2s ease;

  ${CardLink}:hover & {
    color: var(--accent);
  }
`;

const CardDesc = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 0.82rem;
  color: var(--text-secondary);
  line-height: 1.7;
  flex: 1;
  margin: 0;
`;

const CardTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-top: auto;
  padding-top: 0.5rem;
`;

const Tag = styled.span`
  font-family: 'Roboto', sans-serif;
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.06em;
  padding: 0.22rem 0.55rem;
  border-radius: 4px;
  background: rgba(171,64,10,0.10);
  color: var(--accent);
  border: 1px solid rgba(171,64,10,0.2);

  [data-theme="dark"] & {
    background: rgba(0,232,240,0.06);
    color: var(--neon-ice);
    border-color: rgba(0,232,240,0.15);
  }
`;

const ArrowHint = styled.span`
  font-family: 'Roboto', sans-serif;
  font-size: 0.72rem;
  color: var(--accent);
  opacity: 0;
  transform: translateX(-6px);
  transition: opacity 0.2s ease, transform 0.2s ease;
  margin-top: 0.2rem;
  display: inline-flex;
  align-items: center;
  gap: 4px;

  ${CardLink}:hover & {
    opacity: 1;
    transform: translateX(0);
  }
`;

/* ── Componente ────────────────────────────────────────── */
export function HoverEffect({ items }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <Grid>
      {items.map((item, idx) => (
        <CardLink
          key={item.title + idx}
          href={item.link || undefined}
          $hasLink={!!item.link}
          target={item.link ? "_blank" : undefined}
          rel={item.link ? "noopener noreferrer" : undefined}
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {/* Fundo animado compartilhado (layoutId sincroniza entre cards) */}
          <AnimatePresence>
            {hoveredIndex === idx && (
              <HoverBg
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.15 } }}
                exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.1 } }}
              />
            )}
          </AnimatePresence>

          {/* Corpo do card */}
          <div className="card-body">
            {item.icon && <CardIcon>{item.icon}</CardIcon>}

            <CardTitle>{item.title}</CardTitle>
            <CardDesc>{item.description}</CardDesc>

            {item.tags && item.tags.length > 0 && (
              <CardTags>
                {item.tags.map((t) => <Tag key={t}>{t}</Tag>)}
              </CardTags>
            )}

            {item.link && (
              <ArrowHint>
                Saiba mais
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5"
                  strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </ArrowHint>
            )}
          </div>
        </CardLink>
      ))}
    </Grid>
  );
}
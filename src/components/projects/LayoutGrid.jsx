
import React, { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";

/* ─────────────────────────────────────────────────────────
   LayoutGrid — Aceternity UI
   Implementação React pura, sem Tailwind CSS.

   Ao clicar num card ele expande sobre os demais com um
   overlay escuro. Clicar fora ou pressionar Escape fecha.

   Props:
     cards → array de objetos do PROJECTS (projectsData.js)
     onSelectProject → (project) => void — abre sidebar
───────────────────────────────────────────────────────── */

/* ── Styled components ─────────────────────────────────── */
const GridWrapper = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2.5rem 5vw 4rem;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 580px) {
    grid-template-columns: 1fr;
  }
`;

const CardWrapper = styled.div`
  grid-column: ${({ $wide }) => ($wide ? "span 2" : "span 1")};

  @media (max-width: 900px) {
    grid-column: ${({ $wide }) => ($wide ? "span 2" : "span 1")};
  }
  @media (max-width: 580px) {
    grid-column: span 1;
  }
`;

const CardBox = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 260px;
  border-radius: 18px;
  overflow: hidden;
  cursor: pointer;
  background: #111;

  @media (max-width: 580px) {
    height: 200px;
  }
`;

/* Imagem de fundo com blur suave ao hover */
const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
  transition: transform 0.5s ease, filter 0.3s ease;

  ${CardBox}:hover & {
    transform: scale(1.04);
    filter: brightness(0.75);
  }
`;

/* Overlay padrão (gradiente no rodapé) */
const CardOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(0,0,0,0.72) 0%,
    rgba(0,0,0,0.15) 55%,
    transparent 100%
  );
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1.4rem 1.2rem;
  transition: background 0.3s ease;

  ${CardBox}:hover & {
    background: linear-gradient(
      to top,
      rgba(0,0,0,0.82) 0%,
      rgba(0,0,0,0.28) 60%,
      transparent 100%
    );
  }
`;

const CardCategory = styled.span`
  font-family: 'Roboto', sans-serif;
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--accent2, #c77630);
  margin-bottom: 0.3rem;
  display: block;
`;

const CardTitle = styled.p`
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-size: clamp(0.95rem, 2vw, 1.2rem);
  color: #fff;
  line-height: 1.25;
  margin: 0 0 0.45rem;
`;

const CardSummary = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 0.75rem;
  color: rgba(255,255,255,0.72);
  line-height: 1.55;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const SeeMoreBtn = styled(motion.button)`
  margin-top: 0.75rem;
  font-family: 'Roboto', sans-serif;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--accent2, #c77630);
  background: rgba(199,118,48,0.12);
  border: 1px solid rgba(199,118,48,0.35);
  border-radius: 4px;
  padding: 0.3rem 0.8rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  transition: background 0.2s ease;
  align-self: flex-start;

  &:hover {
    background: rgba(199,118,48,0.22);
  }
`;

/* Overlay escuro ao selecionar */
const DimOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 40;
  background: rgba(0,0,0,0.6);
  cursor: pointer;
  backdrop-filter: blur(2px);
`;

/* Card expandido sobre o overlay */
const ExpandedCard = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  pointer-events: none;
`;

const ExpandedInner = styled(motion.div)`
  width: 100%;
  max-width: 780px;
  max-height: 80vh;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  pointer-events: all;
  background: #111;
  box-shadow: 0 32px 80px rgba(0,0,0,0.55);
`;

const ExpandedImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  object-position: center top;
  display: block;

  @media (max-width: 600px) {
    height: 200px;
  }
`;

const ExpandedBody = styled.div`
  padding: 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const ExpandedCategory = styled.span`
  font-family: 'Roboto', sans-serif;
  font-size: 0.65rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--accent, #ab400a);
`;

const ExpandedTitle = styled.h3`
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-size: clamp(1.2rem, 3vw, 1.6rem);
  color: #fff;
  margin: 0;
  line-height: 1.2;
`;

const ExpandedSummary = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 0.85rem;
  color: rgba(255,255,255,0.65);
  line-height: 1.7;
  margin: 0;
`;

const ExpandedActions = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-top: 0.25rem;
`;

const ActionBtn = styled.button`
  font-family: 'Poppins', sans-serif;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 0.6rem 1.3rem;
  border-radius: 6px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: opacity 0.2s ease, transform 0.15s ease;

  &:hover { opacity: 0.85; transform: translateY(-1px); }

  &.primary {
    background: linear-gradient(135deg, var(--accent3, #852121), var(--accent, #ab400a));
    color: #fff;
    border: none;
  }
  &.ghost {
    background: transparent;
    border: 1.5px solid rgba(255,255,255,0.2);
    color: rgba(255,255,255,0.75);
  }
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 0.8rem;
  right: 0.8rem;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(0,0,0,0.5);
  border: 1px solid rgba(255,255,255,0.12);
  color: rgba(255,255,255,0.8);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 60;
  transition: background 0.2s ease;

  &:hover { background: rgba(0,0,0,0.75); }
`;

/* ── Componente ────────────────────────────────────────── */
export function LayoutGrid({ cards, onSelectProject }) {
  const [selected, setSelected]   = useState(null);

  /* Fecha com Escape */
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setSelected(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleClick     = useCallback((card) => setSelected(card),    []);
  const handleClose     = useCallback(() => setSelected(null),         []);
  const handleSidebar   = useCallback((card, e) => {
    e.stopPropagation();
    onSelectProject?.(card);
    setSelected(null);
  }, [onSelectProject]);

  return (
    <>
      <GridWrapper>
        {cards.map((card) => (
          <CardWrapper key={card.id} $wide={card.span === "wide"}>
            <CardBox
              layout
              onClick={() => handleClick(card)}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
            >
              <CardImage
                src={card.thumbnail}
                alt={card.title}
                loading="lazy"
              />
              <CardOverlay>
                <CardCategory>{card.category}</CardCategory>
                <CardTitle>{card.title}</CardTitle>
                <CardSummary>{card.summary}</CardSummary>
              </CardOverlay>
            </CardBox>
          </CardWrapper>
        ))}
      </GridWrapper>

      {/* ── Card expandido + overlay ── */}
      <AnimatePresence>
        {selected && (
          <>
            <DimOverlay
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
            />
            <ExpandedCard key="expanded">
              <ExpandedInner
                initial={{ opacity: 0, y: 40, scale: 0.97 }}
                animate={{ opacity: 1, y: 0,  scale: 1,    transition: { duration: 0.3, ease: [0.22,1,0.36,1] } }}
                exit={{    opacity: 0, y: 20, scale: 0.97,  transition: { duration: 0.2 } }}
              >
                <CloseBtn onClick={handleClose} aria-label="Fechar">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6"  y1="6" x2="18" y2="18"/>
                  </svg>
                </CloseBtn>

                <ExpandedImage src={selected.thumbnail} alt={selected.title} />

                <ExpandedBody>
                  <ExpandedCategory>
                    {selected.category} · {selected.year}
                  </ExpandedCategory>
                  <ExpandedTitle>{selected.title}</ExpandedTitle>
                  <ExpandedSummary>{selected.summary}</ExpandedSummary>

                  <ExpandedActions>
                    <ActionBtn
                      className="primary"
                      onClick={(e) => handleSidebar(selected, e)}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round"strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                      </svg>
                      Ver mais detalhes
                    </ActionBtn>
                    {selected.link && (
                      <ActionBtn as="a" className="ghost" href={selected.link}
                        target="_blank" rel="noopener noreferrer">
                        Demo ao vivo ↗
                      </ActionBtn>
                    )}
                    {selected.github && (
                      <ActionBtn as="a" className="ghost" href={selected.github}
                        target="_blank" rel="noopener noreferrer">
                        GitHub ↗
                      </ActionBtn>
                    )}
                  </ExpandedActions>
                </ExpandedBody>
              </ExpandedInner>
            </ExpandedCard>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
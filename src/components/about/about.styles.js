import styled, { keyframes, css } from "styled-components";

/* ── Animações ─────────────────────────────────────────── */
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(32px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const lineGrow = keyframes`
  from { scaleX: 0; }
  to   { scaleX: 1; }
`;

/* ── Seção wrapper ─────────────────────────────────────── */
export const AboutWrapper = styled.section`
  background: var(--bg);
  transition: background 0.4s ease;
  overflow: hidden;
  position: relative;
`;

/* ── Cabeçalho da seção (título acima do card) ─────────── */
export const SectionLabel = styled.span`
  display: inline-block;
  font-family: 'Roboto', sans-serif;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 0.75rem;
`;

export const SectionTitle = styled.h2`
  font-family: 'Poppins', sans-serif;
  font-weight: 800;
  font-size: clamp(2rem, 5vw, 4rem);
  line-height: 1.08;
  color: var(--text-primary);
  margin-bottom: 0.5rem;

  em {
    font-style: normal;
    background: linear-gradient(
      90deg,
      var(--accent3),
      var(--accent),
      var(--accent2),
      var(--accent3)
    );
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer 3s linear infinite;
  }

  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
`;

export const SectionSub = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: clamp(0.9rem, 1.6vw, 1.05rem);
  color: var(--text-secondary);
  line-height: 1.7;
  max-width: 540px;
  margin: 0 auto;
`;

/* ── Conteúdo interno do card 3D ───────────────────────── */
export const CardContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  height: 100%;
  background: #111;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    overflow-y: auto;
  }
`;

/* Lado esquerdo — foto */
export const CardPhoto = styled.div`
  position: relative;
  overflow: hidden;
  background: #0d0d0d;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
    display: block;
    transition: transform 0.6s ease;
  }

  /* Overlay gradiente: desbota embaixo e à direita para fundir com o card */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background:
      linear-gradient(to right,  transparent 55%, #1a1a1a 100%),
      linear-gradient(to bottom, transparent 70%, #1a1a1a 100%);
    pointer-events: none;
  }

  /* Leve zoom ao hover no card (herdado do parent) */
  &:hover img {
    transform: scale(1.04);
  }

  @media (max-width: 768px) {
    height: 200px;

    img {
      object-position: top center;
    }

    &::after {
      background:
        linear-gradient(to bottom, transparent 60%, #1a1a1a 100%);
    }
  }
`;

/* Lado direito — texto */
export const CardText = styled.div`
  padding: 2.4rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.1rem;
  overflow-y: auto;

  /* Scrollbar sutil */
  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-track { background: transparent; }
  &::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 4px; }

  @media (max-width: 768px) {
    padding: 1.4rem 1.2rem;
    gap: 0.85rem;
  }
`;

export const CardName = styled.h3`
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-size: clamp(1.1rem, 2.4vw, 1.5rem);
  color: #fff;
  line-height: 1.2;

  span {
    display: block;
    font-size: clamp(0.7rem, 1.2vw, 0.85rem);
    font-weight: 400;
    color: rgba(171,64,10,0.9);
    letter-spacing: 0.14em;
    text-transform: uppercase;
    margin-top: 2px;
  }
`;

export const Divider = styled.div`
  width: 40px;
  height: 2px;
  background: linear-gradient(to right, var(--accent), var(--accent2));
  border-radius: 2px;
  transform-origin: left;
`;

export const Paragraph = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: clamp(0.75rem, 1.2vw, 0.88rem);
  color: rgba(255,255,255,0.65);
  line-height: 1.75;
`;

/* ── Tags de skills rápidas ────────────────────────────── */
export const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin-top: 0.2rem;
`;

export const Tag = styled.span`
  font-family: 'Roboto', sans-serif;
  font-size: 0.68rem;
  font-weight: 500;
  letter-spacing: 0.06em;
  padding: 0.28rem 0.65rem;
  border-radius: 4px;
  background: ${({ $variant }) =>
    $variant === "accent"
      ? "rgba(171,64,10,0.18)"
      : "rgba(255,255,255,0.05)"};
  color: ${({ $variant }) =>
    $variant === "accent"
      ? "#c77630"
      : "rgba(255,255,255,0.5)"};
  border: 1px solid ${({ $variant }) =>
    $variant === "accent"
      ? "rgba(171,64,10,0.3)"
      : "rgba(255,255,255,0.08)"};
`;

/* ── Indicadores de stats (abaixo do card) ─────────────── */
export const StatsRow = styled.div`
  display: flex;
  justify-content: center;
  gap: clamp(2rem, 6vw, 5rem);
  padding: 2.5rem 5vw 3.5rem;
  background: var(--bg2);
  border-top: 1px solid var(--card-border);
  flex-wrap: wrap;
`;

export const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  animation: ${fadeUp} 0.7s ease both;
  animation-delay: ${({ $delay }) => $delay || "0s"};
`;

export const StatNumber = styled.span`
  font-family: 'Poppins', sans-serif;
  font-weight: 800;
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  color: var(--accent);
  line-height: 1;
`;

export const StatLabel = styled.span`
  font-family: 'Roboto', sans-serif;
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-muted);
  text-align: center;
`;
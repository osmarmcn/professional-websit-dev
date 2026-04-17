import styled, { css } from "styled-components";
import { fadeUp, shimmer, pulseGlow, floatCard } from "../../styles/keyframes";

/* ── 1. Tipografia (Definir primeiro para evitar erros de referência) ── */

export const TagLine = styled.span`
  font-family: 'Roboto', sans-serif;
  font-size: 0.72rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 1.2rem;
  opacity: 0;
  animation: ${fadeUp} 0.7s ease both 0.10s;
`;

export const Heading = styled.h1`
  font-family: 'Poppins', sans-serif;
  font-weight: 800;
  font-size: clamp(2.2rem, 5vw, 4.2rem); 
  line-height: 1.1;
  color: var(--text-primary);
  opacity: 0;
  animation: ${fadeUp} 0.8s ease both 0.25s;
  max-width: 850px; 

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
    animation: ${shimmer} 3s linear infinite;
  }
`;

export const SubHeading = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: clamp(0.85rem, 1.6vw, 1.05rem);
  color: var(--text-secondary);
  line-height: 1.75;
  max-width: 520px;
  margin-top: 1.4rem;
  opacity: 0;
  animation: ${fadeUp} 0.8s ease both 0.40s;
`;

/* ── 2. Botões ──────────────────────────────────────────── */

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2.4rem;
  flex-wrap: wrap;
  opacity: 0;
  animation: ${fadeUp} 0.8s ease both 0.55s;

  @media (max-width: 600px) {
    justify-content: center;
  }
`;

const buttonBase = css`
  font-family: 'Roboto', sans-serif;
  font-size: 0.82rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.85rem 2rem;
  border-radius: 3px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease, border-color 0.2s ease;

  &:hover  { transform: translateY(-2px); }
  &:active { transform: translateY(0); }
`;

export const BtnPrimary = styled.button`
  ${buttonBase}
  background: var(--btn-primary-bg);
  color: var(--btn-primary-text);
  border: 2px solid var(--btn-primary-bg);

  &:hover {
    background: var(--btn-primary-bg);
    border-color: var(--accent);
    box-shadow: 0 0 20px rgba(171, 64, 10, 0.4); /* Brilho na cor do seu accent */
    transform: translateY(-3px);
  }
`;

export const BtnSecondary = styled.button`
  ${buttonBase}
  background: var(--btn-secondary-bg);
  color: var(--btn-secondary-text);
  border: 2px solid var(--btn-secondary-border);

  &:hover {
    background: var(--btn-secondary-border);
    color: var(--bg);
  }
`;

/* ── 3. Layout Principal ────────────────────────────────── */

export const HeroWrapper = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  background: var(--bg);
`;

export const DesktopContainer = styled.div`
  display: block;
  width: 100%;
  height: 100%;

  @media (max-width: 1024px) {
    display: none;
  }
`;

export const MobileContainer = styled.div`
  display: none;
  width: 100%;
  min-height: 100vh;

  @media (max-width: 1024px) {
    display: flex;
    flex-direction: column;
  }
`;

export const CanvasLayer = styled.canvas`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  opacity: var(--canvas-opacity);
  z-index: 0;
`;

export const ContentLayer = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 760px;
  padding: 0 6vw;

  @media (max-width: 600px) {
    align-items: center;
    text-align: center;
    padding: 0 5vw;
  }
`;

/* ── 4. Cards (Desktop Only) ───────────────────────────── */

export const CardsLayer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;

  & > * {
    pointer-events: all;
  }
`;

export const CardOuter = styled.div`
  position: absolute;
  width: 90px;
  height: 90px;
  perspective: 600px;
  cursor: pointer;
  animation: ${floatCard} linear infinite;
  animation-duration: ${({ $dur }) => $dur || "6s"};
  animation-delay: ${({ $delay }) => $delay || "0s"};

  &:hover .card-inner {
    transform: rotateY(180deg);
  }
`;

export const CardInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.65s cubic-bezier(0.4, 0.2, 0.2, 1);
  border-radius: 14px;
`;

const CardFace = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 14px;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1.5px solid var(--card-border);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
`;

export const CardFront = styled(CardFace)`
  background: var(--card-bg);
  gap: 8px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.10);

  span.label {
    font-family: 'Roboto', sans-serif;
    font-size: 0.55rem;
    letter-spacing: 0.10em;
    color: var(--text-muted);
    text-transform: uppercase;
  }
`;

export const CardBack = styled(CardFace)`
  background: var(--card-bg);
  transform: rotateY(180deg);
  padding: 8px;
  overflow: hidden;
  gap: 4px;

  img {
    width: 100%;
    height: 55px;
    object-fit: cover;
    border-radius: 8px;
    opacity: 0.9;
  }

  .proj-name {
    font-family: 'Poppins', sans-serif;
    font-size: 0.55rem;
    font-weight: 700;
    color: var(--text-primary);
    text-align: center;
    line-height: 1.2;
  }

  .proj-tag {
    font-family: 'Roboto', sans-serif;
    font-size: 0.46rem;
    color: var(--accent);
    text-align: center;
  }
`;

/* ── 5. Utilitários & Overlays ────────────────────────── */

export const NoiseOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  opacity: 0.035;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 200px 200px;
`;

export const ScrollHint = styled.div`
  position: absolute;
  bottom: 2.5rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  opacity: 0.45;
  animation: ${fadeUp} 1s ease both 1.2s;

  .line {
    width: 1px;
    height: 40px;
    background: linear-gradient(to bottom, transparent, var(--text-muted));
  }

  span {
    font-family: 'Roboto', sans-serif;
    font-size: 0.58rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--text-muted);
  }
`;

/* ── 6. Mobile Components (Declarados por último para usar referências acima) ── */

export const MobileHeroWrapper = styled.div`
  height: 100vh;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: var(--bg);
`;

export const MobileContent = styled.div`
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 0 20px;
  gap: 1rem;
  width: 100%;

  ${Heading} {
    font-size: clamp(1.8rem, 8vw, 2.4rem); /* Texto menor e mais elegante no mobile */
    line-height: 1.2;
    margin-bottom: 0.5rem;
  }

  ${SubHeading} {
    font-size: 0.9rem;
    line-height: 1.6;
    max-width: 300px;
    margin-top: 0.5rem;
  }


  ${ButtonGroup} {
    opacity: 1;
    animation: ${fadeUp} 0.8s ease both 0.4s;
  }
`;
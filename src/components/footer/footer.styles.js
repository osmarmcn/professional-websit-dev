import styled, { keyframes, css } from "styled-components";
import { motion } from "framer-motion";

/* ── Animações Restantes ────────────────────────────────── */
const floatUp = keyframes`
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-5px); }
`;

/* ── Wrapper principal ─────────────────────────────────── */
export const FooterWrapper = styled.footer`
  position: relative;
  background: #060608;
  overflow: hidden;

  /* Linha superior com gradiente accent */
  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(
      to right,
      transparent 0%,
      var(--accent3)  20%,
      var(--accent)   50%,
      var(--accent2)  80%,
      transparent     100%
    );
  }
`;

/* Noise sutil */
export const Noise = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.025;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 180px;
  z-index: 0;
`;

/* Grade de pontos leve */
export const DotGrid = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background-image: radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px);
  background-size: 24px 24px;
`;

/* ── Conteúdo interno ─────────────────────────────────── */
export const Inner = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 5vw;
`;

/* ── Grid de links ───────────────────────────────────── */
export const LinksGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 2.5rem;
  padding: 3.5rem 0 3rem;
  border-bottom: 1px solid rgba(255,255,255,0.06);

  @media (max-width: 900px) {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
  @media (max-width: 560px) {
    grid-template-columns: 1fr;
    gap: 1.8rem;
  }
`;

/* Coluna da marca */
export const BrandCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const BrandLogo = styled.div`
  font-family: 'Poppins', sans-serif;
  font-weight: 800;
  font-size: 1.4rem;
  color: #fff;
  letter-spacing: -0.02em;

  span { color: var(--accent); }
`;

export const BrandTagline = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 0.8rem;
  color: rgba(255,255,255,0.35);
  line-height: 1.7;
  max-width: 240px;
`;

/* Social icons no brand */
export const SocialRow = styled.div`
  display: flex;
  gap: 0.55rem;
  margin-top: 0.25rem;
`;

export const SocialIcon = styled.a`
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255,255,255,0.45);
  text-decoration: none;
  cursor: pointer;
  transition: all 0.22s ease;

  svg { display: block; flex-shrink: 0; }

  &:hover {
    background: rgba(171,64,10,0.15);
    border-color: var(--accent);
    color: var(--accent);
    transform: translateY(-2px);
  }
  &.whatsapp:hover { background: rgba(37,211,102,0.12); border-color: #25D366; color: #25D366; }
  &.linkedin:hover  { background: rgba(10,102,194,0.12); border-color: #0A66C2; color: #0A66C2; }
  &.github:hover    { background: rgba(255,255,255,0.10); border-color: rgba(255,255,255,0.4); color: #fff; }
`;

/* Colunas de nav */
export const NavCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
`;

export const NavColTitle = styled.h4`
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-size: 0.75rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.6);
  margin-bottom: 0.3rem;
`;

export const NavLink = styled.a`
  font-family: 'Roboto', sans-serif;
  font-size: 0.82rem;
  color: rgba(255,255,255,0.35);
  text-decoration: none;
  cursor: pointer;
  transition: color 0.2s ease, transform 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;

  &:hover {
    color: var(--accent);
    transform: translateX(3px);
  }

  &::before {
    content: '→';
    font-size: 0.65rem;
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  &:hover::before {
    opacity: 1;
  }
`;

/* ── Barra inferior ──────────────────────────────────── */
export const BottomBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.6rem 0 2rem;
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: 560px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

export const Copyright = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 0.75rem;
  color: rgba(255,255,255,0.22);
  line-height: 1.6;

  a {
    color: var(--accent);
    text-decoration: none;
    &:hover { text-decoration: underline; }
  }
`;

export const MadeWith = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 0.72rem;
  color: rgba(255,255,255,0.18);
  display: flex;
  align-items: center;
  gap: 0.3rem;

  .heart {
    color: var(--accent3);
    animation: pulse 1.4s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50%       { transform: scale(1.25); }
  }
`;

/* ── Botão voltar ao topo ────────────────────────────── */
export const BackToTop = styled(motion.button)`
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.10);
  color: rgba(255,255,255,0.45);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease;
  animation: ${floatUp} 2.5s ease-in-out infinite;

  svg { display: block; }

  &:hover {
    background: rgba(171,64,10,0.2);
    border-color: var(--accent);
    color: var(--accent);
  }
`;
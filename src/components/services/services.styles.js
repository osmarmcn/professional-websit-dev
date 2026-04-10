
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";

/* ── Animações ─────────────────────────────────────────── */
const shimmer = keyframes`
  0%   { background-position: -200% center; }
  100% { background-position:  200% center; }
`;

/* ── Seção wrapper ─────────────────────────────────────── */
export const ServicesWrapper = styled.section`
  background: var(--bg);
  position: relative;
  overflow: hidden;
  transition: background 0.4s ease;

  /* Linha decorativa separando do About */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 10%;
    right: 10%;
    height: 1px;
    background: linear-gradient(
      to right,
      transparent,
      var(--card-border),
      transparent
    );
  }
`;

/* ── Fundo com dot grid sutil ───────────────────────────── */
export const DotBg = styled.div`
  position: absolute;
  inset: 0;
  background-image: radial-gradient(
    circle,
    var(--text-muted) 1px,
    transparent 1px
  );
  background-size: 28px 28px;
  opacity: 0.06;
  pointer-events: none;
  z-index: 0;
`;

/* ── Inner container ────────────────────────────────────── */
export const Inner = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 6rem 5vw 5rem;

  @media (max-width: 768px) {
    padding: 4rem 5vw 3.5rem;
  }
`;

/* ── Header da seção ────────────────────────────────────── */
export const SectionHeader = styled(motion.div)`
  text-align: center;
  margin-bottom: 0.5rem;
`;

export const SectionLabel = styled.span`
  display: inline-block;
  font-family: 'Roboto', sans-serif;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.26em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 0.8rem;
`;

export const SectionTitle = styled.h2`
  font-family: 'Poppins', sans-serif;
  font-weight: 800;
  font-size: clamp(2rem, 5vw, 3.8rem);
  line-height: 1.1;
  color: var(--text-primary);
  margin-bottom: 1rem;

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

export const SectionSub = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: clamp(0.88rem, 1.5vw, 1rem);
  color: var(--text-secondary);
  line-height: 1.75;
  max-width: 560px;
  margin: 0 auto 0.5rem;
`;

/* ── CTA footer ─────────────────────────────────────────── */
export const CtaFooter = styled(motion.div)`
  text-align: center;
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
`;

export const CtaText = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 0.88rem;
  color: var(--text-muted);
`;

export const CtaButton = styled.a`
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-size: 0.85rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 0.85rem 2.2rem;
  border-radius: 6px;
  background: linear-gradient(135deg, var(--accent3), var(--accent));
  color: #fff;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: opacity 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;

  &:hover {
    opacity: 0.88;
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.18);
  }

  [data-theme="dark"] & {
    background: linear-gradient(135deg, var(--indigo), var(--accent2));
    color: var(--neon-ice);
  }
`;
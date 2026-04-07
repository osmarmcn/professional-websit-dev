
import { keyframes } from "styled-components";

/* ─────────────────────────────────────────────────────────
   KEYFRAMES GLOBAIS
   Exportados individualmente para uso nos styled-components
   de qualquer pasta (hero, header, etc.).
───────────────────────────────────────────────────────── */

/** Entrada suave vinda de baixo */
export const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(40px); }
  to   { opacity: 1; transform: translateY(0); }
`;

/** Gradiente de texto em movimento */
export const shimmer = keyframes`
  0%   { background-position: -200% center; }
  100% { background-position:  200% center; }
`;

/** Pulso de brilho no botão primário ao hover */
export const pulseGlow = keyframes`
  0%, 100% { box-shadow: 0 0 0px 0px transparent; }
  50%       { box-shadow: 0 0 24px 6px var(--accent); }
`;

/** Flutuação orgânica dos cards de tecnologia */
export const floatCard = keyframes`
  0%, 100% { transform: translateY(0px)   rotate(0deg);  }
  33%       { transform: translateY(-12px) rotate(1.5deg); }
  66%       { transform: translateY(6px)   rotate(-1deg); }
`;

/** Deslize lateral — entrada do header */
export const slideDown = keyframes`
  from { opacity: 0; transform: translateY(-16px); }
  to   { opacity: 1; transform: translateY(0); }
`;
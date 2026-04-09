
import styled, { keyframes, css } from "styled-components";

/* ── Animações ─────────────────────────────────────────── */

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

/* Saída: fade + leve scale down — dispara ao fim dos 3s */
export const exitAnim = keyframes`
  0%   { opacity: 1; transform: scale(1); }
  100% { opacity: 0; transform: scale(1.04); }
`;

/* ── Wrapper de tela cheia ─────────────────────────────── */
export const IntroWrapper = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  /* Saída suave quando $exiting=true */
  ${({ $exiting }) =>
    $exiting &&
    css`
      animation: ${exitAnim} 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    `}
`;

/* ── Nome principal ────────────────────────────────────── */
export const IntroName = styled.h1`
  font-family: 'Poppins', sans-serif;
  font-weight: 800;
  font-size: clamp(2.8rem, 8vw, 7rem);
  color: #fff;
  text-align: center;
  position: relative;
  z-index: 20;
  letter-spacing: -0.02em;
  line-height: 1.05;
  animation: ${fadeInUp} 0.7s cubic-bezier(0.22, 1, 0.36, 1) both 0.2s;

  /* Sobrenome em destaque com accent */
  span {
    background: linear-gradient(90deg, #ab400a, #c77630, #852121);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

/* ── Subtítulo / função ─────────────────────────────────── */
export const IntroRole = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: clamp(0.85rem, 2vw, 1.1rem);
  color: rgba(255, 255, 255, 0.5);
  letter-spacing: 0.22em;
  text-transform: uppercase;
  margin-top: 0.6rem;
  position: relative;
  z-index: 20;
  animation: ${fadeInUp} 0.7s cubic-bezier(0.22, 1, 0.36, 1) both 0.45s;
`;

/* ── Área das partículas sparkles ──────────────────────── */
export const SparklesArea = styled.div`
  width: min(40rem, 90vw);
  height: 10rem;
  position: relative;
  margin-top: 0.5rem;
`;

/* ── Linhas gradiente decorativas (fiel ao original) ───── */
export const GradientLine = styled.div`
  position: absolute;
  top: 0;
  ${({ $variant }) => {
    switch ($variant) {
      case "indigo-wide-blur":
        return css`
          left: 12.5%; right: 12.5%;  /* inset-x-20 ≈ 80px / 640 */
          width: 75%;
          height: 2px;
          background: linear-gradient(to right, transparent, #6366f1, transparent);
          filter: blur(2px);
        `;
      case "indigo-wide":
        return css`
          left: 12.5%; right: 12.5%;
          width: 75%;
          height: 1px;
          background: linear-gradient(to right, transparent, #6366f1, transparent);
        `;
      case "sky-narrow-blur":
        return css`
          left: 37.5%; right: 37.5%;  /* inset-x-60 ≈ 240px / 640 */
          width: 25%;
          height: 5px;
          background: linear-gradient(to right, transparent, #0ea5e9, transparent);
          filter: blur(2px);
        `;
      case "sky-narrow":
        return css`
          left: 37.5%; right: 37.5%;
          width: 25%;
          height: 1px;
          background: linear-gradient(to right, transparent, #0ea5e9, transparent);
        `;
      default:
        return "";
    }
  }}
`;

/* ── Máscara radial (borda suave embaixo das partículas) ── */
export const RadialMask = styled.div`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background: #000;
  -webkit-mask-image: radial-gradient(350px 200px at top, transparent 20%, white);
  mask-image: radial-gradient(350px 200px at top, transparent 20%, white);
`;

/* ── Barra de progresso na base ─────────────────────────── */
const progressFill = keyframes`
  from { width: 0%; }
  to   { width: 100%; }
`;

export const ProgressBar = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  width: min(200px, 60vw);
  height: 2px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 999px;
  overflow: hidden;
  z-index: 20;

  &::after {
    content: '';
    display: block;
    height: 100%;
    background: linear-gradient(to right, #852121, #ab400a, #c77630);
    border-radius: 999px;
    animation: ${progressFill} ${({ $duration }) => $duration || 3}s linear forwards;
  }
`;
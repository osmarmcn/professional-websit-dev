
import styled, { keyframes, css } from "styled-components";
import { motion } from "framer-motion";

/* ── Animações ─────────────────────────────────────────── */
const shimmer = keyframes`
  0%   { background-position: -200% center; }
  100% { background-position:  200% center; }
`;

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

/* ── Seção wrapper ─────────────────────────────────────── */
export const ContactWrapper = styled.section`
  background: var(--bg);
  position: relative;
  overflow: hidden;
  transition: background 0.4s ease;

  /* Separador sutil */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 10%;
    right: 10%;
    height: 1px;
    background: linear-gradient(to right, transparent, var(--card-border), transparent);
  }
`;

export const Inner = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 6rem 5vw;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 3rem;
    padding: 4rem 5vw;
  }
`;

/* ── Coluna esquerda ─────────────────────────────────────── */
export const LeftCol = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

/* Ícone de envelope (igual à imagem) */
export const EnvelopeIcon = styled.div`
  width: 58px;
  height: 58px;
  border-radius: 14px;
  background: linear-gradient(135deg, #1e3a8a, #2563eb);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(37,99,235,0.35);

  svg { color: #fff; display: block; }
`;

export const ContactTitle = styled.h2`
  font-family: 'Poppins', sans-serif;
  font-weight: 800;
  font-size: clamp(2.2rem, 5vw, 3.6rem);
  line-height: 1.08;
  color: var(--text-primary);
  margin: 0;

  em {
    font-style: normal;
    background: linear-gradient(90deg, var(--accent3), var(--accent), var(--accent2), var(--accent3));
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: ${shimmer} 3s linear infinite;
  }
`;

export const ContactSub = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 0.92rem;
  color: var(--text-secondary);
  line-height: 1.72;
  max-width: 380px;
  margin: 0;
`;

/* Links de contato inline (fiel à imagem) */
export const ContactLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.35rem;
  margin-top: 0.25rem;
`;

export const ContactDot = styled.span`
  color: var(--text-muted);
  font-size: 0.65rem;
`;

export const ContactLink = styled.a`
  font-family: 'Roboto', sans-serif;
  font-size: 0.8rem;
  color: var(--text-secondary);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  transition: color 0.2s ease;

  &:hover { color: var(--accent); }
  svg { flex-shrink: 0; }
`;

/* Botões de redes sociais */
export const SocialRow = styled.div`
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
`;

export const SocialBtn = styled.a`
  width: 42px;
  height: 42px;
  border-radius: 10px;
  background: var(--bg2);
  border: 1.5px solid var(--card-border);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  text-decoration: none;
  transition: background 0.2s ease, border-color 0.2s ease,
              color 0.2s ease, transform 0.2s ease;
  cursor: pointer;

  svg { display: block; }

  &:hover {
    background: var(--accent);
    border-color: var(--accent);
    color: #fff;
    transform: translateY(-2px);
  }

  &.whatsapp:hover { background: #25D366; border-color: #25D366; }
  &.linkedin:hover  { background: #0A66C2; border-color: #0A66C2; }
  &.github:hover    { background: #24292e; border-color: #24292e; }
  &.email:hover     { background: var(--accent3); border-color: var(--accent3); }
`;

/* ── Coluna direita — Formulário ─────────────────────────── */
export const RightCol = styled(motion.div)`
  background: var(--bg2);
  border: 1px solid var(--card-border);
  border-radius: 20px;
  padding: 2.2rem;
  position: relative;
  overflow: hidden;

  /* Dot grid de fundo (canto superior direito, fiel à imagem) */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 140px;
    height: 120px;
    background-image: radial-gradient(circle, var(--text-muted) 1px, transparent 1px);
    background-size: 14px 14px;
    opacity: 0.12;
    pointer-events: none;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  position: relative;
  z-index: 1;
`;

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

export const Label = styled.label`
  font-family: 'Roboto', sans-serif;
  font-size: 0.78rem;
  font-weight: 500;
  color: var(--text-secondary);
`;

const inputBase = css`
  width: 100%;
  font-family: 'Roboto', sans-serif;
  font-size: 0.88rem;
  color: var(--text-primary);
  background: var(--bg);
  border: 1px solid ${({ $error }) => $error ? "var(--accent3)" : "var(--card-border)"};
  border-radius: 10px;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &::placeholder { color: var(--text-muted); opacity: 0.65; }

  &:focus {
    border-color: ${({ $error }) => $error ? "var(--accent3)" : "#2563eb"};
    box-shadow: 0 0 0 3px ${({ $error }) =>
      $error ? "rgba(133,33,33,0.12)" : "rgba(37,99,235,0.10)"};
  }
`;

export const Input = styled.input`
  ${inputBase}
  height: 48px;
  padding: 0 1rem;
`;

export const Textarea = styled.textarea`
  ${inputBase}
  height: 130px;
  padding: 0.8rem 1rem;
  resize: vertical;
  min-height: 100px;
`;

export const ErrorMsg = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 0.7rem;
  color: var(--accent3);
  margin: 0;
`;

export const SubmitBtn = styled.button`
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-size: 0.85rem;
  letter-spacing: 0.05em;
  height: 48px;
  padding: 0 1.8rem;
  border-radius: 10px;
  cursor: pointer;
  border: none;
  background: linear-gradient(135deg, var(--accent3), var(--accent));
  color: #fff;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  align-self: flex-start;
  transition: opacity 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease;

  &:hover:not(:disabled) {
    opacity: 0.88;
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(0,0,0,0.18);
  }
  &:disabled { opacity: 0.55; cursor: not-allowed; }

  /* Spinner */
  .spin {
    animation: ${spin} 0.8s linear infinite;
    display: block;
  }

  [data-theme="dark"] & {
    background: linear-gradient(135deg, var(--indigo), var(--accent2));
    color: var(--neon-ice);
  }
`;

/* ── Toast de sucesso ─────────────────────────────────── */
const toastIn = keyframes`
  from { opacity: 0; transform: translateY(8px) scale(0.97); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
`;

export const SuccessMsg = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 2rem 1rem;
  text-align: center;
  animation: ${toastIn} 0.4s ease both;

  .icon {
    width: 52px; height: 52px;
    border-radius: 50%;
    background: rgba(34,197,94,0.12);
    display: flex; align-items: center; justify-content: center;
    svg { color: #22c55e; }
  }
  h3 {
    font-family: 'Poppins', sans-serif;
    font-weight: 700; font-size: 1.1rem;
    color: var(--text-primary); margin: 0;
  }
  p {
    font-family: 'Roboto', sans-serif;
    font-size: 0.82rem; color: var(--text-muted); margin: 0;
  }
`;
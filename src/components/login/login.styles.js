
import styled, { keyframes, css } from "styled-components";

/* ── Animações ─────────────────────────────────────────── */
const backdropIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const cardIn = keyframes`
  from { opacity: 0; transform: translateY(28px) scale(0.97); }
  to   { opacity: 1; transform: translateY(0)    scale(1); }
`;

const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  20%       { transform: translateX(-8px); }
  40%       { transform: translateX(8px); }
  60%       { transform: translateX(-5px); }
  80%       { transform: translateX(5px); }
`;

/* ── Backdrop ─────────────────────────────────────────── */
export const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  animation: ${backdropIn} 0.25s ease both;
`;

/* ── Card do modal ────────────────────────────────────── */
export const LoginCard = styled.div`
  position: relative;
  width: 100%;
  max-width: 420px;
  background: var(--bg);
  border: 1px solid var(--card-border);
  border-radius: 20px;
  padding: 2.8rem 2.4rem 2.4rem;
  box-shadow:
    0 24px 64px rgba(0, 0, 0, 0.22),
    0 4px 16px rgba(0, 0, 0, 0.10);
  animation: ${cardIn} 0.35s cubic-bezier(0.22, 1, 0.36, 1) both;

  ${({ $shake }) => $shake && css`
    animation: ${shake} 0.45s ease;
  `}
`;

/* ── Botão fechar (X) ─────────────────────────────────── */
export const CloseBtn = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: transparent;
  color: var(--text-muted);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease, color 0.2s ease;

  &:hover {
    background: var(--bg2);
    color: var(--text-primary);
  }

  svg { display: block; }
`;

/* ── Cabeçalho ────────────────────────────────────────── */
export const LoginHeader = styled.div`
  margin-bottom: 2rem;
  text-align: center;
`;

export const LoginAvatar = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent3), var(--accent));
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.18);

  svg { color: #fff; display: block; }
`;

export const LoginTitle = styled.h2`
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-size: 1.35rem;
  color: var(--text-primary);
  margin-bottom: 0.3rem;
`;

export const LoginSubtitle = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 0.82rem;
  color: var(--text-muted);
  line-height: 1.5;
`;

/* ── Formulário ───────────────────────────────────────── */
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
`;

export const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

export const Label = styled.label`
  font-family: 'Roboto', sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-secondary);
`;

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const InputIcon = styled.span`
  position: absolute;
  left: 0.9rem;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  pointer-events: none;
  transition: color 0.2s ease;

  svg { display: block; }
`;

export const Input = styled.input`
  width: 100%;
  height: 48px;
  padding: 0 1rem 0 2.7rem;
  font-family: 'Roboto', sans-serif;
  font-size: 0.9rem;
  color: var(--text-primary);
  background: var(--bg2);
  border: 1.5px solid ${({ $error }) => $error ? "var(--accent3)" : "var(--card-border)"};
  border-radius: 10px;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &::placeholder {
    color: var(--text-muted);
    opacity: 0.7;
  }

  &:focus {
    border-color: ${({ $error }) => $error ? "var(--accent3)" : "var(--accent)"};
    box-shadow: 0 0 0 3px ${({ $error }) =>
      $error ? "rgba(133,33,33,0.15)" : "rgba(171,64,10,0.12)"};
  }

  [data-theme="dark"] &:focus {
    box-shadow: 0 0 0 3px ${({ $error }) =>
      $error ? "rgba(133,33,33,0.2)" : "rgba(0,232,240,0.12)"};
  }
`;

export const PasswordToggle = styled.button`
  position: absolute;
  right: 0.75rem;
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 4px;
  border-radius: 6px;
  transition: color 0.2s ease;

  &:hover { color: var(--text-primary); }
  svg { display: block; }
`;

export const ErrorMsg = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 0.73rem;
  color: var(--accent3);
  margin-top: 0.1rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;

/* ── Regras de senha (hints) ──────────────────────────── */
export const PasswordRules = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  padding: 0.75rem 0.9rem;
  background: var(--bg2);
  border-radius: 8px;
  margin-top: 0.2rem;
`;

export const RuleItem = styled.span`
  font-family: 'Roboto', sans-serif;
  font-size: 0.72rem;
  color: ${({ $ok }) => $ok ? "#22c55e" : "var(--text-muted)"};
  display: flex;
  align-items: center;
  gap: 0.45rem;
  transition: color 0.25s ease;

  svg { flex-shrink: 0; }
`;

/* ── Extras (forgot, divider) ─────────────────────────── */
export const ForgotLink = styled.a`
  font-family: 'Roboto', sans-serif;
  font-size: 0.75rem;
  color: var(--accent);
  text-decoration: none;
  align-self: flex-end;
  margin-top: -0.4rem;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover { opacity: 0.75; }
`;

/* ── Botão submit ─────────────────────────────────────── */
export const SubmitBtn = styled.button`
  width: 100%;
  height: 50px;
  margin-top: 0.5rem;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-size: 0.88rem;
  letter-spacing: 0.04em;
  color: var(--btn-primary-text);
  background: linear-gradient(135deg, var(--accent3), var(--accent));
  border: none;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: opacity 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease;

  &:hover:not(:disabled) {
    opacity: 0.9;
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }

  [data-theme="dark"] & {
    background: linear-gradient(135deg, var(--accent3), var(--accent2));
    color: var(--neon-ice);
  }
`;

/* ── Divisor ──────────────────────────────────────────── */
export const Divider = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin: 0.4rem 0;

  &::before, &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--card-border);
  }

  span {
    font-family: 'Roboto', sans-serif;
    font-size: 0.72rem;
    color: var(--text-muted);
    white-space: nowrap;
  }
`;

/* ── Footer do modal ──────────────────────────────────── */
export const LoginFooter = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 0.78rem;
  color: var(--text-muted);
  text-align: center;
  margin-top: 1rem;

  a {
    color: var(--accent);
    text-decoration: none;
    font-weight: 500;
    cursor: pointer;

    &:hover { text-decoration: underline; }
  }
`;

/* ── Toast de sucesso ─────────────────────────────────── */
const toastIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
`;

export const SuccessToast = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.7rem;
  padding: 1rem 0 0.5rem;
  text-align: center;
  animation: ${toastIn} 0.4s ease both;

  .icon {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    background: rgba(34, 197, 94, 0.15);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  h3 {
    font-family: 'Poppins', sans-serif;
    font-weight: 700;
    font-size: 1.1rem;
    color: var(--text-primary);
  }

  p {
    font-family: 'Roboto', sans-serif;
    font-size: 0.82rem;
    color: var(--text-muted);
  }
`;
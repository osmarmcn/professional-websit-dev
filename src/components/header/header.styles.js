import styled from "styled-components";
import { slideDown } from "../../styles/keyframes";

/* ─────────────────────────────────────────────────────────
   HEADER STYLES
   1. Wrapper e barra
   2. Logo
   3. Navegação e links
   4. Ações (theme toggle + profile btn)
   5. Menu mobile
───────────────────────────────────────────────────────── */

/* ── 1. Wrapper ─────────────────────────────────────────── */

export const HeaderWrapper = styled.header`
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 200;
  animation: ${slideDown} 0.6s ease both 0.2s;
  opacity: 0;
`;

export const HeaderBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5vw;
  height: 64px;
  background: var(--header-bg);
  border-bottom: 1px solid var(--header-border);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  transition: background 0.4s ease, border-color 0.3s ease;
`;

/* ── 2. Logo ─────────────────────────────────────────────── */

export const Logo = styled.a`
  font-family: 'Poppins', sans-serif;
  font-weight: 800;
  font-size: 1.2rem;
  color: var(--logo-color);
  text-decoration: none;
  letter-spacing: -0.02em;
  transition: opacity 0.2s ease;
  cursor: pointer;

  &:hover { opacity: 0.75; }

  span { color: var(--accent); }
`;

/* ── 3. Navegação ───────────────────────────────────────── */

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 2.4rem;

  @media (max-width: 768px) {
    display: ${({ $open }) => ($open ? "flex" : "none")};
    flex-direction: column;
    position: absolute;
    top: 64px; left: 0; right: 0;
    background: var(--header-bg);
    border-bottom: 1px solid var(--header-border);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    padding: 1.5rem 5vw 2rem;
    gap: 1.4rem;
    align-items: flex-start;
  }
`;

export const NavLink = styled.a`
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  font-size: 0.82rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--nav-link);
  text-decoration: none;
  position: relative;
  transition: color 0.2s ease;
  cursor: pointer;

  &::after {
    content: '';
    position: absolute;
    bottom: -3px; left: 0;
    width: 0; height: 1.5px;
    background: var(--nav-link-hover);
    transition: width 0.25s ease;
  }

  &:hover {
    color: var(--nav-link-hover);
    &::after { width: 100%; }
  }

  &[aria-current="page"] {
    color: var(--accent);
    &::after { width: 100%; background: var(--accent); }
  }
`;

/* ── 4. Ações ───────────────────────────────────────────── */

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.7rem;
`;

/* Botão redondo compartilhado por ThemeBtn e ProfileBtn */
const RoundBtn = styled.button`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: var(--card-bg);
  border: 1.5px solid var(--card-border);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(8px);
  transition: transform 0.22s ease, background 0.2s ease, border-color 0.2s ease;
  color: var(--text-primary);

  svg { display: block; }
`;

export const ThemeBtn = styled(RoundBtn)`
  font-size: 1rem;
  &:hover { transform: scale(1.12) rotate(22deg); }
`;

export const ProfileBtn = styled(RoundBtn)`
  &:hover {
    transform: scale(1.08);
    background: var(--accent);
    border-color: var(--accent);
    color: var(--white);
  }
`;

/* ── 5. Menu mobile ─────────────────────────────────────── */

export const HamburgerBtn = styled.button`
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: 36px;
  height: 36px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 4px;

  @media (max-width: 768px) { display: flex; }

  span {
    display: block;
    width: 22px; height: 1.5px;
    background: var(--text-primary);
    border-radius: 2px;
    transform-origin: center;
    transition: transform 0.25s ease, opacity 0.2s ease, width 0.2s ease;
  }

  ${({ $open }) => $open && `
    span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
    span:nth-child(2) { opacity: 0; width: 0; }
    span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }
  `}
`;
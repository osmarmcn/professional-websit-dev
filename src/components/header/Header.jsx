import React, { useState, useCallback } from "react";

import {
  HeaderWrapper,
  HeaderBar,
  Logo,
  Nav,
  NavLink,
  Actions,
  ThemeBtn,
  ProfileBtn,
  HamburgerBtn,
} from "./header.styles";

import LoginModal from "../login/LoginModal";

/* ── Ícones SVG inline ──────────────────────────────────── */
const SunIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1"  x2="12" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22"   x2="5.64"  y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1"  y1="12" x2="3"  y2="12"/>
    <line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78"  x2="5.64"  y2="18.36"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);

const MoonIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

const ProfileIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

/* ── Links de navegação ─────────────────────────────────── */
const NAV_LINKS = [
  { label: "Home",      href: "#home"     },
  { label: "Sobre",     href: "#sobre"    },
  { label: "Serviços",  href: "#servicos" },
  { label: "Projetos",  href: "#projetos" },
  { label: "Contato",   href: "#contato"  },
];

/* ─────────────────────────────────────────────────────────
   Header
   Props:
     isDark   → boolean — tema atual
     onToggle → () => void — alterna tema
───────────────────────────────────────────────────────── */
function Header({ isDark, onToggle }) {
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  const toggleMenu  = useCallback(() => setMenuOpen((v) => !v), []);
  const closeMenu   = useCallback(() => setMenuOpen(false), []);
  const openLogin   = useCallback(() => { closeMenu(); setLoginOpen(true); }, [closeMenu]);
  const closeLogin  = useCallback(() => setLoginOpen(false), []);

  return (
    <>
      <HeaderWrapper>
        <HeaderBar>

          {/* Logo — leva para o topo */}
          <Logo href="#home" onClick={closeMenu}>
            dev<span>.</span>portfolio
          </Logo>

          {/* Navegação */}
          <Nav $open={menuOpen} role="navigation" aria-label="Navegação principal">
            {NAV_LINKS.map(({ label, href }) => (
              <NavLink key={href} href={href} onClick={closeMenu}>
                {label}
              </NavLink>
            ))}
          </Nav>

          {/* Ações */}
          <Actions>

            {/* Alternar tema */}
            <ThemeBtn
              onClick={onToggle}
              aria-label={isDark ? "Ativar modo claro" : "Ativar modo escuro"}
              title={isDark ? "Modo claro" : "Modo escuro"}
            >
              {isDark ? <SunIcon /> : <MoonIcon />}
            </ThemeBtn>

            {/* Abrir login */}
            <ProfileBtn
              onClick={openLogin}
              aria-label="Fazer login"
              title="Entrar na conta"
            >
              <ProfileIcon />
            </ProfileBtn>

            {/* Hamburger mobile */}
            <HamburgerBtn
              $open={menuOpen}
              onClick={toggleMenu}
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={menuOpen}
            >
              <span /><span /><span />
            </HamburgerBtn>

          </Actions>
        </HeaderBar>
      </HeaderWrapper>

      {/* Modal de login — montado fora do Header para z-index correto */}
      <LoginModal isOpen={loginOpen} onClose={closeLogin} />
    </>
  );
}

export default Header;
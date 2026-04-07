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

/* ─────────────────────────────────────────────────────────
   Ícone SVG de sol (tema claro)
───────────────────────────────────────────────────────── */
const SunIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1"  x2="12" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/>
    <line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);

/* ─────────────────────────────────────────────────────────
   Ícone SVG de lua (tema escuro)
───────────────────────────────────────────────────────── */
const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

/* ─────────────────────────────────────────────────────────
   Ícone SVG de perfil (usuário)
───────────────────────────────────────────────────────── */
const ProfileIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

/* ─────────────────────────────────────────────────────────
   NAV_LINKS
───────────────────────────────────────────────────────── */
const NAV_LINKS = [
  { label: "Sobre",    href: "#sobre"    },
  { label: "Projetos", href: "#projetos" },
  { label: "Stack",    href: "#stack"    },
  { label: "Contato",  href: "#contato"  },
];

/* ─────────────────────────────────────────────────────────
   Header
   Props:
     isDark   → boolean
     onToggle → () => void
───────────────────────────────────────────────────────── */
function Header({ isDark, onToggle }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => setMenuOpen((v) => !v), []);
  const closeMenu  = useCallback(() => setMenuOpen(false), []);

  return (
    <HeaderWrapper>
      <HeaderBar>

        {/* Logo */}
        <Logo href="#" onClick={closeMenu}>
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

          {/* Perfil / sobre mim */}
          <ProfileBtn
            as="a"
            href="#sobre"
            aria-label="Ver perfil"
            title="Perfil"
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
  );
}

export default Header;
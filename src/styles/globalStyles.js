import { createGlobalStyle } from "styled-components";

/* ─────────────────────────────────────────────────────────
   GLOBAL STYLES
   Contém: reset, Google Fonts, CSS variables de tema
   (light / dark), body base e scroll-behavior.

   Importe e renderize <GlobalStyle /> uma única vez
   na raiz da aplicação (ex: App.jsx).
───────────────────────────────────────────────────────── */
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800&family=Roboto:wght@400;500&display=swap');

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* ── Paleta raw ── */
  :root {
    /* Light */
    --white:       #fcfbfbff;
    --black:       #000000ff;
    --charcoal:    #4a4a4aff;
    --silver:      #a9a9a9ff;
    --dark-wine:   #852121ff;
    --rusty-spice: #ab400aff;
    --ochre:       #c77630ff;

    /* Dark */
    --onyx:             #0c0c0cff;
    --indigo:           #460e64ff;
    --neon-ice:         #00e8f0ff;
    --snow:             #fffcfcff;
    --rusty-spice-dark: #ae4d0dff;

    /* ── Tokens semânticos — modo claro (padrão) ── */
    --bg:                  var(--white);
    --bg2:                 #f0eeee;
    --text-primary:        var(--black);
    --text-secondary:      var(--charcoal);
    --text-muted:          var(--silver);
    --accent:              var(--rusty-spice);
    --accent2:             var(--ochre);
    --accent3:             var(--dark-wine);

    --card-bg:             rgba(255, 255, 255, 0.75);
    --card-border:         rgba(171, 64, 10, 0.25);

    --btn-primary-bg:      var(--dark-wine);
    --btn-primary-text:    var(--white);
    --btn-secondary-bg:    transparent;
    --btn-secondary-border: var(--charcoal);
    --btn-secondary-text:  var(--charcoal);

    --canvas-opacity:      0.55;

    /* Header */
    --header-bg:           rgba(252, 251, 251, 0.82);
    --header-border:       rgba(171, 64, 10, 0.12);
    --nav-link:            var(--charcoal);
    --nav-link-hover:      var(--rusty-spice);
    --logo-color:          var(--dark-wine);
  }

  /* ── Tokens semânticos — modo escuro ── */
  [data-theme="dark"] {
    --bg:                  var(--onyx);
    --bg2:                 #141414;
    --text-primary:        var(--snow);
    --text-secondary:      #c9c9c9;
    --text-muted:          #555555;
    --accent:              var(--neon-ice);
    --accent2:             var(--rusty-spice-dark);
    --accent3:             var(--indigo);

    --card-bg:             rgba(20, 20, 20, 0.85);
    --card-border:         rgba(0, 232, 240, 0.20);

    --btn-primary-bg:      var(--indigo);
    --btn-primary-text:    var(--neon-ice);
    --btn-secondary-bg:    transparent;
    --btn-secondary-border: var(--neon-ice);
    --btn-secondary-text:  var(--neon-ice);

    --canvas-opacity:      0.70;

    /* Header */
    --header-bg:           rgba(12, 12, 12, 0.88);
    --header-border:       rgba(0, 232, 240, 0.10);
    --nav-link:            #c9c9c9;
    --nav-link-hover:      var(--neon-ice);
    --logo-color:          var(--neon-ice);
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: 'Roboto', sans-serif;
    background: var(--bg);
    color: var(--text-primary);
    transition: background 0.4s ease, color 0.3s ease;
    overflow-x: hidden;
  }
`;

export default GlobalStyle;
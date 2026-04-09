import React, { useState, useEffect, useCallback } from "react";

import GlobalStyle   from "./styles/globalStyles";
import IntroScreen   from "./components/intro/IntroScreen";
import Header        from "./components/header/Header";
import HeroSection   from "./components/hero/HeroSection";

/* ─────────────────────────────────────────────────────────
   App
   Orquestra o fluxo da aplicação:
     1. Monta a <IntroScreen /> (3s + 0.6s de saída)
     2. onDone() → desmonta intro, exibe Header + Hero

   Estado:
     isDark    → tema claro/escuro (compartilhado)
     introGone → controla se o conteúdo principal é exibido
───────────────────────────────────────────────────────── */
function App() {
  const [isDark,    setIsDark]    = useState(false);
  const [introGone, setIntroGone] = useState(false);

  /* Sincroniza o data-theme no <html> */
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      isDark ? "dark" : "light"
    );
  }, [isDark]);

  const toggleTheme = useCallback(() => setIsDark((v) => !v), []);

  /* Chamado quando a intro concluiu fade-out */
  const handleIntroDone = useCallback(() => {
    setIntroGone(true);
  }, []);

  return (
    <>
      <GlobalStyle />

      {/* Tela de abertura — desmontada após 3.6 s */}
      {!introGone && (
        <IntroScreen onDone={handleIntroDone} />
      )}

      {/* Conteúdo principal — renderizado em paralelo mas
          visualmente oculto sob a IntroScreen enquanto ela
          estiver aberta (z-index da intro é 9999) */}
      <Header    isDark={isDark} onToggle={toggleTheme} />
      <HeroSection isDark={isDark} />

      {/* Seções futuras:
      <AboutSection />
      <ProjectsSection />
      <ContactSection />
      */}
    </>
  );
}

export default App;
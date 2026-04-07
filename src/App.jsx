import React, { useState, useEffect } from "react";

import GlobalStyle  from "./styles/globalStyles";
import Header       from "./components/header/Header";
import HeroSection  from "./components/hero/HeroSection";

/* ─────────────────────────────────────────────────────────
   App
   Raiz da aplicação. Centraliza o estado de tema (isDark)
   e distribui para Header e HeroSection via props.

   O <GlobalStyle /> é renderizado aqui uma única vez,
   garantindo que as CSS variables fiquem disponíveis
   globalmente antes de qualquer outro componente.
───────────────────────────────────────────────────────── */
function App() {
  const [isDark, setIsDark] = useState(false);

  /* Sincroniza o atributo data-theme no <html> */
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      isDark ? "dark" : "light"
    );
  }, [isDark]);

  const toggleTheme = () => setIsDark((v) => !v);

  return (
    <>
      <GlobalStyle />
      <Header isDark={isDark} onToggle={toggleTheme} />
      <HeroSection isDark={isDark} />
      {/* <AboutSection />  */}
      {/* <ProjectsSection /> */}
      {/* <ContactSection /> */}
    </>
  );
}

export default App;
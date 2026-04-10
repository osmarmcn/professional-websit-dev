import React, { useState, useEffect, useCallback } from "react";

import GlobalStyle       from "./styles/globalStyles";
import IntroScreen       from "./components/intro/IntroScreen";
import Header            from "./components/header/Header";
import HeroSection       from "./components/hero/HeroSection";
import AboutSection      from "./components/about/AboutSection";
import ServicesSection   from "./components/services/ServicesSection";
import ProjectsSection   from "./components/projects/ProjectsSection";

function App() {
  const [isDark,    setIsDark]    = useState(false);
  const [introGone, setIntroGone] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
  }, [isDark]);

  const toggleTheme     = useCallback(() => setIsDark((v) => !v), []);
  const handleIntroDone = useCallback(() => setIntroGone(true), []);

  return (
    <>
      <GlobalStyle />
      {!introGone && <IntroScreen onDone={handleIntroDone} />}
      <Header isDark={isDark} onToggle={toggleTheme} />
      <main>
        <HeroSection     isDark={isDark} />
        <AboutSection    />
        <ServicesSection />
        <ProjectsSection />
        {/* <ContactSection /> */}
      </main>
    </>
  );
}

export default App;
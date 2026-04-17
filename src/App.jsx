import React, { useState, useEffect, useCallback } from "react";

import GlobalStyle       from "./styles/globalStyles";
import IntroScreen       from "./components/intro/IntroScreen";
import Header             from "./components/header/Header";
import HeroSection       from "./components/hero/HeroSection";
import AboutSection      from "./components/about/AboutSection";
import ServicesSection   from "./components/services/ServicesSection";
import ProjectsSection   from "./components/projects/ProjectsSection";
import ContactSection    from "./components/contact/ContactSection";
import Footer            from "./components/footer/Footer";

function App() {
 
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme === "dark" : true;
  });

  const [introGone, setIntroGone] = useState(false);

  // Sincroniza o atributo do HTML e o LocalStorage sempre que o isDark mudar
  useEffect(() => {
    const theme = isDark ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [isDark]);

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => !prev);
  }, []);

  const handleIntroDone = useCallback(() => {
    setIntroGone(true);
  }, []);

  return (
    <>
      <GlobalStyle />
      {!introGone && <IntroScreen onDone={handleIntroDone} />}
      
      <Header isDark={isDark} onToggle={toggleTheme} />
      
      <main>
        <HeroSection isDark={isDark} />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
        <ContactSection isDark={isDark} />
      </main>

      <Footer />
    </>
  );
}

export default App;
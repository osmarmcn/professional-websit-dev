import React, { useCallback, useRef } from "react";
import * as S from "./hero.styles";
import TechCard from "./TechCard";
import HeroMobile from "./HeroMobile"; 
import { useThreeBackground } from "./useThreeBackground";
import { TECH_CARDS, CARD_POSITIONS, FLOAT_PARAMS } from "./heroData";

function HeroSection({ isDark }) {
  const canvasRef = useRef(null);
  useThreeBackground(canvasRef, isDark);

  // FUNÇÃO DE SCROLL SUAVE
  const scrollToSection = useCallback((id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <S.HeroWrapper id="home">
      <S.NoiseOverlay aria-hidden="true" />

      {/* --- DESKTOP --- */}
      <S.DesktopContainer>
        <S.CanvasLayer ref={canvasRef} />
        <S.CardsLayer>
          {TECH_CARDS.map((card, i) => (
            <TechCard 
              key={card.id} 
              card={card} 
              pos={CARD_POSITIONS[i]} 
              floatDur={FLOAT_PARAMS[i].dur} 
              floatDelay={FLOAT_PARAMS[i].delay} 
            />
          ))}
        </S.CardsLayer>

        <S.ContentLayer>
          <S.TagLine>Desenvolvedor Full Stack &amp; Designer</S.TagLine>
          <S.Heading>
            Construo<br />
            experiências <em>digitais</em><br />
            que importam.
          </S.Heading>
          <S.SubHeading>
            Interfaces rápidas, acessíveis e escaláveis. 
            Apaixonado por código limpo e design intencional.
          </S.SubHeading>
          
          <S.ButtonGroup>
            {/* LINK PARA PROJETOS */}
            <S.BtnPrimary onClick={() => scrollToSection("projetos")}>
              Ver Projetos →
            </S.BtnPrimary>
            
            {/* LINK PARA CONTATO */}
            <S.BtnSecondary onClick={() => scrollToSection("contato")}>
              Entrar em contato
            </S.BtnSecondary>
          </S.ButtonGroup>
        </S.ContentLayer>
      </S.DesktopContainer>

      {/* --- MOBILE --- */}
      <S.MobileContainer>
        <HeroMobile 
          handleProjects={() => scrollToSection("projetos")} 
          handleContact={() => scrollToSection("contato")} 
        />
      </S.MobileContainer>

    </S.HeroWrapper>
  );
}

export default HeroSection;
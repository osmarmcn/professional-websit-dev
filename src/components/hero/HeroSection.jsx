import React, { useCallback, useRef } from "react";

import {
  HeroWrapper,
  CanvasLayer,
  CardsLayer,
  ContentLayer,
  TagLine,
  Heading,
  SubHeading,
  ButtonGroup,
  BtnPrimary,
  BtnSecondary,
  NoiseOverlay,
  ScrollHint,
} from "./hero.styles";

import TechCard                        from "./TechCard";
import { useThreeBackground }          from "./useThreeBackground";
import { TECH_CARDS, CARD_POSITIONS, FLOAT_PARAMS } from "./heroData";

/* ─────────────────────────────────────────────────────────
   HeroSection
   Seção principal do portfólio. Recebe `isDark` do App
   para sincronizar o Three.js com o tema atual.

   Props:
     isDark → boolean (controlado pelo Header/App)
───────────────────────────────────────────────────────── */
function HeroSection({ isDark }) {
  const canvasRef = useRef(null);

  /* inicializa o canvas Three.js */
  useThreeBackground(canvasRef, isDark);

  const handleProjects = useCallback(() => {
    /* substituir por navigate('/projects') ou scroll */
    console.log("→ Projetos");
  }, []);

  const handleContact = useCallback(() => {
    /* substituir por navigate('/contact') ou scroll */
    console.log("→ Contato");
  }, []);

  return (
    <HeroWrapper>
      {/* Textura de ruído sutil sobre o fundo */}
      <NoiseOverlay aria-hidden="true" />

      {/* Canvas Three.js com partículas e linhas */}
      <CanvasLayer ref={canvasRef} aria-hidden="true" />

      {/* Cards de tecnologia flutuantes */}
      <CardsLayer aria-hidden="true">
        {TECH_CARDS.map((card, i) => (
          <TechCard
            key={card.id}
            card={card}
            pos={CARD_POSITIONS[i]}
            floatDur={FLOAT_PARAMS[i].dur}
            floatDelay={FLOAT_PARAMS[i].delay}
          />
        ))}
      </CardsLayer>

      {/* Conteúdo textual principal */}
      <ContentLayer>
        <TagLine>Desenvolvedor Full Stack &amp; Designer</TagLine>

        <Heading>
          Construo<br />
          experiências <em>digitais</em><br />
          que importam.
        </Heading>

        <SubHeading>
          Da arquitetura ao pixel — desenvolvo interfaces rápidas,
          acessíveis e escaláveis. Apaixonado por código limpo,
          design intencional e tecnologia que transforma.
        </SubHeading>

        <ButtonGroup>
          <BtnPrimary onClick={handleProjects}>
            Ver Projetos →
          </BtnPrimary>
          <BtnSecondary onClick={handleContact}>
            Entrar em contato
          </BtnSecondary>
        </ButtonGroup>
      </ContentLayer>

      {/* Indicador de scroll */}
      {/* <ScrollHint aria-hidden="true">
        <span>scroll</span>
        <div className="line" />
      </ScrollHint> */}
    </HeroWrapper>
  );
}

export default HeroSection;

import React from "react";
import { WavyBackground } from "../ui/wavy-background";
import * as S from "./hero.styles";

function HeroMobile({ handleProjects, handleContact }) {
  return (
    <S.MobileHeroWrapper>
      <WavyBackground 
        className="max-w-4xl mx-auto" 
        containerClassName="h-full"
        waveWidth={50}
        backgroundFill="var(--bg)"
        colors={["#ab400a", "#c77630", "#852121", "#460e64", "#00e8f0"]}
      >
        <S.MobileContent>
          <S.TagLine>Desenvolvedor Full Stack</S.TagLine>
          
          <S.Heading>
            Construo experiências <em>digitais</em> que importam.
          </S.Heading>

          <S.SubHeading>
            Interfaces rápidas, acessíveis e escaláveis. 
            Do design ao código final.
          </S.SubHeading>

          <S.ButtonGroup>
            <S.BtnPrimary onClick={handleProjects}>
              Projetos →
            </S.BtnPrimary>
            <S.BtnSecondary onClick={handleContact}>
              Contato
            </S.BtnSecondary>
          </S.ButtonGroup>
        </S.MobileContent>
      </WavyBackground>
    </S.MobileHeroWrapper>
  );
}

export default HeroMobile;
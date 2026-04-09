
import React, { useEffect, useState } from "react";
import { SparklesCore } from "./SparklesCore";
import {
  IntroWrapper,
  IntroName,
  IntroRole,
  SparklesArea,
  GradientLine,
  RadialMask,
  ProgressBar,
} from "./intro.styles";

/* ─────────────────────────────────────────────────────────
   CONSTANTES DE TIMING
   DISPLAY_MS  → tempo total em que a intro fica visível
   EXIT_MS     → duração da animação de saída (deve bater
                 com o valor em exitAnim no styles)
───────────────────────────────────────────────────────── */
const DISPLAY_MS = 3000;  /* 3 segundos de exibição        */
const EXIT_MS    = 600;   /* 0.6 s de fade-out de saída    */

/* ─────────────────────────────────────────────────────────
   IntroScreen
   Tela de abertura fullscreen com efeito Sparkles do
   Aceternity UI. Chama onDone() após DISPLAY_MS + EXIT_MS.

   Props:
     onDone → () => void — callback ao concluir a intro
───────────────────────────────────────────────────────── */
function IntroScreen({ onDone }) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    /* Após DISPLAY_MS inicia a saída */
    const exitTimer = setTimeout(() => {
      setExiting(true);
    }, DISPLAY_MS);

    /* Após saída completa notifica o pai */
    const doneTimer = setTimeout(() => {
      onDone();
    }, DISPLAY_MS + EXIT_MS);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [onDone]);

  return (
    <IntroWrapper $exiting={exiting} aria-live="polite" aria-label="Carregando">

      {/* ── Nome ── */}
      <IntroName>
        Osmar <span>Mendes</span>
      </IntroName>

      {/* ── Cargo / subtítulo ── */}
      <IntroRole>Full Stack Developer &amp; Designer</IntroRole>

      {/* ── Área de sparkles (fiel à estrutura Aceternity) ── */}
      <SparklesArea>

        {/* Linhas gradiente decorativas */}
        <GradientLine $variant="indigo-wide-blur" />
        <GradientLine $variant="indigo-wide"      />
        <GradientLine $variant="sky-narrow-blur"  />
        <GradientLine $variant="sky-narrow"       />

        {/* Componente core de partículas */}
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          particleColor="#ffffff"
          speed={1}
          style={{ width: "100%", height: "100%" }}
        />

        {/* Máscara radial para suavizar bordas */}
        <RadialMask aria-hidden="true" />

      </SparklesArea>

      {/* ── Barra de progresso na base ── */}
      <ProgressBar
        $duration={DISPLAY_MS / 1000}
        aria-hidden="true"
      />

    </IntroWrapper>
  );
}

export default IntroScreen;
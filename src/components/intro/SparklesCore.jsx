
import React, { useEffect, useState, useId } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { motion, useAnimation } from "framer-motion";

/* ─────────────────────────────────────────────────────────
   SparklesCore
   Implementação fiel do componente Aceternity UI adaptada
   para styled-components (sem Tailwind CSS).

   Dependências:
     npm install @tsparticles/react @tsparticles/slim framer-motion

   Props (todas opcionais):
     id              → ID único do canvas (padrão: auto)
     className       → classe extra no wrapper
     background      → cor de fundo do canvas
     minSize         → tamanho mínimo das partículas
     maxSize         → tamanho máximo das partículas
     speed           → velocidade de animação
     particleColor   → cor hex das partículas
     particleDensity → número de partículas por área
───────────────────────────────────────────────────────── */
export function SparklesCore({
  id,
  className,
  background   = "transparent",
  minSize      = 0.4,
  maxSize      = 1,
  speed        = 1,
  particleColor  = "#ffffff",
  particleDensity = 1200,
}) {
  const [init, setInit] = useState(false);
  const controls        = useAnimation();
  const generatedId     = useId();
  const particleId      = id || generatedId;

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container) => {
    if (container) {
      controls.start({
        opacity: 1,
        transition: { duration: 1 },
      });
    }
  };

  return (
    <motion.div
      animate={controls}
      className={className}
      style={{
        width:  "100%",
        height: "100%",
        opacity: 0,
      }}
    >
      {init && (
        <Particles
          id={particleId}
          className={className}
          particlesLoaded={particlesLoaded}
          options={{
            background: { color: { value: background } },
            fullScreen: { enable: false, zIndex: 1 },
            fpsLimit:   120,
            interactivity: {
              events: {
                onClick:   { enable: true,  mode: "push" },
                onHover:   { enable: false, mode: "repulse" },
                resize:    true,
              },
              modes: {
                push:    { quantity: 4 },
                repulse: { distance: 200, duration: 0.4 },
              },
            },
            particles: {
              bounce: {
                horizontal: { value: 1 },
                vertical:   { value: 1 },
              },
              collisions: { enable: false },
              color:  { value: particleColor },
              move: {
                direction: "none",
                enable:    true,
                outModes:  { default: "out" },
                random:    false,
                speed:     { min: 0.1, max: 1 },
                straight:  false,
              },
              number: {
                density: { enable: true, width: 400, height: 400 },
                value:   particleDensity,
              },
              opacity: {
                value:     { min: 0.1, max: 1 },
                animation: {
                  enable:    true,
                  speed:     speed,
                  sync:      false,
                  startValue: "random",
                },
              },
              shape: { type: "circle" },
              size: {
                value: { min: minSize, max: maxSize },
              },
            },
            detectRetina: true,
          }}
        />
      )}
    </motion.div>
  );
}

import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import styled from "styled-components";

/* ─────────────────────────────────────────────────────────
   ContainerScroll
   Implementação React pura do componente Aceternity UI
   "Container Scroll Animation" sem Tailwind CSS.

   Efeito: ao rolar a página, o card 3D passa de inclinado
   (rotateX 20°) para plano (0°), enquanto o título flutua
   para cima gradualmente.

   Instalação: npm install framer-motion  (já deve estar)

   Props:
     titleComponent → ReactNode — título/subtítulo acima
     children       → ReactNode — conteúdo do card 3D
───────────────────────────────────────────────────────── */

/* ── Styled containers ─────────────────────────────────── */
const Outer = styled.div`
  height: 60rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 10rem 1rem;

  @media (max-width: 768px) {
    height: 48rem;
    padding: 6rem 1rem;
  }
`;

const Inner = styled.div`
  max-width: 1200px;
  width: 100%;
  position: relative;
  perspective: 1000px;
`;

const TitleBox = styled(motion.div)`
  max-width: 5xl;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  margin-bottom: -2.5rem;

  @media (max-width: 768px) {
    margin-bottom: -1.5rem;
  }
`;

const Card3D = styled(motion.div)`
  max-width: 1100px;
  width: 100%;
  margin: 0 auto;
  border-radius: 24px;
  border: 3px solid #6c6c6c;
  background: #1a1a1a;
  box-shadow:
    0 0 #0000004d,
    0 9px 20px #0000004a,
    0 37px 37px #00000042,
    0 84px 50px #00000026,
    0 149px 60px #0000000a,
    0 233px 65px #00000003;
  padding: 1.5rem;
  overflow: hidden;

  /* Altura responsiva */
  height: 38rem;
  @media (max-width: 768px) {
    height: 26rem;
    padding: 1rem;
  }
`;

const CardInner = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 14px;
`;

/* ── Componente ────────────────────────────────────────── */
export function ContainerScroll({ titleComponent, children }) {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const { scrollYProgress } = useScroll({
    target:    containerRef,
    offset:    ["start end", "end start"],
  });

  /* Escala: desktop 1.05→1, mobile 0.7→0.9 */
  const scaleDimensions = isMobile ? [0.7, 0.9] : [1.05, 1];

  const rotate    = useSpring(useTransform(scrollYProgress, [0, 1], [20, 0]),    { stiffness: 200, damping: 30 });
  const scale     = useSpring(useTransform(scrollYProgress, [0, 1], scaleDimensions), { stiffness: 200, damping: 30 });
  const translate = useSpring(useTransform(scrollYProgress, [0, 1], [0, -120]),  { stiffness: 200, damping: 30 });

  return (
    <Outer ref={containerRef}>
      <Inner>
        <TitleBox style={{ translateY: translate }}>
          {titleComponent}
        </TitleBox>

        <Card3D
          style={{
            rotateX: rotate,
            scale,
          }}
        >
          <CardInner>{children}</CardInner>
        </Card3D>
      </Inner>
    </Outer>
  );
}
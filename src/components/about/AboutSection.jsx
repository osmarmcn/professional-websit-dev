import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

import { ContainerScroll } from "./ContainerScroll";
import osmarPhoto from "../../assets/osmar1.png";
import {
  AboutWrapper,
  SectionLabel,
  SectionTitle,
  SectionSub,
  CardContent,
  CardPhoto,
  CardText,
  CardName,
  Divider,
  Paragraph,
  TagRow,
  Tag,
  StatsRow,
  StatItem,
  StatNumber,
  StatLabel,
} from "./about.styles";

/* ─────────────────────────────────────────────────────────
   TEXTO — Sobre Mim (dividido em parágrafos para o card)
───────────────────────────────────────────────────────── */
const BIO_PARAGRAPHS = [
  `Olá! Sou Osmar Mendes, desenvolvedor Fullstack especializado na
   construção de aplicações web modernas, escaláveis e de alta
   performance. Com foco principal no ecossistema JavaScript
   (Node.js, React e TypeScript), minha missão é transformar ideias
   em produtos digitais robustos.`,

  `Tenho experiência prática no desenvolvimento de APIs integradas e
   interfaces dinâmicas utilizando Next.js, Supabase, MySQL e MongoDB.
   Além do desenvolvimento web, utilizo Python para automações e estou
   constantemente expandindo minhas competências em infraestrutura na
   nuvem com AWS.`,

  `Como freelancer, atuo na entrega de soluções completas, priorizando
   sempre a organização do código, Clean Architecture e, acima de tudo,
   a experiência do usuário final. Estou pronto para ajudar sua empresa
   a escalar através de tecnologia de qualidade.`,
];

const SKILL_TAGS = [
  { label: "Node.js",    v: "accent" },
  { label: "React",      v: "accent" },
  { label: "TypeScript", v: "accent" },
  { label: "Next.js",    v: "default" },
  { label: "Python",     v: "default" },
  { label: "AWS",        v: "default" },
  { label: "MongoDB",    v: "default" },
  { label: "Supabase",   v: "default" },
];

const STATS = [
  { number: "3+",  label: "Anos de\nexperiência" },
  { number: "20+", label: "Projetos\nentregues"  },
  { number: "8+",  label: "Tecnologias\ndomínio"  },
  { number: "100%",label: "Foco em\nqualidade"   },
];

/* ─────────────────────────────────────────────────────────
   Variantes de animação scroll-reveal
───────────────────────────────────────────────────────── */
const fadeUpVariant = {
  hidden:  { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay:    i * 0.12,
      duration: 0.55,
      ease:     [0.22, 1, 0.36, 1],
    },
  }),
};

/* ─────────────────────────────────────────────────────────
   AboutSection
   Props: nenhuma — conteúdo estático (ajustável em BIO_PARAGRAPHS)
───────────────────────────────────────────────────────── */
function AboutSection() {
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-80px" });

  return (
    <AboutWrapper id="sobre">

      {/* ── ContainerScroll (Aceternity UI) ── */}
      <ContainerScroll
        titleComponent={
          <>
            <SectionLabel>Quem sou eu</SectionLabel>
            <SectionTitle>
              Sobre <em>mim</em>
            </SectionTitle>
            <SectionSub>
              Desenvolvedor apaixonado por construir experiências digitais
              que unem performance, elegância e propósito.
            </SectionSub>
          </>
        }
      >
        {/* ── Conteúdo interno do card 3D ── */}
        <CardContent>

          {/* Lado esquerdo — foto */}
          <CardPhoto>
            <img src={osmarPhoto} alt="Osmar Mendes" />
          </CardPhoto>

          {/* Lado direito — bio */}
          <CardText>
            <CardName>
              Osmar Mendes
              <span>Fullstack Developer &amp; Designer</span>
            </CardName>

            <Divider />

            {BIO_PARAGRAPHS.map((p, i) => (
              <Paragraph key={i}>{p}</Paragraph>
            ))}

            <TagRow>
              {SKILL_TAGS.map(({ label, v }) => (
                <Tag key={label} $variant={v}>{label}</Tag>
              ))}
            </TagRow>
          </CardText>

        </CardContent>
      </ContainerScroll>

      {/* ── Stats — aparecem ao scrollar até elas ── */}
      <StatsRow ref={statsRef}>
        {STATS.map(({ number, label }, i) => (
          <motion.div
            key={label}
            custom={i}
            variants={fadeUpVariant}
            initial="hidden"
            animate={statsInView ? "visible" : "hidden"}
          >
            <StatItem $delay={`${i * 0.1}s`}>
              <StatNumber>{number}</StatNumber>
              <StatLabel style={{ whiteSpace: "pre-line" }}>{label}</StatLabel>
            </StatItem>
          </motion.div>
        ))}
      </StatsRow>

    </AboutWrapper>
  );
}

export default AboutSection;

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

import { HoverEffect } from "./HoverEffect";
import {
  ServicesWrapper,
  DotBg,
  Inner,
  SectionHeader,
  SectionLabel,
  SectionTitle,
  SectionSub,
  CtaFooter,
  CtaText,
  CtaButton,
} from "./services.styles";

/* ─────────────────────────────────────────────────────────
   ÍCONES SVG INLINE — um por serviço
───────────────────────────────────────────────────────── */
const IconAutomation = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a10 10 0 1 0 10 10"/>
    <path d="M12 6v6l4 2"/>
    <path d="M22 2 16 8"/>
    <path d="M17 2h5v5"/>
  </svg>
);

const IconLanding = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2"/>
    <path d="M8 21h8M12 17v4"/>
    <path d="M7 8h10M7 11h6"/>
  </svg>
);

const IconSystem = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="9" height="9" rx="2"/>
    <rect x="13" y="2" width="9" height="9" rx="2"/>
    <rect x="2" y="13" width="9" height="9" rx="2"/>
    <path d="M17.5 13v3.5m0 0v3.5m0-3.5H14m3.5 0H21"/>
  </svg>
);

const IconApi = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9l6-6 6 6"/>
    <path d="M6 15l6 6 6-6"/>
    <path d="M2 12h4m12 0h4"/>
  </svg>
);

const IconCloud = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z"/>
  </svg>
);

const IconConsult = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    <path d="M8 10h8M8 14h5"/>
  </svg>
);

/* ─────────────────────────────────────────────────────────
   DADOS DOS SERVIÇOS
───────────────────────────────────────────────────────── */
const SERVICES = [
  {
    title:       "Automações Inteligentes",
    description:
      "Scripts e bots que eliminam trabalho repetitivo. Automações de relatórios, integrações entre plataformas, web scraping, pipelines de dados e fluxos com Python e Node.js que rodam 24/7 enquanto você foca no que importa.",
    icon:  <IconAutomation />,
    tags:  ["Python", "Node.js", "Puppeteer", "Cron Jobs"],
    link:  "#contato",
  },
  {
    title:       "Landing Pages de Alta Conversão",
    description:
      "Páginas rápidas, responsivas e otimizadas para converter visitantes em clientes. Design moderno com animações fluidas, SEO técnico e pontuação máxima no Lighthouse. Do protótipo ao deploy em dias.",
    icon:  <IconLanding />,
    tags:  ["React", "Next.js", "SEO", "Performance"],
    link:  "#contato",
  },
  {
    title:       "Sistemas Web Completos",
    description:
      "Desenvolvimento fullstack de plataformas SaaS, dashboards administrativos, sistemas de gestão e ERPs customizados. Arquitetura limpa, escalável e com foco na experiência do usuário final.",
    icon:  <IconSystem />,
    tags:  ["React", "Node.js", "TypeScript", "PostgreSQL"],
    link:  "#contato",
  },
  {
    title:       "Construção de APIs Robustas",
    description:
      "APIs RESTful e GraphQL documentadas, seguras e de alta performance. Autenticação JWT/OAuth, rate limiting, versionamento, testes automatizados e integração com serviços de terceiros.",
    icon:  <IconApi />,
    tags:  ["REST", "GraphQL", "JWT", "Swagger"],
    link:  "#contato",
  },
  {
    title:       "Infraestrutura em Nuvem",
    description:
      "Deploy, configuração e monitoramento de aplicações em AWS (EC2, S3, Lambda, RDS). Containerização com Docker, CI/CD automatizado e ambientes de staging e produção isolados.",
    icon:  <IconCloud />,
    tags:  ["AWS", "Docker", "CI/CD", "Terraform"],
    link:  "#contato",
  },
  {
    title:       "Consultoria & Code Review",
    description:
      "Análise técnica de projetos existentes, revisão de arquitetura, refatoração de código legado e mentoria para times de desenvolvimento. Relatório detalhado com plano de melhoria priorizado.",
    icon:  <IconConsult />,
    tags:  ["Arquitetura", "Clean Code", "Mentoria", "Review"],
    link:  "#contato",
  },
];

/* ─────────────────────────────────────────────────────────
   Variantes de animação — scroll reveal
───────────────────────────────────────────────────────── */
const headerVariants = {
  hidden:  { opacity: 0, y: 30 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

const ctaVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.2 },
  },
};

/* ─────────────────────────────────────────────────────────
   ServicesSection
───────────────────────────────────────────────────────── */
function ServicesSection() {
  const headerRef = useRef(null);
  const ctaRef    = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });
  const ctaInView    = useInView(ctaRef,    { once: true, margin: "-60px" });

  return (
    <ServicesWrapper id="servicos">
      <DotBg aria-hidden="true" />

      <Inner>
        {/* ── Cabeçalho com scroll reveal ── */}
        <SectionHeader
          ref={headerRef}
          variants={headerVariants}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
        >
          <SectionLabel>O que eu ofereço</SectionLabel>
          <SectionTitle>
            Meus <em>serviços</em>
          </SectionTitle>
          <SectionSub>
            Soluções completas do back-end ao front-end. Cada entrega é pensada
            para gerar valor real ao seu negócio com código limpo e escalável.
          </SectionSub>
        </SectionHeader>

        {/* ── Grid de cards com HoverEffect Aceternity ── */}
        <HoverEffect items={SERVICES} />

        {/* ── CTA footer ── */}
        <CtaFooter
          ref={ctaRef}
          variants={ctaVariants}
          initial="hidden"
          animate={ctaInView ? "visible" : "hidden"}
        >
          <CtaText>
            Não encontrou o que precisa? Vamos conversar sobre seu projeto.
          </CtaText>
          <CtaButton href="#contato">
            Falar com Osmar
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </CtaButton>
        </CtaFooter>
      </Inner>
    </ServicesWrapper>
  );
}

export default ServicesSection;
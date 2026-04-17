
import React, { useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import {
  FooterWrapper,
  Noise,
  DotGrid,
  Inner,
  LinksGrid,
  BrandCol,
  BrandLogo,
  BrandTagline,
  SocialRow,
  SocialIcon,
  NavCol,
  NavColTitle,
  NavLink,
  BottomBar,
  Copyright,
  MadeWith,
  BackToTop
} from "./footer.styles";

/* ─────────────────────────────────────────────────────────
   ÍCONES SVG
───────────────────────────────────────────────────────── */
const IconWhatsapp = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
);

const IconLinkedin = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const IconGithub = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const IconEmail = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const IconArrowUp = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="19" x2="12" y2="5" />
    <polyline points="5 12 12 5 19 12" />
  </svg>
);

const IconArrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

/* ─────────────────────────────────────────────────────────
   DADOS DE NAVEGAÇÃO
───────────────────────────────────────────────────────── */
const NAV_SECTIONS = [
  {
    title: "Navegação",
    links: [
      { label: "Home",      href: "#home"     },
      { label: "Sobre",     href: "#sobre"    },
      { label: "Serviços",  href: "#servicos" },
      { label: "Projetos",  href: "#projetos" },
      { label: "Contato",   href: "#contato"  },
    ],
  },
  {
    title: "Serviços",
    links: [
      { label: "Automações",     href: "#servicos" },
      { label: "Landing Pages",  href: "#servicos" },
      { label: "Sistemas Web",   href: "#servicos" },
      { label: "APIs REST",      href: "#servicos" },
      { label: "Cloud & DevOps", href: "#servicos" },
    ],
  },
  {
    title: "Contato",
    links: [
      { label: "WhatsApp",  href: "https://wa.me/5585999999999",         external: true },
      { label: "LinkedIn",  href: "https://linkedin.com/in/osmarmendes",  external: true },
      { label: "GitHub",    href: "https://github.com/osmarmendes",       external: true },
      { label: "E-mail",    href: "mailto:osmar@email.com",              external: true },
    ],
  },
];

/* ─────────────────────────────────────────────────────────
   Variantes framer-motion
───────────────────────────────────────────────────────── */
const ctaVariants = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const gridVariants = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const colVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

/* ─────────────────────────────────────────────────────────
   Footer
───────────────────────────────────────────────────────── */
function Footer() {
  const ctaRef   = useRef(null);
  const gridRef  = useRef(null);
  const ctaInView  = useInView(ctaRef,  { once: true, margin: "-60px" });
  const gridInView = useInView(gridRef, { once: true, margin: "-40px" });

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const year = new Date().getFullYear();

  return (
    <FooterWrapper>
      <Noise   aria-hidden="true" />
      <DotGrid aria-hidden="true" />

      <Inner>

       
   

        {/* ── Grid de links ── */}
        <motion.div
          ref={gridRef}
          variants={gridVariants}
          initial="hidden"
          animate={gridInView ? "visible" : "hidden"}
        >
          <LinksGrid>

            {/* Coluna da marca */}
            <motion.div variants={colVariants}>
              <BrandCol>
                <BrandLogo>
                  dev<span>.</span>portfolio
                </BrandLogo>
                <BrandTagline>
                  Desenvolvedor Fullstack & Designer baseado em
                  Fortaleza, CE — Brasil. Especializado em React,
                  Node.js e TypeScript.
                </BrandTagline>
                <SocialRow>
                  <SocialIcon
                    className="whatsapp"
                    href="https://wa.me/5585999999999"
                    target="_blank" rel="noopener noreferrer"
                    aria-label="WhatsApp" title="WhatsApp"
                  >
                    <IconWhatsapp />
                  </SocialIcon>
                  <SocialIcon
                    className="linkedin"
                    href="https://linkedin.com/in/osmarmendes"
                    target="_blank" rel="noopener noreferrer"
                    aria-label="LinkedIn" title="LinkedIn"
                  >
                    <IconLinkedin />
                  </SocialIcon>
                  <SocialIcon
                    className="github"
                    href="https://github.com/osmarmendes"
                    target="_blank" rel="noopener noreferrer"
                    aria-label="GitHub" title="GitHub"
                  >
                    <IconGithub />
                  </SocialIcon>
                  <SocialIcon
                    href="mailto:osmar@email.com"
                    aria-label="E-mail" title="E-mail"
                  >
                    <IconEmail />
                  </SocialIcon>
                </SocialRow>
              </BrandCol>
            </motion.div>

            {/* Colunas de nav */}
            {NAV_SECTIONS.map((section) => (
              <motion.div key={section.title} variants={colVariants}>
                <NavCol>
                  <NavColTitle>{section.title}</NavColTitle>
                  {section.links.map(({ label, href, external }) => (
                    <NavLink
                      key={label}
                      href={href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                    >
                      {label}
                    </NavLink>
                  ))}
                </NavCol>
              </motion.div>
            ))}

          </LinksGrid>
        </motion.div>

        {/* ── Barra inferior ── */}
        <BottomBar>
          <Copyright>
            © {year} <a href="#home">Osmar Mendes</a>. Todos os direitos reservados.
            <br />
            Fortaleza, CE — Brasil
          </Copyright>

          <MadeWith>
            Feito com <span className="heart">♥</span> usando React & framer&#8209;motion
          </MadeWith>

          <BackToTop
            onClick={scrollToTop}
            aria-label="Voltar ao topo"
            title="Voltar ao topo"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
          >
            <IconArrowUp />
          </BackToTop>
        </BottomBar>

      </Inner>
    </FooterWrapper>
  );
}

export default Footer;
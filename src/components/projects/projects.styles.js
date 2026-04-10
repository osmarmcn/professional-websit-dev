
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";

const shimmer = keyframes`
  0%   { background-position: -200% center; }
  100% { background-position:  200% center; }
`;

export const ProjectsWrapper = styled.section`
  background: var(--bg2);
  position: relative;
  overflow: hidden;
  transition: background 0.4s ease;
`;

export const Inner = styled.div`
  position: relative;
  z-index: 1;
  padding-top: 5.5rem;

  @media (max-width: 768px) {
    padding-top: 4rem;
  }
`;

export const SectionHeader = styled(motion.div)`
  text-align: center;
  padding: 0 5vw;
`;

export const SectionLabel = styled.span`
  display: inline-block;
  font-family: 'Roboto', sans-serif;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.26em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 0.75rem;
`;

export const SectionTitle = styled.h2`
  font-family: 'Poppins', sans-serif;
  font-weight: 800;
  font-size: clamp(2rem, 5vw, 3.8rem);
  line-height: 1.1;
  color: var(--text-primary);
  margin-bottom: 0.9rem;

  em {
    font-style: normal;
    background: linear-gradient(
      90deg,
      var(--accent3),
      var(--accent),
      var(--accent2),
      var(--accent3)
    );
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: ${shimmer} 3s linear infinite;
  }
`;

export const SectionSub = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: clamp(0.88rem, 1.5vw, 1rem);
  color: var(--text-secondary);
  line-height: 1.75;
  max-width: 520px;
  margin: 0 auto;
`;
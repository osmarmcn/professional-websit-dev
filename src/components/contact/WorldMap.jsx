import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled, { keyframes } from "styled-components";

/* ─────────────────────────────────────────────────────────
   WorldMap — Aceternity UI style
   
   Coordenadas de Fortaleza em projeção Mercator 800×400:
     lat -3.7319, lng -38.5267  →  x=314.39, y=204.15

   Todos os elementos (dots + pin + label) ficam num único
   SVG viewBox="0 0 800 400" para garantir alinhamento perfeito.
   
   Sem dependência externa: usa FallbackDots até dotted-map
   ser instalado (npm install dotted-map).
───────────────────────────────────────────────────────── */

/* ── Projeção Mercator exata ───────────────────────────── */
function project(lat, lng) {
  const x      = ((lng + 180) / 360) * 800;
  const latRad = (lat * Math.PI) / 180;
  const mercN  = Math.log(Math.tan(Math.PI / 4 + latRad / 2));
  const y      = (0.5 - mercN / (2 * Math.PI)) * 400;
  return { x, y };
}

/* Fortaleza, CE, Brasil */
const PIN = project(-3.7319, -38.5267);
/* px=314.39  py=204.15 */

/* ── Styled ────────────────────────────────────────────── */
const MapWrap = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 2 / 1;
  border-radius: 12px;
  overflow: hidden;
  -webkit-mask-image: radial-gradient(ellipse at center, black 55%, transparent 100%);
          mask-image: radial-gradient(ellipse at center, black 55%, transparent 100%);
`;

/* SVG principal — viewBox fixo 800×400, contém tudo */
const MapSvg = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
`;

/* Label HTML sobre o SVG — posicionada em % relativas
   ao wrapper (não ao SVG) usando os valores calculados */
const PinLabel = styled(motion.div)`
  position: absolute;
  font-family: 'Roboto', sans-serif;
  font-size: 0.60rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  color: rgb(255, 255, 255);
  background: rgba(14, 164, 233, 0.575);
  border: 1px solid rgba(14, 165, 233, 0.45);
  backdrop-filter: blur(6px);
  border-radius: 4px;
  padding: 0.18rem 0.5rem;
  white-space: nowrap;
  pointer-events: none;
  z-index: 10;
  /* % derivados do viewBox 800×400 — alinhados ao PIN */
  left:      ${(PIN.x / 800) * 97}%;
  top:       ${(PIN.y / 400) * 95}%;
  /* Centraliza na horizontal e sobe 38px acima do ponto */
  transform: translate(-50%, calc(-100% -10px));
`;

/* ── Componente principal ──────────────────────────────── */
function WorldMap({ theme = "dark" }) {
  const [dotsSrc, setDotsSrc] = useState(null);  // src do <image> de dots
  const isDark    = theme === "dark";
  const dotColor = isDark ? "#111827" : "#464747";
  const ringColor = "#00E5FF"; 

  /* Tenta gerar o SVG de dots via dotted-map */
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const mod = await import("dotted-map");
        const DottedMap = mod.default ?? mod;
        const map = new DottedMap({ height: 60, grid: "diagonal" });
        const svg = map.getSVG({
          radius:          0.35,
          color:           dotColor,
          shape:           "circle",
          backgroundColor: "transparent",
        });
        if (alive) setDotsSrc(`data:image/svg+xml;utf8,${encodeURIComponent(svg)}`);
      } catch {
        if (alive) setDotsSrc("__fallback__");
      }
    })();
    return () => { alive = false; };
  }, [theme]); // eslint-disable-line

  const cx = PIN.x-10;   // 314.39
  const cy = PIN.y+50;   // 204.15

  return (
    <MapWrap>
      {/* ── SVG unificado: dots + pin — viewBox 800×400 ── */}
      <MapSvg
        viewBox="0 0 800 400"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        aria-label="Mapa com localização em Fortaleza, CE, Brasil"
      >
        <defs>
          <pattern id="dotGrid" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
            <circle cx="4" cy="4" r="0.7" fill={dotColor} />
          </pattern>

          <radialGradient id="pinGlow">
            <stop offset="0%" stopColor={ringColor} stopOpacity="0.6"/>
            <stop offset="60%" stopColor={ringColor} stopOpacity="0.2"/>
            <stop offset="100%" stopColor={ringColor} stopOpacity="0"/>
          </radialGradient>
        </defs>

        {/* ── Fundo: dotted-map ou continentes fallback ── */}
        {dotsSrc && dotsSrc !== "__fallback__" ? (
          /* Imagem gerada pelo dotted-map esticada no viewBox */
          <image
            href={dotsSrc}
            x="0" y="0"
            width="800" height="400"
            preserveAspectRatio="xMidYMid meet"
          />
        ) : (
          <FallbackContinents dotColor={dotColor} />
        )}

        {/* ── Glow radial no pin ── */}
        <ellipse cx={cx} cy={cy} rx="45" ry="28" fill="url(#pinGlow)" />

        {/* ── Linha vertical do pin ── */}
        <line
          x1={cx} y1={cy - 6}
          x2={cx} y2={cy - 28}
          stroke={ringColor}
          strokeWidth="1"
          strokeOpacity="0.7"
          strokeDasharray="3 2"
        />

        {/* ── Ondas pulsantes — MESMA posição cx/cy ── */}
        <circle cx={cx} cy={cy} r="8" fill="none"
          stroke={ringColor} strokeWidth="1.5" strokeOpacity="0.9">
          <animate attributeName="r" values="8;28;8" dur="2.2s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.9;0;0.9" dur="2.2s" repeatCount="indefinite"/>
        </circle>

        <circle cx={cx} cy={cy} r="6" fill="none"
        stroke={ringColor} strokeWidth="1.2" strokeOpacity="0.7">
        <animate attributeName="r" values="6;22;6" dur="2.2s" begin="0.5s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.7;0;0.7" dur="2.2s" begin="0.5s" repeatCount="indefinite"/>
      </circle>

        {/* ── Ponto central ── */}
        <circle cx={cx} cy={cy} r="4.5" fill={ringColor} fillOpacity="0.25" />
        <circle cx={cx} cy={cy} r="5" fill={ringColor} />
        <circle cx={cx} cy={cy} r="2.2" fill="#ffffff" />
      </MapSvg>

      {/* ── Label HTML (fora do SVG para preservar fontes CSS) ── */}
      <PinLabel
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.45, ease: "easeOut" }}
      >
        📍 Fortaleza, CE — Brasil
      </PinLabel>
    </MapWrap>
  );
}

/* ── Fallback: continentes em SVG com dot-pattern ──────── */
function FallbackContinents({ dotColor }) {
  return (
    <g>
      {/* Dot grid global */}
      <rect x="0" y="0" width="800" height="400" fill="url(#dotGrid)" />

      {/* Continentes preenchidos — mascara o dot-grid visualmente */}
      {/* América do Norte */}
      <path fill={dotColor} stroke="none" opacity="0.9"
        d="M62 62 Q84 42 124 52 Q154 58 174 84 Q179 106 163 125
           Q143 154 122 159 Q100 162 84 144 Q63 123 54 97 Z" />
      {/* América Central/Caribe */}
      <path fill={dotColor} stroke="none" opacity="0.9"
        d="M163 158 Q172 168 167 182 Q160 188 153 180 Q146 170 149 160 Z" />

      {/* América do Sul — com Nordeste em destaque  */}
      <path fill={dotColor} stroke="none" opacity="0.9"
        d="M188 194 Q218 174 258 184 Q290 196 312 228
           Q326 262 316 298 Q300 338 268 353
           Q238 362 212 342 Q186 316 181 274
           Q175 237 183 212 Z" />

      {/* Europa Ocidental */}
      <path fill={dotColor} stroke="none" opacity="0.9"
        d="M356 52 Q380 44 404 50 Q422 58 432 72
           Q438 88 428 100 Q414 108 398 104
           Q376 98 362 82 Q352 68 356 56 Z" />
      {/* Escandinávia */}
      <path fill={dotColor} stroke="none" opacity="0.9"
        d="M382 32 Q394 20 410 26 Q420 38 415 52
           Q404 58 392 52 Q380 44 380 36 Z" />

      {/* África */}
      <path fill={dotColor} stroke="none" opacity="0.9"
        d="M376 108 Q424 98 456 114 Q488 130 492 178
           Q496 224 476 266 Q456 300 424 310
           Q394 314 374 290 Q352 260 350 214
           Q346 166 360 134 Z" />

      {/* Rússia + Ásia Norte */}
      <path fill={dotColor} stroke="none" opacity="0.9"
        d="M432 44 Q504 28 600 38 Q660 46 692 60
           Q706 74 700 94 Q674 108 634 104
           Q580 98 530 92 Q480 86 452 76 Z" />
      {/* Ásia Sul (Índia etc.) */}
      <path fill={dotColor} stroke="none" opacity="0.9"
        d="M506 128 Q550 118 582 134 Q596 152 588 178
           Q574 192 548 186 Q522 176 510 158 Z" />
      {/* Subcontinente Indiano */}
      <path fill={dotColor} stroke="none" opacity="0.9"
        d="M540 180 Q558 176 568 196 Q564 218 548 220
           Q532 218 526 200 Z" />
      {/* Ásia Leste */}
      <path fill={dotColor} stroke="none" opacity="0.9"
        d="M594 88 Q656 78 708 92 Q726 110 720 138
           Q706 158 674 162 Q636 158 608 142
           Q588 126 588 108 Z" />
      {/* Sudeste Asiático */}
      <path fill={dotColor} stroke="none" opacity="0.9"
        d="M598 152 Q636 142 664 156 Q674 170 666 186
           Q648 196 624 188 Q604 178 596 164 Z" />

      {/* Austrália */}
      <path fill={dotColor} stroke="none" opacity="0.9"
        d="M622 260 Q674 246 716 262 Q736 278 730 310
           Q716 334 686 338 Q654 340 630 320
           Q610 300 614 278 Z" />

      {/* Japão */}
      <path fill={dotColor} stroke="none" opacity="0.9"
        d="M714 92 Q722 86 730 90 Q734 100 728 108
           Q720 112 714 106 Z" />
      {/* Groenlândia */}
      <path fill={dotColor} stroke="none" opacity="0.9"
        d="M198 18 Q220 8 244 16 Q260 28 254 46
           Q240 58 220 52 Q200 44 196 30 Z" />
      {/* Islândia */}
      <path fill={dotColor} stroke="none" opacity="0.9"
        d="M336 36 Q346 28 356 34 Q360 44 354 50
           Q344 52 338 46 Z" />
    </g>
  );
}

export default WorldMap;
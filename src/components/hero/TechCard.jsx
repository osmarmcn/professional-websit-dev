import React, { useMemo } from "react";
import * as Si from "react-icons/si";

import {
  CardOuter,
  CardInner,
  CardFront,
  CardBack,
} from "./hero.styles";

/* ─────────────────────────────────────────────────────────
   TechCard
   Card flutuante com flip 3D ao hover.
   Usa react-icons/si para renderizar o logo oficial
   de cada tecnologia com a cor da marca.

   Biblioteca necessária:
     npm install react-icons

   Props:
     card       → objeto de TECH_CARDS (heroData.js)
     pos        → { x, y } em % do viewport
     floatDur   → string CSS de duração (ex: "6.42s")
     floatDelay → string CSS de delay  (ex: "-3.10s")
───────────────────────────────────────────────────────── */
function TechCard({ card, pos, floatDur, floatDelay }) {
  /* Resolve o componente de ícone dinamicamente */
  const IconComponent = useMemo(() => Si[card.iconKey], [card.iconKey]);

  return (
    <CardOuter
      style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
      $dur={floatDur}
      $delay={floatDelay}
      title={card.label}
    >
      <CardInner className="card-inner">

        {/* Frente — logo oficial + label */}
        <CardFront>
          {IconComponent ? (
            <IconComponent
              size={38}
              color={card.iconColor}
              aria-label={card.label}
            />
          ) : (
            <span style={{ fontSize: "2rem" }}>?</span>
          )}
          <span className="label">{card.label}</span>
        </CardFront>

        {/* Verso — preview do projeto */}
        <CardBack>
          <img
            src={card.projectImg}
            alt={card.project}
            loading="lazy"
          />
          <span className="proj-name">{card.project}</span>
          <span className="proj-tag">{card.tag}</span>
        </CardBack>

      </CardInner>
    </CardOuter>
  );
}

export default TechCard;
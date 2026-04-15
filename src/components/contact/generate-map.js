/**
 * generate-map.js
 * ──────────────────────────────────────────────────────────
 * Script de pré-computação do mapa pontilhado.
 * Execute UMA VEZ após instalar dotted-map:
 *
 *   npm install dotted-map
 *   node generate-map.js
 *
 * Gera src/assets/worldMapData.json (cache do mapa).
 * O WorldMap.jsx importa este arquivo em produção para
 * renderização instantânea sem reprocessamento.
 * ──────────────────────────────────────────────────────────
 */

const DottedMap = require("dotted-map").default;
const fs        = require("fs");
const path      = require("path");

const map = new DottedMap({ height: 60, grid: "diagonal" });

/* Exporta o JSON interno do mapa para cache */
const mapJsonString = map.getJSON();

const outDir  = path.join(__dirname, "src", "assets");
const outFile = path.join(outDir, "worldMapData.json");

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outFile, mapJsonString, "utf8");

console.log("✅ worldMapData.json gerado em:", outFile);
console.log("   Importe no WorldMap.jsx para render instantâneo.");
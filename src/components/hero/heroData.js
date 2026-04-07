/*
  TECH CARDS DATA
  ───────────────────────────────────────────────────────
  Biblioteca de ícones: react-icons/si (Simple Icons)
  Instalação: npm install react-icons

  Cada ícone é o logo oficial da tecnologia, colorido com
  a cor hex da marca (iconColor).

  Campos:
    id         → chave única
    iconKey    → nome do ícone no react-icons/si (ex: SiReact)
    iconColor  → cor oficial da marca (#hex)
    label      → nome exibido na frente do card
    project    → nome do projeto exibido no verso
    projectImg → URL da imagem de preview
    tag        → stack resumida no verso
*/
export const TECH_CARDS = [
  {
    id: 1,
    iconKey:   "SiReact",
    iconColor: "#61DAFB",
    label:     "React",
    project:   "Dashboard Analytics",
    projectImg:"https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&q=80",
    tag:       "Frontend · SPA",
  },
  {
    id: 2,
    iconKey:   "SiJavascript",
    iconColor: "#F7DF1E",
    label:     "JavaScript",
    project:   "E-commerce App",
    projectImg:"https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=200&q=80",
    tag:       "Vanilla · ES2023",
  },
  {
    id: 3,
    iconKey:   "SiPython",
    iconColor: "#3776AB",
    label:     "Python",
    project:   "ML Pipeline",
    projectImg:"https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=200&q=80",
    tag:       "AI · Data Science",
  },
  {
    id: 4,
    iconKey:   "SiPostgresql",
    iconColor: "#4169E1",
    label:     "PostgreSQL",
    project:   "SaaS Backend",
    projectImg:"https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=200&q=80",
    tag:       "DB · SQL",
  },
  {
    id: 5,
    iconKey:   "SiMongodb",
    iconColor: "#47A248",
    label:     "MongoDB",
    project:   "Social Platform",
    projectImg:"https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=200&q=80",
    tag:       "NoSQL · Atlas",
  },
  {
    id: 6,
    iconKey:   "SiTypescript",
    iconColor: "#3178C6",
    label:     "TypeScript",
    project:   "Design System",
    projectImg:"https://images.unsplash.com/photo-1618788372246-79faff0c3742?w=200&q=80",
    tag:       "Types · DX",
  },
  {
    id: 7,
    iconKey:   "SiNodedotjs",
    iconColor: "#339933",
    label:     "Node.js",
    project:   "REST API",
    projectImg:"https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=200&q=80",
    tag:       "Backend · Express",
  },
  {
    id: 8,
    iconKey:   "SiDocker",
    iconColor: "#2496ED",
    label:     "Docker",
    project:   "Microservices",
    projectImg:"https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=200&q=80",
    tag:       "DevOps · Containers",
  },
  {
    id: 9,
    iconKey:   "SiAmazonwebservices",
    iconColor: "#FF9900",
    label:     "AWS",
    project:   "Cloud Infra",
    projectImg:"https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=200&q=80",
    tag:       "Cloud · IaC",
  },
  {
    id: 10,
    iconKey:   "SiFigma",
    iconColor: "#F24E1E",
    label:     "Figma",
    project:   "UI Kit",
    projectImg:"https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=200&q=80",
    tag:       "Design · Tokens",
  },
  {
    id: 11,
    iconKey:   "SiRedis",
    iconColor: "#DC382D",
    label:     "Redis",
    project:   "Cache Layer",
    projectImg:"https://images.unsplash.com/photo-1518770660439-4636190af475?w=200&q=80",
    tag:       "Cache · Queue",
  },
  {
    id: 12,
    iconKey:   "SiGraphql",
    iconColor: "#E10098",
    label:     "GraphQL",
    project:   "API Gateway",
    projectImg:"https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=200&q=80",
    tag:       "API · Federation",
  },
];

/* Posições (% do viewport) — lado direito da tela */
export const CARD_POSITIONS = [
  { x: 72, y: 12 }, { x: 85, y: 30 }, { x: 65, y: 52 },
  { x: 78, y: 70 }, { x: 55, y: 18 }, { x: 90, y: 55 },
  { x: 60, y: 80 }, { x: 48, y: 40 }, { x: 82, y: 82 },
  { x: 68, y: 35 }, { x: 92, y: 15 }, { x: 50, y: 60 },
];

/* Parâmetros de float individuais — gerados uma vez */
export const FLOAT_PARAMS = TECH_CARDS.map(() => ({
  dur:   `${(5 + Math.random() * 5).toFixed(2)}s`,
  delay: `${(-Math.random() * 6).toFixed(2)}s`,
}));
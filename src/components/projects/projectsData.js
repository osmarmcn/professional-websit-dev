
/* ─────────────────────────────────────────────────────────
   PROJECTS DATA
   Cada projeto contém:
     id          → chave única
     title       → nome do projeto
     category    → categoria (ex: "SaaS", "API", "Landing")
     summary     → texto curto exibido no card do grid
     description → texto longo exibido na sidebar de detalhes
     thumbnail   → imagem de capa (card + sidebar hero)
     images      → galeria de screenshots (sidebar)
     videoUrl    → URL de vídeo demo (opcional, sidebar)
     stack       → tecnologias usadas
     link        → URL do projeto ao vivo (opcional)
     github      → URL do repositório (opcional)
     year        → ano de entrega
     span        → "wide" (col-span-2) | "normal" (col-span-1)
───────────────────────────────────────────────────────── */
export const PROJECTS = [
  {
    id: 1,
    title:    "Dashboard Analytics SaaS",
    category: "SaaS · Fullstack",
    summary:
      "Plataforma de analytics em tempo real com gráficos interativos, relatórios customizáveis e gestão multi-tenant.",
    description:
      "Sistema SaaS completo de analytics construído do zero. Inclui autenticação multi-tenant com isolamento de dados por organização, dashboards com gráficos em tempo real usando WebSockets, exportação de relatórios em PDF/CSV, gerenciamento de usuários com RBAC, integração com Stripe para billing e planos, e API pública documentada com Swagger.\n\nArquitetura baseada em Clean Architecture no back-end (Node.js + TypeScript) e Design System próprio no front-end com React + Storybook. Deploy na AWS com ECS + RDS PostgreSQL e CDN CloudFront para os assets estáticos.",
    thumbnail:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&q=75",
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=700&q=75",
      "https://images.unsplash.com/photo-1543286386-2e659306cd6c?w=700&q=75",
    ],
    videoUrl: null,
    stack:    ["React", "TypeScript", "Node.js", "PostgreSQL", "AWS", "Stripe", "Redis"],
    link:     null,
    github:   null,
    year:     2024,
    span:     "wide",
  },
  {
    id: 2,
    title:    "E-commerce Fullstack",
    category: "E-commerce · API",
    summary:
      "Loja virtual completa com carrinho, pagamentos, painel admin e integração com marketplaces.",
    description:
      "Plataforma de e-commerce construída com Next.js no front-end e Node.js + Express no back-end. Funcionalidades: catálogo de produtos com busca full-text, carrinho persistido no Redis, checkout com Mercado Pago, painel administrativo para gestão de pedidos e estoque, integração com Correios para cálculo de frete, e webhooks para marketplaces (Shopee, Mercado Livre).\n\nImplementação de SSR/SSG no Next.js para SEO máximo, com pontuação 98+ no Lighthouse e Largest Contentful Paint abaixo de 1.2s.",
    thumbnail:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=700&q=75",
      "https://images.unsplash.com/photo-1530545371173-a5812a039b8f?w=700&q=75",
    ],
    videoUrl: null,
    stack:    ["Next.js", "Node.js", "MongoDB", "Redis", "Mercado Pago"],
    link:     null,
    github:   null,
    year:     2024,
    span:     "normal",
  },
  {
    id: 3,
    title:    "API de Automação com Python",
    category: "Automação · Python",
    summary:
      "Sistema de automação de processos com bots, scraping e pipelines de dados integrados ao Google Sheets e Slack.",
    description:
      "Suite de automações desenvolvida em Python para eliminar processos manuais repetitivos de uma empresa de logística. Inclui: bot de scraping de preços de fornecedores (Playwright), pipeline de transformação e limpeza de dados com Pandas, sincronização automática com Google Sheets via API, notificações no Slack com relatórios diários, e agendamento via Cron com monitoramento de falhas por e-mail.\n\nRedução de 85% no tempo gasto em tarefas manuais, processando mais de 5.000 registros por dia de forma autônoma.",
    thumbnail:
      "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=700&q=75",
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=700&q=75",
    ],
    videoUrl: null,
    stack:    ["Python", "Playwright", "Pandas", "Google Sheets API", "Docker"],
    link:     null,
    github:   null,
    year:     2023,
    span:     "normal",
  },
  {
    id: 4,
    title:    "Sistema de Gestão de Clínica",
    category: "Sistema Web · Saúde",
    summary:
      "Plataforma completa para gestão de clínicas médicas com agendamento, prontuário eletrônico e financeiro.",
    description:
      "Sistema de gestão clínica desenvolvido para uma rede de clínicas. Funcionalidades: agendamento online com integração de calendário, prontuário eletrônico (PEP) com histórico completo do paciente, controle financeiro (receitas, despesas, inadimplência), emissão de documentos médicos em PDF, painel de relatórios gerenciais, e app mobile em React Native para os médicos.\n\nSistema em produção atendendo 3 unidades simultâneas com mais de 800 consultas/mês registradas. Conformidade com LGPD e criptografia de dados sensíveis.",
    thumbnail:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=700&q=75",
      "https://images.unsplash.com/photo-1585435557343-3b092031a831?w=700&q=75",
      "https://images.unsplash.com/photo-1504439468489-c8920d796a29?w=700&q=75",
    ],
    videoUrl: null,
    stack:    ["React", "Node.js", "PostgreSQL", "TypeScript", "React Native", "AWS S3"],
    link:     null,
    github:   null,
    year:     2024,
    span:     "wide",
  },
  {
    id: 5,
    title:    "Landing Page — Startup Fintech",
    category: "Landing Page · Marketing",
    summary:
      "Landing page de alta conversão com animações premium, A/B testing e integração com CRM.",
    description:
      "Landing page desenvolvida para uma fintech focada em crédito para MEIs. Design com animações Framer Motion, seções de social proof, depoimentos e FAQ interativo. Integração com HubSpot CRM para captura de leads, pixel do Meta e Google Tag Manager para rastreamento de conversões, e testes A/B nos CTAs com Vercel Edge Config.\n\nResultados: taxa de conversão de 8.4% (média do setor: 2.5%), tempo de carregamento 0.8s, pontuação 100 no PageSpeed Insights. Responsiva para todos os dispositivos.",
    thumbnail:
      "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=700&q=75",
      "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=700&q=75",
    ],
    videoUrl: null,
    stack:    ["Next.js", "Framer Motion", "TypeScript", "HubSpot", "Vercel"],
    link:     null,
    github:   null,
    year:     2024,
    span:     "normal",
  },
  {
    id: 6,
    title:    "API Gateway Microservices",
    category: "Back-end · DevOps",
    summary:
      "Gateway centralizado para arquitetura de microserviços com autenticação, rate limiting e observabilidade.",
    description:
      "Implementação de API Gateway para uma plataforma com 8 microserviços independentes. Funcionalidades: autenticação centralizada via JWT + refresh tokens, rate limiting por usuário e por IP com Redis, roteamento dinâmico com circuit breaker (Hystrix pattern), logging estruturado com correlação de IDs entre serviços, dashboards de observabilidade no Grafana + Prometheus, e deploy via Kubernetes (EKS) com health checks e auto-scaling.\n\nSistema processando 2M+ de requisições/dia com latência P99 abaixo de 80ms e disponibilidade de 99.97%.",
    thumbnail:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=700&q=75",
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=700&q=75",
    ],
    videoUrl: null,
    stack:    ["Node.js", "Docker", "Kubernetes", "Redis", "Prometheus", "Grafana", "AWS EKS"],
    link:     null,
    github:   null,
    year:     2023,
    span:     "normal",
  },
];
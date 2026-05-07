# BRIEFING.md — Projeto Crossideas
> Documento de arquitetura completo para handoff ao Claude Code ou desenvolvedor.
> Última atualização: 2026-05-06

---

## 1. Visão Geral

**Cliente:** Crossideas  
**Produto:** Site institucional One Page — B2B de peças de impressão 3D personalizadas (troféus, brindes militares e esportivos)  
**Público-alvo:** Empresas e organizações que buscam peças 3D personalizadas para premiação e branding  
**Idioma:** Português (PT-BR) exclusivamente  
**Objetivo principal:** Gerar leads de orçamento via formulário e WhatsApp

---

## 2. Stack Técnica

| Camada | Tecnologia |
|---|---|
| Framework | Astro (versão mais recente) |
| Estilização | Tailwind CSS |
| CMS | Decap CMS (painel em `/admin`, integrado ao repositório Git) |
| Formulário | Formspree (gratuito, sem backend) |
| Hospedagem | Vercel ou Netlify |
| Linguagem | TypeScript (preferencial) |

---

## 3. Arquitetura — One Page

O site é uma única página (`/`) com scroll suave entre seções via `id` âncoras.

```
/
├── #inicio          → Hero com vídeo + CTA de orçamento
├── #sobre           → Sobre Nós
├── #video           → Vídeo de apresentação dos produtos
├── #catalogo        → Grid de produtos (dados do Decap CMS)
├── #avaliacoes      → Depoimentos de clientes (dados do Decap CMS)
├── #como-adquirir   → Carrossel do processo de compra 3D (3 etapas)
├── #contato         → Formulário de orçamento (Formspree)
└── #faq             → Perguntas Frequentes (dados do Decap CMS)
```

---

## 4. Componentes Globais

### 4.1 Header (Sticky)
- Fixo no topo (`position: sticky` ou `fixed`, `z-50`)
- Logo Crossideas à esquerda
- Menu de navegação à direita com links âncora para cada seção
- Ao clicar em qualquer link: `scroll-behavior: smooth` (configurado no `html` via Tailwind ou CSS global)
- Em mobile: menu hamburger colapsável

### 4.2 Botão WhatsApp Flutuante
- `position: fixed`, canto inferior direito, `z-50`
- Sempre visível durante todo o scroll
- Ícone do WhatsApp + tooltip opcional "Solicitar Orçamento"
- Link: `https://wa.me/[NUMERO_WHATSAPP]` (substituir pelo número real da Beth)
- Animação suave de entrada (pulse ou bounce sutil)

### 4.3 Footer
- Logo Crossideas
- Links de navegação (mesmos do header)
- Informações de contato (email, telefone)
- Links de redes sociais (Instagram, Facebook, LinkedIn — conforme disponível)
- Copyright: `© {ano} Crossideas. Todos os direitos reservados.`
- Tagline: "Em Evolução Constante"

---

## 5. Seções — Detalhamento

### 5.1 Hero (`#inicio`)
- Vídeo de fundo em loop (autoplay, muted, sem controles) OU imagem hero de alta qualidade
- Overlay escuro semitransparente sobre o vídeo
- Headline principal da marca (tipografia grande, branca)
- Subtítulo/chamada de ação
- Dois CTAs:
  - Botão primário: "Solicitar Orçamento" → ancora para `#contato`
  - Botão secundário: "Ver Catálogo" → ancora para `#catalogo`

### 5.2 Sobre Nós (`#sobre`)
- Texto institucional da Crossideas (editável via CMS ou hardcoded inicialmente)
- Pode incluir: missão, diferenciais, breve história
- Layout: texto + imagem lateral, ou texto centralizado com destaque visual

### 5.3 Vídeo de Produtos (`#video`)
- Embed de vídeo de apresentação (YouTube ou arquivo local)
- Fundo contrastante (dark section)
- Título da seção acima do player

### 5.4 Catálogo (`#catalogo`) ← Dados do CMS
- Filtro por categoria: **3D Militares** | **3D Esportivos** | **Todos**
- Grid responsivo de cards de produto
- **Ver regra de UX do ProductCard abaixo (seção 7)**

### 5.5 Avaliações (`#avaliacoes`) ← Dados do CMS
- Cards de depoimentos em carrossel ou grid
- Exibe: nome do cliente, empresa/cargo, texto e estrelas (1–5)

### 5.6 Como Adquirir (`#como-adquirir`)
- Carrossel ou timeline horizontal com 3 etapas do processo:
  1. Definição do projeto (briefing)
  2. Modelagem 3D do projeto
  3. Impressão 3D e entrega
- Ícones ou ilustrações para cada etapa

### 5.7 Formulário de Contato (`#contato`)
- Integração: **Formspree** (`https://formspree.io/f/[FORM_ID]`)
- Campos:

| Campo | Tipo | Obrigatório |
|---|---|---|
| Nome completo | text | ✅ |
| E-mail corporativo | email | ✅ |
| Telefone / WhatsApp | tel | ✅ |
| Empresa | text | ❌ |
| Categoria de interesse | select (Militar / Esportivo / Ambos) | ❌ |
| Mensagem / Detalhes do pedido | textarea | ✅ |

- Feedback visual após envio: mensagem de sucesso inline (sem redirect)
- Validação client-side básica (HTML5 + Tailwind states)

### 5.8 FAQ (`#faq`) ← Dados do CMS
- Accordion (pergunta clicável que expande a resposta)
- Transição suave de abertura/fechamento
- Campos por item: Pergunta + Resposta

---

## 6. CMS — Decap CMS

### Configuração
- Painel acessível em: `[dominio]/admin`
- Autenticação: Git Gateway via Netlify Identity (ou Vercel equivalente)
- Arquivo de configuração: `public/admin/config.yml`

### Collections (Coleções)

#### 6.1 `products` — Catálogo de Peças

```yaml
collections:
  - name: "products"
    label: "Peças do Catálogo"
    folder: "src/content/products"
    create: true
    slug: "{{slug}}"
    fields:
      - { label: "Nome da Peça", name: "title", widget: "string" }
      - { label: "Categoria", name: "category", widget: "select",
          options: ["3D Militares", "3D Esportivos"] }
      - { label: "Descrição Curta", name: "description", widget: "text" }
      - { label: "Material Sugerido", name: "material", widget: "string",
          hint: "Ex: PLA, ABS, Resina" }
      - { label: "Imagem Principal", name: "image", widget: "image" }
      - { label: "Destaque (Mais Vendido)", name: "featured", widget: "boolean",
          default: false }
```

#### 6.2 `reviews` — Avaliações de Clientes

```yaml
  - name: "reviews"
    label: "Avaliações"
    folder: "src/content/reviews"
    create: true
    slug: "{{slug}}"
    fields:
      - { label: "Nome do Cliente", name: "name", widget: "string" }
      - { label: "Empresa / Cargo", name: "role", widget: "string" }
      - { label: "Texto da Avaliação", name: "body", widget: "text" }
      - { label: "Nota (1 a 5)", name: "rating", widget: "number",
          min: 1, max: 5, value_type: "int" }
```

#### 6.3 `faq` — Perguntas Frequentes

```yaml
  - name: "faq"
    label: "FAQ"
    folder: "src/content/faq"
    create: true
    slug: "{{slug}}"
    fields:
      - { label: "Pergunta", name: "question", widget: "string" }
      - { label: "Resposta", name: "answer", widget: "text" }
```

---

## 7. Regra de UX — ProductCard (`ProductCard.astro`)

### Comportamento Desktop (hover)
- **Estado padrão:** exibe apenas a foto da peça (imagem ocupa 100% do card)
- **Estado hover:** overlay escuro semitransparente com `backdrop-blur` cobre a imagem, revelando suavemente:
  - Nome da peça (título)
  - Material sugerido
  - Descrição curta
  - Badge "Mais Vendido" (se `featured: true`)
- Implementação via classes Tailwind: `group`, `group-hover:opacity-100`, `absolute inset-0`, `transition-all duration-300`

### Comportamento Mobile (fallback)
- **Opção A (recomendada):** os textos ficam sempre visíveis abaixo da imagem em telas `< md`
- **Opção B:** toque na imagem revela o overlay (toggle via JS com `addEventListener('click')`)
- Usar breakpoint `md:` do Tailwind para alternar entre os comportamentos

### Estrutura do Componente

```astro
---
// ProductCard.astro
interface Props {
  title: string;
  category: string;
  description: string;
  material: string;
  image: string;
  featured: boolean;
}
const { title, category, description, material, image, featured } = Astro.props;
---

<div class="group relative overflow-hidden rounded-xl cursor-pointer">
  <!-- Imagem -->
  <img src={image} alt={title} class="w-full h-72 object-cover" />

  <!-- Badge Destaque -->
  {featured && (
    <span class="absolute top-3 left-3 bg-[accent] text-white text-xs px-2 py-1 rounded-full z-10">
      Mais Vendido
    </span>
  )}

  <!-- Overlay (Desktop: hover | Mobile: sempre visível abaixo) -->
  <div class="
    absolute inset-0 bg-black/70 backdrop-blur-sm
    flex flex-col justify-end p-4 text-white
    opacity-0 group-hover:opacity-100
    transition-all duration-300 ease-in-out
    md:flex hidden
  ">
    <h3 class="font-bold text-lg">{title}</h3>
    <p class="text-sm text-gray-300">{material}</p>
    <p class="text-sm mt-1">{description}</p>
  </div>

  <!-- Fallback Mobile: textos abaixo da imagem -->
  <div class="md:hidden p-3">
    <h3 class="font-bold">{title}</h3>
    <p class="text-sm text-gray-500">{material}</p>
    <p class="text-sm">{description}</p>
  </div>
</div>
```

---

## 8. Identidade Visual

> ⚠️ Cores exatas serão definidas pelo cliente após o scaffolding. Usar variáveis Tailwind para facilitar o ajuste.

### Diretrizes Iniciais
- **Estética:** clean, corporativo, premium
- **Referências:** Cornerman (tipografia grande, espaço negativo), Boca Rosa (grid de catálogo, UX fluída)
- **Modo:** claro com seções de contraste dark (não dark mode global)
- **Tipografia:** Inter, Geist ou Satoshi — tamanhos grandes nos headings
- **Paleta inicial sugerida (ajustável):**
  - Background: `#FAFAFA` (claro) / `#0F0F0F` (dark sections)
  - Primária (accent): `#C9A96E` (dourado corporativo) — **substituir pelo hex real da marca**
  - Texto: `#1A1A1A`
  - Secundário: `#6B7280`

### Variáveis Tailwind (`tailwind.config.mjs`)
```js
theme: {
  extend: {
    colors: {
      accent: '#C9A96E',       // cor principal da marca — AJUSTAR
      'accent-dark': '#A8845A', // hover state
      'brand-dark': '#0F0F0F',
      'brand-light': '#FAFAFA',
    },
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
    }
  }
}
```

---

## 9. Estrutura de Arquivos do Projeto

```
crossideas/
├── public/
│   ├── admin/
│   │   ├── index.html          ← Painel Decap CMS
│   │   └── config.yml          ← Configuração das coleções CMS
│   ├── favicon.ico
│   └── whatsapp-icon.svg
│
├── src/
│   ├── components/
│   │   ├── Header.astro        ← Sticky header + nav smooth scroll
│   │   ├── Footer.astro
│   │   ├── WhatsAppButton.astro ← Botão flutuante fixed
│   │   ├── ProductCard.astro   ← Card com hover overlay (regra seção 7)
│   │   ├── ReviewCard.astro    ← Card de depoimento com estrelas
│   │   ├── FaqItem.astro       ← Accordion item
│   │   └── HowToBuyStep.astro  ← Etapa do carrossel "Como Adquirir"
│   │
│   ├── sections/
│   │   ├── Hero.astro
│   │   ├── About.astro
│   │   ├── VideoSection.astro
│   │   ├── Catalog.astro       ← Busca dados de /content/products
│   │   ├── Reviews.astro       ← Busca dados de /content/reviews
│   │   ├── HowToBuy.astro
│   │   ├── Contact.astro       ← Formulário Formspree
│   │   └── Faq.astro           ← Busca dados de /content/faq
│   │
│   ├── content/
│   │   ├── products/           ← Arquivos .md gerados pelo Decap CMS
│   │   │   └── exemplo-trófeu.md
│   │   ├── reviews/
│   │   │   └── exemplo-review.md
│   │   └── faq/
│   │       └── exemplo-faq.md
│   │
│   ├── layouts/
│   │   └── Layout.astro        ← HTML base, meta tags, imports globais
│   │
│   ├── pages/
│   │   └── index.astro         ← Página única, importa todas as sections
│   │
│   └── styles/
│       └── global.css          ← scroll-behavior: smooth + resets
│
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
└── package.json
```

---

## 10. Prompt Inicial para Claude Code

> Cole este prompt exatamente ao iniciar o Claude Code no diretório do projeto:

```
Você vai construir o site da Crossideas conforme o arquivo BRIEFING.md presente neste repositório.

Siga esta ordem de execução:
1. Inicialize o projeto Astro com Tailwind CSS: `npm create astro@latest`
2. Configure o tailwind.config.mjs com as variáveis de cor e fonte definidas no briefing
3. Crie o Layout.astro base com as meta tags, importação de fontes (Inter via Google Fonts) e scroll-behavior: smooth no CSS global
4. Implemente o Header.astro (sticky, smooth scroll nos links âncora)
5. Implemente o WhatsAppButton.astro (fixed, canto inferior direito)
6. Crie as sections na ordem: Hero → About → VideoSection → Catalog → Reviews → HowToBuy → Contact → Faq
7. Crie os componentes reutilizáveis: ProductCard (com regra de hover overlay da seção 7 do briefing), ReviewCard, FaqItem
8. Configure o Decap CMS: crie public/admin/index.html e public/admin/config.yml com as 3 collections (products, reviews, faq) exatamente como definido na seção 6 do briefing
9. Configure o formulário de contato com Formspree (action no form tag)
10. Crie arquivos .md de exemplo em src/content/ para cada collection
11. Implemente o Footer.astro
12. Configure a integração do Astro com Content Collections (astro.config.mjs)

Mantenha todas as cores como variáveis Tailwind (accent, brand-dark, brand-light) para facilitar ajuste posterior.
Não hardcode nenhum conteúdo de catálogo, avaliações ou FAQ — tudo deve vir dos arquivos markdown em src/content/.
```

---

## 11. Informações Pendentes (preencher antes do deploy)

| Item | Status |
|---|---|
| Número do WhatsApp (Beth) | ⏳ Pendente |
| ID do formulário Formspree | ⏳ Pendente (criar conta em formspree.io) |
| Logo Crossideas (SVG ou PNG) | ⏳ Pendente |
| Cores exatas da marca (HEX) | ⏳ Pendente |
| Vídeo hero e vídeo de produtos | ⏳ Pendente |
| Texto institucional "Sobre Nós" | ⏳ Pendente |
| Fotos dos produtos para catálogo inicial | ⏳ Pendente |
| Domínio final do site | ⏳ Pendente |

---

*Documento gerado via sessão de planejamento — Chat Claude (Anthropic)*

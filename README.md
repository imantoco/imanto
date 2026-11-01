# Imanto

Site institucional da Imanto, escrito para **quem compra** e para **especialistas**. Discurso público: "Guias, kits e cursos digitais" · "Conhecimento prático para a vida real." (revisado em 2026-11-01).

> Linguagem interna (IA, AI first, low ticket, infoproduto, tráfego, lucro, ROAS) **não aparece no site**: decisão do Matheus em 2026-11-01. A única menção a IA fica na Política de Privacidade, no aviso legal do atendimento automático do Direct.

Domínio: **https://imanto.com.br** (GitHub Pages, publicar = push em `main`).

Site estático em **português do Brasil**, sem build e sem dependências. Tema claro com seções navy de impacto, gradiente azul/roxo/magenta, Space Grotesk + Inter, motivo de campo magnético.

## Estrutura
- `index.html`: home (como são os produtos, compre com tranquilidade, o nome, quem somos, formulário para especialistas `#especialistas`, perguntas, formulário de suporte `#suporte`). A marca de cada produto fica na página do nicho; aqui a Imanto aparece como responsável.
- `quem-somos/`: a Imanto e o fundador.
- Os dois formulários (`form[data-form]` em `assets/site.js`) enviam para o Worker `imanto-form` (`Imanto-OS/infra/form-site/`): `POST /especialista` e `POST /suporte`, que avisam no Telegram e por e-mail. O processo seletivo de coprodução (`/aplicar`) saiu do site em 2026-11-01.
- `privacidade/`, `termos/`, `exclusao-de-dados/`: páginas legais. **As URLs não mudam** (apps Meta e Google dependem delas).
- `servicos/` e as 9 landings de nicho (`planejados/`, `hvac/` etc.): só redirecionam para `/` desde 2026-10-11. O conteúdo antigo está na branch `arquivo-pre-coprodutora`.
- `_build/og.html`: fonte da imagem `assets/imanto-og.jpg` (screenshot 1200×630).
- `assets/site.css`, `assets/site.js`: sistema visual, reveal-on-scroll e envio do formulário.
- `assets/`, `logo-kit/`: favicons, ilustrações, logos e a imagem OG.
- `sitemap.xml`, `robots.txt`.

> Fonte da verdade verbal: `Imanto-OS/_contexto/marca.md`. Estilo: português do Brasil, sem travessão, sem "não é X, é Y", sem etimologia "irmanar", número só com fonte.

## Logo (drop-in)
Gere o símbolo com o prompt do projeto e coloque em `assets/`:
`imanto-emblem-dark.png`, `imanto-emblem-light.png`, `imanto-emblem-mono.png`, `imanto-favicon.png` (referenciado no `<head>`). Sem mudar código — o site detecta. Até lá, o ímã em SVG do hero faz o papel.

## Apontar o domínio imanto.com.br (no registro.br)
Adicione no painel de DNS do `imanto.com.br`:

**Apex (`imanto.com.br`) — 4 registros A (GitHub Pages):**
```
A   @   185.199.108.153
A   @   185.199.109.153
A   @   185.199.110.153
A   @   185.199.111.153
```
**(opcional, IPv6 — AAAA):** `2606:50c0:8000::153`, `…8001::153`, `…8002::153`, `…8003::153`
**www:** `CNAME   www   mnattanglobal-hash.github.io`

Depois do DNS propagar, ativar o domínio no repo (Settings → Pages → Custom domain = `imanto.com.br`, Enforce HTTPS) — ou me avisar que eu adiciono o arquivo `CNAME` e ligo. **imanto.online:** apontar como redirect 301 pro `imanto.com.br` no registrador.

## Ativação da marca (checklist)
- [ ] Apontar DNS (acima) e ativar custom domain + HTTPS.
- [ ] Reservar handles **@imanto** (Instagram, LinkedIn, X, GitHub).
- [ ] E-mail `contato@imanto.com.br` (a CTA aponta pra lá).
- [ ] **Trademark:** registrar no INPI **classe 35 (+42)**, versão **mista (nome + logo)** pra reforçar o fosso. *Pré-triagem indicativa, não jurídica — advogado antes de gastar.*

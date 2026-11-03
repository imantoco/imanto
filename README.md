# Imanto

Site institucional da Imanto, escrito para **quem compra** e para **especialistas**. Discurso público: "Guias, kits e cursos digitais" · "Conhecimento prático para a vida real." (revisado em 2026-11-01).

> Linguagem interna (IA, AI first, low ticket, infoproduto, tráfego, lucro, ROAS) **não aparece no site**: decisão do Matheus em 2026-11-01. A única menção a IA fica na Política de Privacidade, no aviso legal do atendimento automático do Direct.

Domínio: **https://imanto.com.br** no **Cloudflare Pages**, projeto `imanto-site` (desde 2026-11-03; o GitHub Pages foi desligado porque os termos dele proíbem site de venda). Publicar = `sites/imanto-site/publicar.sh` da raiz do Imanto-OS (prévia: `--previa` → previa.imanto-site.pages.dev). O push na `main` é só versionamento.

Site estático em **português do Brasil**, sem build e sem dependências. Tema claro com seções navy de impacto, gradiente azul/roxo/magenta, Space Grotesk + Inter, motivo de campo magnético.

## Estrutura
- `index.html`: home (como são os produtos, compre com tranquilidade, o nome, quem somos, formulário para especialistas `#especialistas`, perguntas, formulário de suporte `#suporte`). A marca de cada produto fica na página do nicho; aqui a Imanto aparece como responsável.
- `quem-somos/`: a Imanto e o fundador.
- Os dois formulários (`form[data-form]` em `assets/site.js`) enviam para o Worker `imanto-form` (`Imanto-OS/infra/form-site/`): `POST /especialista` e `POST /suporte`, que avisam no Telegram e por e-mail. O processo seletivo de coprodução (`/aplicar`) saiu do site em 2026-11-01.
- `entrevista/`: página de vendas do Kit do Que Falar na Entrevista (versão Imanto). **Não edite aqui**: sai de `Imanto-OS/clientes/matheus/ofertas/entrevista-de-emprego/producao/paginas-imanto/_build/build.sh --publicar`; copie `site/entrevista/` para cá e publique.
- `404.html`: página de erro (sem ela o Cloudflare Pages devolveria a home com 200 em qualquer endereço).
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

## Domínio (histórico)
Até 2026-11-03 o apex apontava para o GitHub Pages (4 A 185.199.108-111.153, www CNAME mnattanglobal-hash.github.io). Hoje: `@` e `www` CNAME com proxy para `imanto-site.pages.dev`; www → apex por Page Rule 301. Detalhes e plano de volta: `Imanto-OS/imanto/roas-2026-11-03/item-11/PUBLICACAO-IMANTO.md`.

## Ativação da marca (checklist)
- [ ] Apontar DNS (acima) e ativar custom domain + HTTPS.
- [ ] Reservar handles **@imanto** (Instagram, LinkedIn, X, GitHub).
- [ ] E-mail `contato@imanto.com.br` (a CTA aponta pra lá).
- [ ] **Trademark:** registrar no INPI **classe 35 (+42)**, versão **mista (nome + logo)** pra reforçar o fosso. *Pré-triagem indicativa, não jurídica — advogado antes de gastar.*

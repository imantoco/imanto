# Imanto

**Ferramentas de IA tiradas de um e-commerce de verdade.**
A Imanto vende ferramentas de IA de compra única para o marketing de e-commerce, tiradas da operação da
Aurha e prontas para o time de marketing de outras lojas usar. Posicionamento decidido em 2026-10-05
(ver `imanto-growth-os/posicionamento/00-nucleo-pivo-ecommerce.md`).

Domínio: **https://imanto.com.br** · Deploy: GitHub Pages, `git push` na branch padrão, sem build.

Site estático em **português do Brasil**, sem dependências. Tema claro com seções navy de impacto,
gradiente azul/roxo/magenta, Space Grotesk + Inter, motivo de campo magnético.

## Estrutura
- `index.html`: home (hero, dor do dono de e-commerce, como funciona, vitrine, a loja por trás, quem faz, FAQ, contato).
- `produtos/`: vitrine completa. É o **link da bio** do @imanto.co.
- `produtos/produtos.json`: a lista de ferramentas. Editar aqui publica na home e na vitrine.
  Lista vazia mostra "primeira ferramenta sendo preparada". Teste dos estados: `?demo=0`, `?demo=1`, `?demo=3`.
- `assets/vitrine.js`, `assets/pivo.css`: componente da vitrine e estilos do posicionamento novo (só tokens de `site.css`).
- `servicos/`: redireciona para `/produtos/` (noindex). A URL fica viva porque aparece em mensagens antigas.
- `privacidade/`, `termos/`, `exclusao-de-dados/`: páginas legais. **Não remover nem mudar a URL**: os apps
  Meta e Google foram aprovados com elas.
- LPs verticais com noindex (`planejados/`, `hvac/`, `vidracaria/`, `solar/`, `marmoraria/`, `arquitetura/`,
  `construtora/`, `automacao/`, `piscinas/`): do modelo de serviço anterior. Destino pendente de decisão.
- `assets/site.css`, `assets/site.js`: sistema visual e reveal-on-scroll compartilhados.
- `assets/`, `logo-kit/`, `brandbook/`: favicons, ilustrações, logos e o brandbook visual.
- `sitemap.xml`, `robots.txt`, `CNAME`.

## Publicar uma ferramenta nova
1. Página de venda pronta (página própria, checkout próprio).
2. Adicionar o objeto em `produtos/produtos.json` com `status: "disponivel"`, `preco` e `url`.
3. Conferir `/produtos/` e a home localmente (`python3 -m http.server`), depois push.

> Fonte da verdade verbal: `brand-book.md` (§1 e §2). Estilo: português do Brasil, caixa de sentença,
> sem travessão, sem "não é X, é Y", sem etimologia "irmanar". Contato só por contato@imanto.com.br,
> sem WhatsApp e sem endereço.

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

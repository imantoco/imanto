#!/usr/bin/env bash
# Publica imanto.com.br no Cloudflare Pages (projeto "imanto-site"), desde 2026-11-03.
# Uso, da raiz do Imanto-OS:  sites/imanto-site/publicar.sh [--previa]
#   sem argumento: produção (branch main → imanto.com.br)
#   --previa:      só https://previa.imanto-site.pages.dev (não mexe no domínio)
# Push no GitHub é só versionamento; quem publica é este script. Publicar é ir a público: só com o "sim" do Matheus.
set -euo pipefail
SITE="$(cd "$(dirname "$0")" && pwd)"
RAIZ="$(cd "$SITE/../.." && pwd)"
BRANCH=main; [ "${1:-}" = "--previa" ] && BRANCH=previa
set -a; source "$RAIZ/segredos/dono/cloudflare.env"; set +a
TMP="$(mktemp -d)"; trap 'rm -rf "$TMP"' EXIT
# Só o conteúdo público: fora .git, notas internas e arquivos do GitHub Pages
rsync -a --filter=':- .gitignore' --exclude .git --exclude .gitignore --exclude .nojekyll --exclude CNAME --exclude README.md \
  --exclude publicar.sh --exclude _build --exclude .DS_Store --exclude .playwright-mcp "$SITE/" "$TMP/"
npx -y wrangler@4 pages deploy "$TMP" --project-name imanto-site --branch "$BRANCH" --commit-dirty=true

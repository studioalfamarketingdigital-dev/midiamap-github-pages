# MídiaMap

Marketplace de mídia e publicidade da S.Alfa MKT.

## Domínio
https://midiamap.studioalfamkt.online

## Stack
Next.js + TypeScript + CSS. Preparado para deploy na Vercel.

## Hospedagem no GitHub Pages
1. Com o GitHub CLI logado (`gh auth login`), dentro desta pasta:
   `git init -b main && git add . && git commit -m "MídiaMap" && gh repo create midiamap --public --source=. --push`
2. No repositório: Settings > Pages > Build and deployment > Source: **GitHub Actions**.
3. O workflow `.github/workflows/pages.yml` compila e publica a cada push na `main`.
4. Domínio: o arquivo `public/CNAME` já aponta para `midiamap.studioalfamkt.online`. No DNS de `studioalfamkt.online`, crie um registro CNAME do subdomínio `midiamap` para `SEU-USUARIO.github.io`, e depois marque "Enforce HTTPS" em Settings > Pages.
5. Valide `/robots.txt` e `/sitemap.xml` e cadastre o sitemap no Google Search Console.

Obs.: o GitHub Pages gratuito exige repositório público (ou plano pago para privado).

## Próxima fase
- inventário real via banco/API;
- mapa interativo e geolocalização;
- filtros por cidade, formato, período e preço;
- cadastro de exibidores;
- disponibilidade/reserva;
- checkout e pagamento;
- painel do anunciante;
- painel do proprietário de mídia;
- integração com parceiros de OOH, DOOH, TV e rádio.

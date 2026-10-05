# MídiaMap

Marketplace de mídia e publicidade da S.Alfa MKT.

> Toda mídia. Em um só mapa.

## O projeto

O MídiaMap conecta anunciantes, agências, empresas e proprietários de espaços publicitários. A experiência inicial inclui mapa visual, busca, filtros e inventário demonstrativo para outdoor, painéis LED, DOOH e indoor.

## Executar localmente

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`.

## Validar produção

```bash
npm ci
npm run build
npm run start
```

O build usa exportação estática e gera a pasta `out/`.

## GitHub Pages

O workflow em `.github/workflows/pages.yml` compila e publica automaticamente a branch `main` usando GitHub Actions.

No repositório, configure **Settings → Pages → Source: GitHub Actions**. O arquivo `public/CNAME` aponta para `midiamap.studioalfamkt.online`.

Para o DNS, o subdomínio `midiamap` deve apontar para:

```text
studioalfamarketingdigital-dev.github.io
```

## Estrutura

- `app/`: página, layout, SEO e estilos globais.
- `components/Inventory.tsx`: busca, filtros, mapa e cards do inventário.
- `lib/spaces.ts`: dados demonstrativos separados da interface.
- `public/`: CNAME, manifesto e arquivos públicos.

## Próximas fases

- Inventário real via API ou banco de dados.
- Páginas individuais de mídia.
- Cadastro de veículos e anunciantes.
- Disponibilidade, reservas e checkout.
- Dashboards e integrações com mapas e pagamentos.

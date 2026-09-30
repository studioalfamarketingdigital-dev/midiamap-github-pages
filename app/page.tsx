import Inventory from '../components/Inventory';

const mediaTypes = [
  { icon: '▰', title: 'Outdoor', text: 'Grandes formatos em ruas e avenidas.' },
  { icon: '▦', title: 'Painéis LED', text: 'Mídia digital em pontos estratégicos.' },
  { icon: '◈', title: 'DOOH', text: 'Publicidade digital fora de casa.' },
  { icon: '⌂', title: 'Indoor', text: 'Shoppings, lojas, academias e clínicas.' },
  { icon: '▣', title: 'TV', text: 'Espaços comerciais em televisão.' },
  { icon: '◉', title: 'Rádio', text: 'Publicidade em emissoras e programas.' },
];

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'MídiaMap',
    url: 'https://midiamap.studioalfamkt.online',
    description: 'Marketplace para encontrar e comparar espaços publicitários.',
    potentialAction: { '@type': 'SearchAction', target: 'https://midiamap.studioalfamkt.online/?q={search_term_string}', 'query-input': 'required name=search_term_string' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <header className="site-header">
        <div className="container nav">
          <a className="brand" href="#top" aria-label="MídiaMap início">Mídia<span>Map</span></a>
          <nav className="nav-links" aria-label="Navegação principal">
            <a href="#inventario">Inventário</a><a href="#midias">Mídias</a><a href="#anuncie">Anuncie</a><a href="#cadastro">Cadastre seu espaço</a>
          </nav>
          <div className="nav-actions"><a className="login" href="mailto:studioalfamktag@bol.com.br?subject=Entrar na MídiaMap">Entrar</a><a className="button button-green" href="#anuncie">Quero anunciar</a></div>
        </div>
      </header>

      <main id="top">
        <section className="hero container">
          <div className="hero-copy">
            <span className="eyebrow"><span className="eyebrow-dot" /> MARKETPLACE DE MÍDIA</span>
            <h1>Sua marca.<br /><em>Onde importa.</em></h1>
            <p className="hero-lead">Encontre espaços publicitários, compare oportunidades e coloque sua marca nos lugares certos.</p>
            <div className="hero-search"><span className="search-icon">⌕</span><input aria-label="Onde você quer anunciar" placeholder="Digite cidade, bairro ou endereço" /><a className="button button-dark" href="#inventario">Encontrar mídia <span>↗</span></a></div>
            <div className="hero-meta"><span>✓ Inventário por localização</span><span>✓ Valores transparentes</span><span>✓ Proposta sob medida</span></div>
          </div>
          <div className="hero-map" aria-label="Mapa ilustrativo de espaços publicitários">
            <div className="map-topline"><span><i className="live-dot" /> MAPA DE OPORTUNIDADES</span><span className="map-control">− &nbsp; +</span></div>
            <div className="map-grid"><div className="road r1" /><div className="road r2" /><div className="road r3" /><div className="road r4" /><span className="district d1">ASA NORTE</span><span className="district d2">CENTRO</span><span className="district d3">EIXO MONUMENTAL</span><button className="map-pin p1">R$ 650</button><button className="map-pin p2 active">R$ 1.200</button><button className="map-pin p3">R$ 390</button><button className="map-pin p4">R$ 980</button><div className="map-preview"><span className="preview-tag">PAINEL LED</span><strong>Eixo Monumental</strong><small>Brasília, DF · 6 × 3 m</small><b>R$ 1.200 <small>/ 15 dias</small></b><a href="#inventario">Ver espaço ↗</a></div></div>
            <div className="map-footer"><span><b>86</b> espaços disponíveis</span><span>Atualizado hoje</span></div>
          </div>
        </section>

        <section className="trust-strip"><div className="container trust-inner"><span>PARA QUEM PLANEJA CAMPANHAS</span><div><b>OOH</b> <b>DOOH</b> <b>INDOOR</b> <b>TV</b> <b>RÁDIO</b></div></div></section>

        <section className="section" id="midias"><div className="container"><div className="section-heading"><div><span className="eyebrow">EXPLORE POR FORMATO</span><h2>Encontre a mídia certa<br /><span>para sua campanha.</span></h2></div><p>Do outdoor tradicional ao painel digital. Organize sua busca e compare oportunidades em um só lugar.</p></div><div className="type-grid">{mediaTypes.map((type) => <a className="type-card" href="#inventario" key={type.title}><span className="type-icon">{type.icon}</span><h3>{type.title}</h3><p>{type.text}</p><span className="arrow">↗</span></a>)}</div></div></section>

        <section className="section inventory-section" id="inventario"><div className="container"><div className="section-heading compact"><div><span className="eyebrow">INVENTÁRIO EM DESTAQUE</span><h2>Sua próxima campanha<br /><span>começa no mapa.</span></h2></div><a className="text-link" href="#inventario">Ver todo inventário ↗</a></div><Inventory /></div></section>

        <section className="split-cta container" id="anuncie"><div><span className="eyebrow light">PARA ANUNCIANTES</span><h2>Encontre onde<br /><em>sua marca deve estar.</em></h2><p>Escolha a localização, compare formatos e solicite uma proposta para sua próxima campanha.</p><a className="button button-green" href="#inventario">Explorar inventário ↗</a></div><div className="cta-orbit"><div className="orbit orbit-a" /><div className="orbit orbit-b" /><div className="orbit-label">SUA<br /><b>MARCA</b></div><span className="orbit-pin op1">OOH</span><span className="orbit-pin op2">LED</span><span className="orbit-pin op3">DOOH</span></div></section>

        <section className="owner-section" id="cadastro"><div className="container owner-inner"><div><span className="eyebrow">PARA DONOS DE MÍDIA</span><h2>Tem um espaço<br /><span>publicitário?</span></h2><p>Coloque seu inventário no MídiaMap e encontre novos anunciantes para seus melhores pontos.</p></div><a className="button button-dark" href="mailto:studioalfamktag@bol.com.br?subject=Cadastrar meu espaço no MídiaMap">Cadastrar meu espaço ↗</a></div></section>
      </main>

      <footer className="footer"><div className="container footer-main"><div><a className="brand footer-brand" href="#top">Mídia<span>Map</span></a><p>Toda mídia. Em um só mapa.</p></div><div className="footer-col"><b>PLATAFORMA</b><a href="#inventario">Inventário</a><a href="#midias">Mídias</a><a href="#anuncie">Anuncie</a><a href="#cadastro">Cadastre seu espaço</a></div><div className="footer-col"><b>EMPRESA</b><a href="mailto:studioalfamktag@bol.com.br">Contato</a><a href="#top">Sobre</a><a href="#top">Privacidade</a></div><div className="footer-col"><b>MÍDIAS</b><a href="#inventario">Outdoor</a><a href="#inventario">DOOH</a><a href="#inventario">LED</a><a href="#inventario">Indoor</a></div></div><div className="container footer-bottom"><span>© 2026 MídiaMap. Um produto S.Alfa MKT.</span><span>midiamap.studioalfamkt.online</span></div></footer>
    </>
  );
}

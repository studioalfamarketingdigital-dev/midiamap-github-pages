import Inventory from '../components/Inventory';
import SupplierDirectory from '../components/SupplierDirectory';

const mediaTypes = [
  { icon: '▰', title: 'Outdoor', text: 'Grandes formatos em ruas e avenidas.' },
  { icon: '▦', title: 'Painéis LED', text: 'Mídia digital em pontos estratégicos.' },
  { icon: '◈', title: 'DOOH', text: 'Publicidade digital fora de casa.' },
  { icon: '⌂', title: 'Indoor', text: 'Shoppings, lojas, academias e clínicas.' },
  { icon: '▣', title: 'TV', text: 'Espaços comerciais em televisão.' },
  { icon: '◉', title: 'Rádio', text: 'Publicidade em emissoras e programas.' },
  { icon: '▤', title: 'Revistas e jornais', text: 'Anúncios impressos e publieditoriais.' },
  { icon: '▣', title: 'Planejamento de mídia', text: 'Estratégia, negociação e gestão de campanhas.' },
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
            <a href="#inventario">Inventário</a><a href="#fornecedores">Fornecedores</a><a href="#midias">Mídias</a><a href="#anuncie">Anuncie</a><a href="#cadastro">Cadastre seu espaço</a>
          </nav>
          <div className="nav-actions"><a className="login" href="mailto:studioalfamktag@bol.com.br?subject=Entrar na MídiaMap">Entrar</a><a className="button button-green" href="#anuncie">Quero anunciar</a></div>
        </div>
      </header>

      <main id="top">
        <section className="hero container">
          <div className="hero-copy">
            <span className="eyebrow"><span className="eyebrow-dot" /> MARKETPLACE DE MÍDIA</span>
            <h1>Sua marca.<br /><em>Onde importa.</em></h1>
            <p className="hero-lead">Pesquise veículos, consulte fornecedores e monte campanhas com disponibilidade, localização e preço confirmados antes da contratação.</p>
            <form className="hero-search" action="/#inventario" method="get"><span className="search-icon">⌕</span><input className="hero-search-input" type="search" name="q" placeholder="Digite cidade, bairro ou tipo de mídia" aria-label="Buscar mídia por cidade, bairro ou formato" /><button className="button button-dark" type="submit">Buscar mídia <span>↗</span></button></form>
            <div className="hero-meta"><span>✓ Fornecedores identificados</span><span>✓ Cotação por escrito</span><span>✓ Proposta sob medida</span></div>
          </div>
          <div className="hero-map" aria-label="Mapa ilustrativo de espaços publicitários">
            <div className="map-topline"><span><i className="live-dot" /> PRÉVIA ILUSTRATIVA · NÃO É INVENTÁRIO DISPONÍVEL</span><span className="map-control">− &nbsp; +</span></div>
            <div className="map-grid"><div className="road r1" /><div className="road r2" /><div className="road r3" /><div className="road r4" /><span className="district d1">ASA NORTE</span><span className="district d2">CENTRO</span><span className="district d3">EIXO MONUMENTAL</span><span className="map-pin p1">OOH</span><span className="map-pin p2 active">LED</span><span className="map-pin p3">BUS</span><span className="map-pin p4">INDOOR</span><div className="map-preview"><span className="preview-tag">EXEMPLO DE MÍDIA</span><strong>Localização a confirmar</strong><small>Brasília e Entorno · ficha técnica pendente</small><b>Preço sob consulta</b><a href="#fornecedores">Consultar fornecedores ↗</a></div></div>
            <div className="map-footer"><span><b>Mapa demonstrativo</b> · pontos reais entram após validação</span><span>Dados em prospecção</span></div>
          </div>
        </section>

        <section className="trust-strip"><div className="container trust-inner"><span>PARA QUEM PLANEJA CAMPANHAS</span><div><b>OOH</b> <b>DOOH</b> <b>INDOOR</b> <b>TV</b> <b>RÁDIO</b></div></div></section>

        <section className="section" id="midias"><div className="container"><div className="section-heading"><div><span className="eyebrow">EXPLORE POR FORMATO</span><h2>Encontre a mídia certa<br /><span>para sua campanha.</span></h2></div><p>Do outdoor tradicional à TV, rádio e mídia impressa. Explore formatos e solicite um plano de mídia com apoio da nossa equipe.</p></div><div className="type-grid">{mediaTypes.map((type) => <a className="type-card" href="#inventario" key={type.title}><span className="type-icon">{type.icon}</span><h3>{type.title}</h3><p>{type.text}</p><span className="arrow">↗</span></a>)}</div></div></section>

        <section className="section inventory-section" id="inventario"><div className="container"><div className="section-heading compact"><div><span className="eyebrow">INVENTÁRIO EM DESTAQUE</span><h2>Sua próxima campanha<br /><span>começa no mapa.</span></h2></div><a className="text-link" href="#fornecedores">Ver fornecedores ↗</a></div><Inventory /></div></section>

        <SupplierDirectory />

        <section className="split-cta container" id="anuncie"><div><span className="eyebrow light">PARA ANUNCIANTES</span><h2>Encontre onde<br /><em>sua marca deve estar.</em></h2><p>Conte seu objetivo, região e orçamento. Nossa equipe pesquisa os veículos, consulta disponibilidade e prepara uma proposta de campanha.</p><a className="button button-green" href="#inventario">Explorar inventário ↗</a></div><div className="cta-orbit"><div className="orbit orbit-a" /><div className="orbit orbit-b" /><div className="orbit-label">SUA<br /><b>MARCA</b></div><span className="orbit-pin op1">OOH</span><span className="orbit-pin op2">LED</span><span className="orbit-pin op3">DOOH</span></div></section>

        <section className="owner-section" id="cadastro"><div className="container owner-inner"><div><span className="eyebrow">PARA DONOS DE MÍDIA</span><h2>Tem um espaço<br /><span>publicitário?</span></h2><p>É proprietário ou representante de um veículo? Apresente seus formatos, praças, tabela comercial e dados de audiência para entrar na nossa base de fornecedores.</p></div><a className="button button-dark" href="mailto:studioalfamktag@bol.com.br?subject=Cadastro de veículo de mídia no MídiaMap&body=Olá! Quero cadastrar meu veículo de mídia na base da MídiaMap.\n\nNome do veículo/empresa:\nCidade/UF:\nFormatos disponíveis:\nContato comercial:\nTabela e mídia kit (anexar):">Quero ser fornecedor ↗</a></div></section>
      </main>

      <footer className="footer"><div className="container footer-main"><div><a className="brand footer-brand" href="#top">Mídia<span>Map</span></a><p>Planejamento, negociação e oportunidades de mídia em um só lugar.</p></div><div className="footer-col"><b>PLATAFORMA</b><a href="#inventario">Inventário</a><a href="#midias">Mídias</a><a href="#anuncie">Anuncie</a><a href="#cadastro">Cadastre seu espaço</a></div><div className="footer-col"><b>EMPRESA</b><a href="mailto:studioalfamktag@bol.com.br">Contato</a><a href="#top">Sobre</a><a href="#top">Privacidade</a></div><div className="footer-col"><b>MÍDIAS</b><a href="#inventario">Outdoor</a><a href="#inventario">DOOH</a><a href="#inventario">LED</a><a href="#inventario">Indoor</a></div></div><div className="container footer-bottom"><span>© 2026 MídiaMap. Um produto S.Alfa MKT.</span><span>midiamap.studioalfamkt.online</span></div></footer>
    </>
  );
}

import Inventory from '../components/Inventory';
import ProgrammaticAI from '../components/ProgrammaticAI';

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
      <main id="top">
        <section className="hero container">
          <div className="hero-copy">
            <span className="eyebrow"><span className="eyebrow-dot" /> MARKETPLACE DE MÍDIA</span>
            <h1>Sua marca.<br /><em>Onde importa.</em></h1>
            <p className="hero-lead">MídiaMap é um marketplace de mídia OOH e DOOH operado pela Studio Alfa MKT, que atende Brasília, Goiânia, Luziânia e entorno. Encontre espaços de mídia, compare formatos e solicite uma cotação.</p>
            <form className="hero-search" action="/#inventario" method="get"><span className="search-icon">⌕</span><input className="hero-search-input" type="search" name="q" placeholder="Digite cidade, bairro ou tipo de mídia" aria-label="Buscar mídia por cidade, bairro ou formato" /><button className="button button-dark" type="submit">Buscar mídia <span>↗</span></button></form>
            <div className="hero-meta"><span>✓ Fornecedores identificados</span><span>✓ Cotação por escrito</span><span>✓ Proposta sob medida</span></div>
          </div>
          <div className="hero-visual"><div className="hero-visual-orbit"><span>OOH</span><span>DOOH</span><span>LED</span><b>Mídia<br/>em todo<br/>lugar.</b></div></div>
        </section>

        <section className="trust-strip"><div className="container trust-inner"><span>PARA QUEM PLANEJA CAMPANHAS</span><div><b>OOH</b> <b>DOOH</b> <b>INDOOR</b> <b>TV</b> <b>RÁDIO</b></div></div></section>

        <section className="channel-band" aria-label="Canais e plataformas de mídia">
          <div className="container">
            <div className="channel-band-heading">
              <span className="eyebrow">MÍDIA EM MÚLTIPLAS TELAS</span>
              <p>Planeje campanhas em diferentes canais e plataformas.</p>
            </div>
            <div className="channel-slider" aria-label="Marcas de canais e plataformas">
              <div className="channel-track">
                <div className="channel-set">
              <div className="channel-logo" aria-label="TV Globo"><img src="https://commons.wikimedia.org/wiki/Special:FilePath/TV_Globo_logo_(April_2025).svg" alt="TV Globo" /></div>
              <div className="channel-logo" aria-label="SBT"><img src="https://commons.wikimedia.org/wiki/Special:FilePath/Logotipo_do_SBT_(2025).png" alt="SBT" /></div>
              <div className="channel-logo" aria-label="Record"><img src="https://commons.wikimedia.org/wiki/Special:FilePath/Logomarca_da_Record_(2023).webp" alt="Record" /></div>
              <div className="channel-logo netflix" aria-label="Netflix"><img src="https://commons.wikimedia.org/wiki/Special:FilePath/Netflix_Logomark.png" alt="Netflix" /></div>
              <div className="channel-logo spotify" aria-label="Spotify"><img src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Full_Logo_RGB_Green.png" alt="Spotify" /></div>
              <div className="channel-logo radio" aria-label="Rádio FM"><span className="radio-mark">FM</span><b>RÁDIO</b></div>
                </div>
                <div className="channel-set" aria-hidden="true">
              <div className="channel-logo" aria-label="TV Globo"><img src="https://commons.wikimedia.org/wiki/Special:FilePath/TV_Globo_logo_(April_2025).svg" alt="" /></div>
              <div className="channel-logo" aria-label="SBT"><img src="https://commons.wikimedia.org/wiki/Special:FilePath/Logotipo_do_SBT_(2025).png" alt="" /></div>
              <div className="channel-logo" aria-label="Record"><img src="https://commons.wikimedia.org/wiki/Special:FilePath/Logomarca_da_Record_(2023).webp" alt="" /></div>
              <div className="channel-logo netflix" aria-label="Netflix"><img src="https://commons.wikimedia.org/wiki/Special:FilePath/Netflix_Logomark.png" alt="" /></div>
              <div className="channel-logo spotify" aria-label="Spotify"><img src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Full_Logo_RGB_Green.png" alt="" /></div>
              <div className="channel-logo radio" aria-label="Rádio FM"><span className="radio-mark">FM</span><b>RÁDIO</b></div>
                </div>
              </div>
            </div>
            <small className="channel-disclaimer">Marcas exibidas apenas como referência de canais e plataformas. Não indicam parceria, afiliação ou representação comercial.</small>
          </div>
        </section>

        <section className="section" id="midias"><div className="container"><div className="section-heading"><div><span className="eyebrow">EXPLORE POR FORMATO</span><h2>Encontre a mídia certa<br /><span>para sua campanha.</span></h2></div><p>Do outdoor tradicional à TV, rádio e mídia impressa. Explore formatos e solicite um plano de mídia com apoio da nossa equipe.</p></div><div className="type-grid">{mediaTypes.map((type) => <a className="type-card" href="#inventario" key={type.title}><span className="type-icon">{type.icon}</span><h3>{type.title}</h3><p>{type.text}</p><span className="arrow">↗</span></a>)}</div></div></section>

        <section className="section inventory-section" id="inventario"><div className="container"><div className="section-heading compact"><div><span className="eyebrow">INVENTÁRIO EM DESTAQUE</span><h2>Sua próxima campanha<br /><span>começa no mapa.</span></h2></div><span className="text-link">Espaços e formatos</span></div><Inventory /></div></section>


        <section className="split-cta container" id="anuncie"><div><span className="eyebrow light">PARA ANUNCIANTES</span><h2>Encontre onde<br /><em>sua marca deve estar.</em></h2><p>Conte seu objetivo, região e orçamento. Nossa equipe pesquisa opções, consulta disponibilidade e prepara uma proposta de campanha.</p><a className="button button-green" href="#inventario">Explorar inventário ↗</a></div><div className="cta-orbit"><div className="orbit orbit-a" /><div className="orbit orbit-b" /><div className="orbit-label">SUA<br /><b>MARCA</b></div><span className="orbit-pin op1">OOH</span><span className="orbit-pin op2">LED</span><span className="orbit-pin op3">DOOH</span></div></section>

        <section className="programmatic-section" id="programatica"><div className="container"><ProgrammaticAI /></div></section>

        <section className="owner-section" id="cadastro"><div className="container owner-inner"><div><span className="eyebrow">PARA DONOS DE MÍDIA</span><h2>Tem um espaço<br /><span>publicitário?</span></h2><p>É proprietário ou representante de um veículo? Apresente seus formatos, praças, tabela comercial e dados de audiência para nossa equipe avaliar uma parceria.</p></div><a className="button button-dark" href="mailto:studioalfamktag@bol.com.br?subject=Cadastro de veículo de mídia no MídiaMap&body=Olá! Quero cadastrar meu veículo de mídia na base da MídiaMap.\n\nNome do veículo/empresa:\nCidade/UF:\nFormatos disponíveis:\nContato comercial:\nTabela e mídia kit (anexar):">Quero ser fornecedor ↗</a></div></section>
      </main>

    </>
  );
}

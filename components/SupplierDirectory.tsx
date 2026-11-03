const suppliers = [
  {
    name: 'Grupo Brasil Mídia',
    category: 'OOH / DOOH / mobiliário urbano',
    region: 'Brasília e Entorno',
    formats: 'Frontlight, empena, minifront, outdoor, LED, busdoor, indoor e totens.',
    proof: 'O catálogo público exibe 356 mídias. Pontos identificados: REF 104, empena iluminada 11 × 6,7 m na Avenida Castanheiras, em frente à CIA Toy, Águas Claras (−15.835408, −48.018370); e REF 823, painel LED 9 × 3 m, vídeo de 10 s, na Avenida Rio Verde com Av. José Leandro da Cruz, Setor Jardim Luz, Goiânia (−16.741490, −49.275378). Preço e disponibilidade sob confirmação do operador.',
    contact: '61 3034-6523 · gbmpublicidade@gmail.com',
    href: 'https://grupobrasilmidia.com.br/midias/104',
    action: 'Ver ficha real do ponto REF 104',
    tag: 'Catálogo público'
  },
  {
    name: 'PH Painéis',
    category: 'Outdoor / frontlight / mobiliário urbano',
    region: 'DF e Entorno',
    formats: 'Outdoor, frontlight e mobiliário urbano. Catálogo com busca por código, endereço e região.',
    proof: 'A página pública está no ar, mas na consulta atual exibia zero pontos disponíveis. Tratar como fornecedor para prospecção e solicitar a planilha atualizada antes de oferecer qualquer local.',
    contact: '61 98521-5778 · ph.outdoor@gmail.com',
    href: 'https://phpaineis.com.br/',
    action: 'Consultar pontos e orçamento',
    tag: 'Catálogo público'
  },
  {
    name: 'All Channel',
    category: 'Busdoor / mídia em ônibus',
    region: 'Brasília e Goiânia',
    formats: 'Busdoor, backbus, zebrinha, busindoor, painel do motorista e frontlight.',
    proof: 'A empresa declara operação no DF e em Goiás e informa frota de mais de 2.500 ônibus em seu material institucional.',
    contact: '(61) 3362-0095 · (62) 3996-1998',
    href: 'https://www.allchannel.com.br/p1499.aspx',
    action: 'Consultar itinerários e tabela',
    tag: 'Fornecedor identificado'
  },
  {
    name: 'Mídia Fácil',
    category: 'OOH / DOOH / indoor',
    region: 'Distrito Federal',
    formats: 'Busdoor, backbus, frontlight, LED, empenas, metrô e circuito indoor.',
    proof: 'O site apresenta portfólio regional e contato comercial direto.',
    contact: '(61) 99233-9610 · midiafacil@gmail.com',
    href: 'https://www.midiafacildf.com.br/',
    action: 'Ver formatos e solicitar mídia kit',
    tag: 'Fornecedor identificado'
  },
  {
    name: 'Rede MOBTV',
    category: 'TV indoor / telas digitais',
    region: 'Brasília',
    formats: 'Publicidade em telas digitais; o anunciante pode escolher Brasília, telas, datas e orçamento pela plataforma.',
    proof: 'O site descreve um fluxo de compra digital com escolha de telas e cálculo do investimento.',
    contact: '(61) 3551-9886 · (61) 99259-0234 · comercial@mobtv.tv.br',
    href: 'https://mobtv.tv.br/anuncie.html',
    action: 'Consultar telas e valores',
    tag: 'Compra digital'
  },
  {
    name: 'TV Brasília / Correio Braziliense',
    category: 'TV / mídia regional',
    region: 'Distrito Federal',
    formats: 'Publicidade na TV Brasília e produtos do grupo Correio Braziliense.',
    proof: 'O portal oficial mantém página de tabela de preços e contato comercial regional.',
    contact: '(61) 3214-1339 · WhatsApp (61) 99555-2585 · comercial.df@dabr.com.br',
    href: 'https://www.correiobraziliense.com.br/tabeladeprecos',
    action: 'Consultar tabela comercial',
    tag: 'Tabela pública'
  },
  {
    name: 'Liga FM 101.7',
    category: 'Rádio',
    region: 'Brasília',
    formats: 'Spots, patrocínio de programas, promoções com ouvintes e presença digital.',
    proof: 'A página oficial oferece atendimento comercial para montar plano por objetivo e praça.',
    contact: 'saa@ligafm.com.br · WhatsApp comercial disponível no site',
    href: 'https://brasilia.ligafm.com.br/',
    action: 'Solicitar mídia kit e tabela',
    tag: 'Comercial direto'
  },
  {
    name: 'Plano FM',
    category: 'Rádio',
    region: 'Distrito Federal',
    formats: 'Spots, testemunhais, patrocínio de programas, promoções e flashes ao vivo.',
    proof: 'A emissora informa cobertura regional no DF e disponibiliza contato comercial.',
    contact: '(61) 9650-0965 · comercial@planofm.com',
    href: 'https://planofm.com/conheca/',
    action: 'Solicitar mídia kit e tabela',
    tag: 'Comercial direto'
  },
  {
    name: 'Jornal de Brasília',
    category: 'Jornal / portal digital',
    region: 'Brasília',
    formats: 'Anúncios no impresso e no portal, além de formatos comerciais digitais.',
    proof: 'A página oficial reúne produtos do grupo, incluindo TV Brasília, Clube FM e CB.DOoh, com links para tabelas comerciais; solicitar a versão vigente ao comercial.',
    contact: '(61) 99688-2400 · comercial@grupojbr.com',
    href: 'https://jornaldebrasilia.com.br/anuncie/',
    action: 'Solicitar mídia kit 2026',
    tag: 'Mídia kit 2026'
  }
];

export default function SupplierDirectory() {
  return (
    <section className="supplier-section" id="fornecedores">
      <div className="container">
        <div className="section-heading supplier-heading">
          <div>
            <span className="eyebrow">REDE DE FORNECEDORES EM PROSPECÇÃO</span>
            <h2>Encontre o veículo.<br /><span>Negocie com dados reais.</span></h2>
          </div>
          <p>Empresas e veículos com catálogo, portfólio ou canal comercial público. A MídiaMap está levantando tabelas, endereços dos ativos, disponibilidade e condições para transformar essas referências em inventário consultável.</p>
        </div>
        <div className="supplier-notice">
          <strong>Transparência:</strong> estes são fornecedores identificados publicamente, não parceiros formalmente contratados. Os números de pontos são os divulgados pelos próprios sites. Nenhuma reserva ou preço está confirmado pela MídiaMap até recebermos retorno comercial por escrito.
        </div>
        <div className="supplier-grid">
          {suppliers.map((supplier) => (
            <article className="supplier-card" key={supplier.name}>
              <div className="supplier-card-top"><span className="supplier-tag">{supplier.tag}</span><span className="supplier-region">{supplier.region}</span></div>
              <span className="supplier-category">{supplier.category}</span>
              <h3>{supplier.name}</h3>
              <p>{supplier.formats}</p>
              <div className="supplier-proof">{supplier.proof}</div>
              <div className="supplier-contact">{supplier.contact}</div>
              <a href={supplier.href} target="_blank" rel="noopener noreferrer">{supplier.action} ↗</a>
            </article>
          ))}
        </div>
        <p className="supplier-footnote">Próxima etapa operacional: solicitar mídia kit, tabela vigente, planilha de pontos com endereço e coordenadas, fotos de comprovação, formatos, período mínimo, disponibilidade e política de comissão/agenciamento.</p>
      </div>
    </section>
  );
}

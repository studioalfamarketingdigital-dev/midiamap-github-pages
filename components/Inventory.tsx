'use client';

import { FormEvent, useMemo, useState } from 'react';
import { brl, formats, spaces, type Space } from '../lib/spaces';
import RealMap from './RealMap';

const normalize = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
const teamEmail = 'studioalfamktag@bol.com.br';

type Lead = { name: string; company: string; whatsapp: string; email: string; campaign: string; period: string; budget: string; message: string };
const initialLead: Lead = { name: '', company: '', whatsapp: '', email: '', campaign: '', period: '30 dias', budget: '', message: '' };

export default function Inventory() {
  const [query, setQuery] = useState('');
  const [format, setFormat] = useState('Todos');
  const [maxPrice, setMaxPrice] = useState('Todos');
  const [active, setActive] = useState(spaces[0]?.id ?? null);
  const [selectedForProposal, setSelectedForProposal] = useState<Space | null>(null);
  const [lead, setLead] = useState<Lead>(initialLead);
  const [step, setStep] = useState<1 | 2>(1);
  const [submitted, setSubmitted] = useState(false);
  const filtered = useMemo(() => spaces.filter((space) => {
    const matchesQuery = normalize(`${space.city} ${space.place} ${space.format}`).includes(normalize(query.trim()));
    const matchesFormat = format === 'Todos' || space.format === format;
    const matchesPrice = maxPrice === 'Todos' || (maxPrice === '500' ? space.price <= 500 : maxPrice === '1000' ? space.price <= 1000 : space.price > 1000);
    return matchesQuery && matchesFormat && matchesPrice;
  }), [query, format, maxPrice]);
  const selected = filtered.find((space) => space.id === active) ?? filtered[0] ?? null;
  const clearFilters = () => { setQuery(''); setFormat('Todos'); setMaxPrice('Todos'); setActive(spaces[0]?.id ?? null); };
  const openProposal = (space: Space) => { setSelectedForProposal(space); setStep(1); setSubmitted(false); setLead(initialLead); };
  const closeProposal = () => setSelectedForProposal(null);
  const updateLead = (field: keyof Lead, value: string) => setLead((current) => ({ ...current, [field]: value }));
  const goToReview = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setStep(2); };
  const submitProposal = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedForProposal) return;
    const subject = `Novo atendimento MídiaMap — ${selectedForProposal.title}`;
    const body = [`Olá, equipe MídiaMap! Quero receber atendimento para esta mídia:`, ``, `Mídia: ${selectedForProposal.title}`, `Valor de referência: ${brl(selectedForProposal.price)} / ${selectedForProposal.days} dias`, ``, `Nome: ${lead.name}`, `Empresa: ${lead.company}`, `WhatsApp: ${lead.whatsapp}`, `E-mail: ${lead.email}`, `Campanha: ${lead.campaign}`, `Período desejado: ${lead.period}`, `Orçamento: ${lead.budget || 'A definir'}`, `Observações: ${lead.message || 'Nenhuma'}`].join('\n');
    window.location.href = `mailto:${teamEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  };

  return <div className="inventory-shell">
    <div className="filter-bar"><div className="filter-search"><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Busque por cidade, bairro ou tipo de mídia" aria-label="Buscar no inventário" /></div><select value={format} onChange={(event) => setFormat(event.target.value)} aria-label="Filtrar por formato"><option>Todos</option>{formats.map((item) => <option key={item}>{item}</option>)}</select><select value={maxPrice} onChange={(event) => setMaxPrice(event.target.value)} aria-label="Filtrar por preço"><option value="Todos">Qualquer preço</option><option value="500">Até R$ 500</option><option value="1000">Até R$ 1.000</option><option value="above">Acima de R$ 1.000</option></select></div>
    <div className="inventory-count"><span><b>{filtered.length}</b> espaços encontrados</span><span>Mapa real · OpenStreetMap <button onClick={clearFilters}>Limpar filtros</button></span></div>
    <div className="inventory-layout"><div className="inventory-map"><RealMap spaces={filtered} selectedId={selected?.id ?? null} onSelect={setActive} /><div className="map-caption"><span><i className="legend-dot" /> Espaços disponíveis</span><span>Arraste para explorar · clique em um pin</span></div></div><div className="inventory-list">{filtered.length === 0 ? <div className="empty-state"><span>⌕</span><h3>Nenhuma mídia encontrada</h3><p>Experimente ampliar sua região ou remover alguns filtros.</p><button className="button button-dark" onClick={clearFilters}>Limpar busca</button></div> : filtered.map((space) => <article className={`media-card ${selected?.id === space.id ? 'selected' : ''}`} key={space.id} onMouseEnter={() => setActive(space.id)} onClick={() => setActive(space.id)}><div className={`media-art art-${space.type}`}><span>{space.badge}</span><strong>{space.artLabel}</strong></div><div className="media-content"><div className="media-top"><span className="format-tag">{space.format}</span><span className="available">● Disponível</span></div><h3>{space.title}</h3><p className="location">⌖ {space.place}, {space.city} — {space.state}</p><div className="media-specs"><span>▣ {space.dimension}</span><span>◷ {space.days} dias</span></div><div className="media-bottom"><div><small>A partir de</small><strong>{brl(space.price)}</strong></div><button className="button button-dark small-button" onClick={(event) => { event.stopPropagation(); openProposal(space); }}>Solicitar proposta ↗</button></div></div></article>)}</div></div>
    {selectedForProposal && <div className="proposal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) closeProposal(); }}><section className="proposal-modal" role="dialog" aria-modal="true" aria-labelledby="proposal-title"><button className="proposal-close" onClick={closeProposal} aria-label="Fechar atendimento">×</button>{submitted ? <div className="proposal-success"><div className="success-mark">✓</div><span className="eyebrow">SOLICITAÇÃO PREPARADA</span><h2>Recebemos seu pedido.</h2><p>Seu aplicativo de e-mail deve abrir com os dados da campanha. Nossa equipe vai analisar a mídia e entrar em contato para confirmar disponibilidade, condições e finalizar a compra com você.</p><button className="button button-dark" onClick={closeProposal}>Voltar ao inventário</button></div> : <><div className="proposal-head"><span className="eyebrow">ATENDIMENTO CONSULTIVO · {step}/2</span><h2 id="proposal-title">Vamos montar sua campanha.</h2><p>Você escolheu <b>{selectedForProposal.title}</b>. Conte um pouco sobre a sua necessidade e nossa equipe cuida do próximo passo.</p></div>{step === 1 ? <form onSubmit={goToReview} className="proposal-form"><div className="form-grid"><label>Seu nome<input required value={lead.name} onChange={(event) => updateLead('name', event.target.value)} placeholder="Como podemos te chamar?" /></label><label>Empresa<input required value={lead.company} onChange={(event) => updateLead('company', event.target.value)} placeholder="Nome da empresa" /></label><label>WhatsApp<input required type="tel" value={lead.whatsapp} onChange={(event) => updateLead('whatsapp', event.target.value)} placeholder="(00) 00000-0000" /></label><label>E-mail<input required type="email" value={lead.email} onChange={(event) => updateLead('email', event.target.value)} placeholder="voce@empresa.com" /></label><label>Objetivo da campanha<select required value={lead.campaign} onChange={(event) => updateLead('campaign', event.target.value)}><option value="">Selecione uma opção</option><option>Divulgação de marca</option><option>Promoção ou lançamento</option><option>Evento</option><option>Campanha institucional</option><option>Outro objetivo</option></select></label><label>Período desejado<select value={lead.period} onChange={(event) => updateLead('period', event.target.value)}><option>7 dias</option><option>15 dias</option><option>30 dias</option><option>Período personalizado</option></select></label></div><label>Faixa de investimento<input value={lead.budget} onChange={(event) => updateLead('budget', event.target.value)} placeholder="Ex.: até R$ 2.000" /></label><label>Como podemos ajudar?<textarea value={lead.message} onChange={(event) => updateLead('message', event.target.value)} placeholder="Conte sobre a campanha, público ou região que deseja alcançar." rows={3} /></label><button className="button button-green proposal-next" type="submit">Revisar solicitação <span>→</span></button><small className="privacy-note">Seus dados serão usados apenas para o atendimento da sua campanha.</small></form> : <form onSubmit={submitProposal} className="proposal-review"><div className="review-media"><span className="format-tag">{selectedForProposal.format}</span><strong>{selectedForProposal.title}</strong><span>{selectedForProposal.city}, {selectedForProposal.state} · referência de {brl(selectedForProposal.price)} / {selectedForProposal.days} dias</span></div><div className="review-grid"><span><small>Contato</small>{lead.name}<br />{lead.company}</span><span><small>Retorno</small>{lead.whatsapp}<br />{lead.email}</span><span><small>Campanha</small>{lead.campaign}<br />{lead.period}</span><span><small>Investimento</small>{lead.budget || 'A definir'}</span></div><div className="review-actions"><button type="button" className="button button-light" onClick={() => setStep(1)}>Editar dados</button><button type="submit" className="button button-green">Enviar e finalizar atendimento ↗</button></div><small className="privacy-note">Ao enviar, abriremos seu e-mail com o resumo para a equipe MídiaMap.</small></form>}</>}</section></div>}
  </div>;
}

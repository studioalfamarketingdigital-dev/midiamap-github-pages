'use client';

import { useMemo, useState } from 'react';
import { brl, formats, spaces } from '../lib/spaces';

const normalize = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
const mail = (space: string) => `mailto:studioalfamktag@bol.com.br?subject=${encodeURIComponent(`Solicitar proposta — ${space}`)}`;

export default function Inventory() {
  const [query, setQuery] = useState('');
  const [format, setFormat] = useState('Todos');
  const [maxPrice, setMaxPrice] = useState('Todos');
  const [active, setActive] = useState(spaces[0]?.id ?? null);
  const filtered = useMemo(() => spaces.filter((space) => {
    const matchesQuery = normalize(`${space.city} ${space.place} ${space.format}`).includes(normalize(query.trim()));
    const matchesFormat = format === 'Todos' || space.format === format;
    const matchesPrice = maxPrice === 'Todos' || (maxPrice === '500' ? space.price <= 500 : maxPrice === '1000' ? space.price <= 1000 : space.price > 1000);
    return matchesQuery && matchesFormat && matchesPrice;
  }), [query, format, maxPrice]);
  const selected = filtered.find((space) => space.id === active) ?? filtered[0];

  return <div className="inventory-shell">
    <div className="filter-bar"><div className="filter-search"><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Busque por cidade, bairro ou tipo de mídia" aria-label="Buscar no inventário" /></div><select value={format} onChange={(event) => setFormat(event.target.value)} aria-label="Filtrar por formato"><option>Todos</option>{formats.map((item) => <option key={item}>{item}</option>)}</select><select value={maxPrice} onChange={(event) => setMaxPrice(event.target.value)} aria-label="Filtrar por preço"><option value="Todos">Qualquer preço</option><option value="500">Até R$ 500</option><option value="1000">Até R$ 1.000</option><option value="above">Acima de R$ 1.000</option></select></div>
    <div className="inventory-count"><span><b>{filtered.length}</b> espaços encontrados</span><span>Valores de demonstração · <button onClick={() => { setQuery(''); setFormat('Todos'); setMaxPrice('Todos'); }}>Limpar filtros</button></span></div>
    <div className="inventory-layout"><div className="inventory-map"><div className="map-grid map-grid-light"><div className="road r1" /><div className="road r2" /><div className="road r3" /><div className="road r4" /><span className="district d1">BRASÍLIA</span><span className="district d2">LUZIÂNIA</span>{filtered.map((space) => <button key={space.id} className={`map-pin small ${selected?.id === space.id ? 'active' : ''}`} style={{ left: `${space.x}%`, top: `${space.y}%` }} onClick={() => setActive(space.id)} aria-label={`Selecionar ${space.format} em ${space.place}`}>{brl(space.price)}</button>)}{selected && <div className="map-tooltip"><span className="preview-tag">{selected.format.toUpperCase()}</span><strong>{selected.place}</strong><small>{selected.city}, {selected.state} · {selected.dimension}</small><b>{brl(selected.price)} <small>/ {selected.days} dias</small></b></div>}<div className="map-legend"><span><i className="legend-dot" /> Disponível</span><span><i className="legend-dot selected" /> Selecionado</span></div></div></div><div className="inventory-list">{filtered.length === 0 ? <div className="empty-state"><span>⌕</span><h3>Nenhuma mídia encontrada</h3><p>Experimente ampliar sua região ou remover alguns filtros.</p><button className="button button-dark" onClick={() => { setQuery(''); setFormat('Todos'); setMaxPrice('Todos'); }}>Limpar busca</button></div> : filtered.map((space) => <article className={`media-card ${selected?.id === space.id ? 'selected' : ''}`} key={space.id} onMouseEnter={() => setActive(space.id)}><div className={`media-art art-${space.type}`}><span>{space.badge}</span><strong>{space.artLabel}</strong></div><div className="media-content"><div className="media-top"><span className="format-tag">{space.format}</span><span className="available">● Disponível</span></div><h3>{space.title}</h3><p className="location">⌖ {space.place}, {space.city} — {space.state}</p><div className="media-specs"><span>▣ {space.dimension}</span><span>◷ {space.days} dias</span></div><div className="media-bottom"><div><small>A partir de</small><strong>{brl(space.price)}</strong></div><a className="button button-dark small-button" href={mail(space.title)}>Ver espaço ↗</a></div></div></article>)}</div></div>
  </div>;
}

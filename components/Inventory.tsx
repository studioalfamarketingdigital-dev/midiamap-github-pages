'use client';
import { useMemo, useState } from 'react';
import { brl, formats, spaces } from '../lib/spaces';

const norm = (s: string) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
const mail = (subject: string) => `mailto:studioalfamktag@bol.com.br?subject=${encodeURIComponent(subject)}`;

export default function Inventory() {
  const [q, setQ] = useState('');
  const [format, setFormat] = useState('Todos');
  const [active, setActive] = useState<string | null>(null);

  const list = useMemo(
    () => spaces.filter((s) => (format === 'Todos' || s.format === format) && norm(`${s.city} ${s.place}`).includes(norm(q.trim()))),
    [q, format],
  );

  return (
    <>
      <div className="search">
        <input className="input" aria-label="Cidade, bairro ou localização" placeholder="Cidade, bairro ou localização" value={q} onChange={(e) => setQ(e.target.value)} />
        <select className="input" aria-label="Formato" value={format} onChange={(e) => setFormat(e.target.value)}>
          <option>Todos</option>
          {formats.map((f) => <option key={f}>{f}</option>)}
        </select>
        <button className="btn" type="button" onClick={() => { setQ(''); setFormat('Todos'); setActive(null); }}>Limpar</button>
      </div>
      <p className="count" aria-live="polite">{list.length} {list.length === 1 ? 'espaço encontrado' : 'espaços encontrados'} · valores de exemplo</p>

      <div className="finder">
        <div className="map finder-map" role="group" aria-label="Mapa com os espaços encontrados">
          {list.map((s) => (
            <button key={s.id} type="button" className={`pin${active === s.id ? ' on' : ''}`} style={{ left: `${s.x}%`, top: `${s.y}%` }}
              aria-label={`${s.format} em ${s.place}, ${s.city}`} aria-pressed={active === s.id} onClick={() => setActive(s.id)} />
          ))}
        </div>
        <div className="results">
          {list.length === 0 && (
            <div className="card empty">
              <h3>Nenhum espaço com esses filtros</h3>
              <p>Limpe a busca ou conte o que você procura e a equipe monta uma proposta sob medida.</p>
              <a className="btn dark" href={mail('Mídia sob medida na MídiaMap')}>Pedir mídia sob medida</a>
            </div>
          )}
          {list.map((s) => (
            <article key={s.id} className={`card space${active === s.id ? ' on' : ''}`} onMouseEnter={() => setActive(s.id)}>
              <div>
                <span className="tag">{s.format}</span>
                <h3>{s.city} • {s.place}</h3>
                <div className="price">{brl(s.price)} <small>/ {s.days} dias</small></div>
              </div>
              <a className="btn dark" href={mail(`Proposta: ${s.format} em ${s.place}, ${s.city}`)}>Pedir proposta</a>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}

'use client';

import { FormEvent, useState } from 'react';

type Brief = { brand: string; business: string; objective: string; location: string; audience: string; budget: string; period: string; offer: string; format: string; tone: string };
const initial: Brief = { brand: '', business: '', objective: 'Gerar vendas e leads', location: '', audience: '', budget: '', period: '30 dias', offer: '', format: 'Feed 1:1', tone: 'Moderno e direto' };

export default function ProgrammaticAI() {
  const [brief, setBrief] = useState<Brief>(initial);
  const [mode, setMode] = useState<'plan' | 'image'>('plan');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState('');
  const update = (key: keyof Brief, value: string) => setBrief((current) => ({ ...current, [key]: value }));

  async function generate(event: FormEvent) {
    event.preventDefault();
    setLoading(true); setError(''); setResult(''); setImage('');
    try {
      const response = await fetch('/api/programmatic-ai', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ mode, brief }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Não foi possível gerar agora. Tente novamente.');
      if (mode === 'image') setImage(data.image);
      else setResult(data.text);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Falha ao conectar com a IA.');
    } finally { setLoading(false); }
  }

  return <div className="programmatic-ai">
    <div className="programmatic-ai-intro">
      <div><span className="ai-chip">✦ MÍDIAMAP AI</span><h3>Do briefing à campanha.<br /><em>Crie com inteligência artificial.</em></h3><p>Descreva sua empresa e o objetivo. A IA prepara um plano de mídia ou cria um conceito visual para sua campanha.</p></div>
      <div className="ai-orb"><span>AI</span><i>✦</i></div>
    </div>
    <form className="ai-brief-form" onSubmit={generate}>
      <div className="ai-mode-tabs"><button type="button" className={mode === 'plan' ? 'active' : ''} onClick={() => setMode('plan')}>✦ Planejar campanha</button><button type="button" className={mode === 'image' ? 'active' : ''} onClick={() => setMode('image')}>▧ Criar peça visual</button></div>
      <div className="ai-fields">
        <label>Marca / empresa<input required value={brief.brand} onChange={e => update('brand', e.target.value)} placeholder="Ex.: Loja Central" maxLength={90}/></label>
        <label>Segmento<input required value={brief.business} onChange={e => update('business', e.target.value)} placeholder="Ex.: varejo, saúde, alimentação" maxLength={120}/></label>
        <label>Objetivo<select value={brief.objective} onChange={e => update('objective', e.target.value)}><option>Gerar vendas e leads</option><option>Reconhecimento de marca</option><option>Divulgar uma inauguração</option><option>Promover produto ou serviço</option><option>Gerar visitas à loja</option><option>Fortalecer presença regional</option></select></label>
        <label>Região da campanha<input required value={brief.location} onChange={e => update('location', e.target.value)} placeholder="Ex.: Luziânia e Brasília" maxLength={120}/></label>
        <label>Público-alvo<input value={brief.audience} onChange={e => update('audience', e.target.value)} placeholder="Ex.: adultos, famílias, empresários" maxLength={180}/></label>
        <label>Orçamento estimado<input value={brief.budget} onChange={e => update('budget', e.target.value)} placeholder="Ex.: R$ 2.000" maxLength={50}/></label>
        <label>Período<select value={brief.period} onChange={e => update('period', e.target.value)}><option>7 dias</option><option>15 dias</option><option>30 dias</option><option>60 dias</option><option>90 dias</option></select></label>
        <label>Formato da peça<select value={brief.format} onChange={e => update('format', e.target.value)}><option>Feed 1:1</option><option>Story 9:16</option><option>Banner horizontal 16:9</option><option>Display 300x250</option><option>Outdoor horizontal</option><option>Conceito visual livre</option></select></label>
        <label className="ai-field-wide">Oferta / mensagem principal<textarea value={brief.offer} onChange={e => update('offer', e.target.value)} placeholder="O que precisa ser divulgado? Informe produto, benefício, preço e condições, se houver." maxLength={500}/></label>
        <label className="ai-field-wide">Estilo visual<select value={brief.tone} onChange={e => update('tone', e.target.value)}><option>Moderno e direto</option><option>Premium e sofisticado</option><option>Popular e promocional</option><option>Minimalista</option><option>Urbano e ousado</option><option>Institucional e confiável</option></select></label>
      </div>
      <button className="button button-green ai-generate" type="submit" disabled={loading}>{loading ? <><span className="ai-spinner"/> Criando com IA...</> : mode === 'plan' ? 'Gerar planejamento de campanha ✦' : 'Gerar peça publicitária ✦'}</button>
    </form>
    {error && <div className="ai-error" role="alert">{error}</div>}
    {loading && <div className="ai-loading-note">A IA está trabalhando. A geração de imagens pode levar alguns instantes.</div>}
    {result && <section className="ai-result"><div className="ai-result-head"><span className="ai-chip">PLANEJAMENTO GERADO</span><button type="button" onClick={() => navigator.clipboard?.writeText(result)}>Copiar texto</button></div><pre>{result}</pre></section>}
    {image && <section className="ai-result ai-image-result"><div className="ai-result-head"><span className="ai-chip">PEÇA VISUAL GERADA</span><a href={image} target="_blank" rel="noreferrer">Abrir imagem ↗</a></div><img src={image} alt="Peça publicitária criada pela MídiaMap AI"/><p>Conceito visual gerado por IA. Revise textos, preços, marcas e informações antes de publicar.</p></section>}
    <small className="ai-disclaimer">Os resultados são sugestões geradas por IA, não garantem desempenho, alcance ou disponibilidade de inventário. Revise a estratégia e as peças antes da veiculação. A geração depende de créditos e limites do provedor de IA.</small>
  </div>;
}

'use client';

import { FormEvent, useState } from 'react';

type Brief = { brand: string; business: string; objective: string; location: string; audience: string; budget: string; period: string; offer: string; format: string; tone: string };
const initial: Brief = { brand: '', business: '', objective: 'Gerar vendas e leads', location: '', audience: '', budget: '', period: '30 dias', offer: '', format: 'Feed 1:1', tone: 'Moderno e direto' };

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char] || char);
}

export default function ProgrammaticAI() {
  const [brief, setBrief] = useState<Brief>(initial);
  const [mode, setMode] = useState<'plan' | 'image'>('plan');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState('');
  const update = (key: keyof Brief, value: string) => setBrief((current) => ({ ...current, [key]: value }));

  function downloadPdf() {
    if (!result) return;
    const printWindow = window.open('', '_blank', 'width=900,height=700');
    if (!printWindow) {
      setError('O navegador bloqueou a janela do PDF. Permita pop-ups para este site e tente novamente.');
      return;
    }
    const fields = [
      ['Marca / empresa', brief.brand], ['Segmento', brief.business], ['Objetivo', brief.objective],
      ['Região', brief.location], ['Público-alvo', brief.audience || 'Não informado'],
      ['Orçamento', brief.budget || 'Não informado'], ['Período', brief.period],
      ['Formato', brief.format], ['Oferta / mensagem', brief.offer || 'Não informada'],
    ];
    const date = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long' }).format(new Date());
    printWindow.document.open();
    printWindow.document.write(`<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Planejamento de campanha — ${escapeHtml(brief.brand)} | MídiaMap</title><style>
      @page{size:A4;margin:18mm 16mm}*{box-sizing:border-box}body{font-family:Arial,Helvetica,sans-serif;color:#172d23;margin:0;font-size:11pt;line-height:1.55}.top{border-bottom:4px solid #a8ef42;padding-bottom:16px;margin-bottom:24px}.brand{font-size:24pt;font-weight:900;letter-spacing:-1.5px;color:#123d30}.brand span{color:#65a92c}.kicker{font-size:8pt;font-weight:800;letter-spacing:2px;color:#39845d;margin-top:8px}.title{font-size:22pt;line-height:1.15;margin:8px 0 4px;color:#123d30}.date{color:#718078;font-size:9pt}.brief{display:grid;grid-template-columns:1fr 1fr;gap:9px;margin:20px 0 26px}.field{border:1px solid #dce7df;border-radius:7px;padding:9px 11px;break-inside:avoid}.field small{display:block;color:#668072;font-size:7.5pt;font-weight:800;text-transform:uppercase;letter-spacing:.6px;margin-bottom:3px}.field strong{font-size:9.5pt;font-weight:600;overflow-wrap:anywhere}.content-title{font-size:14pt;color:#123d30;border-bottom:1px solid #dce7df;padding-bottom:8px;margin:24px 0 12px}.content{white-space:pre-wrap;overflow-wrap:anywhere;font-size:10pt;line-height:1.65;color:#263b31}.foot{border-top:1px solid #dce7df;margin-top:30px;padding-top:10px;color:#718078;font-size:8pt;display:flex;justify-content:space-between}.notice{margin-top:18px;background:#f2f8f3;padding:10px 12px;border-left:3px solid #a8ef42;font-size:8pt;color:#5b6e62}@media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact}}
    </style></head><body><header class="top"><div class="brand">MÍDIA<span>MAP</span></div><div class="kicker">INTELIGÊNCIA DE MÍDIA · PLANEJAMENTO ESTRATÉGICO</div><h1 class="title">Planejamento de campanha</h1><div class="date">Documento gerado em ${date} pela MídiaMap AI</div></header><h2 class="content-title">Briefing da campanha</h2><section class="brief">${fields.map(([label, value]) => `<div class="field"><small>${escapeHtml(label)}</small><strong>${escapeHtml(value)}</strong></div>`).join('')}</section><h2 class="content-title">Estratégia e recomendações</h2><main class="content">${escapeHtml(result)}</main><div class="notice">Este planejamento foi elaborado com auxílio de inteligência artificial. Dados de audiência, preços, alcance, disponibilidade e condições comerciais devem ser validados antes da contratação ou veiculação. As recomendações não representam garantia de resultados.</div><footer class="foot"><strong>MÍDIAMAP · STUDIO ALFA MKT</strong><span>Planejamento estratégico de campanha</span></footer><script>window.onload=()=>{window.focus();window.print()};window.onafterprint=()=>window.close();</script></body></html>`);
    printWindow.document.close();
    setError('');
  }

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
    {result && <section className="ai-result"><div className="ai-result-head"><span className="ai-chip">PLANEJAMENTO GERADO</span><div className="ai-result-actions"><button type="button" onClick={() => navigator.clipboard?.writeText(result)}>Copiar texto</button><button type="button" className="ai-pdf-button" onClick={downloadPdf}>↓ Baixar planejamento em PDF</button></div></div><pre>{result}</pre></section>}
    {image && <section className="ai-result ai-image-result"><div className="ai-result-head"><span className="ai-chip">PEÇA VISUAL GERADA</span><a href={image} target="_blank" rel="noreferrer">Abrir imagem ↗</a></div><img src={image} alt="Peça publicitária criada pela MídiaMap AI"/><p>Conceito visual gerado por IA. Revise textos, preços, marcas e informações antes de publicar.</p></section>}
    <small className="ai-disclaimer">Os resultados são sugestões geradas por IA, não garantem desempenho, alcance ou disponibilidade de inventário. Revise a estratégia e as peças antes da veiculação. A geração depende de créditos e limites do provedor de IA.</small>
  </div>;
}

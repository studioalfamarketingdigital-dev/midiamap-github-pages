'use client';

import { FormEvent, useState } from 'react';

type Brief = { brand: string; business: string; objective: string; location: string; audience: string; budget: string; period: string; offer: string; format: string; tone: string };
const initial: Brief = { brand: '', business: '', objective: 'Gerar vendas e leads', location: '', audience: '', budget: '', period: '30 dias', offer: '', format: 'Feed 1:1', tone: 'Moderno e direto' };

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char] || char);
}

export default function ProgrammaticAI() {
  const [brief, setBrief] = useState<Brief>(initial);
  const [mode, setMode] = useState<'plan' | 'creative'>('plan');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const update = (key: keyof Brief, value: string) => setBrief((current) => ({ ...current, [key]: value }));

  function buildPlan() {
    return [
      'PLANEJAMENTO DE CAMPANHA — ' + brief.brand,
      '',
      '1. RESUMO ESTRATÉGICO',
      'Marca: ' + brief.brand + ' | Segmento: ' + brief.business,
      'Objetivo: ' + brief.objective,
      'Praça: ' + brief.location + ' | Período: ' + brief.period,
      'Público: ' + (brief.audience || 'Definir com base no perfil real dos clientes'),
      'Investimento informado: ' + (brief.budget || 'Ainda não definido'),
      'Oferta/mensagem: ' + (brief.offer || 'Definir uma oferta clara antes da veiculação'),
      '',
      '2. ESTRATÉGIA DE CANAIS',
      '• Presença local: avaliar outdoor, painel LED e mídia indoor conforme circulação, localização e disponibilidade confirmada.',
      '• Digital: considerar Meta Ads e Google Ads para ampliar alcance, capturar intenção e direcionar o público para WhatsApp, site ou loja.',
      '• Conteúdo: produzir peças curtas e consistentes para explicar a oferta, gerar confiança e apoiar a conversão.',
      '• Integração: usar uma mensagem central e chamadas rastreáveis para conectar a mídia física e digital.',
      '',
      '3. PLANO DE EXECUÇÃO',
      'Fase 1 — Preparação: validar público, oferta, praça, orçamento, materiais, links/WhatsApp e indicadores.',
      'Fase 2 — Veiculação: ativar os canais contratados, conferir as peças e registrar evidências de publicação.',
      'Fase 3 — Otimização: acompanhar resultados, corrigir criativos e redistribuir investimento com base nos dados coletados.',
      '',
      '4. CRIATIVOS NECESSÁRIOS',
      '• Uma mensagem principal com benefício objetivo e chamada para ação.',
      '• Versões adaptadas aos formatos e às especificações de cada veículo.',
      '• Peças digitais com identificação da campanha e destino rastreável.',
      'Formato solicitado: ' + brief.format + ' | Direção visual: ' + brief.tone,
      '',
      '5. INDICADORES PARA ACOMPANHAR',
      '• Digital: alcance, frequência, CTR, CPC, leads, conversas iniciadas, taxa de conversão e custo por lead/venda.',
      '• OOH/DOOH: período efetivo de veiculação, inserções contratadas, localização, fotos de comprovação e dados de audiência fornecidos pelo operador.',
      '• Comercial: contatos qualificados, propostas, vendas e receita atribuída quando houver rastreamento confiável.',
      '',
      '6. PENDÊNCIAS ANTES DE INVESTIR',
      '• Confirmar verba total e divisão entre produção, mídia e operação.',
      '• Validar disponibilidade, preço, período e especificações diretamente com cada veículo.',
      '• Definir responsável pelo atendimento dos contatos e prazo de resposta.',
      '• Configurar rastreamento e estabelecer uma linha de base para comparação.',
      '',
      'IMPORTANTE: este documento é um roteiro inicial de planejamento, não uma pesquisa de mercado nem uma confirmação de inventário, audiência, preço ou resultado. Ajuste a estratégia após validar os dados reais da campanha.'
    ].join('\\n');
  }

  function buildCreativeBrief() {
    return [
      'BRIEFING DE DIREÇÃO DE ARTE — ' + brief.brand,
      '',
      'MARCA E CONTEXTO',
      'Empresa: ' + brief.brand + ' | Segmento: ' + brief.business,
      'Região: ' + brief.location + ' | Público: ' + (brief.audience || 'A definir'),
      'Objetivo: ' + brief.objective,
      'Oferta/mensagem: ' + (brief.offer || 'Criar uma mensagem principal após validar a oferta'),
      '',
      'CONCEITO CRIATIVO',
      'Desenvolver uma peça publicitária de leitura imediata, com um único foco visual, hierarquia clara e benefício central fácil de entender.',
      'Tom: ' + brief.tone,
      'Formato: ' + brief.format,
      'Período de campanha: ' + brief.period,
      'Orçamento informado: ' + (brief.budget || 'A definir'),
      '',
      'COMPOSIÇÃO SUGERIDA',
      '1. Destaque principal: produto, serviço ou situação que represente o benefício.',
      '2. Título: frase curta, específica e legível em poucos segundos.',
      '3. Complemento: uma prova, condição ou diferencial que possa ser comprovado.',
      '4. Chamada para ação: orientar para WhatsApp, endereço, site ou ponto de venda.',
      '5. Assinatura: reservar área para a marca e informações obrigatórias.',
      '',
      'CUIDADOS DE PRODUÇÃO',
      '• Não inventar preços, descontos, garantias, números ou depoimentos.',
      '• Conferir ortografia, telefone, endereço, validade e condições antes de publicar.',
      '• Adaptar a composição à distância de leitura e às dimensões reais do veículo.',
      '• Solicitar aprovação do cliente e do operador antes da veiculação.',
      '',
      'Este é um briefing textual para orientar a criação. A hospedagem estática atual não gera arquivos de imagem automaticamente.'
    ].join('\\n');
  }

  function generate(event: FormEvent) {
    event.preventDefault();
    setError('');
    if (!brief.brand.trim() || !brief.business.trim() || !brief.location.trim()) {
      setError('Preencha marca, segmento e região para continuar.');
      return;
    }
    setResult(mode === 'plan' ? buildPlan() : buildCreativeBrief());
  }

  function downloadPdf() {
    if (!result) return;
    const printWindow = window.open('', '_blank', 'width=900,height=700');
    if (!printWindow) { setError('O navegador bloqueou a janela do documento. Permita pop-ups e tente novamente.'); return; }
    const date = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long' }).format(new Date());
    printWindow.document.open();
    printWindow.document.write(`<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Documento de campanha — ${escapeHtml(brief.brand)} | MídiaMap</title><style>@page{size:A4;margin:18mm 16mm}*{box-sizing:border-box}body{font-family:Arial,Helvetica,sans-serif;color:#172d23;margin:0;font-size:11pt;line-height:1.55}.top{border-bottom:4px solid #a8ef42;padding-bottom:16px;margin-bottom:24px}.brand{font-size:24pt;font-weight:900;color:#123d30}.brand span{color:#65a92c}.kicker{font-size:8pt;font-weight:800;letter-spacing:2px;color:#39845d;margin-top:8px}.title{font-size:22pt;line-height:1.15;margin:8px 0 4px;color:#123d30}.date{color:#718078;font-size:9pt}.content{white-space:pre-wrap;overflow-wrap:anywhere;font-size:10pt;line-height:1.65;color:#263b31}.foot{border-top:1px solid #dce7df;margin-top:30px;padding-top:10px;color:#718078;font-size:8pt}@media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact}}</style></head><body><header class="top"><div class="brand">MÍDIA<span>MAP</span></div><div class="kicker">PLANEJAMENTO DE MÍDIA · STUDIO ALFA MKT</div><h1 class="title">${mode === 'plan' ? 'Planejamento de campanha' : 'Briefing de direção de arte'}</h1><div class="date">Documento gerado em ${date}</div></header><main class="content">${escapeHtml(result)}</main><footer class="foot"><strong>MÍDIAMAP · STUDIO ALFA MKT</strong><br>Documento de apoio. Valide informações comerciais, disponibilidade e condições antes da veiculação.</footer><script>window.onload=()=>{window.focus();window.print()};window.onafterprint=()=>window.close();</script></body></html>`);
    printWindow.document.close();
    setError('');
  }

  return <div className="programmatic-ai">
    <div className="programmatic-ai-intro">
      <div><span className="ai-chip">✦ MÍDIAMAP PLANNER</span><h3>Do briefing à campanha.<br /><em>Planejamento com método.</em></h3><p>Organize os dados da sua campanha e gere um roteiro estratégico ou um briefing de direção de arte, pronto para revisar e imprimir.</p></div>
      <div className="ai-orb"><span>360°</span><i>✦</i></div>
    </div>
    <form className="ai-brief-form" onSubmit={generate}>
      <div className="ai-mode-tabs"><button type="button" className={mode === 'plan' ? 'active' : ''} onClick={() => setMode('plan')}>✦ Planejar campanha</button><button type="button" className={mode === 'creative' ? 'active' : ''} onClick={() => setMode('creative')}>▧ Briefing visual</button></div>
      <div className="ai-fields">
        <label>Marca / empresa<input required value={brief.brand} onChange={e => update('brand', e.target.value)} placeholder="Ex.: Loja Central" maxLength={90}/></label>
        <label>Segmento<input required value={brief.business} onChange={e => update('business', e.target.value)} placeholder="Ex.: varejo, saúde, alimentação" maxLength={120}/></label>
        <label>Objetivo<select value={brief.objective} onChange={e => update('objective', e.target.value)}><option>Gerar vendas e leads</option><option>Reconhecimento de marca</option><option>Divulgar uma inauguração</option><option>Promover produto ou serviço</option><option>Gerar visitas à loja</option><option>Fortalecer presença regional</option></select></label>
        <label>Região da campanha<input required value={brief.location} onChange={e => update('location', e.target.value)} placeholder="Ex.: Luziânia e Brasília" maxLength={120}/></label>
        <label>Público-alvo<input value={brief.audience} onChange={e => update('audience', e.target.value)} placeholder="Ex.: adultos, famílias, empresários" maxLength={180}/></label>
        <label>Orçamento estimado<input value={brief.budget} onChange={e => update('budget', e.target.value)} placeholder="Ex.: R$ 2.000" maxLength={50}/></label>
        <label>Período<select value={brief.period} onChange={e => update('period', e.target.value)}><option>7 dias</option><option>15 dias</option><option>30 dias</option><option>60 dias</option><option>90 dias</option></select></label>
        <label>Formato principal<select value={brief.format} onChange={e => update('format', e.target.value)}><option>Feed 1:1</option><option>Story 9:16</option><option>Banner horizontal 16:9</option><option>Display 300x250</option><option>Outdoor horizontal</option><option>Conceito visual livre</option></select></label>
        <label className="ai-field-wide">Oferta / mensagem principal<textarea value={brief.offer} onChange={e => update('offer', e.target.value)} placeholder="O que precisa ser divulgado? Informe produto, benefício, preço e condições, se houver." maxLength={500}/></label>
        <label className="ai-field-wide">Estilo visual<select value={brief.tone} onChange={e => update('tone', e.target.value)}><option>Moderno e direto</option><option>Elegante e sofisticado</option><option>Popular e promocional</option><option>Minimalista</option><option>Institucional</option><option>Urbano e ousado</option></select></label>
      </div>
      <button className="button button-green ai-generate" type="submit">✦ {mode === 'plan' ? 'Gerar planejamento' : 'Montar briefing visual'}</button>
      {error && <div className="ai-error" role="alert">{error}</div>}
    </form>
    {result && <section className="ai-result"><div className="ai-result-head"><strong>{mode === 'plan' ? 'Planejamento da campanha' : 'Briefing de direção de arte'}</strong><div className="ai-result-actions"><button onClick={() => navigator.clipboard?.writeText(result)}>Copiar texto</button><button className="ai-pdf-button" onClick={downloadPdf}>Imprimir / salvar PDF ↗</button></div></div><pre>{result}</pre><small className="ai-disclaimer">Material de apoio gerado a partir das informações preenchidas. Não substitui pesquisa, validação de inventário ou aprovação comercial.</small></section>}
  </div>;
}

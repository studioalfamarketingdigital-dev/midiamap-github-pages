'use client';

import { FormEvent, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://prsjdnvqaskkeorxnqcc.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_cI3ov1KRTrhPCmP87U_Rwg_UjufQ4X7';
const supabase = createClient(supabaseUrl, supabaseKey);

type Kind = 'quote' | 'contact' | 'supplier';
const formats = ['Outdoor', 'Painel LED', 'DOOH', 'Indoor', 'TV', 'Rádio', 'Mídia impressa', 'Planejamento de mídia', 'Mais de um formato'];

export default function LeadForm({ kind }: { kind: Kind }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [form, setForm] = useState({
    name: '', company: '', email: '', phone: '', city: '', state: 'GO',
    objective: '', format: '', period: '', budget: '', message: '',
    website: '', address: '', dimensions: '', price: ''
  });
  const update = (key: string, value: string) => setForm(current => ({ ...current, [key]: value }));

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true); setError(''); setSuccess('');
    try {
      if (kind === 'supplier') {
        const { error: dbError } = await supabase.from('suppliers').insert({
          name: form.name.trim(),
          company_name: form.company.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          website: [form.website, 'Inventário: ' + form.format, 'Endereço: ' + form.address, 'Dimensões: ' + form.dimensions, 'Tabela/preço: ' + form.price, 'Observações: ' + form.message].filter(Boolean).join(' | '),
          city: form.city.trim(),
          state: form.state.trim().toUpperCase(),
          status: 'pending'
        });
        if (dbError) throw dbError;
      } else {
        const { error: dbError } = await supabase.from('quote_requests').insert({
          contact_name: form.name.trim(),
          contact_company: form.company.trim(),
          contact_email: form.email.trim(),
          contact_phone: form.phone.trim(),
          campaign_city: form.city.trim(),
          campaign_state: form.state.trim().toUpperCase(),
          desired_format: form.format,
          budget: form.budget.trim() ? Number(form.budget.trim().replace(/[^\d,]/g, '').replace(',', '.')) : null,
          message: [form.objective && 'Objetivo: ' + form.objective, form.period && 'Período: ' + form.period, form.message && 'Detalhes: ' + form.message].filter(Boolean).join('\n'),
          status: 'new'
        });
        if (dbError) throw dbError;
      }
      setSuccess(kind === 'supplier'
        ? 'Cadastro enviado! Nossa equipe vai avaliar as informações e entrar em contato.'
        : 'Briefing recebido com sucesso! Nossa equipe comercial vai analisar seu pedido.');
      setForm({ name: '', company: '', email: '', phone: '', city: '', state: 'GO', objective: '', format: '', period: '', budget: '', message: '', website: '', address: '', dimensions: '', price: '' });
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Não foi possível enviar agora.';
      setError('Não foi possível registrar seu envio. ' + message + ' Tente novamente em instantes.');
    } finally {
      setBusy(false);
    }
  }

  const supplier = kind === 'supplier';
  const contact = kind === 'contact';
  return (
    <form className="lead-form" onSubmit={submit}>
      <div className="lead-form-grid">
        <label>Nome completo *<input required value={form.name} onChange={e => update('name', e.target.value)} autoComplete="name" /></label>
        <label>Empresa{supplier ? ' / veículo' : ''}<input value={form.company} onChange={e => update('company', e.target.value)} autoComplete="organization" /></label>
        <label>E-mail *<input required type="email" value={form.email} onChange={e => update('email', e.target.value)} autoComplete="email" /></label>
        <label>WhatsApp *<input required type="tel" value={form.phone} onChange={e => update('phone', e.target.value)} autoComplete="tel" /></label>
        <label>Cidade *<input required value={form.city} onChange={e => update('city', e.target.value)} autoComplete="address-level2" /></label>
        <label>Estado *<select required value={form.state} onChange={e => update('state', e.target.value)}>{['GO','DF','SP','RJ','MG','PR','SC','RS','BA','PE','CE','AM','ES','MT','MS','PA','PB','RN','RO','TO','AL','SE','PI','MA','AC','AP','RR'].map(s => <option key={s}>{s}</option>)}</select></label>
        {supplier ? <>
          <label>Formato de mídia *<select required value={form.format} onChange={e => update('format', e.target.value)}><option value="">Selecione</option>{formats.map(f => <option key={f}>{f}</option>)}</select></label>
          <label>Site ou mídia kit (link)<input value={form.website} onChange={e => update('website', e.target.value)} placeholder="https://" /></label>
          <label>Endereço / referência do ponto<input value={form.address} onChange={e => update('address', e.target.value)} /></label>
          <label>Dimensões / especificações<input value={form.dimensions} onChange={e => update('dimensions', e.target.value)} /></label>
          <label>Tabela comercial / preço<input value={form.price} onChange={e => update('price', e.target.value)} /></label>
        </> : <>
          {!contact && <label>Formato de interesse *<select required value={form.format} onChange={e => update('format', e.target.value)}><option value="">Selecione</option>{formats.map(f => <option key={f}>{f}</option>)}</select></label>}
          {!contact && <label>Orçamento estimado<input value={form.budget} onChange={e => update('budget', e.target.value)} placeholder="Ex.: R$ 5.000" /></label>}
          {!contact && <label>Período desejado<input value={form.period} onChange={e => update('period', e.target.value)} placeholder="Ex.: dezembro/2026" /></label>}
          <label className="lead-form-wide">{contact ? 'Assunto' : 'Objetivo da campanha'}<input value={form.objective} onChange={e => update('objective', e.target.value)} placeholder={contact ? 'Como podemos ajudar?' : 'Ex.: divulgar inauguração, gerar visitas...'}/></label>
        </>}
        <label className="lead-form-wide">{supplier ? 'Informações adicionais' : 'Detalhes da solicitação'}<textarea rows={4} value={form.message} onChange={e => update('message', e.target.value)} placeholder={supplier ? 'Conte mais sobre seu inventário e disponibilidade.' : 'Conte um pouco mais sobre sua necessidade.'}/></label>
      </div>
      <p className="lead-form-privacy">Ao enviar, você autoriza a equipe MídiaMap a entrar em contato para tratar desta solicitação.</p>
      <button className="button button-green" type="submit" disabled={busy}>{busy ? 'Enviando…' : supplier ? 'Enviar cadastro de parceiro ↗' : contact ? 'Enviar mensagem ↗' : 'Enviar briefing ↗'}</button>
      {error && <p className="lead-form-error" role="alert">{error}</p>}
      {success && <p className="lead-form-success" role="status">{success}</p>}
    </form>
  );
}

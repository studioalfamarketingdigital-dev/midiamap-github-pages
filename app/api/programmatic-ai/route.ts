import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const maxDuration = 60;

const TEXT_MODEL = process.env.OPENROUTER_TEXT_MODEL || 'openrouter/free';
const IMAGE_MODEL = process.env.OPENROUTER_IMAGE_MODEL || '';
const openRouterKey = () => process.env.OPENROUTER_API_KEY;

type Brief = { brand?: string; business?: string; objective?: string; location?: string; audience?: string; budget?: string; period?: string; offer?: string; format?: string; tone?: string };
const limits = new Map<string, { count: number; reset: number }>();

function rateLimited(ip: string, mode: string) {
  const now = Date.now();
  const key = ip + ':' + mode;
  const current = limits.get(key);
  if (!current || current.reset < now) { limits.set(key, { count: 1, reset: now + 60 * 60 * 1000 }); return false; }
  const max = mode === 'image' ? 2 : 5;
  if (current.count >= max) return true;
  current.count += 1;
  return false;
}

function clean(value: unknown, max = 500) {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

export async function POST(request: NextRequest) {
  if (!openRouterKey()) return NextResponse.json({ error: 'A IA gratuita ainda não foi conectada. Configure OPENROUTER_API_KEY nas variáveis da Vercel.' }, { status: 503 });
  let body: { mode?: string; brief?: Brief };
  try { body = await request.json(); } catch { return NextResponse.json({ error: 'Briefing inválido.' }, { status: 400 }); }
  const mode = body.mode === 'image' ? 'image' : body.mode === 'plan' ? 'plan' : '';
  if (!mode || !body.brief || typeof body.brief !== 'object') return NextResponse.json({ error: 'Informe um briefing e selecione uma geração.' }, { status: 400 });
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (rateLimited(ip, mode)) return NextResponse.json({ error: mode === 'image' ? 'Limite temporário: até 2 imagens por hora por conexão.' : 'Limite temporário: até 5 planejamentos por hora por conexão.' }, { status: 429 });

  const brief = {
    brand: clean(body.brief.brand, 90), business: clean(body.brief.business, 120), objective: clean(body.brief.objective, 120),
    location: clean(body.brief.location, 120), audience: clean(body.brief.audience, 180), budget: clean(body.brief.budget, 50),
    period: clean(body.brief.period, 30), offer: clean(body.brief.offer, 500), format: clean(body.brief.format, 60), tone: clean(body.brief.tone, 60),
  };
  if (!brief.brand || !brief.business || !brief.location) return NextResponse.json({ error: 'Preencha marca, segmento e região.' }, { status: 400 });

  try {
    if (mode === 'plan') {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST', headers: { Authorization: 'Bearer ' + openRouterKey(), 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: TEXT_MODEL, temperature: 0.7, max_tokens: 1800,
          messages: [
            { role: 'system', content: 'Você é estrategista sênior de mídia programática e planejamento omnichannel no Brasil. Responda em português brasileiro, com linguagem comercial clara e sem inventar dados, audiências, CPMs, alcance, preços, parceiros ou disponibilidade. Diferencie estimativas de fatos. Não prometa resultados. Estruture: 1) resumo da campanha; 2) público e segmentação possível; 3) mix recomendado entre display/mobile, vídeo/CTV, áudio e DOOH quando fizer sentido; 4) distribuição percentual sugerida do orçamento, com valores calculados apenas se houver orçamento; 5) formatos e criativos necessários; 6) calendário por fase; 7) KPIs para acompanhar; 8) dados que faltam e próximos passos. Avise que compra programática real depende de acesso a DSP, inventário, geolocalização e validação comercial. Inclua roteiro curto de vídeo de 15 segundos e três variações de copy para anúncios.' },
            { role: 'user', content: 'Crie um planejamento com base neste briefing.\n' + JSON.stringify(brief, null, 2) }
          ]
        })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error?.message || 'Falha no modelo de texto (' + response.status + ').');
      const text = data?.choices?.[0]?.message?.content;
      if (typeof text !== 'string' || !text.trim()) throw new Error('A IA não retornou um planejamento válido.');
      return NextResponse.json({ text });
    }

    const prompt = [
      'Create a professional advertising campaign creative for a Brazilian brand.',
      'Brand: ' + brief.brand + '. Business: ' + brief.business + '. Campaign objective: ' + brief.objective + '.',
      'Location: ' + brief.location + '. Audience: ' + (brief.audience || 'broad local audience') + '.',
      'Offer/message: ' + (brief.offer || 'create a compelling brand awareness visual') + '.',
      'Format: ' + brief.format + '. Visual style: ' + brief.tone + '.',
      'Art direction: high-end commercial advertising, strong visual hierarchy, polished art direction, realistic product or service context, clear focal point, professional lighting, composition adapted to requested format.',
      'If exact Portuguese copy is provided, render only short accurate text; otherwise do not invent prices, discounts, phone numbers, addresses, logos or legal claims. Avoid gibberish text and watermarks.'
    ].join('\n');
    if (!IMAGE_MODEL) return NextResponse.json({ error: 'O planejamento usa IA gratuita. Para gerar imagens diretamente, é necessário escolher e configurar um modelo de imagem no OpenRouter; esses modelos são cobrados por geração e não fazem parte da cota gratuita de texto.' }, { status: 402 });
    const response = await fetch('https://openrouter.ai/api/v1/images', {
      method: 'POST', headers: { Authorization: 'Bearer ' + openRouterKey(), 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: IMAGE_MODEL, prompt, size: brief.format.includes('9:16') ? '1024x1536' : brief.format.includes('16:9') || brief.format.includes('horizontal') ? '1536x1024' : '1024x1024' })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data?.error?.message || 'Falha no gerador de imagens (' + response.status + ').');
    const item = data?.data?.[0];
    const image = item?.b64_json ? 'data:' + (item?.media_type || 'image/png') + ';base64,' + item.b64_json : item?.url;
    if (typeof image !== 'string' || !image) throw new Error('O gerador não retornou uma imagem.');
    return NextResponse.json({ image });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro inesperado na geração.';
    return NextResponse.json({ error: message.slice(0, 300) }, { status: 502 });
  }
}

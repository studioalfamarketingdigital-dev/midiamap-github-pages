export const formats = ['Outdoor', 'Painel LED', 'Indoor', 'DOOH'] as const;
export type Format = (typeof formats)[number];
export type Space = {
  id: string;
  format: Format;
  city: string;
  state: string;
  place: string;
  title: string;
  price: number | null;
  days: number;
  dimension: string;
  lat: number;
  lng: number;
  badge: string;
  artLabel: string;
  type: string;
  sourceUrl: string;
  sourceNote: string;
};

// Referências públicas de catálogos de operadores. Não representam reserva,
// disponibilidade confirmada ou parceria comercial com a MídiaMap.
export const spaces: Space[] = [
  {
    id: 'gbm-603',
    format: 'Painel LED',
    city: 'Brasília',
    state: 'DF',
    place: 'EPTG · marginal sul, próximo ao Posto Garantia',
    title: 'Painel LED EPTG — REF 603',
    price: 3500,
    days: 30,
    dimension: '2 × 4 m · vídeo vertical de 15 s · 550 inserções/dia',
    lat: -15.811751,
    lng: -47.996162,
    badge: 'CATÁLOGO PÚBLICO',
    artLabel: 'LED EPTG',
    type: 'led',
    sourceUrl: 'https://grupobrasilmidia.com.br/midia-locacao/152-painel-de-led-para-aluguel-selecione-bairro-brasilia-603',
    sourceNote: 'Preço publicado pelo operador: R$ 3.500/mês. Confirmar vigência e disponibilidade.'
  },
  {
    id: 'gbm-823',
    format: 'Painel LED',
    city: 'Goiânia',
    state: 'GO',
    place: 'Av. Rio Verde com Av. José Leandro da Cruz · Setor Jardim Luz',
    title: 'Painel LED Avenida Rio Verde — REF 823',
    price: null,
    days: 30,
    dimension: '9 × 3 m · vídeo horizontal de 10 s',
    lat: -16.741490,
    lng: -49.275378,
    badge: 'CATÁLOGO PÚBLICO',
    artLabel: 'LED GOIÂNIA',
    type: 'led',
    sourceUrl: 'https://grupobrasilmidia.com.br/midias/823',
    sourceNote: 'Ponto publicado pelo operador. Preço e disponibilidade sob consulta.'
  },
  {
    id: 'gbm-104',
    format: 'Outdoor',
    city: 'Águas Claras',
    state: 'DF',
    place: 'Avenida Castanheiras · em frente à CIA Toy',
    title: 'Empena iluminada — REF 104',
    price: null,
    days: 30,
    dimension: '11 × 6,7 m · empena iluminada',
    lat: -15.835408,
    lng: -48.018370,
    badge: 'CATÁLOGO PÚBLICO',
    artLabel: 'EMPENA',
    type: 'outdoor',
    sourceUrl: 'https://grupobrasilmidia.com.br/midias/104',
    sourceNote: 'Ponto publicado pelo operador. Preço e disponibilidade sob consulta.'
  }
];

export const brl = (value: number) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });

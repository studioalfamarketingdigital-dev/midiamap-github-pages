export const formats = ['Outdoor', 'Painel LED', 'Indoor', 'DOOH'] as const;
export type Format = (typeof formats)[number];
export type Space = { id: string; format: Format; city: string; state: string; place: string; title: string; price: number; days: number; dimension: string; x: number; y: number; badge: string; artLabel: string; type: string };

export const spaces: Space[] = [
  { id: 'lz-centro', format: 'Outdoor', city: 'Luziânia', state: 'GO', place: 'Centro', title: 'Outdoor Centro — Luziânia', price: 650, days: 30, dimension: '9 × 3 m', x: 28, y: 60, badge: 'OUTDOOR', artLabel: 'CENTRO', type: 'outdoor' },
  { id: 'bsb-eixo', format: 'Painel LED', city: 'Brasília', state: 'DF', place: 'Eixo Monumental', title: 'Painel LED — Brasília', price: 1200, days: 15, dimension: '6 × 3 m', x: 57, y: 35, badge: 'LED', artLabel: 'EIXO', type: 'led' },
  { id: 'bsb-aguas', format: 'Indoor', city: 'Brasília', state: 'DF', place: 'Águas Claras', title: 'Indoor — Águas Claras', price: 390, days: 30, dimension: 'Circulação', x: 45, y: 54, badge: 'INDOOR', artLabel: 'ÁGUAS CLARAS', type: 'indoor' },
  { id: 'bsb-asa', format: 'DOOH', city: 'Brasília', state: 'DF', place: 'Asa Norte', title: 'DOOH — Asa Norte', price: 980, days: 15, dimension: '4 × 2 m', x: 73, y: 22, badge: 'DOOH', artLabel: 'ASA NORTE', type: 'dooh' },
  { id: 'lz-br', format: 'Outdoor', city: 'Luziânia', state: 'GO', place: 'BR-040', title: 'Outdoor BR-040 — Luziânia', price: 820, days: 30, dimension: '9 × 3 m', x: 19, y: 78, badge: 'OUTDOOR', artLabel: 'BR-040', type: 'outdoor' },
  { id: 'bsb-tag', format: 'Painel LED', city: 'Brasília', state: 'DF', place: 'Taguatinga', title: 'Painel LED — Taguatinga', price: 1050, days: 15, dimension: '6 × 3 m', x: 77, y: 63, badge: 'LED', artLabel: 'TAGUATINGA', type: 'led' },
];

export const brl = (value: number) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });

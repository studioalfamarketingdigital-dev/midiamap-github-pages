export const formats = ['Outdoor', 'Painel LED', 'Indoor', 'DOOH'] as const;
export type Format = (typeof formats)[number];

export type Space = {
  id: string;
  format: Format;
  city: string;
  place: string;
  price: number;
  days: number;
  x: number; // posição do pino no mapa (%)
  y: number;
};

// Inventário de demonstração. Substitua por dados reais (banco/API) na próxima fase.
export const spaces: Space[] = [
  { id: 'lz-centro', format: 'Outdoor', city: 'Luziânia', place: 'Centro', price: 650, days: 30, x: 30, y: 62 },
  { id: 'bsb-eixo', format: 'Painel LED', city: 'Brasília', place: 'Eixo Monumental', price: 1200, days: 15, x: 55, y: 34 },
  { id: 'bsb-aguas-claras', format: 'Indoor', city: 'Brasília', place: 'Águas Claras', price: 390, days: 30, x: 44, y: 52 },
  { id: 'bsb-asa-norte', format: 'DOOH', city: 'Brasília', place: 'Asa Norte', price: 980, days: 15, x: 66, y: 22 },
  { id: 'lz-br040', format: 'Outdoor', city: 'Luziânia', place: 'BR-040', price: 820, days: 30, x: 22, y: 76 },
  { id: 'bsb-taguatinga', format: 'Painel LED', city: 'Brasília', place: 'Taguatinga', price: 1050, days: 15, x: 72, y: 58 },
];

export const brl = (n: number) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });

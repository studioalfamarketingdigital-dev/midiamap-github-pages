export const formats = ['Outdoor', 'Painel LED', 'Indoor', 'DOOH'] as const;
export type Format = (typeof formats)[number];
export type Space = { id: string; format: Format; city: string; state: string; place: string; title: string; price: number; days: number; dimension: string; lat: number; lng: number; badge: string; artLabel: string; type: string };

export const spaces: Space[] = [];

export const brl = (value: number) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });

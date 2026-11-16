import type { Metadata } from 'next';
import InfoPage from '../../components/InfoPage';
import LeadForm from '../../components/LeadForm';

export const metadata: Metadata = {
  title: 'Seja parceiro | Cadastre seu espaço de mídia',
  description: 'Apresente seu inventário de outdoor, painel LED, DOOH, indoor, TV, rádio ou mídia impressa.',
  alternates: { canonical: '/seja-parceiro/' },
};

export default function Page() {
  return (
    <InfoPage eyebrow="PARA PROPRIETÁRIOS E OPERADORES" title="Cadastre seu inventário de mídia." description="Apresente seu veículo, cidade, endereço ou referência, formato, medidas, tabela comercial e contato responsável. O cadastro será encaminhado para avaliação da equipe.">
      <LeadForm kind="supplier" />
    </InfoPage>
  );
}

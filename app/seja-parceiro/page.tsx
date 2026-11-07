import type { Metadata } from 'next';
import InfoPage from '../../components/InfoPage';

export const metadata: Metadata = {
  title: 'Seja parceiro | Cadastre seu espaço de mídia',
  description: 'Apresente seu inventário de outdoor, painel LED, DOOH, indoor, TV, rádio ou mídia impressa.',
  alternates: { canonical: '/seja-parceiro/' },
};

export default function Page() {
  const subject = encodeURIComponent('Cadastro de inventário — MídiaMap');
  const body = encodeURIComponent('Olá! Quero apresentar meu inventário para avaliação no MídiaMap.\n\nEmpresa/veículo:\nResponsável:\nCidade/UF:\nEndereço ou referência do ponto:\nFormato:\nDimensões:\nPreço/tabela comercial:\nContato:\nLink do mídia kit ou fotos:');
  return (
    <InfoPage eyebrow="PARA PROPRIETÁRIOS E OPERADORES" title="Cadastre seu inventário de mídia." description="Envie nome do veículo, cidade, endereço ou referência, formato, medidas, fotos, tabela comercial e contato responsável. O envio não garante publicação: as informações passam por avaliação e confirmação.">
      <a className="button button-green" href={`mailto:studioalfamktag@bol.com.br?subject=${subject}&body=${body}`}>Apresentar meu inventário ↗</a>
    </InfoPage>
  );
}

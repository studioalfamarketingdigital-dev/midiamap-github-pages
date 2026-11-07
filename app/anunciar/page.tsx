import type { Metadata } from 'next';
import InfoPage from '../../components/InfoPage';

export const metadata: Metadata = {
  title: 'Anuncie | Solicite cotação de mídia',
  description: 'Conte seu objetivo, região e orçamento para receber opções de mídia e uma proposta de campanha.',
  alternates: { canonical: '/anunciar/' },
};

export default function Page() {
  const subject = encodeURIComponent('Briefing de campanha — MídiaMap');
  const body = encodeURIComponent('Olá, equipe MídiaMap! Quero planejar uma campanha.\n\nNome:\nEmpresa:\nWhatsApp:\nCidade/UF:\nObjetivo:\nFormatos de interesse:\nPeríodo:\nOrçamento estimado:\nObservações:');
  return (
    <InfoPage eyebrow="PARA ANUNCIANTES" title="Sua campanha começa com uma boa escolha de mídia." description="Informe região, formato e objetivo da campanha. A equipe pesquisa opções e retorna com condições comerciais após validar disponibilidade com os operadores.">
      <a className="button button-green" href={`mailto:studioalfamktag@bol.com.br?subject=${subject}&body=${body}`}>Enviar briefing de campanha ↗</a>
    </InfoPage>
  );
}

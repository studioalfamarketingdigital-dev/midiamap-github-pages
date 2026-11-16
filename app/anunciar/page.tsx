import type { Metadata } from 'next';
import InfoPage from '../../components/InfoPage';
import LeadForm from '../../components/LeadForm';

export const metadata: Metadata = {
  title: 'Anuncie | Solicite cotação de mídia',
  description: 'Conte seu objetivo, região e orçamento para receber opções de mídia e uma proposta de campanha.',
  alternates: { canonical: '/anunciar/' },
};

export default function Page() {
  return (
    <InfoPage eyebrow="PARA ANUNCIANTES" title="Sua campanha começa com uma boa escolha de mídia." description="Informe região, formato e objetivo da campanha. A equipe pesquisa opções e retorna com condições comerciais após validar disponibilidade com os operadores.">
      <LeadForm kind="quote" />
    </InfoPage>
  );
}

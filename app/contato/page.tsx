import type { Metadata } from 'next';
import InfoPage from '../../components/InfoPage';
import LeadForm from '../../components/LeadForm';

export const metadata: Metadata = {
  title: 'Contato | MídiaMap',
  description: 'Fale com a equipe MídiaMap e Studio Alfa MKT para dúvidas, parcerias e cotações.',
  alternates: { canonical: '/contato/' },
};

export default function Page() {
  return (
    <InfoPage eyebrow="FALE COM A EQUIPE" title="Vamos conversar sobre sua próxima campanha." description="Envie sua mensagem pelo formulário. Seu contato será registrado para acompanhamento pela equipe MídiaMap.">
      <LeadForm kind="contact" />
    </InfoPage>
  );
}

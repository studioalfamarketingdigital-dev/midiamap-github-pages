import type { Metadata } from 'next';
import InfoPage from '../../components/InfoPage';

export const metadata: Metadata = {
  title: 'Contato | MídiaMap',
  description: 'Fale com a equipe MídiaMap e Studio Alfa MKT para dúvidas, parcerias e cotações.',
  alternates: { canonical: '/contato/' },
};

export default function Page() {
  const subject = encodeURIComponent('Contato pelo site MídiaMap');
  const body = encodeURIComponent('Olá, equipe MídiaMap!\n\nAssunto:\nCidade/UF:\nComo podemos ajudar?');
  return (
    <InfoPage eyebrow="FALE COM A EQUIPE" title="Vamos conversar sobre sua próxima campanha." description="Atendimento comercial, dúvidas sobre inventário e cadastro de operadores. Envie sua mensagem com cidade, formato de interesse e período desejado para agilizar o retorno.">
      <a className="button button-green" href={`mailto:studioalfamktag@bol.com.br?subject=${subject}&body=${body}`}>Enviar e-mail para a equipe ↗</a>
      <p style={{ color: '#6d7b74', fontSize: 14 }}>studioalfamktag@bol.com.br</p>
    </InfoPage>
  );
}

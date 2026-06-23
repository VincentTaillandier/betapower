import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Politique de confidentialité — BetaPower',
  description: 'Politique de confidentialité et traitement des données personnelles de BetaPower.',
  robots: { index: false },
}

export default function ConfidentialitePage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Politique de confidentialité</h1>

      <div className="space-y-6 text-gray-600 text-sm leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Responsable du traitement</h2>
          <p>BetaPower — Vincent Taillandier · contact@betapower.fr</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Données collectées</h2>
          <p>
            Lorsque vous utilisez le formulaire de contact, nous collectons les données que vous
            saisissez : prénom, nom, email professionnel, entreprise, poste et message. Ces données
            sont utilisées uniquement pour répondre à votre demande.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Base légale</h2>
          <p>
            Le traitement repose sur votre consentement explicite, donné au moment de la soumission
            du formulaire (RGPD, art. 6(1)(a)).
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibent text-gray-900 mb-2">Durée de conservation</h2>
          <p>
            Vos données sont conservées le temps nécessaire au traitement de votre demande et au
            plus 3 ans à compter du dernier contact.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Prestataires tiers</h2>
          <p>
            L&apos;envoi d&apos;email est assuré par{' '}
            <a href="https://resend.com" target="_blank" rel="noopener noreferrer" className="text-betapower-azure hover:underline">
              Resend
            </a>{' '}
            (région EU). La protection anti-spam est assurée par{' '}
            <a href="https://www.cloudflare.com/products/turnstile/" target="_blank" rel="noopener noreferrer" className="text-betapower-azure hover:underline">
              Cloudflare Turnstile
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Vos droits</h2>
          <p>
            Vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement et de
            retrait du consentement. Pour exercer ces droits, contactez-nous à{' '}
            <a href="mailto:contact@betapower.fr" className="text-betapower-azure hover:underline">
              contact@betapower.fr
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  )
}

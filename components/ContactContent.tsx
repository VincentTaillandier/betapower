'use client'

export default function ContactContent() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
      <div className="animate-fade-in-up">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact</h1>
        <p className="text-gray-500 text-lg mb-10">Décrivez-nous votre besoin, nous vous répondons sous 48h.</p>
      </div>

      <div
        className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 space-y-6 animate-fade-in-up"
        style={{ animationDelay: '150ms' }}
      >
        <div>
          <p className="text-sm font-medium text-gray-700 mb-1">Email</p>
          <a href="mailto:contact@betapower.fr" className="text-betapower-azure hover:underline">
            contact@betapower.fr
          </a>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-700 mb-1">LinkedIn</p>
          <a
            href="https://www.linkedin.com/in/vincent-taillandier-15574a150/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-betapower-azure hover:underline"
          >
            linkedin.com/in/vincent-taillandier-15574a150
          </a>
        </div>

        <hr className="border-gray-100" />

        <p className="text-sm text-gray-500">
          Pour les projets nécessitant un NDA ou un devis formalisé,
          précisez-le dans votre email et nous enverrons les documents adaptés.
        </p>
      </div>
    </div>
  )
}

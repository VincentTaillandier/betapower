interface PageHeroProps {
  title: string
  subtitle?: string
}

export default function PageHero({ title, subtitle }: PageHeroProps) {
  return (
    <section className="bg-betapower-darkblue flex items-center" style={{ minHeight: 300 }}>
      <div className="max-w-6xl mx-auto w-full px-6 lg:px-16 py-16">
        <h1 className="text-white mb-4">{title}</h1>
        {subtitle && (
          <p
            className="animate-fade-in-up text-white/60 text-lg"
            style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </section>
  )
}

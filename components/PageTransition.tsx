'use client'

const PageTransition = ({ children }: { children: React.ReactNode }) => (
  <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
    {children}
  </div>
)

export default PageTransition

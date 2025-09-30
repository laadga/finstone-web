import './globals.css'

export const metadata = {
  title: 'Finstone AI - AI Workforce Solutions',
  description: 'Deploy specialized AI agents that work around the clock to transform your business operations',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className="antialiased">
        {children}
      </body>
    </html>
  )
}

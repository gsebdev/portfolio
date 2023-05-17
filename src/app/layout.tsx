import './globals.css'
export const metadata = {
  title: 'Sébastien GAULT',
  description: 'Frontend Developper',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}

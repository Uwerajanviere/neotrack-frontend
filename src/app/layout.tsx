import './globals.css'

export const metadata = {
  title: 'NeoTrack - NICU Management System',
  description: 'Healthcare system for Neonatal Intensive Care Units in Rwanda',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  )
}

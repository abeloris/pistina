import { GeistSans } from "geist/font/sans"
import "./globals.css"


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={GeistSans.className}>
        {children}
      </body>
    </html>
  )
}
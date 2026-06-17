import { GeistSans } from "geist/font/sans"
import "./globals.css"

export const metadata = {
  title: "Pool Manager",
  description: "Gestión de piscinas",
  manifest: "/manifest.webmanifest",
}

export const viewport = {
  themeColor: "#0ea5e9",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={GeistSans.className}>
        {children}

        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/sw.js');
                });
              }
            `,
          }}
        />
      </body>
    </html>
  )
}
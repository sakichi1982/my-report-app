// app/layout.tsx
import './globals.css'

export const metadata = {
  title: '日報アプリ',
  description: '何時、何処で、何を、したのかを記録します',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}
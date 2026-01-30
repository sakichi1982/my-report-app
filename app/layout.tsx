// app/layout.tsx
import './globals.css'

export const metadata = {
  title: '日報作成アプリ',
  description: '何時、何処で、何を、したのかを記録します',
  // ★PWA対応のためのmetaタグを追加
  manifest: '/manifest.json',
  appleWebApp: {
    title: '日報',
    statusBarStyle: 'default',
  },
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
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'EASYME.md | 리드미, 마크다운 작성 사이트',
  description: 'EASYME.md(이지미)는 README(리드미) 작성, Markdown 문법이 익숙하지 않은 사람들을 위해 만든 사이트입니다.',
  icons: {
    icon: [
      {
        url: 'https://web-assets.same.dev/3210431503/4056736532.png',
        href: 'https://web-assets.same.dev/3210431503/4056736532.png',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`min-h-screen bg-[#7e8caa] ${inter.className}`}>
        {children}
      </body>
    </html>
  )
}
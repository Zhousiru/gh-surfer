import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_TITLE,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" className="bg-[#f1f2f3] text-gray-800">
      <body>
        <div className="mx-auto max-w-screen-lg">{children}</div>
      </body>
    </html>
  )
}

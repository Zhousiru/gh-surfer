import type { Metadata } from 'next'
import Link from 'next/link'
import './globals.css'

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_TITLE,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" className="text-gray-800 selection:bg-blue-600/25">
      <body>
        <div className="mx-auto max-w-screen-lg">
          <h1 className="text-4xl mt-[10vh] mb-8">
            <Link href="/">{process.env.NEXT_PUBLIC_TITLE}</Link>
          </h1>
          {children}
          <div className="my-8 text-black/50 text-center text-sm">Powered by gh-surfer</div>
        </div>
      </body>
    </html>
  )
}

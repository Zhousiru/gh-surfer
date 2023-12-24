import { Navigator } from '@/components/Navigator'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_TITLE,
}

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { path?: string[] }
}) {
  let decodedPath = (params.path ?? []).map((e) => decodeURIComponent(e))

  return (
    <>
      <Navigator className="mb-4" current={decodedPath} />
      {children}
    </>
  )
}

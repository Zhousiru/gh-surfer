import { Navigator } from '@/components/Navigator'
import { decodePath } from '@/libs/utils'

export async function generateMetadata({ params }: { params: { path?: string[] } }) {
  if (!params.path) {
    return {
      title: '浏览 - ' + process.env.NEXT_PUBLIC_TITLE,
    }
  }

  return {
    title: decodePath(params.path).join('/') + ' - ' + process.env.NEXT_PUBLIC_TITLE,
  }
}

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { path?: string[] }
}) {
  return (
    <>
      <Navigator className="mb-4" current={decodePath(params.path)} />
      {children}
    </>
  )
}

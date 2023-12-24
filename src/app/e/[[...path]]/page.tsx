import { DirView } from '@/components/DirView'

export default async function Page({ params }: { params: { path?: string[] } }) {
  let processedPath = (params.path ?? []).map((e) => decodeURIComponent(e)).join('/')

  return (
    <>
      <DirView path={processedPath} />
    </>
  )
}

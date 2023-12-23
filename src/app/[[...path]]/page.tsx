import { ListView } from '@/components/ListView'
import { ArrowLeft } from '@carbon/icons-react'
import Link from 'next/link'

export default async function Page({ params }: { params: { path?: string[] } }) {
  return (
    <>
      <div className="flex flex-col gap-8">
        <h1 className="text-4xl text-gray-600 mt-[10vh]">
          <Link href="/" prefetch={true}>
            {process.env.NEXT_PUBLIC_TITLE}
          </Link>
        </h1>

        <div className="flex">
          {params.path && (
            <Link
              className="flex justify-center items-center gap-1 px-4 py-2 rounded-md shadow-md transition bg-white hover:bg-gray-50"
              href={'/' + params.path.slice(0, -1).join('/')}
              prefetch={true}
            >
              <ArrowLeft />
              上一级
            </Link>
          )}
        </div>
        <ListView path={decodeURIComponent(params.path?.join('/') ?? '')} />
        <div className="text-center text-black/50 pb-8">Powered by gh-surfer</div>
      </div>
    </>
  )
}

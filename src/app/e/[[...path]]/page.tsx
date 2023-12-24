import { DirCard } from '@/components/DirCard'
import { ReadmeCard } from '@/components/ReadmeCard'
import { useOctokit } from '@/libs/ocotkit/client'
import { isDir } from '@/libs/types/github'
import { sortDirData } from '@/libs/utils'
import { ArrowLeft } from '@carbon/icons-react'
import Link from 'next/link'

export default async function Page({ params }: { params: { path?: string[] } }) {
  let contactedPath = (params.path ?? []).map((e) => decodeURIComponent(e)).join('/')

  const client = useOctokit()
  const resp = await client.rest.repos.getContent({
    owner: process.env.NEXT_PUBLIC_REPO.split('/')[0],
    repo: process.env.NEXT_PUBLIC_REPO.split('/')[1],
    path: contactedPath,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
    },
  })

  const data = resp.data

  if (!isDir(data)) {
    throw new Error('Invalid type of response data')
  }

  const readmeFilename = data.find((d) => d.name.toLowerCase() === 'readme.md')?.name

  return (
    <div className="flex flex-col gap-4">
      <div className="flex">
        {params?.path && (
          <Link
            className="flex justify-center items-center gap-1 px-4 py-2 rounded-md transition bg-white border hover:shadow-md"
            href={'/e/' + params.path.slice(0, -1).join('/')}
          >
            <ArrowLeft />
            上一级
          </Link>
        )}
      </div>

      <DirCard data={sortDirData(data)} />

      {readmeFilename && <ReadmeCard path={contactedPath + '/' + readmeFilename} />}
    </div>
  )
}

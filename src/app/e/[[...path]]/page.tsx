import { DirCard } from '@/components/DirCard'
import { ReadmeCard } from '@/components/ReadmeCard'
import { useOctokit } from '@/libs/ocotkit/client'
import { isDir } from '@/libs/types/github'
import { sortDirData } from '@/libs/utils'

export default async function Page({ params }: { params: { path?: string[] } }) {
  let decodedPath = (params.path ?? []).map((e) => decodeURIComponent(e))
  let contactedPath = decodedPath.join('/')

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
      <DirCard data={sortDirData(data)} />

      {readmeFilename && <ReadmeCard path={contactedPath + '/' + readmeFilename} />}
    </div>
  )
}

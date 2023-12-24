import { useOctokit } from '@/lib/ocotkit/client'
import { ArrowLeft, DocumentBlank, Folder, TableOfContents } from '@carbon/icons-react'
import Link from 'next/link'
import { ReadmeCard } from './ReadmeCard'

function EntryIcon({ type }: { type: 'dir' | 'file' | 'submodule' | 'symlink' }) {
  switch (type) {
    case 'dir':
      return <Folder />
    case 'file':
      return <DocumentBlank />
    case 'submodule':
      return <Folder />
    case 'symlink':
      return <DocumentBlank />
  }
}

function ListEntry({
  name,
  path,
  type,
}: {
  name: string
  path: string
  type: 'dir' | 'file' | 'submodule' | 'symlink'
}) {
  return (
    <Link
      href={'/e/' + path}
      className="px-6 py-4 text-lg transition hover:bg-gray-50 flex flex-col gap-1"
    >
      <div>
        <EntryIcon type={type} />
      </div>
      <div>{name}</div>
    </Link>
  )
}

export async function DirView({ path }: { path: string }) {
  const client = useOctokit()
  const resp = await client.rest.repos.getContent({
    owner: process.env.NEXT_PUBLIC_REPO.split('/')[0],
    repo: process.env.NEXT_PUBLIC_REPO.split('/')[1],
    path,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
    },
  })
  const data = resp.data

  if (!Array.isArray(data)) {
    throw new Error('Invalid type of response data')
  }

  const readmeFilename = data.find((d) => d.name.toLowerCase() === 'readme.md')?.name

  const filteredData = data
    .filter((d) => !(d.name.startsWith('.') || d.name.toLowerCase() === 'readme.md'))
    .sort((a, b) => {
      if (a.type !== b.type) {
        return a.type.localeCompare(b.type)
      }
      return a.name.localeCompare(b.name)
    })

  return (
    <div className="flex flex-col gap-4">
      <div className="flex">
        {path && (
          <Link
            className="flex justify-center items-center gap-1 px-4 py-2 rounded-md transition bg-white border hover:shadow-md"
            href={'/e/' + path.split('/').slice(0, -1).join('/')}
          >
            <ArrowLeft />
            上一级
          </Link>
        )}
      </div>

      <div className="bg-white flex flex-col divide-y rounded-md border overflow-hidden">
        <div className="px-4 py-2 text-gray-600 flex items-center gap-2 bg-gray-100">
          <TableOfContents />
          目录
        </div>
        <div className="flex flex-col divide-y">
          {filteredData.map((d) => (
            <ListEntry key={d.path} name={d.name} path={d.path} type={d.type} />
          ))}
        </div>
      </div>

      {readmeFilename && <ReadmeCard path={path + '/' + readmeFilename} />}
    </div>
  )
}

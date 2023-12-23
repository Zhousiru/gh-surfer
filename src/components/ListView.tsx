import { useOctokit } from '@/lib/ocotkit/client'
import { DocumentBlank, Folder } from '@carbon/icons-react'
import Link from 'next/link'

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
      href={'/' + path}
      prefetch={true}
      className="px-6 py-4 text-lg transition hover:bg-gray-50 flex flex-col gap-1"
    >
      <div>
        <EntryIcon type={type} />
      </div>
      <div>{name}</div>
    </Link>
  )
}

export async function ListView({ path }: { path: string }) {
  const client = useOctokit()
  const resp = await client.request('GET /repos/{owner}/{repo}/contents/{path}', {
    owner: process.env.NEXT_PUBLIC_REPO.split('/')[0],
    repo: process.env.NEXT_PUBLIC_REPO.split('/')[1],
    path: path,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
    },
  })
  const data = resp.data

  if (!Array.isArray(data)) {
    throw new Error('Invalid type of response data')
  }

  const filteredData = data
    .filter((d) => !d.name.startsWith('.'))
    .sort((a, b) => {
      if (a.type !== b.type) {
        return a.type.localeCompare(b.type)
      }
      return a.name.localeCompare(b.name)
    })

  return (
    <div className="bg-white flex flex-col divide-y rounded-md shadow-md overflow-hidden">
      {filteredData.map((d) => (
        <ListEntry key={d.path} name={d.name} path={d.path} type={d.type} />
      ))}
    </div>
  )
}

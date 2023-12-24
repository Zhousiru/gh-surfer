import { RepoContentDirData } from '@/libs/types/github'
import { DocumentBlank, Folder, TableOfContents } from '@carbon/icons-react'
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

export function DirCard({ data }: { data: RepoContentDirData }) {
  return (
    <div className="bg-white flex flex-col divide-y rounded-md border overflow-hidden">
      <div className="px-4 py-2 text-gray-600 flex items-center gap-2 bg-gray-100">
        <TableOfContents />
        目录
      </div>
      <div className="flex flex-col divide-y">
        {data.map((d) => (
          <ListEntry key={d.path} name={d.name} path={d.path} type={d.type} />
        ))}
      </div>
    </div>
  )
}

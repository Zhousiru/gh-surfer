import { base64ToString } from '@/libs/base64'
import { useOctokit } from '@/libs/ocotkit/client'
import { isFile } from '@/libs/types/github'
import { Document } from '@carbon/icons-react'
import { marked } from 'marked'

export async function ReadmeCard({ path }: { path: string }) {
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

  if (!isFile(data)) {
    throw new Error('Invalid type of response data')
  }

  const htmlData = marked(base64ToString(data.content))

  return (
    <div className="bg-white rounded-md flex flex-col overflow-hidden divide-y border">
      <div className="px-4 py-2 flex items-center gap-2 bg-gray-100">
        <Document />
        README.md
      </div>
      <div
        className="p-8 prose max-w-none prose-img:my-2 prose-h1:pb-1 prose-h1:border-b prose-h2:pb-1 prose-h2:border-b"
        dangerouslySetInnerHTML={{ __html: htmlData }}
      ></div>
    </div>
  )
}

import { ChevronRight, Home } from '@carbon/icons-react'
import Link from 'next/link'
import { ReactNode } from 'react'

function DirLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="flex items-center px-2 h-8 rounded-md transition hover:shadow hover:bg-white"
    >
      {children}
    </Link>
  )
}

export function Navigator({ current }: { current: string[] }) {
  return (
    <div className="flex gap-1 p-2 items-center bg-gray-100 rounded-md">
      <DirLink href="/e">
        <Home className="mx-2" />
      </DirLink>

      {current.map((e, index) => (
        <div key={e} className="flex gap-1 items-center">
          <ChevronRight />
          <DirLink href={'/e/' + current.slice(0, index + 1).join('/')}>{e}</DirLink>
        </div>
      ))}
    </div>
  )
}

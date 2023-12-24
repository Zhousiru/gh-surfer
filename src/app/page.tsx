import { ReadmeCard } from '@/components/ReadmeCard'
import { ArrowRight } from '@carbon/icons-react'
import Link from 'next/link'

export default async function Page() {
  return (
    <>
      <div className="flex items-center justify-center my-16">
        <Link
          href="/e"
          className=" flex items-center justify-center text-lg gap-2 px-4 py-2 rounded-md border transition hover:shadow-md hover:bg-gray-50"
        >
          进入浏览 <ArrowRight />
        </Link>
      </div>
      <ReadmeCard path="README.md" />
    </>
  )
}

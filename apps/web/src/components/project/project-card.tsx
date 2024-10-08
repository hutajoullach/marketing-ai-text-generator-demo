import Link from 'next/link'
import Image from 'next/image'

type Props = {
  id: string
  title: string
  bgColorString: string
}
export const ProjectCard = (props: Props) => {
  const { id, title, bgColorString } = props

  return (
    <Link href={`/projects/${id}`}>
      <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
        <div className="relative w-full aspect-video rounded-md overflow-hidden">
          <Image
            fill
            className="object-cover"
            alt={title}
            src={`https://avatar.vercel.sh/${bgColorString}.png`}
          />
        </div>
        <div className="flex flex-col pt-2">
          <div className="text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2">
            {title}
          </div>
          <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
            <div className="flex items-center gap-x-1 text-slate-500"></div>
          </div>
        </div>
      </div>
    </Link>
  )
}

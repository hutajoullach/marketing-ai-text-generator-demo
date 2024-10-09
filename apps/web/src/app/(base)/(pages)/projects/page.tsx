import { generateRandomString } from '@demo/lib/utils/helper'

import { ProjectsList } from '@/components/project/projects-list'

type ListItem = {
  id: string
  title: string
  bgColorString: string
}
const dummyList: ListItem[] = [
  { id: '1', title: 'Project138', bgColorString: generateRandomString('6') },
  { id: '2', title: 'Project85', bgColorString: generateRandomString('6') },
  { id: '3', title: 'Project384', bgColorString: generateRandomString('6') },
  { id: '4', title: 'Project889', bgColorString: generateRandomString('6') },
  { id: '5', title: 'Project462', bgColorString: generateRandomString('6') },
]

const ProjectsPage = () => {
  return (
    <div className="p-6 space-y-4">
      <ProjectsList list={dummyList} />
    </div>
  )
}

export default ProjectsPage

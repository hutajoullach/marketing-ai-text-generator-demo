type Props = {
  params: { handle: string }
}
const ProjectsPage = (props: Props) => {
  const { params } = props

  return (
    <div>
      <>{params.handle}</>
    </div>
  )
}

export default ProjectsPage

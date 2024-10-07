type Props = {
  params: { projectId: string }
}
const ProjectIdPage = (props: Props) => {
  const { params } = props

  return (
    <div>
      <>{params.projectId}</>
    </div>
  )
}

export default ProjectIdPage

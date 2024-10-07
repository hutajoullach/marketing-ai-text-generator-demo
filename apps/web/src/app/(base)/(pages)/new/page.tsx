type Props = {
  params: { handle: string }
}
const NewPage = (props: Props) => {
  const { params } = props

  return (
    <div>
      <>{params.handle}</>
    </div>
  )
}

export default NewPage

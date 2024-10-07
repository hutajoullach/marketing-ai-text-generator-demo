type Props = {
  params: { handle: string }
}
const AccountPage = (props: Props) => {
  const { params } = props

  return (
    <div>
      <>{params.handle}</>
    </div>
  )
}

export default AccountPage

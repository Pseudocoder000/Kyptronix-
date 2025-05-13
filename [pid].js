import { useRouter } from 'next/router'

const PostPage = () => {
  const router = useRouter()
  const { pid } = router.query

  return <p>User: {pid}</p>
}

export default PostPage
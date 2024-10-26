import React, { useEffect } from 'react'
import PostAuthor from './PostAuthor'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectAllPost } from './postsSlice'
import { formatDistanceToNow } from 'date-fns'
import { ReactionButtons } from './ReactionButton'
import { fetchPosts } from './postsSlice'
import { Spinner } from '../../components/Spinner'

const PostList = () => {
  const dispatch = useDispatch()
  const posts = useSelector(selectAllPost)
  const postStatus = useSelector((state) => state.posts.status)
  const error = useSelector((state) => state.posts.error)

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [postStatus, dispatch])
  let content
  if (postStatus === 'loading') {
    content = <Spinner text="Loading..." />
  } else if (postStatus === 'succeeded') {
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date))
    content = orderedPosts.map((post) => {
      return <PostExcerpt key={post.id} post={post} />
    })
  } else if (postStatus === 'failed') {
    content = <div>{error}</div>
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  )
}

const PostExcerpt = ({ post }) => {
  return (
    <article className="post-excerpt">
      <div>
        <h3>{post.title}</h3>
        <p className="post-content">{post.content.substring(0, 100)}</p>
        <Link to={`/posts/${post.id}`} className="button muted-button">
          View Post
        </Link>
        <PostAuthor userId={post.user} />
        <ReactionButtons post={post} />
      </div>
      <p className="time">
        Added {formatDistanceToNow(new Date(post.date))} before
      </p>
    </article>
  )
}
export default PostList

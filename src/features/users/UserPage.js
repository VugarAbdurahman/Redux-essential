import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { selectUsersById } from './userSlice'
import { selectAllPost } from '../posts/postsSlice'

const UserPage = () => {
  const { userId } = useParams()

  const user = useSelector((state) => selectUsersById(state, userId))

  const postsForUser = useSelector((state) => {
    const allPosts = selectAllPost(state)
    return allPosts.filter((post) => post.user === userId)
  })

  const postTitles = postsForUser.map((post) => {
    return (
      <li key={post.id}>
        <Link to={`/post/${post.id}`}>{post.title}</Link>
      </li>
    )
  })

  return (
    <section>
      <h2>{user.name}</h2>

      <ul>{postTitles}</ul>
    </section>
  )
}

export default UserPage

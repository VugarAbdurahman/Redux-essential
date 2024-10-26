import React from 'react'
import { useSelector } from 'react-redux'

const PostAuthor = ({ userId }) => {
  const user = useSelector((state) =>
    state.users.find((user) => user.id === userId),
  )

  return (
    <span className="author">
      <span>By</span>
      <span className="author-name">{user ? user.name : 'Unknown Author'}</span>
    </span>
  )
}

export default PostAuthor

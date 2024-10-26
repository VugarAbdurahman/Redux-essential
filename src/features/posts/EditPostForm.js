import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { postUpdate, selectPostById } from './postsSlice'

const EditPostForm = () => {
  const { postId } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const post = useSelector((state) => selectPostById(state, postId))

  const [title, setTitle] = useState(post ? post.title : '')
  const [content, setContent] = useState(post ? post.content : '')

  const savePostUpdate = (e) => {
    e.preventDefault()
    if (title && content) {
      dispatch(
        postUpdate({
          id: postId,
          title,
          content,
        }),
      )
      navigate(`/posts/${postId}`)
    }
  }

  return (
    <section>
      <h2>Edit Post</h2>
      <form onSubmit={savePostUpdate}>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What's on your mind?"
        />
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">Save Post</button>
      </form>
    </section>
  )
}

export default EditPostForm

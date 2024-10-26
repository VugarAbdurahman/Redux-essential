import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { postAdded } from './postsSlice'
import { addNewPost } from './postsSlice'
const AddPostForm = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [userId, setUserId] = useState('')
  const [addResponseStatus, setAddResponseStatus] = useState('idle')

  const dispatch = useDispatch()

  const users = useSelector((state) => state.users)

  const canSave =
    [title, content, userId].every(Boolean) && addResponseStatus === 'idle'

  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        setAddResponseStatus('pending')
        await dispatch(addNewPost({ title, content, user: userId })).unwrap()
        setTitle('')
        setContent('')
        setUserId('')
      } catch (err) {
        console.error('Failed to save the post: ', err)
      } finally {
        setAddResponseStatus('idle')
      }
    }
  }
  const onAuthorChanged = (e) => setUserId(e.target.value)

  const userOption = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ))

  const onTitleChanged = (e) => setTitle(e.target.value)
  const onContentChanged = (e) => setContent(e.target.value)

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
          <option disabled>Select a User</option>
          {userOption}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />

        <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
          Save Post
        </button>
      </form>
    </section>
  )
}

export default AddPostForm

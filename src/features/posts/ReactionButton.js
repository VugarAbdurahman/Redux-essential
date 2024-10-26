import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { reactionAdded } from './postsSlice'

const reactionEmoji = {
  thumbsUp: '👍',
  hooray: '🎉',
  heart: '❤️',
  rocket: '🚀',
  eyes: '👀',
}

export const ReactionButtons = ({ post }) => {
  const dispatch = useDispatch()
  const [clickedReaction, setClickedReaction] = useState({})

  const handleClickReaction = (name) => {
    dispatch(reactionAdded({ postId: post.id, reaction: name }))
    setClickedReaction((prev) => ({
      ...prev,
      [name]: true,
    }))
  }

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        onClick={() => handleClickReaction(name)}
        key={name}
        type="button"
        className="muted-button reaction-button"
        disabled={clickedReaction[name]}
      >
        {emoji} {post.reactions[name]}
      </button>
    )
  })

  return <div>{reactionButtons}</div>
}

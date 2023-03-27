import React from 'react'

const CommentCard = ( {comment}) => {
  return (
    <div className="comment">
      <h1 className="comment__author">{comment.author.email}:</h1>
      <p className="comment__content">{comment.content}</p>
      <p className="comment__date">{comment.createdAt}</p>
    </div>
  )
}

export default CommentCard
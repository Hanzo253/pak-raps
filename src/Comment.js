import React from "react";
import { useState } from "react";

const Comment = ({ comments, comment }) => {
  return (
    <div>
      <li key={comment.id} className="comment">
        <div className="comment-author">
          <img
            src={comment.userImage}
            className="profile-image author-image"
            alt="user avatar"
          />
          <p className="author-name">{comment.userName}</p>
        </div>
        <div className="comment-content">{comment.description}</div>
      </li>
    </div>
  );
};

export default Comment;

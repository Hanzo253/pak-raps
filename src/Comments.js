import React from "react";
import { useState } from "react";
import { useAuthContext } from "./auth/useAuthContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

import { auth } from "./firebase/config";
import { database } from "./firebase/config";
import {
  collection,
  addDoc,
  Timestamp,
  deleteDoc,
  doc,
} from "firebase/firestore";
// import useCollection from "./useCollection/useCollection";
import Comment from "./Comment";

const Comments = ({ songs, index, comments }) => {
  // const { documents } = useCollection("comments", [
  //   "commentId",
  //   "==",
  //   songs[index - 1].id,
  // ]);
  const [newComment, setNewComment] = useState("");
  const [newCommentId, setNewCommentId] = useState(songs[index - 1].id);
  const { user } = useAuthContext();

  const addNewComment = async (event) => {
    event.preventDefault();
    // const ref = collection(database, 'comments');

    // if (songs[index - 1].id === 1) {
    //   console.log("Setting the comment");
    //   setNewCommentId(1);
    // }

    // console.log(songs[index - 1].id);

    if (newComment === "") {
      alert(
        "Please type something into the comment text box before submitting it."
      );
    } else {
      await addDoc(collection(database, "comments"), {
        commentId: newCommentId,
        uid: user.uid,
        userName: user.displayName,
        userImage: user.photoURL,
        description: newComment,
        timeCreated: Timestamp.fromDate(new Date()),
      });
    }

    // await addDoc(collection(database, "comments"), {
    //   commentId: newCommentId,
    //   userName: user.displayName,
    //   userImage: user.photoURL,
    //   description: newComment,
    //   timeCreated: Timestamp.fromDate(new Date()),
    // });
    setNewComment("");
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  const submitComment = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      addNewComment(event);
    }
  };

  const deleteComment = async (commentId) => {
    const ref = doc(database, "comments", commentId);
    await deleteDoc(ref);
  };

  return (
    <section className="comments-section">
      <h1 className="heading">Comments</h1>
      {comments && (
        <ul className="comments-list">
          {comments.map(
            (comment) =>
              comment.commentId === songs[index - 1].id && (
                <li key={comment.id} className="comment">
                  <div className="comment-author">
                    <img
                      src={comment.userImage}
                      className="profile-image author-image"
                      alt="user avatar"
                    />
                    <p className="author-name">{comment.userName}</p>
                    <p className="comment-date">
                      {formatDistanceToNow(comment.timeCreated.toDate(), {
                        addSuffix: true,
                      })}
                    </p>
                    {comment.uid === auth.currentUser.uid && (
                      <button
                        className="delete-comment"
                        onClick={() => deleteComment(comment.id)}
                      >
                        Delete comment
                      </button>
                    )}
                  </div>
                  <div className="comment-content">{comment.description}</div>
                </li>
              )
          )}
        </ul>
      )}
      <form onSubmit={addNewComment} className="add-comment-form">
        <div class="row">
          <div class="col-25">
            <label className="edit-label" for="new-comment">
              Add a comment:
            </label>
          </div>
          <div class="col-75">
            <textarea
              name="new-comment"
              cols="50"
              rows="5"
              className="comment-textarea"
              onChange={(e) => setNewComment(e.target.value)}
              value={newComment}
              placeholder="Add a comment..."
              onKeyPress={(event) => submitComment(event)}
              required
            ></textarea>
          </div>
        </div>
        <input type="submit" value="Comment" className="submit-btn" />
      </form>
    </section>
  );
};

export default Comments;

import { useSelector, useDispatch } from "react-redux";
import CommentUserAvatar from "./CommentUserAvatar";
import CommentsHeader from "./CommentsHeader";
import CommentActions from "./CommentActions";
import { getAvatar } from "../utils";
import { useState } from "react";
import { editComment } from "../redux/slice/commentsSlice";

const Comment = ({ comment, isReply }) => {
  const { users } = useSelector((state) => state.users);
  const [editText, setEditText] = useState(comment.comment);
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();

  const commentedUser = users.find((user) => user.id === comment.userId);

  const handleOnEditTextChange = (event) => {
    setEditText(event.target.value);
  };

  const handleOnEditText = (event) => {
    event.preventDefault();
    dispatch(editComment({ commentId: comment.id, editedComment: editText }));
    setIsEditing(false);
  }

  return (
    <div className="comments">
      <article className={`comment ${isReply ? "comment--reply" : ""}`}>
        <CommentUserAvatar comment={comment} commentedUser={commentedUser} />
        <div className="comment__content">
          <CommentsHeader
            comment={comment}
            commentedUser={commentedUser}
            isReply={isReply}
          />
          {isEditing ? (
            <form className="comment__content__edit__form" onSubmit={handleOnEditText}>
              <input
                className="comment__content__edit__input"
                value={editText}
                onChange={handleOnEditTextChange}
              />
            </form>
          ) : (
            <div className="comment__content__text">{comment.comment}</div>
          )}
          <CommentActions comment={comment} setIsEditing={setIsEditing} />
        </div>
      </article>

      {comment.replies.length > 0
        ? comment.replies.map((reply) => (
            <div className="comments" key={reply.id}>
              <Comment comment={reply} isReply />
            </div>
          ))
        : null}
    </div>
  );
};

export default Comment;

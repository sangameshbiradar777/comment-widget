import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { likeComment, deleteComment } from "../redux/slice/commentsSlice";
import CommentBox from "./CommentBox";
import Error from "./Error";

const CommentActions = ({ comment, setIsEditing }) => {
  const { currentUser } = useSelector((state) => state.users);
  const [isReplying, setIsReplying] = useState(false);
  const dispatch = useDispatch();
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState({});
  const isUserLikedComment = comment.likedBy.includes(currentUser?.id);

  useEffect(() => {
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  }, [currentUser]);

  const showError = (type) => {
    setIsError(true);
    setError({ message: `You need to login first to ${type} any comment` });
  }

  const handleOnLikeComment = () => {
    if (!currentUser) {
      showError('like');
      return;
    }
    dispatch(likeComment({ userId: currentUser.id, commentId: comment.id }));
  };

  const handleOnEditText = () => {
    setIsEditing((prevState) => !prevState);
  };

  const handleOnDeleteComment = () => {
    dispatch(deleteComment(comment.id));
  };

  return (
    <div className="comment__actions">
      <div className="comment__actions__btns">
        <button
          onClick={handleOnLikeComment}
          className="btn comment__actions__btn comment__actions__btn--like"
        >
          <ion-icon
            name={`heart${isUserLikedComment ? "" : "-outline"}`}
          ></ion-icon>
          <span>Like {comment.likedBy.length}</span>
        </button>
        <button
          onClick={() => setIsReplying((prevState) => !prevState)}
          className="btn comment__actions__btn comment__actions__btn--reply"
        >
          <ion-icon name="return-up-back-outline"></ion-icon>
          <span>Reply</span>
        </button>
        {comment.userId === currentUser?.id && (
          <>
            <button
              onClick={handleOnEditText}
              className="btn comment__actions__btn comment__actions__btn--edit"
            >
              <ion-icon name="create-outline"></ion-icon>
              <span>Edit</span>
            </button>
            <button
              onClick={handleOnDeleteComment}
              className="btn comment__actions__btn comment__actions__btn--delete"
            >
              <ion-icon name="trash-outline"></ion-icon>
              <span>Delete</span>
            </button>
          </>
        )}
      </div>

      {isReplying && (
        <CommentBox
          isReply
          repliedToComment={comment}
          isReplying={isReplying}
          setIsReplying={setIsReplying}
        />
      )}

      {isError && <Error message={error.message} />}
    </div>
  );
};

export default CommentActions;

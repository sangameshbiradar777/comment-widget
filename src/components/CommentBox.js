import "../styles/CommentBox.css";
import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addComment, addReply } from "../redux/slice/commentsSlice";
import { AVATAR_BASE_URL } from "../config";
import Error from "./Error";

const CommentBox = ({ isReply, repliedToComment, isReplying, setIsReplying }) => {
  const MAX_CHARACTER_LENGTH = 200;
  const [comment, setComment] = useState("");
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState({});
  const replyInputRef = useRef();

  const currentUser = useSelector((state) => state.users.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isReply) return;

    if (isReplying) replyInputRef.current.focus();
  }, [isReplying])

  const handleOnCommentChange = (event) => {
    if (event.target.value.length <= MAX_CHARACTER_LENGTH) {
      setIsError(false);
      setError({});
      setComment(event.target.value);
    } else {
      setIsError(true);
      setError({
        message: `You can add a maximum of ${MAX_CHARACTER_LENGTH} characters`,
      });
    } 
  };

  const handleOnCommentSumbit = (event) => {
    event.preventDefault();

    if (!currentUser) {
      setIsError(true);
      setError({message: 'You need to Login first to join the discussion'});
      return;
    }
    if (isReply) {
      dispatch(addReply({ comment, userId: currentUser.id, repliedToUser: repliedToComment.userId, repliedToComment: repliedToComment.id }))
      setIsReplying(false);
    }
    else {
      dispatch(addComment({ userId: currentUser.id, comment }));
    }
    setComment('');
  };

  return (
    <form className="comment-box" onSubmit={handleOnCommentSumbit}>
      <div className="comment-box__user-img-container">
        <img
          className="comment-box__user-img"
          src={currentUser ? currentUser.avatar : AVATAR_BASE_URL}
          alt="Avatar"
        />
      </div>
      <div className="comment-box__input-container">
        <input
          ref={replyInputRef}
          onChange={handleOnCommentChange}
          value={comment}
          className="comment-box__input"
          type="text"
          aria-label="comment input"
          placeholder={isReply ? "Reply" : "Join the discussion..."}
          maxLength={200}
        />
        {isError && <Error message={error.message} />}
      </div>
    </form>
  );
};

export default CommentBox;

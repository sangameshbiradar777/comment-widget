import { useSelector } from "react-redux";
import { getFormattedTime } from '../utils';

const CommentsHeader = ({ comment, isReply, commentedUser }) => {
  const { users } = useSelector((state) => state.users);
  let repliedToUser = isReply
    ? users.find((user) => user.id === comment.repliedToUser)
    : null;

  return (
    <header>
      <div className="comment__content__info">
        <span className="comment__content__info__username">
          {commentedUser.name}
        </span>
        {isReply && (
          <>
            <span className="comment__content__info__replied-to-user">
              <ion-icon name="arrow-redo"></ion-icon>
              {repliedToUser.name}
            </span>
          </>
        )}

        <span className="comment__content__info__commented-at">
          {getFormattedTime(comment.commentedAt)}
        </span>
      </div>
    </header>
  );
};

export default CommentsHeader;

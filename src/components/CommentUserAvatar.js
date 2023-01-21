const CommentUserAvatar = ({ comment, commentedUser }) => {
  return (
    <div className="comment__user-img-container">
      <img
        className="comment__user-img"
        src={commentedUser.avatar}
        alt="Avatar"
      />
    </div>
  );
}

export default CommentUserAvatar;
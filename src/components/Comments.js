import { useSelector } from "react-redux";
import Comment from "./Comment";
import "../styles/Comments.css";

const Comments = () => {
  const comments = useSelector((state) => state.comments);
  const commentsElement = comments.map((comment) => (
      <Comment key={comment.id} comment={comment} />
  ));

  return <section className="comments-container">{commentsElement}</section>;
};

export default Comments;

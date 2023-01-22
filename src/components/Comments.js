import { useSelector } from "react-redux";
import Comment from "./Comment";
import "../styles/Comments.css";
import { useEffect } from "react";

const Comments = () => {
  
  const comments = useSelector((state) => state.comments);
  const commentsElement = comments.map((comment) => (
      <Comment key={comment.id} comment={comment} />
  ));

  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(comments));
  }, [comments]);

  return <section className="comments-container">{commentsElement}</section>;
};

export default Comments;

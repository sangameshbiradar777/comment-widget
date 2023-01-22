import { createSlice } from "@reduxjs/toolkit";
import initialComments from "../../data/initialComments";
import { nanoid } from "nanoid";

const createComment = ({ userId, comment }) => {
  return {
    id: nanoid(),
    userId,
    commentedAt: new Date().getTime(),
    comment,
    isReply: false,
    likedBy: [],
    replies: [],
  };
};

const createReply = (comment, userId, repliedToComment, repliedToUser) => {
  let reply = createComment({ userId, comment });
  reply = {
    ...reply,
    isReply: true,
    repliedToUser,
    repliedToComment,
  };

  return reply;
};

const getTargetComment = (comments, commentId) => {
  if (comments.length === 0) return null;

  if (comments[0].id === commentId) return comments[0];

  return (
    getTargetComment(comments[0].replies, commentId) ||
    getTargetComment(comments.slice(1), commentId)
  );
};

const addReplyToComment = (
  comments,
  comment,
  userId,
  repliedToComment,
  repliedToUser
) => {
  if (comments.length === 0) return null;

  if (comments[0].id === repliedToComment) {
    const newReply = createReply(
      comment,
      userId,
      repliedToComment,
      repliedToUser
    );
    comments[0].replies.unshift(newReply);
    return comments;
  }

  return (
    addReplyToComment(
      comments[0].replies,
      comment,
      userId,
      repliedToComment,
      repliedToUser
    ) ||
    addReplyToComment(
      comments.slice(1),
      comment,
      userId,
      repliedToComment,
      repliedToUser
    )
  );
};

const deleteReply = (comments, commentId) => {
  if (comments.length === 0) return [];

  if (comments[0].id === commentId) {
    return comments.filter((comment) => comment.id !== commentId);
  }

  comments[0].replies = deleteReply(comments[0].replies, commentId);

  return [comments[0]].concat(deleteReply(comments.slice(1), commentId));
};

const commentsSlice = createSlice({
  name: "comments",
  initialState: localStorage.getItem("comments")
    ? JSON.parse(localStorage.getItem("comments"))
    : initialComments,
  reducers: {
    addComment: (comments, action) => {
      const newComment = createComment(action.payload);
      comments.unshift(newComment);
    },
    addReply: (comments, action) => {
      const { comment, userId, repliedToUser, repliedToComment } =
        action.payload;
      
      addReplyToComment(
        comments,
        comment,
        userId,
        repliedToComment,
        repliedToUser
      );
    },
    likeComment: (comments, action) => {
      const { userId, commentId } = action.payload;
      const targetComment = getTargetComment(comments, commentId);
      if (targetComment.likedBy.includes(userId)) {
        targetComment.likedBy = targetComment.likedBy.filter(
          (likedUserId) => likedUserId !== userId
        );
      } else {
        targetComment.likedBy.push(userId);
      }
      comments = comments.map((comment) => {
        if (comment.id === targetComment.id) return targetComment;
        return comment;
      });
    },
    editComment: (comments, action) => {
      const { commentId, editedComment } = action.payload;
      let targetComment = getTargetComment(comments, commentId);
      targetComment.comment = editedComment;

      comments = comments.map((comment) => {
        if (comment.id === targetComment.id) return targetComment;
        return comment;
      });
    },
    deleteComment: (comments, action) => {
      const targetCommentIndex = comments.findIndex(
        (comment) => comment.id === action.payload
      );
      if (targetCommentIndex >= 0) {
        comments.splice(targetCommentIndex, 1);
      } else {
        deleteReply(comments, action.payload);
      }
    },
    sortByNewestFirst: (comments) => {
      comments = comments.sort(
        (comment1, comment2) => comment2.commentedAt - comment1.commentedAt
      );
    },
    sortByMostLikes: (comments) => {
      comments = comments.sort(
        (comment1, comment2) =>
          comment2.likedBy.length - comment1.likedBy.length
      );
    },
  },
});

export default commentsSlice.reducer;
export const {
  addComment,
  addReply,
  likeComment,
  editComment,
  deleteComment,
  sortByNewestFirst,
  sortByMostLikes,
} = commentsSlice.actions;

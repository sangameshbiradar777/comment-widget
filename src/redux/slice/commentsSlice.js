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
    replies: []
  }
}

const createReply = (comment, userId, repliedToComment, repliedToUser) => {
  let reply = createComment({userId, comment});
  reply = {
    ...reply,
    isReply: true,
    repliedToUser,
    repliedToComment
  }

  return reply;

}

const getTargetComment = (comments, commentId) => {
  if (comments.length === 0) return null;

  if (comments[0].id === commentId) return comments[0];

  return getTargetComment(comments[0].replies, commentId) || getTargetComment(comments.slice(1), commentId);
}

const addReplyToComment = (comments, comment, userId, repliedToComment, repliedToUser) => {
  if (comments.length === 0) return null;

  if (comments[0].id === repliedToComment) {
    const newReply = createReply(comment, userId, repliedToComment, repliedToUser);
    comments[0].replies.unshift(newReply);
    return comments;
  }

  return addReplyToComment(comments[0].replies, comment, userId, repliedToComment, repliedToUser) || addReplyToComment(comments.slice(1), comment, userId, repliedToComment, repliedToUser);
}

const deleteCommentAndGetUpdatedComments = (comments, commentId) => {
  if (comments.length === 0) return null;

  if (comments[0].id === commentId) {
    console.log('match');
    comments.splice(0, 1);
    return;
  }

  return (
    deleteCommentAndGetUpdatedComments(comments[0].replies, commentId) ||
    deleteCommentAndGetUpdatedComments(comments.slice(1), commentId)
  );
}

const commentsSlice = createSlice({
  name: "comments",
  initialState: initialComments,
  reducers: {
    addComment: (comments, action) => {
      const newComment = createComment(action.payload);
      comments.unshift(newComment)
    },
    addReply: (comments, action) => {
      const { comment, userId, repliedToUser, repliedToComment } = action.payload;
      console.log('addre', repliedToUser);
      const newComments = addReplyToComment(comments, comment, userId, repliedToComment, repliedToUser);
      console.log(newComments);
    },
    likeComment: (comments, action) => {
      const { userId, commentId } = action.payload;
      const targetComment = getTargetComment(comments, commentId);
      if (targetComment.likedBy.includes(userId)) {
        targetComment.likedBy = targetComment.likedBy.filter(likedUserId => likedUserId !== userId);
      }
      else {
        targetComment.likedBy.push(userId);
      }
      comments = comments.map(comment => {
        if (comment.id === targetComment.id) return targetComment;
        return comment;
      })
    },
    editComment : (comments, action) => {
      const { commentId, editedComment } = action.payload;
      let targetComment = getTargetComment(comments, commentId);
      targetComment.comment = editedComment;

      comments = comments.map(comment => {
        if (comment.id === targetComment.id) return targetComment;
        return comment;
      })
    },
    deleteComment: (comments, action) => {
      deleteCommentAndGetUpdatedComments(comments, action.payload);
    }
  },
});

export default commentsSlice.reducer;
export const { addComment, addReply, likeComment, editComment, deleteComment } = commentsSlice.actions;
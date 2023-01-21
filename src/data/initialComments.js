const comments = [
  {
    id: 1,
    userId: 1,
    commentedAt: 1674324923305,
    comment: "Hi, Need to complete the comment widget",
    likedBy: [3, 4],
    isReply: false,
    isEdited: false,

    replies: [
      {
        id: 2,
        userId: 2,
        commentedAt: 1674324923600,
        comment: "Hi, I am a doctor",
        isReply: true,
        repliedToUser: 1,
        repliedToComment: 1,
        isEdited: false,

        likedBy: [],
        replies: [],
      },
      {
        id: 3,
        userId: 3,
        commentedAt: 1674324923705,
        comment: "Hi, I am a Tester",
        isReply: true,
        repliedToUser: 2,
        repliedToComment: 1,
        isEdited: false,

        likedBy: [1, 4],
        replies: [
          {
            id: 4,
            userId: 4,
            commentedAt: 1674324923805,
            comment: "Hi, I am a Java develepor",
            isReply: true,
            repliedToUser: 3,
            repliedToComment: 2,
            isEdited: false,

            likedBy: [1, 3],
            replies: [
              {
                id: 5,
                userId: 1,
                commentedAt: 1674324929305,
                comment: "Hi, I am a doctor",
                isReply: true,
                repliedToUser: 4,
                repliedToComment: 4,
                isEdited: false,

                likedBy: [],
                replies: [],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 6,
    userId: 4,
    commentedAt: 1674324923205,
    comment: "Hi, I am a Tester at Tata consultancy services",
    isReply: false,
    isEdited: false,

    likedBy: [],
    replies: [],
  },
  {
    id: 7,
    userId: 1,
    commentedAt: 1674324921305,
    comment: "Hi, I am a doctor",
    isEdited: false,

    isReply: true,
    likedBy: [1, 3],
    replies: [],
  },
];

export default comments;

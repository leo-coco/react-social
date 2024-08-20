export const mockComments = () => [
  {
    id: 1,
    content: "Post Content",
    userId: 1,
    postId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    "user": {
      "firstName": "Eldora",
      "lastName": "Stehr"
    }
  },
  {
    id: 2,
    content: "Post Content",
    userId: 1,
    postId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
    "user": {
      "firstName": "Eldora",
      "lastName": "Stehr"
    }
  },
  {
    id: 3,
    content: "Post Content",
    userId: 2,
    postId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
    "user": {
      "firstName": "John",
      "lastName": "John"
    }
  },
]


export const mockCommentPostResponse = () => ({
  id: 1,
  "content": "content",
  "postId": 1,
  "userId": 1,
  "createdAt": new Date(),
  "updatedAt": new Date(),
  "user": {
    "id": 1,
    "email": "Renee63@gmail.com",
    "firstName": "Shanon",
    "lastName": "Hermann"
  }
})
export default class Comment {
  id: string
  content: string
  createdAt: Date
  updatedAt: Date
  discussionId: string
  author: string

  constructor(
    id: string,
    content: string,
    createdAt: Date,
    updatedAt: Date,
    discussionId: string,
    author: string
  ) {
    this.id = id
    this.content = content
    this.createdAt = createdAt
    this.updatedAt = updatedAt
    this.discussionId = discussionId
    this.author = author
  }
}

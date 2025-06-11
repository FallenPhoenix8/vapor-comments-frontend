import User from "./User"
import Comment from "./Comment"

export type Status = "active" | "inactive"
export default class Participant {
  id: string
  discussionId: string
  user: User
  joinedAt: Date
  lastActiveAt: Date
  status: Status
  comments: Comment[]
  isAuthor: boolean

  constructor(
    id: string,
    discussionId: string,
    user: User,
    joinedAt: Date,
    lastActiveAt: Date = new Date(),
    status: Status,
    comments: Comment[],
    isAuthor: boolean
  ) {
    this.id = id
    this.discussionId = discussionId
    this.user = user
    this.joinedAt = joinedAt
    this.lastActiveAt = lastActiveAt
    this.status = status
    this.comments = comments
    this.isAuthor = isAuthor
  }
}

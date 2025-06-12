import User from "./User"
import Comment from "./Comment"
import axios from "axios"

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

  static async getParticipantById(
    discussionId: string,
    participantId: string
  ): Promise<Participant> {
    try {
      const response = await axios.get(
        `${User.apiUrl}/api/discussions/${discussionId}/participants/${participantId}`,
        {
          withCredentials: true,
        }
      )
      return response.data as Participant
    } catch (error) {
      console.error(error)
      throw new Error("Failed to fetch participant data: " + error)
    }
  }
}

import User from "./User"
import Comment from "./Comment"
import axios from "axios"
import Discussion from "./Discussion"

export type Status = "active" | "inactive"
export default class Participant {
  id: string
  discussion: Discussion
  user: User
  joinedAt: Date
  lastActiveAt: Date
  status: Status
  comments: Comment[]
  isAuthor: boolean

  constructor(
    id: string,
    discussion: Discussion,
    user: User,
    joinedAt: Date,
    lastActiveAt: Date = new Date(),
    status: Status,
    comments: Comment[],
    isAuthor: boolean
  ) {
    this.id = id
    this.discussion = discussion
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

  static async getParticipantByUserId(
    discussionId: string,
    userId: string
  ): Promise<Participant> {
    try {
      const response = await axios.get(
        `${User.apiUrl}/api/discussions/${discussionId}/participants/user/${userId}`,
        {
          withCredentials: true,
        }
      )
      return new Participant(
        response.data.id,
        response.data.discussion,
        response.data.user,
        response.data.joinedAt,
        response.data.lastActiveAt,
        response.data.status,
        response.data.comments,
        response.data.isAuthor
      )
    } catch (error) {
      console.error(error)
      throw new Error("Failed to fetch participant data: " + error)
    }
  }

  async leaveDiscussion() {
    try {
      const res = await axios.delete(
        `${User.apiUrl}/api/discussions/${this.discussion.id}/leave`,
        {
          withCredentials: true,
        }
      )
      if (!(res.status === 200 || res.status === 201)) {
        console.error(res.statusText)
        throw new Error("Failed to leave discussion: " + res.statusText)
      }
    } catch (error) {
      console.error(error)
      throw new Error("Failed to leave discussion: " + error)
    }
  }

  async deleteAllComments() {
    try {
      const res = await axios.delete(
        `${User.apiUrl}/api/discussions/${this.discussion.id}/participants/${this.id}/comments`,
        {
          withCredentials: true,
        }
      )
      if (!(res.status === 200 || res.status === 201)) {
        console.error(res.statusText)
        throw new Error("Failed to delete comments: " + res.statusText)
      }
    } catch (error) {
      console.error(error)
      throw new Error("Failed to delete comments: " + error)
    }
  }
}

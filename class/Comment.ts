import axios from "axios"
import User from "./User"
import type Participant from "./Participant"

export default class Comment {
  id: string
  content: string
  createdAt: Date
  updatedAt: Date
  discussionId: string
  participant: Participant

  constructor(
    id: string,
    content: string,
    createdAt: Date,
    updatedAt: Date,
    discussionId: string,
    participant: Participant
  ) {
    this.id = id
    this.content = content
    this.createdAt = createdAt
    this.updatedAt = updatedAt
    this.discussionId = discussionId
    this.participant = participant
  }

  static async all() {}

  static async addComment(
    discussionId: string,
    content: string
  ): Promise<Comment | null> {
    try {
      const response = await axios.post(
        `${User.apiUrl}/api/discussions/${discussionId}/comments/add?content=${content}`,
        {},
        {
          withCredentials: true,
        }
      )
      if (!(response.status === 200 || response.status === 201)) {
        return null
      } else {
        return response.data as Comment
      }
    } catch (error) {
      console.error(error)
      throw new Error(`Error adding comment: ${error}`)
    }
  }
}

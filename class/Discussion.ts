import User from "./User"
import Comment from "./Comment"
import Participant from "./Participant"
import axios from "axios"

export default class Discussion {
  id: string
  title: string
  picture: string | null
  createdAt: Date
  updatedAt: Date
  author: User
  comments: Comment[]
  participants: Participant[]

  constructor(
    id: string,
    title: string,
    picture: string | null = null,
    createdAt: Date,
    updatedAt: Date,
    author: User,
    comments: Comment[],
    participants: Participant[]
  ) {
    this.id = id
    this.title = title
    this.picture = picture
    this.createdAt = createdAt
    this.updatedAt = updatedAt
    this.author = author
    this.comments = comments
    this.participants = participants
  }

  static async all(): Promise<Discussion[] | null> {
    try {
      const response = await axios.get(`${User.apiUrl}/api/discussions`)
      return response.data as Discussion[]
    } catch (error) {
      console.error(error)
      return null
    }
  }

  static async getDiscussionWithDetails(
    discussionId: string
  ): Promise<Discussion> {
    try {
      const response = await axios.get(
        `${User.apiUrl}/api/discussions/${discussionId}/details`,
        {
          withCredentials: true,
        }
      )
      return response.data as Discussion
    } catch (error) {
      console.error(error)
      throw new Error("Failed to fetch discussion details: " + error)
    }
  }
}

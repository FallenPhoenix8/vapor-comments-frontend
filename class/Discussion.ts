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

  static async create(title: string) {
    try {
      const res = await axios.post(
        `${User.apiUrl}/api/discussions/create/${title}`,
        {},
        {
          withCredentials: true,
        }
      )
      return Discussion.all()
    } catch (error) {
      console.error(error)
      throw new Error("Failed to create discussion: " + error)
    }
  }

  static async isTitleTaken(title: string) {
    try {
      const res = await axios.get(
        `${User.apiUrl}/api/discussions/is-title-taken/${title}`
      )
      return res.data as boolean
    } catch (error) {
      console.error(error)
      throw new Error("Failed to check if title is taken: " + error)
    }
  }

  static async deleteAllParticipants(discussionId: string) {
    try {
      const res = await axios.delete(
        `${User.apiUrl}/api/discussions/${discussionId}/participants/delete`,
        {
          withCredentials: true,
        }
      )
      if (!(res.status === 200 || res.status === 201)) {
        console.error(res.statusText)
        throw new Error("Failed to delete participants: " + res.statusText)
      }
    } catch (error) {
      console.error(error)
      throw new Error("Failed to delete participants: " + error)
    }
  }

  static async delete(discussionId: string) {
    try {
      await Discussion.deleteAllParticipants(discussionId)
      const res = await axios.delete(
        `${User.apiUrl}/api/discussions/${discussionId}/delete`,
        {
          withCredentials: true,
        }
      )
      if (!(res.status === 200 || res.status === 201)) {
        console.error(res.statusText)
        throw new Error("Failed to delete discussion: " + res.statusText)
      }
      return Discussion.all()
    } catch (error) {
      console.error(error)
      throw new Error("Failed to delete discussion: " + error)
    }
  }
}

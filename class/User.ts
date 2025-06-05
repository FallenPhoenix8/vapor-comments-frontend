import axios from "axios"

export default class User {
  id: string | null
  username: string | null
  static apiUrl = import.meta.env.VITE_API_URL

  constructor(id: string | null, username: string | null) {
    this.id = id
    this.username = username
  }

  static async login(username: string, password: string) {
    try {
      await axios.post(
        `${User.apiUrl}/api/auth/login`,
        {
          username,
          password,
        },
        { withCredentials: true }
      )

      console.log("User logged in successfully. Getting user data...")
    } catch (error) {
      console.error(error)
      throw new Error("Failed to login user " + error)
    }

    try {
      const userData = await axios.get(`${User.apiUrl}/api/auth/me`, {
        withCredentials: true,
      })

      if (userData.data.error) {
        throw new Error("Failed to fetch user data: " + userData.data.reason)
      }
      console.log("User data fetched successfully.")

      return new User(userData.data.id, userData.data.username)
    } catch (error) {
      console.error(error)
      throw new Error("Failed to fetch user")
    }
  }

  static async register(
    username: string,
    password: string,
    confirmPassword: string
  ) {
    try {
      const response = await axios.post(
        `${User.apiUrl}/api/auth/register`,
        {
          username,
          password,
          confirmPassword,
        },
        {
          withCredentials: true,
        }
      )

      if (!response.data.error) {
        console.log("User registered successfully. Logging in...")
        return await User.login(username, password)
      } else {
        console.log(response)
        throw new Error("Failed to register user: " + response.data.reason)
      }
    } catch (error) {
      console.error(error)
      throw new Error("Failed to register user")
    }
  }

  public async isAuthorized() {
    try {
      const response = await axios.get("/api/auth/me")

      return response.status === 200 || response.status === 201
    } catch (err) {
      console.error(err)
      return false
    }
  }
}

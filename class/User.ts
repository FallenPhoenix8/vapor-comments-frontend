import axios from "axios"

export default class User {
  id: string | null
  username: string | null
  profilePicture: string | null
  static apiUrl = import.meta.env.VITE_API_URL

  constructor(
    id: string | null,
    username: string | null,
    profilePicture: string | null
  ) {
    this.id = id
    this.username = username
    this.profilePicture = profilePicture
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

      return new User(
        userData.data.id,
        userData.data.username,
        userData.data.profilePicture
      )
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

  // public async isAuthorized() {
  //   try {
  //     const response = await axios.get(`${User.apiUrl}/api/auth/me`)

  //     return response.status === 200 || response.status === 201
  //   } catch (err) {
  //     console.error(err)
  //     return false
  //   }
  // }

  static async getUserById(id: string) {
    try {
      const response = await axios.get(`${User.apiUrl}/api/users/${id}`)
      return response.data as User
    } catch (error) {
      console.error(error)
      throw new Error("Failed to fetch user data: " + error)
    }
  }

  async logout() {
    console.log("Logging out user...")
    try {
      await axios.get(`${User.apiUrl}/api/auth/logout`, {
        withCredentials: true,
      })
      // useCookie("token").value = null
      // document.cookie = "token=test; maxAge=1; path=/;"
      console.log("User logged out successfully.")
      return true
    } catch (error) {
      console.error(error)
      throw new Error("Failed to logout user: " + error)
    }
    // navigateTo("/", {
    //   redirectCode: 301,
    // })
  }

  static async isUserNameExists(username: string): Promise<boolean> {
    if (!username) {
      return false
    }

    console.log("Checking if username exists...")
    try {
      const res = await axios.get(`${User.apiUrl}/api/auth/username-exists`, {
        params: {
          username,
        },
      })

      return res.data.exists as boolean
    } catch (error) {
      // console.error(error)
      return false
    }
  }

  async isParticipant(ofDiscussionId: string): Promise<boolean> {
    try {
      const res = await axios.get(
        `${User.apiUrl}/api/discussions/${ofDiscussionId}/is-participant`,
        {
          withCredentials: true,
        }
      )
      return res.data as boolean
    } catch (error) {
      console.error(error)
      throw new Error("Failed to check if user is participant: " + error)
    }
  }

  async joinDiscussion(discussionId: string) {
    try {
      const res = await axios.post(
        `${User.apiUrl}/api/discussions/${discussionId}/join`,
        {},
        {
          withCredentials: true,
        }
      )
      if (!(res.status === 200 || res.status === 201)) {
        console.error(res.statusText)
        throw new Error("Failed to join discussion: " + res.statusText)
      }
    } catch (error) {
      console.error(error)
      throw new Error("Failed to join discussion: " + error)
    }
  }
}

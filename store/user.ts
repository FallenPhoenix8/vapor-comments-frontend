import User from "~/class/User"
import axios from "axios"

export default defineStore("user", () => {
  const state = ref<User | null>()
  getMe().then((user) => (state.value = user))
  const user = computed(() => state.value)
  // const isAuthenticated = computed(() => state.value !== null)

  async function isAuthenticated() {
    return await User.isAuthenticated()
  }

  async function login(username: string, password: string) {
    state.value = await User.login(username, password)
  }

  async function register(
    username: string,
    password: string,
    confirmPassword: string
  ) {
    state.value = await User.register(username, password, confirmPassword)
  }

  async function logout() {
    if (!state.value) {
      console.error("User is not logged in")
      return
    }

    await state.value.logout()
    state.value = null
    return navigateTo("/", {
      replace: true,
      redirectCode: 301,
    })
  }

  async function getMe(): Promise<User | null> {
    // checking if user is authenticated
    try {
      const res = await axios.get(`${User.apiUrl}/api/auth/me`, {
        withCredentials: true,
      })
      if (res.data.error) {
        return null
      }
      if (!res.data.id || !res.data.username) {
        return null
      }
      const user = new User(
        res.data.id,
        res.data.username,
        res.data.profilePicture
      )
      return user
    } catch (error) {
      return null
    }
  }

  return {
    user,
    isAuthenticated,
    login,
    register,
    logout,
  }
})

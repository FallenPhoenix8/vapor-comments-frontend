import User from "~/class/User"

export default defineEventHandler(async (event) => {
  // try {
  //   const apiUrl = useRuntimeConfig().public.apiUrl
  //   const response = await fetch(`${apiUrl}/auth/me`, {
  //     headers: event._headers,
  //   })
  //   if (response.status === 401) {
  //     return new User(null, null)
  //   } else if (response.ok !== true) {
  //     throw new Error("Failed to fetch user")
  //   }
  //   const user = await response.json()
  //   return new User(user.id, user.username, true)
  // } catch {
  //   return new User(null, null)
  // }
})

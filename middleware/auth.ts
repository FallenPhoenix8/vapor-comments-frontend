import axios from "axios"

function redirect(path: string = "/") {
  return navigateTo(path, {
    redirectCode: 301,
    replace: true,
  })
}

export async function isAuthenticated() {
  //   const token = useCookie("token").value
  //   if (!token) {
  //     return false
  //   }

  //   // checking if user is authenticated
  //   axios.defaults.headers.common["Authorization"] = `Bearer ${token}`

  let isAuthenticated: null | boolean = null

  try {
    const response = await axios.get(
      `${useRuntimeConfig().public.apiUrl}/api/auth/is-authenticated`,
      {
        withCredentials: true,
      }
    )
    if (response.data as boolean) {
      isAuthenticated = response.data as boolean
    }
  } catch (error) {
    console.error(error)
    isAuthenticated = false
  }

  console.log("IS AUTHENTICATED", isAuthenticated)
  return isAuthenticated
}

export default defineNuxtRouteMiddleware(async (to, from) => {
  //   console.log("Middleware running")

  //   const auth = await isAuthenticated()

  //   if (!auth) {
  //     return navigateTo("/", { redirectCode: 301, replace: true })
  //   }
  if ((await useUser().isAuthenticated()) === false) return redirect()
})

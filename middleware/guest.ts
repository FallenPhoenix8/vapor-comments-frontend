import { isAuthenticated } from "./auth"

function redirect() {
  return navigateTo("/", {
    redirectCode: 301,
    replace: true,
  })
}

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (useUser().isAuthenticated) return redirect()
})

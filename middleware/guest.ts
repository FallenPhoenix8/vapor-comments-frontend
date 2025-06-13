import { isAuthenticated } from "./auth"

function redirect() {
  return navigateTo("/", {
    redirectCode: 301,
    replace: true,
  })
}

export default defineNuxtRouteMiddleware(async (to, from) => {
  // console.log("Guest middleware executed in", navigator.userAgent)
  if (await useUser().isAuthenticated()) return redirect()
})

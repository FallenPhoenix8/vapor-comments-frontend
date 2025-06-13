import tailwindcss from "@tailwindcss/vite"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      // Will be available on both server and client
      apiUrl: process.env.API_URL,
      contactEmail: process.env.CONTACT_EMAIL,
    },
  },
  routeRules: {
    "/app/**": {
      ssr: false,
      appMiddleware: {
        auth: true,
      },
    },
    "/auth/register": {
      appMiddleware: {
        guest: true,
      },
    },
    "/auth/login": {
      appMiddleware: {
        guest: true,
      },
    },
  },
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  modules: [
    "@nuxtjs/color-mode",
    "@nuxt/icon",
    "@nuxt/fonts",
    "@nuxt/image",
    "motion-v/nuxt",
    "@pinia/nuxt",
  ],
})

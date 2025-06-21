<script setup lang="ts">
import User from "~/class/User"
import useUserStore from "~/store/user"
const state = reactive({
  username: "",
  password: "",
})

const apiUrl = useRuntimeConfig().public.apiUrl

const isLoading = ref<boolean>(false)

const error = ref<string | null>(useRoute().query.error?.toString() || null)

function checkUsername(username: string): boolean {
  if (!username.trim()) {
    return false
  } else {
    return true
  }
}

function checkPassword(password: string): boolean {
  if (!password.trim()) {
    return false
  } else {
    return true
  }
}

async function handleSubmit(event: Event) {
  isLoading.value = true
  const { target } = event
  const form = target as HTMLFormElement
  const formData = new FormData(form)
  const action = form.action

  const username = formData.get("username") as string
  const password = formData.get("password") as string

  if (!username || !password) {
    navigateTo(useRoute().path + "?error=All+fields+are+required")
    isLoading.value = false
    return
  }

  try {
    // const userStore = useUserStore()
    // const user = await User.login(username, password)
    // console.log(user)
    const user = useUserStore()
    console.log(user.login)
    await user.login(username, password)

    isLoading.value = false
    navigateTo("/app", {
      replace: true,
      redirectCode: 301,
    })
  } catch (error) {
    console.error(error)
    isLoading.value = false
    navigateTo(useRoute().path + "?error=" + error)
  }
}

const isFilledCorrectly = computed(() => {
  return (
    checkUsername(state.username) === true &&
    checkPassword(state.password) === true
  )
})
</script>
<template>
  <AppPopupAlert @close="error = null" :show="!!error">
    Error logging in: {{ error }}
  </AppPopupAlert>
  <form
    :action="`${apiUrl}/api/auth/login`"
    class="auth-form"
    method="post"
    @submit.prevent="handleSubmit"
  >
    <header>
      <h2 class="text-center">Welcome back!</h2>
    </header>
    <main class="flex flex-col gap-5 mx-auto md:w-fit">
      <FormTextInput
        name="username"
        icon="material-symbols:person"
        @update:modelValue="(newValue) => (state.username = newValue)"
      />

      <FormTextInput
        name="password"
        type="password"
        @update:modelValue="(newValue) => (state.password = newValue)"
      />

      <p class="text-sm">
        Don't have an account?
        <NuxtLink to="/auth/register">You can register here!</NuxtLink>
      </p>

      <Button class="btn" :is-loading="isLoading" :disabled="!isFilledCorrectly"
        >Login</Button
      >
    </main>
  </form>
</template>

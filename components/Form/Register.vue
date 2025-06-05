<script setup lang="ts">
import type { RegisterFieldCorrectStatus } from "~/types/RegisterFieldCorrectStatus"
import axios from "axios"
import User from "~/class/User"

type PasswordValidationResult = {
  isCorrect: boolean
  reasons: string[]
}

const route = useRoute()
const apiUrl = useRuntimeConfig().public.apiUrl

const success = ref<string | null>(route.query.success?.toString() || null)
const errorMessage = ref<string | null>(route.query.error?.toString() || null)

const isLoading = ref<boolean>(false)

const state = reactive<{
  username: string
  password: string
  confirmPassword: string
}>({
  username: "",
  password: "",
  confirmPassword: "",
})

watch(state, () => {
  console.log(state)
})

function checkUsername(username: string) {
  if (username === null) {
    return null
  }

  const isCorrectLength = username.length >= 5
  // TODO: check if username is available

  const result: RegisterFieldCorrectStatus | null = {
    isCorrect: isCorrectLength,
    reasons: [],
  }

  !isCorrectLength &&
    result.reasons.push("Username must be at least 5 characters long")

  return result
}

function checkPassword(password: string) {
  if (password === null) {
    return null
  }

  const isCorrectLength = password.length >= 8
  const hasDigit = /[0-9]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasUppercase = /[A-Z]/.test(password)
  const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>\-_=+]/.test(password)

  const isStrongPassword =
    isCorrectLength &&
    hasDigit &&
    hasLowercase &&
    hasUppercase &&
    hasSpecialCharacter

  const result: PasswordValidationResult = {
    isCorrect: isStrongPassword,
    reasons: [],
  }

  !isCorrectLength &&
    result.reasons.push("Password must be at least 8 characters long")
  !hasDigit && result.reasons.push("Password must contain at least one digit")
  !hasLowercase &&
    result.reasons.push("Password must contain at least one lowercase letter")
  !hasUppercase &&
    result.reasons.push("Password must contain at least one uppercase letter")
  !hasSpecialCharacter &&
    result.reasons.push("Password must contain at least one special character")

  return result
}

function checkConfirmPassword(confirmPassword: string) {
  if (confirmPassword === null) {
    return null
  }

  const result: PasswordValidationResult = {
    isCorrect:
      checkPassword(state.password)?.isCorrect === true &&
      confirmPassword === state.password,
    reasons: [],
  }

  confirmPassword !== state.password &&
    result.reasons.push("Passwords do not match")

  return result
}

const isFilledCorrectly = computed(() => {
  return (
    checkUsername(state.username)?.isCorrect === true &&
    checkPassword(state.password)?.isCorrect === true &&
    checkConfirmPassword(state.confirmPassword)?.isCorrect === true
  )
})

async function handleSubmit(event: Event) {
  isLoading.value = true
  const { target } = event
  const formData = new FormData(target as HTMLFormElement)
  const action = (target as HTMLFormElement).action

  const username = formData.get("username") as string
  const password = formData.get("password") as string
  const confirmPassword = formData.get("confirmPassword") as string

  const path = route.path

  if (!checkConfirmPassword(confirmPassword)?.isCorrect) {
    navigateTo(path + "?error=Passwords+do+not+match")
    return
  }

  if (!checkPassword(password)?.isCorrect) {
    navigateTo(path + "?error=Password+is+not+strong+enough")
    return
  }

  if (!checkUsername(username)?.isCorrect) {
    navigateTo(path + "?error=Username+is+incorrect")
    return
  }

  if (!username || !password || !confirmPassword) {
    navigateTo(path + "?error=All+fields+are+required")
    return
  }

  try {
    const user = await User.register(username, password, confirmPassword)
    console.log(user)
    isLoading.value = false
  } catch (error) {
    console.error(error)
    isLoading.value = false
    errorMessage.value =
      "Error registering user. Please check the console for further information."
    navigateTo(`${path}?error=${error}`)
  }
}
</script>
<template>
  <form
    :action="`${apiUrl}/api/auth/register`"
    class="auth-form"
    @submit.prevent="handleSubmit"
  >
    <header>
      <h2 class="text-center">Register</h2>
    </header>
    <main class="flex mx-auto md:w-fit">
      <aside class="flex flex-col gap-5">
        <FormTextInput
          name="username"
          icon="material-symbols:person"
          @update:modelValue="(newValue) => (state.username = newValue)"
          :checker="checkUsername"
          :is-register="true"
        />
        <FormTextInput
          name="password"
          type="password"
          @update:modelValue="(newValue) => (state.password = newValue)"
          :checker="checkPassword"
          :is-register="true"
        />
        <FormTextInput
          name="confirmPassword"
          type="password"
          @update:modelValue="(newValue) => (state.confirmPassword = newValue)"
          :checker="checkConfirmPassword"
          :is-register="true"
          placeholder="Confirm your password..."
          :no-label="true"
        />
        <ClientOnly>
          <Button :disabled="!isFilledCorrectly" :is-loading="isLoading">
            Register
          </Button>
        </ClientOnly>
      </aside>

      <aside>
        <Alert :message="success" type="success" v-if="success" />
        <Alert :message="errorMessage" type="error" v-if="errorMessage" />
      </aside>
    </main>
  </form>
</template>

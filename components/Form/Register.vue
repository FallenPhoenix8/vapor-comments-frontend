<script setup lang="ts">
import type { RegisterFieldCorrectStatus } from "~/types/RegisterFieldCorrectStatus"

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

  const result = {
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

  const result = {
    isCorrect:
      checkPassword(state.password)?.isCorrect &&
      confirmPassword === state.password,
    reasons: [],
  }

  confirmPassword !== state.password &&
    result.reasons.push("Passwords do not match")

  return result
}

function handleSubmit(event: SubmitEvent) {
  console.log(event.target)
}
</script>
<template>
  <form action="#" class="auth-form" @submit.prevent="handleSubmit">
    <header>
      <h2 class="text-center">Register</h2>
    </header>
    <main class="flex flex-col gap-5 mx-auto md:w-fit">
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
      <Button>Register</Button>
    </main>
  </form>
</template>

<script setup lang="ts">
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

  return isCorrectLength
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

  return isStrongPassword
}

function checkConfirmPassword(confirmPassword: string) {
  if (confirmPassword === null) {
    return null
  }

  return confirmPassword === state.password
}
</script>
<template>
  <form action="#" class="auth-form">
    <header>
      <h2 class="text-center">Register</h2>
    </header>
    <main class="flex flex-col gap-5">
      <FormTextInput
        name="username"
        icon="material-symbols:person"
        @update:modelValue="(newValue) => (state.username = newValue)"
        :checker="checkUsername"
        :is-register="true"
      />
      <FormTextInput
        name="password"
        icon="material-symbols:key"
        type="password"
        @update:modelValue="(newValue) => (state.password = newValue)"
        :checker="checkPassword"
        :is-register="true"
      />
      <FormTextInput
        name="confirmPassword"
        icon="material-symbols:key"
        type="password"
        @update:modelValue="(newValue) => (state.confirmPassword = newValue)"
        :checker="checkConfirmPassword"
        :is-register="true"
      />
    </main>
  </form>
</template>

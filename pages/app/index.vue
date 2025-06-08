<script setup lang="ts">
import User from "~/class/User"
const user = useUser()
definePageMeta({
  middleware: ["auth"],
})

function logout() {
  user.logout()
}
function logData() {
  console.log(user.user)
}
</script>
<template>
  <main class="min-h-screen flex items-center justify-center">
    <Button @click="logout()" v-if="user.user">Logout</Button>
    <Button @click="logData()" v-if="user.user">Log data</Button>
  </main>
</template>

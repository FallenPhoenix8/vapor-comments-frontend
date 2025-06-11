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
<template></template>

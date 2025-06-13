<script setup lang="ts">
import User from "~/class/User"
const user = useUser()

useTitle().setPageTitle("Vapor Comments | App")

function logout() {
  user.logout()
}
function logData() {
  console.log(user.user)
}
</script>
<template>
  <AppDiscussionList />
</template>

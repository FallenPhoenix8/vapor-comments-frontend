<script setup lang="ts">
const user = useUser()
function logout() {
  return user.logout()
}
</script>
<template>
  <!-- <main> -->
  <section
    id="profile"
    class="m-2 md:m-8 lg:m-16 p-6 bg-secondary shadow-md shadow-secondary-darker rounded-base"
  >
    <h2>Profile of {{ user.user?.username }}!</h2>

    <section id="management" class="p-2 rounded-base">
      <h3 class="text-muted">You can manage your account here</h3>
      <div class="flex justify-evenly p-2">
        <Button @click="logout()" v-if="user.user">Logout</Button>
      </div>
    </section>
  </section>
  <!-- </main> -->
</template>

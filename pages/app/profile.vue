<script setup lang="ts">
const user = useUser()
function logout() {
  return user.logout()
}

useTitle().setPageTitle(`Profile | ${user.user?.username}`)
</script>
<template>
  <section
    id="profile"
    class="m-2 md:m-8 lg:m-16 p-6 bg-secondary shadow-md shadow-secondary-darker rounded-base"
  >
    <div>
      <img
        :src="user.user?.profilePicture ?? '/img/profile-placeholder.png'"
        :alt="'Profile picture of ' + user.user?.username"
        class="rounded-full aspect-square h-16 object-cover"
      />
    </div>
    <h2>Profile of {{ user.user?.username }}!</h2>

    <section id="management" class="p-2 rounded-base">
      <h3 class="text-muted">You can manage your account here</h3>
      <div class="flex justify-end p-2">
        <Button @click="logout()" v-if="user.user">Logout</Button>
      </div>
    </section>
  </section>
</template>
<style scoped>
#profile {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: 1fr auto;
}

#management {
  grid-area: 2 / 1 / 3 / 3;
}
</style>

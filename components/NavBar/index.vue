<script setup lang="ts">
import User from "~/class/User"
// const user = await useUser()
// const user: Ref<User | null> = ref(null)

// onMounted(async () => {
//   const userData = await useUser()
//   user.value = userData.value
//   console.log(user.value)
// })
const user = useUser()
</script>

<template>
  <nav class="flex justify-between items-center px-2 pt-2 mb-2 z-50 gap-1">
    <ColorModeToggle />

    <!-- <NavBarWrapper> -->
    <!-- <NavBarItem
      :complementary="true"
      v-if="!user?.authorized"
      :is-padding="false"
      > -->
    <NavBarWrapper>
      <h3 class="px-3 text-center md:text-start">{{ useTitle().state }}</h3>
    </NavBarWrapper>
    <!-- <NavbarWrapper v-if="!user.isAuthenticated"></NavbarWrapper> -->
    <NavBarTryItButton class="" v-if="!user.user" />
    <NavBarDiscussion v-else />
    <!-- </NavBarItem> -->
    <!-- </NavBarWrapper> -->
  </nav>
</template>

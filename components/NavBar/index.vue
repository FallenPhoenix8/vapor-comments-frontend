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
  <nav
    class="fixed left-0 right-0 bottom-5 md:bottom-auto flex justify-center md:justify-between items-center px-5 z-50"
  >
    <ColorModeToggle />

    <!-- <NavBarWrapper> -->
    <!-- <NavBarItem
      :complementary="true"
      v-if="!user?.authorized"
      :is-padding="false"
      > -->
    <NavbarWrapper v-if="!user.isAuthenticated"></NavbarWrapper>
    <NavBarTryItButton
      class="fixed right-1 top-1 md:static"
      v-if="!user.user"
    />
    <NavBarDiscussion v-else />
    <!-- </NavBarItem> -->
    <!-- </NavBarWrapper> -->
  </nav>
</template>

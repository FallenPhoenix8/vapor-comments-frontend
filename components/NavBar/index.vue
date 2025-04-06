<script setup lang="ts">
const user = await useUser()
</script>

<template>
  <nav
    class="fixed left-0 right-0 bottom-5 md:bottom-auto flex justify-center md:justify-between items-center px-5 z-50"
  >
    <ColorModeToggle />

    <NavBarDiscussion />
    <!-- <NavBarWrapper> -->
    <!-- <NavBarItem
        :complementary="true"
        v-if="!user?.authorized"
        :is-padding="false"
      > -->
    <NavBarTryItButton class="fixed right-1 top-1 md:static" />
    <!-- </NavBarItem> -->
    <!-- </NavBarWrapper> -->
  </nav>
</template>

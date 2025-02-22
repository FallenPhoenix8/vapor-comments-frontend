<script setup lang="ts">
import { animate, stagger } from "motion"
const user = await useUser()

onMounted(() => {
  slideIn()
})

function slideIn() {
  animate(
    '[data-role="nav-wrapper"]',
    {
      marginTop: "calc(var(--spacing) * 4)",
      opacity: 1,
    },
    {
      delay: stagger(0.2),
      duration: 0.3,
      ease: "easeIn",
    }
  )
}
</script>

<template>
  <Transition :css="false">
    <nav
      class="fixed left-0 right-0 bottom-5 md:bottom-auto flex justify-center md:justify-between items-center px-5 z-50"
    >
      <ColorModeToggle />

      <NavBarWrapper>
        <NavBarItem>About</NavBarItem>
        <NavBarItem :is-icon="true">
          <Icon
            name="mingcute:home-3-fill"
            class="h-10 w-10 duration-150"
            mode="svg"
          />
        </NavBarItem>
        <NavBarItem>Features</NavBarItem>
      </NavBarWrapper>
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
  </Transition>
</template>

<script setup lang="ts">
const isAppPath = useRoute().path.includes("app")
</script>
<template>
  <NavBarWrapper class="clip-circle">
    <!-- <NavBarItem>About</NavBarItem>
    <NavBarItem :is-icon="true">
      <Icon name="mingcute:home-3-fill" class="h-5 w-5" mode="css" />
    </NavBarItem>
    <NavBarItem>Features</NavBarItem> -->

    <NavBarItem
      :is-icon="true"
      :is-padding="false"
      :href="isAppPath ? '/' : '/app'"
    >
      <Icon
        :name="isAppPath ? 'mingcute:book-6-fill' : 'mingcute:home-3-fill'"
        mode="css"
      />
    </NavBarItem>
    <!-- <div class="h-10 w-10 bg-black test"></div> -->
  </NavBarWrapper>
</template>
<style scoped>
.item {
  height: calc(var(--spacing) * 12);
  width: calc(var(--spacing) * 12);
}
</style>

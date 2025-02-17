<script setup>
const props = defineProps({
  href: {
    type: String,
    required: false,
    default: () => "#",
  },
  complementary: Boolean,
  isIcon: Boolean,
})
</script>
<template>
  <li
    class="flex rounded-full hover:bg-primary-lighter dark:hover:bg-primary-darker has-focus:bg-primary-lighter dark:has-focus:bg-primary-darker justify-center items-center min-h-full px-2 py-1"
    :class="{
      'gradient-complementary': complementary,
      'hover:bg-transparent dark:hover:bg-transparent has-focus:bg-transparent dark:has-focus:bg-transparent':
        isIcon,
    }"
  >
    <a
      :href="href"
      class="no-underline flex justify-center items-center group"
      tabindex="0"
    >
      <slot />
    </a>
  </li>
</template>

<style scoped></style>

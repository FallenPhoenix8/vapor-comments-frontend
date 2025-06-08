<script setup>
const props = defineProps({
  href: {
    type: String,
    required: false,
    default: () => "#",
  },

  isIcon: Boolean,
  isPadding: {
    type: Boolean,
    required: false,
    default: () => true,
  },
})
</script>
<template>
  <li
    class="item clip-circle flex rounded-base justify-center items-center min-h-full"
    :class="{
      'is-icon': isIcon,
      'px-2 py-1': isPadding,
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

<style scoped>
.item {
  &:hover,
  &:has(:focus) {
    background-color: var(--color-primary-lighter);
    @media (prefers-color-scheme: dark) {
      background-color: var(--color-primary-darker);
    }
  }
}

.item.is-icon {
  background-color: transparent;
  @media (prefers-color-scheme: dark) {
    background-color: transparent;
  }
}
</style>

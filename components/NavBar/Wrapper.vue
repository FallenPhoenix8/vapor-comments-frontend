<template>
  <ul
    class="nav-bar-wrapper bg-secondary-darker/50 rounded-full flex space-x-2"
    data-role="nav-wrapper"
    :class="$attrs.class"
    style="opacity: 0.5"
  >
    <slot></slot>
  </ul>
</template>

<style scoped>
.nav-bar-wrapper *:not(.iconify) {
  transition-property: color, background-color, border-color, outline-color,
    text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via,
    filter, --tw-gradient-to;
  transition-duration: 0.3s;
}
</style>

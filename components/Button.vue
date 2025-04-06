<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    onClick?: (payload: MouseEvent) => void
  }>(),
  {
    onClick: () => {},
  }
)

const isActive = ref(false)

function setActiveTrue() {
  isActive.value = true
}

function setActiveFalse() {
  isActive.value = false
}
</script>

<template>
  <button
    class="btn"
    :class="{ active: isActive }"
    @mouseenter="setActiveTrue"
    @mouseleave="setActiveFalse"
    @focusin="setActiveTrue"
    @focusout="setActiveFalse"
    @click="props.onClick"
  >
    <slot />
  </button>
</template>

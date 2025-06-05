<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    onClick?: (payload: MouseEvent) => void
    isLoading?: boolean
    disabled?: boolean
  }>(),
  {
    onClick: () => {},
    isLoading: false,
    disabled: false,
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
    @click="$props.onClick"
    :disabled="$props.isLoading || $props.disabled"
  >
    <LoaderSpinner v-if="$props.isLoading" class="mx-auto" />
    <slot v-else />
  </button>
</template>

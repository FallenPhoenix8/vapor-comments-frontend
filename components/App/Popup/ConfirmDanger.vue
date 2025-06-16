<script setup lang="ts">
const props = defineProps<{ show: boolean }>()
const emit = defineEmits(["close", "confirm"])
</script>
<template>
  <AppPopup :show="props.show" @close="emit('close')">
    <p>
      <slot />
    </p>
    <div class="flex justify-evenly mt-3">
      <Button @click="emit('close')">No</Button>
      <Button variant="danger" @click="emit('confirm')">Yes</Button>
    </div>
  </AppPopup>
</template>

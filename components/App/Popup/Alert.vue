<script setup lang="ts">
const props = defineProps<{ show: boolean }>()
const emit = defineEmits(["close"])
</script>
<template>
  <AppPopup :show="props.show" @close="emit('close')">
    <p>
      <slot />
    </p>
    <div class="flex justify-evenly mt-3">
      <Button variant="danger" @click="emit('close')">Ok</Button>
    </div>
  </AppPopup>
</template>

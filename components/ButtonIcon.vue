<script setup lang="ts">
const props = defineProps<{
  name: string
}>()
</script>
<template>
  <button class="p-1 cursor-pointer" :class="$attrs.class">
    <Icon :name="props.name" class="inline" mode="svg" />
  </button>
</template>

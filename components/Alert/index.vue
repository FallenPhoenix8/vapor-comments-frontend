<script setup lang="ts">
export type AlertType = "success" | "error"
type Props = {
  message: string
  type: AlertType
}
const props = defineProps<Props>()
</script>
<template>
  <div class="alert" role="alert" :class="$props.type">
    <h4>{{ props.type }}</h4>
    <p>{{ props.message }}</p>
  </div>
</template>

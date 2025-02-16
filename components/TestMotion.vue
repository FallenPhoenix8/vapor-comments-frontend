<script setup lang="ts">
import { animate } from "motion"

async function onEnter(el: Element, onComplete: () => void) {
  await animate(el, { opacity: 1 })
  onComplete()
}

const count = ref(0)
</script>

<template>
  <Transition :css="false" @enter="onEnter">
    <h1 v-if="count > 0">Hello world</h1>
  </Transition>
  <button @click="() => count++" class="block">Click me!</button>
  <Button :onClick="() => count++">Click me</Button>
</template>

<style scoped>
h1 {
  opacity: 0;
}
</style>

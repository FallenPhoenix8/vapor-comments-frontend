<script setup lang="ts">
import { motion } from "motion-v"
const props = defineProps<{ show: boolean }>()
const emit = defineEmits(["close"])
</script>
<template>
  <AnimatePresence>
    <motion.div
      class="popup-wrapper"
      @click="emit('close')"
      :initial="{ opacity: 0 }"
      :animate="{ opacity: 1 }"
      :exit="{ opacity: 0 }"
      v-show="props.show"
    >
      <motion.div
        class="popup"
        role="dialog"
        v-if="props.show"
        :initial="{ opacity: 0, scale: 0 }"
        :animate="{ opacity: 1, scale: 1 }"
        :exit="{ opacity: 0, scale: 0 }"
        @click="(e) => e.stopPropagation()"
      >
        <div class="flex justify-end">
          <button class="cursor-pointer" @click="emit('close')">
            <Icon name="material-symbols:close" class="text-2xl" />
          </button>
        </div>
        <slot></slot>
      </motion.div>
    </motion.div>
  </AnimatePresence>
</template>

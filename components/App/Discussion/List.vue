<script setup lang="ts">
import Discussion from "~/class/Discussion"
const props = defineProps<{ discussions: Discussion[] }>()
console.log(props.discussions)
const emit = defineEmits(["show:delete-discussion"])
</script>
<template>
  <div
    class="discussion-list flex flex-col gap-2 mx-auto px-1 md:px-3 lg:px-6 max-w-md"
    :class="$attrs.class"
  >
    <AppDiscussionCard
      v-for="discussion in discussions"
      :discussion="discussion"
      :key="discussion.id"
      @show:delete-discussion="emit('show:delete-discussion', $event as string)"
    />
  </div>
</template>

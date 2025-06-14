<script setup lang="ts">
import Discussion from "~/class/Discussion"
const apiUrlBase = useRuntimeConfig().public.apiUrl
const { data: discussions } = await useAsyncData("discussions", () =>
  Discussion.all()
)
console.log(discussions.value)
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
    />
  </div>
</template>

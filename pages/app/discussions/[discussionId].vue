<script setup lang="ts">
import Discussion from "~/class/Discussion"
import Comment from "~/class/Comment"

const route = useRoute()
const discussionId = route.params.discussionId as string

const { data: discussionDetails } = await useAsyncData(
  "discussionDetails",
  () => Discussion.getDiscussionWithDetails(discussionId)
)

const comments = ref<Comment[]>(discussionDetails.value?.comments ?? [])

const title = computed(() => discussionDetails.value?.title)

useHead({
  title: `Discussion | ${title.value}`,
})

console.log(discussionDetails.value)

const socket = new WebSocket(
  `${useRuntimeConfig().public.apiUrl}/api/discussions/${discussionId}/ws`
)
socket.addEventListener("open", () => {
  console.log(`Successfully connected to socket of discussion ${discussionId}.`)
})
socket.addEventListener("message", async (message) => {
  const detailsJSON = await message.data.text()
  const details = JSON.parse(detailsJSON)
  discussionDetails.value = details
})

async function addComment(content: string) {
  Comment.addComment(discussionId, content)
}

watch(discussionDetails, () => {
  console.log("Details updated: ", discussionDetails.value)
})
</script>
<template>
  <main
    v-if="discussionDetails?.comments && discussionDetails.comments.length > 0"
    class="wrapper px-2 my-2"
  >
    <AppCommentList :comments="discussionDetails.comments" />
  </main>
  <main v-else class="wrapper flex justify-center items-center px-10">
    <h4>
      There is nothing to see here...<br />
      Be the first one to comment something!
    </h4>
  </main>
  <AppCommentInputArea class="mx-2" @update:comments="addComment" />
</template>
<style scoped>
.wrapper {
  height: 75vh;
}
</style>

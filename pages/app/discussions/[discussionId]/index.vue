<script setup lang="ts">
import Comment from "~/class/Comment"
import useDiscussionDetails from "~/composables/useDiscussion"

const route = useRoute()
const discussionId = route.params.discussionId as string

// const { data: discussionDetails } = await useAsyncData(
//   "discussionDetails",
//   () => Discussion.getDiscussionWithDetails(discussionId)
// )

const discussion = await useDiscussion(discussionId)

const comments = ref<Comment[]>(discussion.details?.comments ?? [])

const title = computed(() => discussion.details?.title)

useTitle().setPageTitle(`Discussion | ${title.value}`)

console.log(discussion.details)

// const socket = new WebSocket(
//   `${useRuntimeConfig().public.apiUrl}/api/discussions/${discussionId}/ws`
// )
// socket.addEventListener("open", () => {
//   console.log(`Successfully connected to socket of discussion ${discussionId}.`)
// })
// socket.addEventListener("message", async (message) => {
//   const detailsJSON = await message.data.text()
//   const details = JSON.parse(detailsJSON)
//   discussionDetails.value = details
// })

async function addComment(content: string) {
  Comment.addComment(discussionId, content)
}

watch(discussion, () => {
  console.log("Details updated: ", discussion.details)
})
</script>
<template>
  <main class="wrapper px-2 my-2">
    <AppDiscussionControls
      :discussionId="discussionId"
      class="my-2"
      @leave="
        discussion.disconnect(
          'User left discussion. WebSocket connection closed.'
        )
      "
    />
    <AppCommentList
      :comments="discussion?.details?.comments || []"
      :key="JSON.stringify(comments)"
    />
    <main
      v-if="discussion.details?.comments?.length === 0"
      class="wrapper flex justify-center items-center px-10"
    >
      <h4 class="text-muted">
        There is nothing to see here...<br />
        Be the first one to comment something!
      </h4>
    </main>
  </main>

  <AppCommentInputArea class="mx-2 mt-12" @update:comments="addComment" />
</template>
<style scoped>
.wrapper {
  height: 75vh;
}
</style>

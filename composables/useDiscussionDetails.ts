import Discussion from "~/class/Discussion"

export default async (discussionId: string) => {
  const { data: discussionDetails } = await useAsyncData(
    `discussion-details-${discussionId}`,
    () => Discussion.getDiscussionWithDetails(discussionId)
  )

  const socket = new WebSocket(
    `${useRuntimeConfig().public.apiUrl}/api/discussions/${discussionId}/ws`
  )
  socket.addEventListener("open", () => {
    console.log(
      `Successfully connected to socket of discussion ${discussionId}.`
    )
  })
  socket.addEventListener("message", async (message) => {
    const detailsJSON = await message.data.text()
    const details = JSON.parse(detailsJSON)
    discussionDetails.value = details
  })

  const discussion = reactive({
    details: discussionDetails,
    socket,
  })

  return discussion
}

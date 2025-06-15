<script setup lang="ts">
import Participant from "~/class/Participant"

const discussionId = useRoute().params.discussionId as string
const discussion = await useDiscussion(discussionId)
console.log(discussion.details?.participants)

async function leaveDiscussion() {
  const participant = await Participant.getParticipantByUserId(
    discussionId,
    useUser().user?.id as string
  )

  await participant.leaveDiscussion()
  await navigateTo("/app")
}
</script>
<template>
  <AppParticipantList
    :participants="discussion.details?.participants ?? []"
    :discussion-title="discussion.details?.title ?? ''"
    :discussion-id="discussionId"
    @leave-discussion="leaveDiscussion()"
  />
</template>

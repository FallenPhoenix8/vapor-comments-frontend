<script setup lang="ts">
import Participant from "~/class/Participant"

const props = defineProps<{
  discussionId: string
}>()

const emit = defineEmits(["leave"])

async function leaveDiscussion(discussionId: string) {
  const userId = useUser().user?.id
  if (!userId) {
    console.error("User is not logged in")
    return
  }

  const participant = await Participant.getParticipantByUserId(
    discussionId,
    userId
  )

  if (!participant) {
    console.error("Participant not found")
    return
  }

  await participant.deleteAllComments()
  await participant.leaveDiscussion()

  emit("leave")

  await navigateTo("/app")
}
</script>
<template>
  <div
    class="flex justify-between rounded-base px-1 md:px-3 bg-secondary-darker/50"
    :class="$attrs.class"
  >
    <ButtonIcon
      name="pepicons-pop:leave"
      @click="leaveDiscussion(props.discussionId)"
    />
    <NuxtLink :to="`/app/discussions/${props.discussionId}/participants`">
      <ButtonIcon name="fluent:people-12-filled" />
    </NuxtLink>
  </div>
</template>

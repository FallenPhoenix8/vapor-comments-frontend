<script setup lang="ts">
import Participant from "~/class/Participant"
const props = defineProps<{
  participants: Participant[]
  discussionTitle: string
  discussionId: string
}>()
const { data: userParticipant } = useAsyncData("user-participant", () =>
  Participant.getParticipantByUserId(
    props.discussionId,
    useUser().user?.id as string
  )
)

function isUserYourself(participantId: string): boolean {
  const result =
    userParticipant.value && participantId === userParticipant.value.id

  return !!result
}

const emit = defineEmits(["leave-discussion"])
</script>
<template>
  <div class="participant-list">
    <h2 class="title">
      Participants of
      <i>
        {{ props.discussionTitle }}
      </i>
      discussion
    </h2>
    <div class="content">
      <AppParticipantCard
        v-for="participant in props.participants"
        :participant="participant"
        :key="participant.id"
        :class="{
          '-order-1': isUserYourself(participant.id),
        }"
        :is-participant-yourself="isUserYourself(participant.id)"
        @leave-discussion="emit('leave-discussion')"
      />
    </div>
  </div>
</template>

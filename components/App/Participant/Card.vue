<script setup lang="ts">
import Participant from "~/class/Participant"
const props = defineProps<{
  participant: Participant
  isParticipantYourself: boolean
}>()

const { data: participantDetails } = await useAsyncData(
  `participant-details-${props.participant.id}`,
  () =>
    Participant.getParticipantById(
      props.participant.discussion.id as string,
      props.participant.id as string
    )
)

const emit = defineEmits(["leave-discussion"])
</script>
<template>
  <div class="participant-card" :class="$attrs.class">
    <div class="profile-picture">
      <img
        :src="
          participantDetails?.user?.profilePicture ??
          '/img/profile-placeholder.png'
        "
        :alt="`profile picture of ${participantDetails?.user?.username}`"
      />
    </div>
    <div>
      <h3>
        {{ isParticipantYourself ? "You" : participantDetails?.user?.username }}
      </h3>
      <div v-if="isParticipantYourself" class="flex gap-2">
        <Button @click="emit('leave-discussion')">Leave</Button>
      </div>
    </div>
  </div>
</template>

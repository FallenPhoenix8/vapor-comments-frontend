<script setup lang="ts">
import Comment from "~/class/Comment"
import Participant from "~/class/Participant"
const props = defineProps<{ comment: Comment }>()

const participant = ref<Participant>(
  await Participant.getParticipantById(
    props.comment.discussionId,
    props.comment.participant.id
  )
)

async function getIsAuthorOfComment(): Promise<boolean> {
  return participant.value.user.id === useUser().user?.id
}

const isAuthorOfComment = ref<boolean>(await getIsAuthorOfComment())

// watch(participant, () => {
console.log("Participant of this comment: ", participant.value)
// })
</script>
<template>
  <div
    class="comment"
    :class="{
      owned: isAuthorOfComment,
    }"
  >
    <h4 class="heading" v-if="participant.user && participant.user.username">
      {{ isAuthorOfComment ? "You" : participant.user.username }}
      <div class="profile-picture">
        <img
          :src="
            participant.user?.profilePicture ?? '/img/profile-placeholder.png'
          "
          :alt="`profile picture of ${participant.user?.username}`"
        />
      </div>
    </h4>
    <p class="content">
      {{ props.comment.content }}
    </p>
  </div>
</template>

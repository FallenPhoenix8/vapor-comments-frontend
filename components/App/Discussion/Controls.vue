<script setup lang="ts">
import Participant from "~/class/Participant"

const props = defineProps<{
  discussionId: string
}>()

const emit = defineEmits(["leave"])

const participant = ref<Participant | null>(null)
async function getYourParticipant() {
  participant.value = await Participant.getParticipantByUserId(
    props.discussionId,
    useUser().user?.id as string
  )
  console.log(participant.value)
}

onMounted(async () => {
  getYourParticipant()
})

watch(useUser(), async () => {
  getYourParticipant()
})

async function leaveDiscussion() {
  if (!participant) {
    console.error("Participant not found")
    return
  }

  await participant.value?.deleteAllComments()
  await participant.value?.leaveDiscussion()

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
      @click="leaveDiscussion()"
      v-if="participant && !participant.isAuthor"
    />
    <NuxtLink :to="`/app/discussions/${props.discussionId}/participants`">
      <ButtonIcon name="fluent:people-12-filled" />
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import Discussion from "~/class/Discussion"
import User from "~/class/User"

const props = defineProps<{ discussion: Discussion }>()
const emit = defineEmits(["show:delete-discussion"])

const { data: author } = await useAsyncData("author", () =>
  User.getUserById(props.discussion.author.id as string)
)

const isParticipant = ref<boolean>(
  (await useUser().user?.isParticipant(
    props.discussion.id as string
  )) as boolean
)

async function joinDiscussion(discussionId: string) {
  await useUser().user?.joinDiscussion(discussionId)
  isParticipant.value = true
}

const isAuthor = computed(
  () => useUser().user?.id === props.discussion.author.id
)
</script>

<template>
  <div
    class="discussion-card gap-1 flex flex-col rounded-base p-2 shadow-sm shadow-secondary-darker bg-secondary"
  >
    <div class="flex justify-between gap-3">
      <img
        :src="props.discussion.picture ?? '/img/discussion-placeholder.png'"
        :alt="'Profile picture of ' + props.discussion.title"
        class="rounded-full aspect-square h-16 object-cover"
      />
      <div class="discussion-card__content flex-1">
        <h3>
          {{ props.discussion.title }}
        </h3>
        <h4 class="text-muted">Created by {{ author?.username }}</h4>
      </div>
    </div>
    <div class="p-1 flex justify-end gap-2">
      <Button
        variant="danger"
        v-if="isAuthor"
        @click="emit('show:delete-discussion', props.discussion.id)"
        >Delete</Button
      >
      <Button v-if="!isParticipant" @click="joinDiscussion(props.discussion.id)"
        >Join</Button
      >
      <NuxtLink
        v-else
        :to="`/app/discussions/${props.discussion.id}`"
        class="btn-link"
        >Go to discussion</NuxtLink
      >
    </div>
  </div>
</template>

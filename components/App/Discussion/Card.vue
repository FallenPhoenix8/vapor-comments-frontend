<script setup lang="ts">
import Discussion from "~/class/Discussion"
import User from "~/class/User"

const props = defineProps<{ discussion: Discussion }>()

const { data: author } = await useAsyncData("author", () =>
  User.getUserById(props.discussion.author.id as string)
)

const isParticipant = await useUser().user?.isParticipant(
  props.discussion.id as string
)
</script>

<template>
  <div
    class="discussion-card gap-1 flex flex-col rounded-base p-2 shadow-sm shadow-secondary-darker bg-secondary"
  >
    <div class="flex justify-between gap-3">
      <img
        :src="props.discussion.picture ?? ''"
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
    <div class="p-1 flex justify-end">
      <Button :disabled="isParticipant">{{
        isParticipant ? "Already joined" : "Join"
      }}</Button>
    </div>
  </div>
</template>

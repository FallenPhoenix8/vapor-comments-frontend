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

const isActive = computed(() => participantDetails.value?.status === "active")
const lastActive = computed(() => participantDetails.value?.lastActiveAt)

const emit = defineEmits(["leave-discussion"])

function getTimeSince(lastActive: Date | string | number): {
  value: number
  unit: string
  formatted: string
} {
  const now = new Date()

  // Convert input to Date object if it isn't already
  let lastActiveDate: Date
  if (lastActive instanceof Date) {
    lastActiveDate = lastActive
  } else {
    lastActiveDate = new Date(lastActive)
  }

  // Check if the date is valid
  if (isNaN(lastActiveDate.getTime())) {
    return { value: 0, unit: "unknown", formatted: "unknown" }
  }

  const diffMs = now.getTime() - lastActiveDate.getTime()

  const seconds = Math.floor(diffMs / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const weeks = Math.floor(days / 7)
  const months = Math.floor(days / 30.44)
  const years = Math.floor(days / 365.25)

  if (years > 0) {
    return {
      value: years,
      unit: "year",
      formatted: `${years} year${years === 1 ? "" : "s"} ago`,
    }
  } else if (months > 0) {
    return {
      value: months,
      unit: "month",
      formatted: `${months} month${months === 1 ? "" : "s"} ago`,
    }
  } else if (weeks > 0) {
    return {
      value: weeks,
      unit: "week",
      formatted: `${weeks} week${weeks === 1 ? "" : "s"} ago`,
    }
  } else if (days > 0) {
    return {
      value: days,
      unit: "day",
      formatted: `${days} day${days === 1 ? "" : "s"} ago`,
    }
  } else if (hours > 0) {
    return {
      value: hours,
      unit: "hour",
      formatted: `${hours} hour${hours === 1 ? "" : "s"} ago`,
    }
  } else if (minutes > 0) {
    return {
      value: minutes,
      unit: "minute",
      formatted: `${minutes} minute${minutes === 1 ? "" : "s"} ago`,
    }
  } else if (seconds > 10) {
    return {
      value: seconds,
      unit: "second",
      formatted: `${seconds} seconds ago`,
    }
  } else {
    return { value: 0, unit: "second", formatted: "just now" }
  }
}

const timeSinceLastActive = computed(() =>
  lastActive.value ? getTimeSince(lastActive.value) : null
)
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
      <div class="heading">
        <h3>
          {{
            isParticipantYourself ? "You" : participantDetails?.user?.username
          }}
        </h3>
        <h4 class="status-text">
          <Icon
            name="material-symbols:circle"
            class="inline text-xs"
            :class="{
              'text-green-400': isActive,
            }"
            mode="css"
          />
          <span v-if="isActive">Online</span>
          <span v-else>Offline</span>
          <span v-if="lastActive && timeSinceLastActive">
            - {{ timeSinceLastActive.formatted }}</span
          >
        </h4>
      </div>

      <div v-if="isParticipantYourself" class="flex gap-2">
        <Button @click="emit('leave-discussion')">Leave</Button>
      </div>
    </div>
  </div>
</template>

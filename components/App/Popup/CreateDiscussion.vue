<script setup lang="ts">
import Discussion from "~/class/Discussion"
import type { RegisterFieldCorrectStatus } from "~/types/RegisterFieldCorrectStatus"

const props = defineProps<{ show: boolean }>()
const emit = defineEmits(["close", "update:discussions"])

const statusText = ref("")

async function titleChecker(
  title: string
): Promise<RegisterFieldCorrectStatus> {
  const isTitleTaken = await Discussion.isTitleTaken(title)
  const isTitleLengthValid = title.length >= 5

  const result: RegisterFieldCorrectStatus = {
    isCorrect: isTitleLengthValid && !isTitleTaken,
    reasons: [],
  }

  !isTitleLengthValid &&
    result.reasons.push("Title must be at least 5 characters long")
  isTitleTaken && result.reasons.push("Title is already taken")

  return result
}

async function handleSubmit(event: Event) {
  const { target } = event
  const form = target as HTMLFormElement
  if (!(await titleChecker(title.value)).isCorrect) {
    form.reset()
    return
  }

  const result = await Discussion.create(title.value)
  form.reset()
  emit("close")
  emit("update:discussions", result)
}

const title = ref("")
const isTitleCorrect = ref(false)

watch(title, async () => {
  isTitleCorrect.value = (await titleChecker(title.value)).isCorrect
})
</script>
<template>
  <AppPopup :show="props.show" @close="emit('close')">
    <form method="post" @submit.prevent="handleSubmit">
      <FormTextInput
        name="title"
        placeholder="Discussion title..."
        @update:model-value="title = $event"
        :check="true"
        :checker="titleChecker"
      />
      <p class="text-red-500 text-center text-sm" v-if="statusText">
        *{{ statusText }}
      </p>
      <div class="flex justify-center mt-3">
        <Button :disabled="!isTitleCorrect">Create</Button>
      </div>
    </form>
  </AppPopup>
</template>

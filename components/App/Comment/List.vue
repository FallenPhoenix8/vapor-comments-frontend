<script setup lang="ts">
import Comment from "~/class/Comment"
const props = defineProps<{ comments: Comment[] }>()

const list = ref<HTMLDivElement | null>(null)

function scrollToBottom() {
  if (list.value) {
    const isAlreadyAtBottom =
      list.value.scrollTop + list.value.offsetHeight >= list.value.scrollHeight
    if (!isAlreadyAtBottom) {
      list.value.scrollTo({
        top: list.value.scrollHeight,
        behavior: "smooth",
      })
    }
  }
}

onMounted(() => {
  scrollToBottom()
})

watch(
  () => props.comments.length,
  () => {
    if (list.value) {
      const isAlreadyAtBottom =
        list.value.scrollTop + list.value.offsetHeight >=
        list.value.scrollHeight
      if (!isAlreadyAtBottom) return
    }
    console.log("Comments updated: ", props.comments)
    setTimeout(() => scrollToBottom(), 100)
  }
)
</script>

<template>
  <div class="comments-list" ref="list">
    <AppCommentCard
      v-for="comment in props.comments"
      :comment="comment"
      :key="comment.id"
    />
  </div>
</template>

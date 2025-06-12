<script setup lang="ts">
const emit = defineEmits(["update:comments"])

const comment = ref("")
</script>
<template>
  <form
    @submit.prevent="
      () => {
        emit('update:comments', comment)
        comment = ''
      }
    "
    class="flex"
    :class="$attrs.class"
  >
    <textarea
      class="border border-secondary-darker rounded-base p-2 flex-1 resize-none"
      v-model="comment"
      placeholder="Write your comment..."
    ></textarea>
    <button
      class="clip-circle bg-complementary aspect-square w-11 h-11 flex justify-center items-center self-center cursor-pointer"
    >
      <Icon name="material-symbols:send" class="text-2xl" mode="css" />
    </button>
  </form>
</template>

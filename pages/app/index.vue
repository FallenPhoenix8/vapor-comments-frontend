<script setup lang="ts">
import Discussion from "~/class/Discussion"
import User from "~/class/User"
const user = useUser()

useTitle().setPageTitle("Vapor Comments | App")

const { data: discussions } = await useAsyncData("discussions", () =>
  Discussion.all()
)

const isShowCreateDiscussionPopup = ref(false)
</script>
<template>
  <AppPopupCreateDiscussion
    :show="isShowCreateDiscussionPopup"
    @close="isShowCreateDiscussionPopup = false"
    @update:discussions="discussions = $event"
  />
  <AppDiscussionList v-if="discussions" :discussions="discussions" />
  <div class="flex justify-center items-center my-4">
    <Button @click="isShowCreateDiscussionPopup = true"
      >Create discussion</Button
    >
  </div>
</template>

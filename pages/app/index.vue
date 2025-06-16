<script setup lang="ts">
import Discussion from "~/class/Discussion"
import User from "~/class/User"
const user = useUser()

useTitle().setPageTitle("Vapor Comments | App")

const { data: discussions } = await useAsyncData("discussions", () =>
  Discussion.all()
)

const isShowCreateDiscussionPopup = ref(false)
const deleteDiscussionPopup = reactive({
  isShow: false,
  discussionIdToDelete: "",
})

async function deleteDiscussion() {
  discussions.value = await Discussion.delete(
    deleteDiscussionPopup.discussionIdToDelete
  )
  deleteDiscussionPopup.isShow = false
}
</script>
<template>
  <AppPopupCreateDiscussion
    :show="isShowCreateDiscussionPopup"
    @close="isShowCreateDiscussionPopup = false"
    @update:discussions="discussions = $event"
  />
  <AppPopupConfirmDanger
    :show="deleteDiscussionPopup.isShow"
    @close="deleteDiscussionPopup.isShow = false"
    @confirm="deleteDiscussion()"
    >Are you sure you want to delete this discussion?</AppPopupConfirmDanger
  >

  <AppProfileCard />
  <AppDiscussionList
    v-if="discussions"
    :discussions="discussions"
    @show:delete-discussion="(event) => {
      deleteDiscussionPopup.discussionIdToDelete = event as string
      deleteDiscussionPopup.isShow = true
    }
    "
  />
  <div class="flex justify-center items-center my-4">
    <Button @click="isShowCreateDiscussionPopup = true"
      >Create discussion</Button
    >
  </div>
</template>

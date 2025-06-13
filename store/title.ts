export default defineStore("page-title", () => {
  const state = ref<string>("")

  function setPageTitle(title: string) {
    state.value = title
  }

  return {
    state,
    setPageTitle,
  }
})

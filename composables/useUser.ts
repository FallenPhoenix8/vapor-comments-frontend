export default async function () {
  const { data } = await useFetch("/api/get-user")
  return data
}

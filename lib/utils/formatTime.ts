export const formatTime = (input: string) => {
  const d = new Date()
  const formattedTime = new Date(
    `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()} ${input}`
  )

  return formattedTime
}
